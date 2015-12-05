var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var querystring = require('querystring');
var url = require('url');
var cache = {};
var users = [];

var server = http.createServer(function(request, response) {
    var filePath = false;

    var pathname = url.parse(request.url).pathname;
    var querypara = url.parse(request.url).query;
    var queryjson = querystring.parse(querypara);

    var userExist = false;
    var proparr = [];

    for (var prop in queryjson) {
        proparr.push(prop);
    }

    for (var j = 0; j < users.length; j++) {
        if (users[j].username == queryjson.username) {
            userExist = true;
            break;
        }
    }

    if ('/favicon.ico' == pathname) { // 去除浏览器自带请求 favicon.ico
        return;
    }

    if (request.method == 'GET') {
        if (pathname == "/") {
            if (!querypara) {
                filePath = 'public/index.html';
                var absPath = './' + filePath;
                serveStatic(response, cache, absPath);
            }
            else if (userExist
            && proparr.length == 1 && proparr[0] == 'username') {
                renderDetail(users[j], response, request);
            }
            else {
                var htmlpath = './public/index.html';
                serveStatic(response, cache, htmlpath);
            }
        }
        else {
            filePath = 'public' + pathname;
            var absPath = './' + filePath;
            serveStatic(response, cache, absPath);
        }
    }

    if (request.method == 'POST') {
        addNewUser(request, response);
    }

});

server.listen(8000, function() {
    console.log("Server listening on port 8000.");
});

function addNewUser(request, response) {
    var userflag = false, idflag = false, phoneflag = false, emailflag = false;
    var userdata = "";
    var userjson = "";
    request.setEncoding('utf8');
    request.addListener('data', function(chunk) {
        userdata += chunk;
    });
    request.addListener('end', function() {
        userjson = querystring.parse(userdata);
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == userjson.username) {
                userflag = true;
            }
            if (users[i].stdid == userjson.stdid) {
                idflag = true;
            }
            if (users[i].phone == userjson.phone) {
                phoneflag = true;
            }
            if (users[i].email == userjson.email) {
                emailflag = true;
            }
        }
        if (userflag || idflag || phoneflag || emailflag) {
            var htmlpath = './public/index.html';
            var csspath = './public/css/index.css';
            var jspath = './public/js/index.js';
            var htmlfile = fs.readFileSync(htmlpath, "utf-8");
            htmlfile = insertStr(htmlfile, userjson.username);
            htmlfile = insertStr(htmlfile, userjson.stdid);
            htmlfile = insertStr(htmlfile, userjson.phone);
            htmlfile = insertStr(htmlfile, userjson.email);

            if (userflag) {
                htmlfile = conformErr(htmlfile, "<p style='display:inline-block; margin-left:5px;'>用户名重复</p>");
            }
            if (idflag) {
                htmlfile = conformErr(htmlfile, "<p style='display:inline-block; margin-left:5px;'>学号重复</p>");
            }
            if (phoneflag) {
                htmlfile = conformErr(htmlfile, "<p style='display:inline-block; margin-left:5px;'>电话重复</p>");
            }
            if (emailflag) {
                htmlfile = conformErr(htmlfile, "<p style='display:inline-block; margin-left:5px;'>邮箱重复</p>");
            }
            response.writeHead(
                200,
                {'Content-Type': 'text/html'}
            );
            response.end(htmlfile);
            //serveStatic(response, cache, htmlpath);
            serveStatic(response, cache, csspath);
            serveStatic(response, cache, jspath);
        } else {
            users.push(userjson);
            renderDetail(userjson, response, request);
        }
    });
}

function insertStr(oldstr, str) {
    var index = oldstr.indexOf('value=""');
    var firststr = oldstr.substring(0, index + 7);
    var secondstr = oldstr.substring(index + 7);
    var newstr = firststr + str + secondstr;
    return newstr;
}

function conformErr(oldstr, str) {
    var index = oldstr.indexOf("</form>");
    var firststr = oldstr.substring(0, index);
    var secondstr = oldstr.substring(index);
    var newstr = firststr + str + secondstr;
    return newstr;
}

function renderDetail(userjson, response, request) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<!DOCTYPE html>");
    response.write("<html>");
    response.write("<head>");
    response.write("<style type='text/css'> \
        @font-face { \
            font-family: yayuan; \
            src: url(./static/yayuan.otf); \
        } \
        body { \
            background-image: url('./static/back.gif'); \
            font-family: yayuan, sans-serif; \
        } \
        p, h1 { \
            text-align: center; \
            color: white; \
        } \
        p {font-size: 16pt;} \
        </style>"
    );
    response.write("<title>Hello World Page</title>");
    response.write("<meta charset='utf-8' />");
    response.write("</head>");
    response.write("<body>");
    response.write("<h1>用户详情</h1> \
                    <p>用户名: " + userjson.username + "</p></ br>"
                    + "<p>学号: " + userjson.stdid + "</p></ br>"
                    + "<p>电话: " + userjson.phone + "</p></ br>"
                    + "<p>邮箱: " + userjson.email + "</p></ br>"
        );
    response.write("</body>");
    response.write("</html>");
    response.end();
}

function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
}

function sendFile(response, filePath, fileContents) {
    response.writeHead(
            200,
            {'Content-Type': mime.lookup(path.basename(filePath))}
        );
    response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function(exists) {
            if (exists) {
                fs.readFile(absPath, function(err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                send404(response);
            }
        });
    }
}
