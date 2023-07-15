const ws = require("nodejs-websocket");
// import { createServer } from "nodejs-websocket";
let port = 8010;
let user = 0;

// 任何网络服务应用程序总是要先创建一个服务对象
// 创建一个后台服务，在 Node.js 中通常通过 createServer 方法。
// 每当有客户端发送请求到主机端时，就会触发createServer绑定的事件
// 每当有 websocket 请求到达服务器时，createServer 中传入的函数就被自动执行。
// 所以这个函数也被称为是请求处理函数
// 建立连接后创建了一个新的连接对象conn
// 并且The callback is a function which is **automatically** added to the "connection" event.
let server = ws.createServer(function (conn) {
	console.log("Create a new connection...");
	// 连接用户数量加一
	user++;
	conn.nickname = "user" + user;
	// js中创建临时对象的常用方法之一，直接用{}，然后使用.运算符创建对象的成员
	let msg = {};
	// 初始消息类型为"enter"，作为进入房间的消息提醒
	msg.type = "enter";
	msg.data = conn.nickname + "come in";
	// JSON.stringify() 将 JavaScript 对象转换为字符串
	broadcast(JSON.stringify(msg)); // 自定义广播函数

	// 使用on绑定向客户端推送消息的函数
	conn.on("text", function (str) {
		console.log("reply: " + str);
		// 正常聊天的消息类型为"message"
		msg.type = "message";
		msg.data = conn.nickname + " say: " + str;
		broadcast(JSON.stringify(msg)); // 将消息广播到所有连接中
	})

	// 绑定关闭连接的操作
	conn.on("close", function (code, reason) {
		console.log("Close connection");
		msg.type = "leave";
		msg.data = conn.nickname + "leave chat";
		broadcast(JSON.stringify(msg));
	})

	// 绑定错误处理
	conn.on("error", function (err) {
		console.log("Error occur");
	})
}).listen(port);

function broadcast(str) {
	server.connections.forEach(function (connection) {
		// Connetion类中包含的方法
		connection.sendText(str);
	})
}
