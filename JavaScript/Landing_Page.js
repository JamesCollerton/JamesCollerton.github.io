
function hover_on_education(img_opacity, txt_opacity){

	document.getElementById("education_img").style.opacity = img_opacity;
	document.getElementById("education_txt").style.opacity = txt_opacity;

}

function isHover(e) {

	is_hovering = ( e.parentElement.querySelector(':hover') === e )

    return (is_hovering);

}
setInterval(function () {

    education_hovering = isHover(document.getElementById('img_hover_wrap'));

    if(education_hovering){ hover_on_education(0.15, 1); }
    else{ hover_on_education(1, 0); }

}, 100);