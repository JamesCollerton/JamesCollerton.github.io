
function hover_on_education(){

	document.getElementById("education_img").style.color = "blue";
	document.getElementById("education_text").style.color = "blue";

}

function isHover(e) {

	is_hovering = ( e.parentElement.querySelector(':hover') === e )

    return (is_hovering);

}
setInterval(function () {

    console.log(isHover(document.getElementById('img_hover_wrap')));

}, 100);