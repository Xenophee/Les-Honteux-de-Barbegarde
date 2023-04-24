// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// // Thumbnail image controls
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += " active";
// } 



// ----------------------------------------------------------------------------


// let pages = document.querySelectorAll('page');
// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//     console.log(n);
//     showSlides(slideIndex += n);
// }

// // Thumbnail image controls
// function currentSlide(n) {
//     showSlides(slideIndex = n);
// }

// function showSlides(n) {
//     let i;
//     let slides = document.getElementsByClassName("charactersImg");
//     console.log(slides);
//     let pages = document.getElementsByClassName("page");
//     if (n > slides.length) {slideIndex = 1}
//     if (n < 1) {slideIndex = slides.length}
//     for (i = 0; i < slides.length; i++) {
//         slides[i].classList.add('hide');
//     }
//     for (i = 0; i < pages.length; i++) {
//         pages[i].className = pages[i].className.replace(" active", "");
//     }
//     slides[slideIndex-1].classList.remove('hide');
//     pages[slideIndex-1].className += " active";
// }



// -----------------------------------------------------------------------------------

let pages = document.querySelectorAll('.page');
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(index) {
    // console.log(index);
    showSlides(slideIndex += index);
}

// Thumbnail image controls
function currentSlide(index) {
    showSlides(slideIndex = index);
}

function showSlides(index) {
    let i;
    let slides = document.querySelectorAll(".charactersImg");
    console.log(slides);
    let pages = document.querySelectorAll(".page");
    if (index > slides.length) {slideIndex = 1}
    if (index < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.add('hide');
    }
    for (i = 0; i < pages.length; i++) {
        pages[i].className = pages[i].className.replace(" active", "");
    }
    slides[slideIndex-1].classList.remove('hide');
    pages[slideIndex-1].className += " active";
}



pages.forEach((element, index) => {
    element.addEventListener('click', currentSlide(index+1))
    // console.log(element);
    // console.log(index+1);
});

let up = document.getElementById('up');
let down = document.getElementById('down');


// up.addEventListener('click', plusSlides(-1));
// down.addEventListener('click', plusSlides(1));