
if(typeof IIROSE_WPM_MES_FINISH === 'undefined'){
	eval("
class IIROSEAPI {
	//域名-window的对应字典
	static domin_window_dic={};
	static send_room_message(msg) {
		let msg_json = {
			"m": msg.toString(),
			"mc": inputcolorhex,
			"i": Math.random().toString().slice(2, 14)
		};
		socket.send(JSON.stringify(msg_json))
	}
	static send_bullet_message(msg){
		//~{"t":"(消息内容)","c":"(消息颜色)","v":0}
		let msg_json = {
			"t": msg.toString(),
			"c": inputcolorhex,
			"v": 0
		};
		socket.send("~"+JSON.stringify(msg_json))
	}
	static send_private_message(msg,uid){
		//{"g":"(接受者用户唯一标识)","m":"(消息内容)","mc":"(消息颜色)","i":"(随机数)"}
		let msg_json = {
			"g": uid.toString,
			"m": msg.toString(),
			"mc": inputcolorhex,
			"i": Math.random().toString().slice(2, 14)
		};
		socket.send(JSON.stringify(msg_json))
		
	}
	//添加win监听
	static add_new_plugin(domin_name,win){
		IIROSEAPI.domin_window_dic[domin_name]=win
	}
}
function proxyFunction (targetFunction, callback) {
	return ((...param) => {
		if (callback(param, targetFunction) !== true)
			return targetFunction(...param)
	});
}
function message_get(p){
	for (const [key, value] of Object.entries(IIROSEAPI.domin_window_dic)) {
	  //console.log(`Key: ${key}, Value: ${value}`);
		var domin=key;
		var win=value;
		win.postMessage(p.toString(),domin);
	}
}

socket._onmessage = proxyFunction(socket._onmessage.bind(socket), async (p) => {message_get(p)});

//脚本装载完成标志
var IIROSE_WPM_MES_FINISH=true
//IIROSEAPI.send_bullet_message("test");
")
}

async function start(){
  while(typeof IIROSE_WPM_MES_FINISH === 'undefined'){
	console.log("阻塞中")
  }
  var domin_name="示例域名用于替换"
  var floatingWindow = document.createElement('div');
  floatingWindow.style.position = 'absolute';
  floatingWindow.style.zIndex = 999999;
  floatingWindow.style.width = '1152px';
  floatingWindow.style.height = '648px';
  floatingWindow.style.border = '1px solid #000'; // 可选，添加边框以便于看到悬浮窗
  floatingWindow.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // 可选，设置背景颜色

  var dragBar = document.createElement('div');
  dragBar.style.width = '100%';
  dragBar.style.height = '30px'; 
  dragBar.style.backgroundColor = '#333'; // 可以根据需要调整颜色
  dragBar.style.cursor = 'move'; // 设置鼠标样式为可移动

  // 使拖动条可拖动
  dragBar.addEventListener('mousedown', function(e) {
	var offsetX = e.clientX - floatingWindow.getBoundingClientRect().left;
	var offsetY = e.clientY - floatingWindow.getBoundingClientRect().top;
  
	function mouseMoveHandler(e) {
	  floatingWindow.style.left = (e.clientX - offsetX) + 'px';
	  floatingWindow.style.top = (e.clientY - offsetY) + 'px';
	}
  
	function mouseUpHandler() {
	  document.removeEventListener('mousemove', mouseMoveHandler);
	  document.removeEventListener('mouseup', mouseUpHandler);
	}
  
	document.addEventListener('mousemove', mouseMoveHandler);
	document.addEventListener('mouseup', mouseUpHandler);
  });

  // 将拖动条添加到悬浮窗容器中
  floatingWindow.appendChild(dragBar);

  // 创建iframe
  var el = document.createElement('iframe');
  el.src = domin_name;
  el.width = "1152px";
  el.height = "648px";
  el.style.border = 'none'; // 移除iframe的边框
  el.style.position = 'absolute'; // 设置iframe为绝对定位
  el.style.top = '30px'; // 将iframe下移，避免覆盖拖动条

  // 将iframe添加到悬浮窗容器中
  floatingWindow.appendChild(el);

  // 将悬浮窗容器添加到文档body中
  document.body.appendChild(floatingWindow);
  //添加监听
  
  IIROSEAPI.add_new_plugin(domin_name,el.contentWindow);

}

start()

