import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const deleteBtns = document.querySelectorAll("#deleteBtn");
const commentNumber = document.getElementById("jsCommentNumber");

export const decreaseNumber = () => {
	commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
}

export const removeComment = index => {
	deleteBtns[index].parentNode.remove();
	decreaseNumber();
};

export const deleteComment = async index => {
	const videoId = window.location.href.split("/videos/")[1];
	const reponse = await axios({
		url: `/api/${videoId}/deleteComment`,
		method:"POST",
		data:{
			index
		}
	});
	
};


function init () {
	window.onload = function(){
		for(let i = 0; i < deleteBtns.length ; i++){
		deleteBtns[i].addEventListener("click", handleDeleteBtn);
		function handleDeleteBtn (event) {
			deleteComment(i);
			removeComment(i);
			};
		};
	 }
};

if(jsCommentList){
	init();
};