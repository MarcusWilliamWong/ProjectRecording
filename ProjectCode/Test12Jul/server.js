console.log("Start server");
// 调用 http 模块，其继承了net模块
const http = require("http");
// 调用 fs 文件系统 模块
const fs = require("fs");

http.createServer((request, response) => {
	// 如果请求报文使用 GET 方法
	if (request.method == "GET") {
		// 如果请求是首页
		if (request.url == "/index") {
			console.log("request.url is index");
			response.writeHead(200, {"Content-type" : "text/html"});
			// 关闭连接时触发
			response.on("close", ()=> {
				console.log("send file close");
			})
			// 建立数据读取流，将请求报文中请求的对象写入响应报文中传输过去
			fs.createReadStream("./index.html", "utf-8").pipe(response);
		}
	}
}).listen(8888, ()=> {
	console.log("TCP running on port 8888");
});