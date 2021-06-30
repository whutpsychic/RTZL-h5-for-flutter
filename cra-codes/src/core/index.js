// ============================
// 这个是h5与flutter通信的核心模块
// 首创时间：2021-05-08
// 开发者：zbc
// 最近维护时间：2021-05-10
// ============================

class Default {
	// 1.------------------------------------
	// 注册一个函数以供 flutter 端调用
	static register = (name, fun) => {
		if (typeof name != "string")
			throw new Error("你暴露给flutter的函数名称不是一个正确的字符串！");
		window[name] = fun;
	};
	// 2.------------------------------------
	// 向 flutter 端发送信息（需要在flutter端另行注册方可使用）
	static post = (name, info) => {
		if (typeof info != "string")
			throw new Error("你传给flutter端的信息不是一个字符串，将无法识别！");
		if (window[name]) window[name].postMessage(info);
	};
	// 3.------------------------------------
	// 预留的向 flutter 端发送一般信息的默认函数
	static traceback = (info) => {
		if (typeof info != "string")
			throw new Error("你传给flutter端的信息不是一个字符串，将无法识别！");
		if (!window.traceback) {
			alert(
				"你所在的位置于flutter端没有注册traceback方法，请先行注册方可使用，或者联系zbc！"
			);
			console.warn(
				"如果你在非flutter端调试，那么traceback方法将不会产生任何作用，但不会影响你继续调试其他功能。"
			);
			return;
		}

		window.traceback.postMessage(info);
	};
}

export default Default;
