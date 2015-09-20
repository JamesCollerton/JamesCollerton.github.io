
function hover_on_education(){

	document.getElementById("education_img").style.opacity = 0.15;
	document.getElementById("education_txt").style.opacity = 1;

}

function not_hover_on_education(){

	document.getElementById("education_img").style.opacity = 1;
	document.getElementById("education_txt").style.opacity = 0;

}

function isHover(e) {

	is_hovering = ( e.parentElement.querySelector(':hover') === e )

    return (is_hovering);

}
setInterval(function () {

    education_hovering = isHover(document.getElementById('img_hover_wrap'));

    if(education_hovering){ hover_on_education(); }
    else{ not_hover_on_education(); }

}, 100);