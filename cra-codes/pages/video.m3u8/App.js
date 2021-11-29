import React from "react";
import "./App.css";
import util from "../core/index";
import videojs from "video.js";
import "videojs-contrib-hls.js";
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
	userActions: { hotkeys: true },
};

class Default extends React.Component {
	state = {
		title: "",
		src: "",
	};

	componentDidMount() {
		//告知 flutter 页面已经装载完毕
		util.traceback("componentDidMount");

		// 注册暴露的可用函数给flutter调用
		util.register("setVideo", this.setVideo);

		// ***************************************************
		videojs.addLanguage("zh-CN", videozhCN);

		if (debugging) {
			setTimeout(() => {
				this.setVideo(
					"https://wowza.peer5.com/live/smil:clock.smil/playlist.m3u8"
				);
			}, 1000);
		}
	}

	componentWillUnmount() {
		if (this.player) this.player.dispose();
	}

	render() {
		return (
			<div className="app-container">
				<div className="app-contents">
					<div className="video-container">
						<video
							id="player"
							width={800}
							height={400}
							class="video-js vjs-default-skin"
							controls
						>
							<source src={this.state.src} type="application/x-mpegURL" />
						</video>
					</div>
				</div>
			</div>
		);
	}

	setVideo = (src) => {
		this.setState({
			src: src,
		});
		var player = videojs("player");
		player.play();
	};
}

export default Default;
