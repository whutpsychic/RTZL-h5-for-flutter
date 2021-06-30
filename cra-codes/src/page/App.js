import React from "react";
import "./App.css";
import util from "../core/index";
import videojs from "video.js";
import videozhCN from "video.js/dist/lang/zh-CN.json";
import "video.js/dist/video-js.css";

// debug模式
const debugging = false;

const defaultOptions = {
	autoplay: true,
	language: "zh-CN",
	controls: true,
	preload: "auto",
	errorDisplay: true,
	fluid: true,
	userActions: { hotkeys: true }
};

class Default extends React.Component {
	state = {
		title: ""
	};

	componentDidMount() {
		//告知 flutter 页面已经装载完毕
		util.traceback("componentDidMount");

		// 注册暴露的可用函数给flutter调用
		util.register("setVideo",this.setVideo);

		// ***************************************************
		videojs.addLanguage("zh-CN", videozhCN);

		if (debugging) {
			this.setVideo("http://10.99.189.116:18000/hls/1/index.m3u8");
		}
	}

	componentWillUnmount() {
		if (this.player) this.player.dispose();
	}

	render() {
		return (
			<div className="app-container">
				<div className="app-contents">
					{/*<TopTitle title={`${title}`} canBack />*/}
					<div className="video-container">
						<div data-vjs-player>
							<video
								ref="videoElement"
								className="video-js"
								style={{ width: "100%" }}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}

	setVideo = src => {
		const options = videojs.mergeOptions(defaultOptions, { sources: { src } });
		this.player = videojs(this.refs.videoElement, options);
	};
}

export default Default;
