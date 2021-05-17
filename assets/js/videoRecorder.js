const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

const startRecording = (stream) => {
	console.log()
}

const getVideo = async() => {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: true
		});
		videoPreview.srcObject = stream;
		videoPreview.muted = true;
		videoPreview.play();
		recordBtn.innerHTML = "Stop Recording"
		startRecording(stream);
	}catch(error){
		recordBtn.innerHTML = "Cant Record";
	}finally {
		recordBtn.removeEventListener("click", getVideo);
	}
	const view = recordBtn.enumerateDevices;
	console.log(view);
}

function init(){
	recordBtn.addEventListener("click", getVideo);
}

if(recorderContainer){
	init();
}