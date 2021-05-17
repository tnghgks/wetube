const videoContainer = document.getElementById("JsVideoPlayer");
const videoPlayer = document.querySelector("#JsVideoPlayer video");
const playBtn = document.getElementById("JsPlayButton");
const volumeBtn = document.getElementById("JsVolumeButton");
const fullscreenBtn = document.getElementById("JsFullscreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("JsVolume");

const registerView = () => {
	const videoId = window.location.href.split("/videos/")[1];
	fetch(`/api/${videoId}/view`,{
		method: "POST"
	});
};

function handlePlayClick(){
	if(videoPlayer.paused){
		videoPlayer.play();
		playBtn.innerHTML = '<i class="fas fa-pause"></i>';
	}else {
		videoPlayer.pause();
		playBtn.innerHTML = '<i class="fas fa-play"></i>';
	}
};

function handleVolumeClick(){
	if(videoPlayer.muted){
		videoPlayer.muted = false;
		volumeRange.value = videoPlayer.volume;
		if(videoPlayer.volume > 0.6){
			volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
		}else if(videoPlayer.volume > 0.2){
			volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
		}else{
			volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
		}
	}else {
		videoPlayer.muted = true
		volumeRange.value = 0;
		volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
		
	}
};

function goFullscreen(){
	videoContainer.requestFullscreen();
	fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
	fullscreenBtn.removeEventListener("click", goFullscreen);
	fullscreenBtn.addEventListener("click", outFullscreen);
};

function outFullscreen(){
	document.exitFullscreen();
	fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
	fullscreenBtn.addEventListener("click", goFullscreen);
};

function formatDate(seconds){
	const secondsNumber = parseInt(seconds,10);
	let hours = Math.floor(secondsNumber / 3600 );
	let minutes = Math.floor((secondsNumber - hours*3600) / 60 );
	let totalSeconds = secondsNumber - hours * 3600 - minutes *60;
	
	if(hours < 10){
		hours = `0${hours}`;
	}
	if(minutes < 10){
		minutes = `0${minutes}`;
	}
	if(totalSeconds < 10){
		totalSeconds = `0${totalSeconds}`;
	}
	return `${hours}:${minutes}:${totalSeconds} `;
};

function getCurrentTime() {
	currentTime.innerHTML = formatDate(videoPlayer.currentTime);
};

function setTotalTime(){
	const totalTimeString = formatDate(videoPlayer.duration);
	totalTime.innerHTML = totalTimeString;	
};

function handleEnded(){
	registerView();
	videoPlayer.currentTime = 0;
	playBtn.innerHTML = '<i class="fas fa-play"></i>';
};

function handleDrag(event){
	const {
		target : {value}
	} = event;
	videoPlayer.volume = value;
	if(videoPlayer.volume > 0.7){
		volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
	}else if(videoPlayer.volume > 0.4){
		volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
	}else{
		volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
	}
};

function init(){
	videoPlayer.volume = 0.5;
	playBtn.addEventListener("click", handlePlayClick);
	volumeBtn.addEventListener("click", handleVolumeClick);
	fullscreenBtn.addEventListener("click", goFullscreen);
	window.addEventListener("load", setTotalTime);
	videoPlayer.addEventListener("loadedmetadata", setTotalTime);
	videoPlayer.addEventListener("timeupdate", getCurrentTime);
	videoPlayer.addEventListener("ended", handleEnded);
	volumeRange.addEventListener("input", handleDrag);
	
};

if(videoContainer){
	init();
};