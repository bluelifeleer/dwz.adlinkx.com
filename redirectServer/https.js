'use strict';
const https = require('https');
const fs = require('fs');
const redis = require('redis');
const clc = require('cli-color');
const httpProxy = require('http-proxy');
const proxyOptions = {
    ssl: {
        key: fs.readFileSync('./ssl/dwz.adlinkx.com.key', 'utf8'),
        cert: fs.readFileSync('./ssl/dwz.adlinkx.com.pem', 'utf8')
    },
    //target: 'https://dwz.adlinkx.com:444',
    secure: true // Depends on your needs, could be false.
};
//创建一个转发服务；
const proxy = httpProxy.createProxyServer(proxyOptions);
const sucMsg = clc.xterm(22).bgXterm(0);
const errMsg = clc.xterm(52).bgXterm(0);
const https_options = {
    key: fs.readFileSync('./ssl/dwz.adlinkx.com.key', 'utf8'),
    cert: fs.readFileSync('./ssl/dwz.adlinkx.com.pem', 'utf8')
};
const Redis_opations = {
    host: '127.0.0.1',
    port: 6379
};

https.createServer(https_options, (req, res) => {
    try {
        console.log('1) creating https server is [ ' + sucMsg('success') + ' ] .');
        const key = req.url.substr(1) != 'favicon.ico' ? req.url.substr(1) : '';
        const client = redis.createClient(Redis_opations);
        client.on('connect', (err) => {
            if (err) { console.log('Redis connect is [ ' + errMsg('fialed') + ' ] .'); }
            console.log('2) Redis is [ ' + sucMsg('connected') + ' ] .');
        });
        client.select(2, (err, res) => {
            if (err) { console.log('select db is [ ' + errMsg('fialed') + ' ] .'); }
            console.log('3) select db is [ ' + sucMsg(res) + ' ] .');
        });
        if (key != '') {
            const reg = '^/short\/[a-zA-Z\d]*/';
            if (reg.test(key)) { //判断如果不是短链接则转发到nginx上去表示要访问网站，nginx配置监听444端口。
                proxy.web(req, res, {
                    target: 'https://dwz.adlinkx.com:444/' + key
                });
            } else {
                client.hgetall(key + ':info', (err, result) => {
                    try {
                        const log = req.client.server['_connectionKey'] + '#' + req.client.alpnProtocol + '#' + req.method + '#' + req.url + '#' + req.headers['host'] + '#' + req.headers['connection'] + '#' + req.headers['upgrade-insecure-requests'] + '#' + req.headers['user-agent'] + '#' + req.headers['accept'] + '#' + req.headers['accept-encoding'] + '#' + req.headers['accept-language'] + '\n';
                        fs.appendFile('./logs/dwz.adlinkx.com.log', log, 'utf8', (err) => {
                            if (err) { console.log(err) };
                            console.log('6) log append write is [ ' + sucMsg('success') + ' ] .');
                        });
                        client.hgetall(key + ':count', (err, num) => {
                            num.numbers++;
                            client.hmset(key + ':count', ['numbers', num.numbers], (err) => {
                                if (err) { console.log('update count numbers [ ' + errMsg('fialed') + ' ] .') }
                                console.log('5) update count numbers is [ ' + sucMsg('success') + ' ] .');
                            });
                        });
                        res.writeHead(302, { 'Content-Type': 'text/html; charset=utf-8', 'Location': result.link });
                        res.end();
                        console.log('4) redirect action is [ ' + sucMsg('success') + ' ] .');
                    } catch (err) {
                        const html_404 = fs.readFileSync('./error/404.html');
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.write(html_404);
                        res.end();
                    }
                });
            }

        }
    } catch (err) {
        const html_500 = fs.readFileSync('./error/500.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write(html_500);
        res.end();
    }
}).listen(443, 'dwz.adlinkx.com', 1000, (e, r) => {});
