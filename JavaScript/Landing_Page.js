// JavaScript to control the hovering on the landing page.

// When you hover on different parts of the page changes the opacity.

// When you hover on a part of the page, swaps the opacity.
function hover_on(img_id, txt_id, img_opacity, txt_opacity){

	document.getElementById(img_id).style.opacity = img_opacity;
	document.getElementById(txt_id).style.opacity = txt_opacity;

}

// Checks if something is being hovered on.
function isHover(e) {

	is_hovering = ( e.parentElement.querySelector(':hover') === e )

    return (is_hovering);

}

// Every 100ms checks if each of the elements is being hovered on, if so changes
// them to the relevant opacity.
setInterval(function () {

    education_hovering = isHover(document.getElementById('img_hover_wrap_education'));
    project_hovering = isHover(document.getElementById('img_hover_wrap_projects'));
    about_hovering = isHover(document.getElementById('img_hover_wrap_about'));

    if(education_hovering){ hover_on("education_img", "education_txt", 0.15, 1); }
    else{ hover_on("education_img", "education_txt", 1, 0); }

    if(project_hovering){ hover_on("project_img", "project_txt", 0.15, 1); }
    else{ hover_on("project_img", "project_txt", 1, 0); }

    if(about_hovering){ hover_on("about_img", "about_txt", 0.15, 1); }
    else{ hover_on("about_img", "about_txt", 1, 0); }

}, 100);