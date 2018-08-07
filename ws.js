const fs = require('fs');
const request = require('request');
const express = require('express');
const crypto = require('crypto');

const getOAuthUrl = (appid, appsecret) => `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`;
const getTicketUrl = (access_token) => `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;

const port = 3000;
const faultTime = 600 * 1000; // 1小时50分钟，刷新 accessToken 和 ticket
const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz1234567890';

const sha1 = (content) => {
    let cp = crypto.createHash('sha1');
    cp.update(content);
    return cp.digest('hex');
};

const randomString = () => {　　
    let len = Math.floor(Math.random() * 20),
        maxPos = chars.length,
        rs = '';　　
    for (let i = 0; i < len; i++) {　　　　
        rs += chars.charAt(Math.floor(Math.random() * maxPos));　　
    }　　
    return rs;
};

const getSignature = (ticket, appId, url) => {
    let timestamp = Math.floor((Date.now() / 1000)),
        nonceStr = randomString();
    return {
        timestamp,
        nonceStr,
        appId,
        signature: sha1(`jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`),
        url
    };
};

const getData = (url, callback) => {
    request(url, (error, res, body) => {
        if (!error && res.statusCode == 200) {
            try {
                let data = JSON.parse(body);
                if (data.errcode) {
                    callback(new Error(`${url.split('?')[0]} Error. Code:${data.errcode} => ${data.errmsg}`));
                    return;
                }
                callback(null, data);
            } catch (e) {
                callback(new Error(`${url.split('?')[0]} Data Error. ${e}`));
            }
        } else {
            callback(new Error(`${url.split('?')[0]} Error`));
        }
    });
};

const getTicket = (ret, appid, appsecret, callback) => {
    if (ret && ret.accessData && Date.now() < ret.timeout && ret.ticketData) {
        callback(null, ret.ticketData.ticket);
    } else {
        getData(getOAuthUrl(appid, appsecret), (error, accessData) => {
            if (error) {
                callback(error);
                return;
            }
            ret.accessData = accessData;
            getData(getTicketUrl(accessData.access_token), (error, ticketData) => {
                if (error) {
                    callback(error);
                    return;
                }
                ret.ticketData = ticketData;
                ret.timeout = Date.now() + ticketData.expires_in * 1000 - faultTime;
                callback(null, ticketData.ticket);
            });
        });
    }
};

const app = express();
const [appId, appsecret] = fs.readFileSync('account.conf', 'UTF-8').split(':');
const cache = {};

app.use('/getSignature', (req, res) => {
    getTicket(cache, appId, appsecret, (err, data) => {
        if (err) {
            res.status(500).end('获取签名失败');
        } else {
            res.json(getSignature(data, appId, req.headers.referer));
        }
    });
});

app.use('/', (req, res) => {
    res.type('html');
    res.end('<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>')
});


app.listen(port, () => {
    console.log(`Service Listening on port ${port}!`)
});
