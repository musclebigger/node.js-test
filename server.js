//node js build mutiple webpage interactive by api
const http = require("http");
const qs = require("querystring");//字符串拆分
//read files
const fs = require("fs");
const port = 3000;
const ip = `127.0.0.1`;

//向服务器发送请求
const sendRes = (name, statusCode, res) => {
    fs.readFile(`./html/${name}`, (error, data) => {
        if (error) {
            res.statusCode = 500;
            // res.setHeader('Content-Type','text/plain');
            res.end("Sorry, internal error");
        }
        else {
            res.statusCode = statusCode;
            // res.setHeader('Content-Type','text/plain');
            res.end(data);
        }
    })
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    const method = req.method;
    let url = req.url;

    if (method === "GET") {
        const reqUrl = new URL(url, `http://${ip}:${port}`);
        url = reqUrl.pathname;//需要将路径提取出来，而不包括查询？后面的api
        const lang = reqUrl.searchParams.get("lang");//提取query而不提取路径，实例化其中的query
        console.log(reqUrl.searchParams.get("lang"));
        let selector;

        if (lang === null || lang === "en") {
            selector = "";
        } else if (lang === "zh") {
            selector = "-zh";
        } else {
            selector = "";
        }


        if (url === '/') {
            sendRes(`index${selector}.html`, 200, res);
        } else if (url === '/about') {
            sendRes(`about${selector}.html`, 200, res);
        } else if (url === '/login') {
            sendRes(`login${selector}.html`, 200, res);
        } else if (url === '/login-fail') {
            sendRes(`login-fail${selector}.html`, 200, res);
        } else if (url === '/login-success') {
            sendRes(`login-success${selector}.html`, 200, res);
        }
        else {
            sendRes(`404${selector}.html`, 404, res);
        }
    } else if (method === "POST") {
        //数据流stream，从管道传到服务器node的buffer中，在buffer满了之后，进入server中
        if (url === "/process-login") {
            let body = [];//buffer
            req.on("data", (chunk) => {//request数据流监听被分段的上传数据
                body.push(chunk);
            })

            req.on("end", () => {
                body = Buffer.concat(body).toString();//合并body分段数据
                body = qs.parse(body);//使用qs将$=分离成object
                console.log(body);//返回buffer类型

                //账号验证,正常上交数据库
                if (body.username === "jhon" && body.password === "123") {
                    // res.setHeader("Location", "/login-success.html");//页面跳转
                    sendRes(`login-success.html`, 301, res);
                } else {
                    sendRes(`login-fail.html`, 301, res);
                }
            })

        }
    }
});



server.listen(port, ip, () => {
    console.log(`Server is running at http://${ip}:${port}`);
})