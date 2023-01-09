<template>
  <div class="video-container" :style="'width:' + width + 'px;height:' + height + 'px;'" >
    <video id="video" :src="videoUrl" controls autoPlay />
    <div class="backup"  >
      <span @click="this.onClick">{{"<"}}</span>
    </div>
  </div>
</template>

<script>
import fc from "./views/core.js";

export default {
  name: "App",
  data() {
    return {
      videoUrl: "",
      width: 0,
      height: 0,
      //
      // showBack: false,
    };
  },
  mounted() {
    fc.register("setVideoUrl", this.setVideoUrl);
    fc.register("setVideoWidth", this.setVideoWidth);
    fc.register("setVideoHeight", this.setVideoHeight);
    fc.register("getVideoDuration", this.getVideoDuration);
    fc.register("getCurrPlayingTick", this.getCurrPlayingTick);
    fc.register("getVideoPaused", this.getVideoPaused);

    let videoEl = document.getElementById("video");
    videoEl.addEventListener("ended", () => {
      fc.traceback(`ended`);
    });
    setTimeout(() => {
      fc.traceback("componentDidMount");
    }, 100);
    // setTimeout(() => {
    //   console.log("klklklklklklklkl")
    //   window.setVideoUrl('http://220.200.154.50:8084/file/onlinePreviewController/v1/getFileById_1539499161728430080');
    // }, 1000);
  },
  methods: {
    setVideoUrl(url) {
      this.videoUrl = url;
    },
    setVideoWidth(w) {
      this.width = w;
    },
    setVideoHeight(h) {
      this.height = h;
    },
    getVideoDuration() {
      setTimeout(() => {
        let el = document.getElementById("video");
        if (!el.duration) {
          this.getVideoDuration();
        } else {
          // 拿到duration之后的后续动作
          fc.traceback(`videoDuration=${el.duration}`);
        }
      }, 1000);
    },
    getCurrPlayingTick() {
      setTimeout(() => {
        let el = document.getElementById("video");
        if (!el.currentTime) {
          this.getCurrPlayingTick();
        } else {
          // 拿到duration之后的后续动作
          fc.traceback(`videoCurrentTime=${el.currentTime}`);
        }
      }, 1000);
    },
    getVideoPaused() {
      let el = document.getElementById("video");
      fc.traceback(`videoPaused=${el.paused}`);
    },
    // 
    onClick(){
       fc.traceback(`backup`);
    }
  },
};
</script>

<style>
* {
  margin: 0;
}
.video-container {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: black;
  position:relative;
}
#video{
  z-index:9;
}
.backup{
  width:100%;
  height:60px;
  /* background:rgba(0,0,0,0.3); */
  position:absolute;
  top: 0;
  left:0;
  z-index:999;
  color:white;
  font-size:20px;
  line-height:20px;
  display:flex;
  align-items:center;
}
.backup span{
  display:block;
  margin-left:10px;
  font-weight:bold;
  padding:20px;
}
.backup.hide{
  /* display:none; */
}
</style>
