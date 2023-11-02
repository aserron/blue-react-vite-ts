/* eslint-disable no-unsafe-optional-chaining, @typescript-eslint/no-unused-vars */

import ("./LightBox.css")

function SlideShow() {
    return null;
}


const modalId='lighbox01'

/**
 * LightBox based on {@link https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_lightbox}
 * @param props
 * @constructor
 */
export function LightBox(props: { children: React.ReactNode }) {
    const disabled = true;

    if(disabled) return null;
    return <>
        <section className="lightbox">

            <h2 style={{"textAlign":"center"}}>Lightbox</h2>

            <div className="row">
                <div className={"column"}>
                    <img src="img_nature.jpg" style={{"width":"100%"}} onClick={()=>{()=>{openModal();currentSlide(1)}}}
                         className={"hover-shadow cursor"} />
                </div>
                <div className={"column"}>
                    <img src="img_snow.jpg" style={{"width":"100%"}} onClick={()=>{openModal();currentSlide(2)}}
                         className={"hover-shadow cursor"} />
                </div>
                <div className={"column"}>
                    <img src="img_mountains.jpg" style={{"width":"100%"}} onClick={()=>{openModal();currentSlide(3)}}
                         className={"hover-shadow cursor"} />
                </div>
                <div className={"column"}>
                    <img src="img_lights.jpg" style={{"width":"100%"}} onClick={()=>{openModal();currentSlide(4)}}
                         className={"hover-shadow cursor"} />
                </div>
            </div>

            <div id={`${modalId}`} className="modal">
                <span className="close cursor" onClick={()=>{closeModal()}}>&times;</span>
                <div className="modal-content">

                    <div className="mySlides">
                        <div className="numbertext">1 / 4</div>
                        <img src="img_nature_wide.jpg" style={{"width":"100%"}} />
                    </div>

                    <div className="mySlides">
                        <div className="numbertext">2 / 4</div>
                        <img src="img_snow_wide.jpg" style={{"width":"100%"}} />
                    </div>

                    <div className="mySlides">
                        <div className="numbertext">3 / 4</div>
                        <img src="img_mountains_wide.jpg" style={{"width":"100%"}} />
                    </div>

                    <div className="mySlides">
                        <div className="numbertext">4 / 4</div>
                        <img src="img_lights_wide.jpg" style={{"width":"100%"}} />
                    </div>

                    <a className="prev" onClick="plusSlides(-1)">&#10094;</a>
                    <a className="next" onClick={()=>{plusSlides(1)}}>&#10095;</a>

                    <div className="caption-container">
                        <p id="caption"></p>
                    </div>


                    <div className={"column"}>
                        <img className="demo cursor" src="img_nature_wide.jpg" style={{"width":"100%"}}
                             onClick={()=>{currentSlide(1)}}
                             alt="Nature and sunrise" />
                    </div>
                    <div className={"column"}>
                        <img className="demo cursor" src="img_snow_wide.jpg" style={{"width":"100%"}}
                             onClick={()=>{currentSlide(2)}}
                             alt="Snow" />
                    </div>
                    <div className={"column"}>
                        <img className={"demo cursor"} src="img_mountains_wide.jpg" style={{"width":"100%"}}
                             onClick={()=>{currentSlide(3)}} alt="Mountains and fjords" />
                    </div>
                    <div className={"column"}>
                        <img className="demo cursor" src="img_lights_wide.jpg" style={{"width":"100%"}}
                             onClick={()=>{currentSlide(4)}}
                             alt="Northern Lights" />
                    </div>
                </div>
            </div>
        </section>
        <SlideShow/>
    </>
}


// ********************************

const modalClass='lightbox';

// Open the Modal
function openModal() {
    document.getElementById(modalClass).style.display = "block";
}

// Close the Modal
function closeModal() {
    document.getElementById(modalClass).style.display = "none";
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName(modalId);
    const dots = document.getElementsByClassName("demo");
    const captionText = document.getElementById("caption");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    if(slides[slideIndex-1] && slides[slideIndex-1].style){
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";

        if(captionText) captionText.innerHTML = dots[slideIndex-1].alt;
    }
}
