import asyncio
import websockets
# import rospy
# from geometry_msgs.msg import Twist

async def handle_message(websocket, path):
  async for message in websocket:
		
    print(f"Received message: {message}")

if __name__ == "__main__":
	# 初始化ros节点
	# rospy.init_node('joystickcmd_node')
	# pub = rospy.Publisher('/joystickcmd_topic', String, queue_size=10)

  # 设置服务器主机和端口
	host = '172.16.1.237'
	port = 8888
	# 创建WebSocket服务器
	server = websockets.serve(handle_message, host, port)
	print(f"WebSocket server listening on ws://{host}:{port}")

  # 运行服务器，保持监听状态
	asyncio.get_event_loop().run_until_complete(server)
	asyncio.get_event_loop().run_forever()