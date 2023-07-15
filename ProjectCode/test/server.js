console.log("Hello Node.js!");
console.log("Start server");

// 调用 HTTP 模块
const http = require("http");

// 创建 HTTP 服务器并使用.listen方法监听 8888 端口的所有请求
// 关于requestListener方法：   请求处理函数，自动添加到 request 事件，函数传递两个参数：

//   req  请求对象，想知道req有哪些属性，可以查看 “http.request 属性整合”。

//   res   响应对象 ，收到请求后要做出的响应。想知道res有哪些属性，可以查看 “http.response属性整合”。
http.createServer(function (request, response) {

	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});
	
	response.write('<html>');
	response.write('<body>');
	response.write('<h1>Hello, World!</h1>');
	response.write('</body>');
	response.write('</html>');
	// response.end();

	// 发送响应数据 "Hello World"
	response.end('Hello, my first server!\n');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');

// 使用箭头函数定义HTTP服务器的端口监听事件
/*
http.createServer((request, response) => {
	// 用 HTTP 状态码和内容类型来设定 HTTP 响应头

	// 这里的 HTTP 状态码200 表示请求成功。一般用于GET与POST请求

	// 这里的 HTTP content-type 表示后面的文档属于什么MIME类型。Servlet默认为text/plain，
	// 但通常需要显式地指定为text/html。由于经常要设置Content-Type，因此HttpServletResponse提供了一个专用的方法setContentType。
	
	response.writeHead(200, {'Content-type':'text/plain'});

	// 发送响应体
}).listen(8888);

console.log('Server is running on http://127.0.0.1:8888');
*/