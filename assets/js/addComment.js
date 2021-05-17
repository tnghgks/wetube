import axios from "axios";
import {deleteComment} from "./deleteComment";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const userName = document.getElementById("userName");

const handleDeleteBtn = event => {
	event.target.parentNode.remove();
	commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
	deleteComment(0);
}

const increaseNumber = () => {
	commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
}

const addComment = comment => {
	const li = document.createElement("li");
	const commentSpan = document.createElement("span");
	const creatorSpan = document.createElement("span");
	const i = document.createElement("i");
	i.classList.add("fas","fa-times");
	creatorSpan.innerHTML = userName.innerHTML;
	commentSpan.innerHTML = comment;
	li.appendChild(creatorSpan);
	li.appendChild(commentSpan);
	li.appendChild(i);
	commentList.prepend(li);
	i.addEventListener("click", handleDeleteBtn);
	increaseNumber();
}

const sendComment = async comment => {
	const videoId = window.location.href.split("/videos/")[1];
	const reponse = await axios({
		url: `/api/${videoId}/comment`,
		method:"POST",
		data:{
			comment
		}
	});
	if(reponse.status === 200){
		addComment(comment);
	}
};

const handleSubmit = event => {
	event.preventDefault();
	const commentInput = addCommentForm.querySelector("input");
	const comment = commentInput.value;
	sendComment(comment);
	commentInput.value = "";
};


function init(){
	addCommentForm.addEventListener("submit", handleSubmit);
	
};


if(addCommentForm){
	init();
}