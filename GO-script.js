/* Peronalised welcome for the user */
/* let fullname = window.top.staticData.identity.ProperName;
let firstname = fullname.split(" ")[0];
document.getElementById("user").textContent = firstname;
 */
/* Fnction to display and click the toTop button on scroll */
const toTop = document.getElementById("toTop");
function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 700
  ) {
    toTop.style.display = "block";
  } else {
    toTop.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/* NavBar scroll effect*/
window.onscroll = function (ev) {
  let overlayHeight = document.querySelector(".home").offsetHeight;
  let navbar = document.querySelector(".navbar"); //check if page scrolled, if true style the nav to dark

  window.scrollY >= 250
    ? navbar.classList.add("navbar-scrolled")
    : navbar.classList.remove("navbar-scrolled"); //default scroll functions

  scrollFunction();
  navHighlighter();
};
/* Active Links when the screen scrolls to that section*/
// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");
function navHighlighter() {
  // Get current scroll position
  let scrollY = window.pageYOffset;
  // Now we loop through sections to get height, top and ID values for each
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    sectionId = current.getAttribute("id");
    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-item a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav-item a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
  /* Last Section */
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    document
      .querySelector(".nav-item a[href*=team]")
      .classList.remove("active");
    document
      .querySelector(".nav-item a[href*=contact]")
      .classList.add("active");
  } else {
    document
      .querySelector(".nav-item a[href*=contact]")
      .classList.remove("active");
  }
}

/* Toggle Nav on smaller screens */
let menuToggle = document.querySelector(".menu-toggle");
let nav = document.querySelector(".nav");
let mobileNavItem = document.querySelectorAll(".nav-item:not(.dropdown)");
const toggleNav = (e) => {
  nav.classList.toggle("mobile-nav");
  e.target.parentNode.classList.toggle("is-active");
};
const closeMobileNav = (e) => {
  nav.classList.remove("mobile-nav");
  menuToggle.classList.remove("is-active");
};

menuToggle.addEventListener("click", toggleNav);

mobileNavItem.forEach((item) => {
  item.addEventListener("click", closeMobileNav);
});

/* Slider Functions */
/* Slider Script */
const nextSlide = (slider) => {
  const slides = slider.querySelectorAll(".slide");
  const current = slider.querySelector(".current");

  //remove curent slide
  current.classList.remove("current");

  //check for next slide
  if (
    current.nextElementSibling &&
    current.nextElementSibling.classList.contains("slide")
  ) {
    current.nextElementSibling.classList.add("current");
  } else {
    //add current to the first slide
    slides[0].classList.add("current");
  }
  /*   setTimeout = () => {
      current.classList.remove("current");
  
    }; */
};

const prevSlide = (slider) => {
  const slides = slider.querySelectorAll(".slide");
  const current = slider.querySelector(".current");
  //remove curent slide
  current.classList.remove("current");

  //check for prev slide
  if (current.previousElementSibling) {
    current.previousElementSibling.classList.add("current");
  } else {
    //add current to the first slide
    slides[slides.length - 1].classList.add("current");
  }
  current.classList.remove("current");
};
const currentSlide = (e, slider, i) => {
  const slides = slider.querySelectorAll(".slide");
  const current = slider.querySelector(".current");

  current.classList.remove("current");
  e.target.parentNode.querySelector(".active").classList.remove("active");
  slides.forEach((slide) => {
    console.log(slide.getAttribute("data-slide"), i);
    if (slide.getAttribute("data-slide") == i + 1) {
      slide.classList.add("current");
    }
    e.target.classList.add("active");
  });
};
document.querySelectorAll(".custom-slider").forEach((slider) => {
  let autoplay = slider.getAttribute("data-autoplay");
  const timer = slider.getAttribute("data-timer");

  let slideInterval;

  //set up the slider buttons to receive the hover events
  //when user hovers over the slider buttons, disable the interval counter
  //when the user leaves the button, re-enable the interval counter
  const sliderBtns = document.querySelectorAll(".ss1-btnc button");
  sliderBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      console.log("Hovering");
      autoplay = false;
      clearInterval(slideInterval);
    });
    btn.addEventListener("mouseleave", () => {
      console.log("mouseLeft");
      if (slider.getAttribute("data-autoplay") === "true") {
        slideInterval = setInterval(nextSlide, timer, slider);
      }
    });
  });
  if (autoplay === "true") {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, timer, slider);
  }
  slider.querySelectorAll(".next").forEach((item) => {
    item.addEventListener("click", (e) => {
      nextSlide(slider);
      if (autoplay === "true") {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, timer, slider);
      }
    });
  });

  slider.querySelectorAll(".prev").forEach((item) => {
    item.addEventListener("click", (e) => {
      prevSlide(slider);
      if (autoplay === "true") {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, timer, slider);
      }
    });
  });
});

window.document.onkeydown = function (e) {
  if (!e) {
    e = event;
  }
  if (e.keyCode == 27) {
    video_close();
  }
};

function video_open() {
  var lightBoxVideo = document.getElementById("VisaChipCardVideo");

  document.getElementById("light").style.display = "block";
  document.getElementById("fade").style.display = "block";
  lightBoxVideo.play();
}

function video_close() {
  var lightBoxVideo = document.getElementById("onboardingVideo");
  document.getElementById("light").style.display = "none";
  document.getElementById("fade").style.display = "none";
  lightBoxVideo.pause();
}

/* Amination on offset */
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 500, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation);
});

/* Adding read more collapse feature to course paragraphs */
// get the paragraph
let paragraphs = document.querySelectorAll(".card-text p");

const setAttributes = (elem, attr) => {
  for (let key in attr) {
    elem.setAttribute(key, attr[key]);
  }
};

paragraphs.forEach((para, i) => {
  const paraAttr = {
    class: "collapse",
    id: `collapseItem${[i]}`,
    "aria-expanded": "false",
  };
  const controlBtnAttr = {
    id: "collapseBtn",
    role: "button",
    class: "collapsed",
    "data-toggle": "collapse",
    href: `#collapseItem${[i]}`,
    "aria-expanded": "false",
    "aria-controls": `collapseItem${[i]}`,
  };
  // Slice and Stitch

  let collapseBtnAdded = false;

  const checkScreenSize = (size) => {
    if (
      size.matches &&
      !collapseBtnAdded &&
      para.textContent.split(/\s+/).join(" ").length >= 120
    ) {
      setAttributes(para, paraAttr);
      console.log(para, paraAttr);
      const controlBtn = document.createElement("p");
      para.parentNode.insertBefore(controlBtn, para.nextSibling);
      setAttributes(controlBtn, controlBtnAttr);
      collapseBtnAdded = true;
    }
  };

  let minWidth = window.matchMedia("(min-width: 280px)");
  // Call listener function at run time
  window.addEventListener("resize", checkScreenSize);
  checkScreenSize(minWidth);
});

/* Slick Carousel for Teams Section */
$(document).ready(function ($) {
  $(".team-slider").slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,

    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
