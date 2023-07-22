// 使用WebSocket创建信令服务器（socket.io库）
console.log("start signaling server")
// Step 1: 创建WebSocket服务器，监听8010端口
const {Server} = require("socket.io");  // 集成有websocket协议的socket.io模块
const port = 8010;
// 建立WebSocket服务器，监听8010端口
const io = new Server({
	cors: true
}).listen(port, async () => {
	console.log("Start Signaling Server on *:8010");
});

// 信令服务器的管理对象
let broadcasterID; // 保存直播客户端的socket id，用于后边观看客户端给直播端发送私信
// 服务端与客户端在完全建立WebSocket连接后才被触发，绑定connect事件（socket创建连接事件）
// 有些指令，还需要将信息从一个客户端转发给另一个/一些的客户端
io.on("connection", (socket)=> {
	// 作为信令服务器，主要监听以下来自直播客户端和观看直播客户端的指令
	socket.on("newBroad", () => {
		console.log("New broadcaster client connected, id:" + socket.id);
	});
	socket.on("newWatcher", () => {
		console.log("New watcher client connected, id:" + socket.id);
	});
	// 直播端发起直播
	socket.on("broadcaster", () => {
			console.log(socket.id + " broadcaster launch live");
			// 保存直播客户端的连接号
      broadcasterID = socket.id;
      socket.broadcast.emit("broadcaster", broadcasterID);
  });
	socket.on("watcher", (watcherID, sourceID) => {
		console.log(JSON.stringify(watcherID) + " watcher will watch video from broadcaster" + JSON.stringify(sourceID));
		if (broadcasterID == sourceID){
			console.log("braodcaster and watcher matched");
			console.log(socket.id);
			socket.to(broadcasterID).emit("watcher", socket.id); // 发往直播客户端，开始媒体协商
		} else {
			console.log("live source is not from previous broadcaster " + JSON.stringify(broadcasterID) + ", need to restart client");
		}
	});
	// 来自直播客户端的offer，转发给对应观看客户端
  socket.on("offer", (id, message) => {
    socket.to(id).emit("offer", socket.id, message);
  });
  socket.on("answer", (id, message) => {
    socket.to(id).emit("answer", socket.id, message);
  });
  socket.on("candidate", (id, message) => {
    socket.to(id).emit("candidate", socket.id, message);
  });
  socket.on("disconnect", () => {
    socket.to(broadcasterID).emit("disconnectPeer", socket.id);
  });
});