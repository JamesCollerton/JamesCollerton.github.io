
function hover_on_education(){

	console.log('Woo')
	document.getElementById("education_img").style.color = "blue";
	document.getElementById("education_text").style.color = "blue";

}

function isHover(e) {

	is_hovering = ( e.parentElement.querySelector(':hover') === e )

    return (is_hovering);

}
setInterval(function () {

    education_hovering = isHover(document.getElementById('img_hover_wrap'));

    if(education_hovering){ hover_on_education(); }

}, 100);