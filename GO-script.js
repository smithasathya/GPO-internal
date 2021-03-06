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
const sections = document.querySelectorAll("section:not(.hidden-section)[id]");
function navHighlighter() {
  // Get current scroll position
  let scrollY = window.pageYOffset;
  // Now we loop through sections to get height, top and ID values for each
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 200;
    const sectionId = current.getAttribute("id");
    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */

    if (sectionId) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector(".nav-item a[href*=" + sectionId + "]")
          .classList.add("active");
      } else {
        document
          .querySelector(".nav-item a[href*=" + sectionId + "]")
          .classList.remove("active");
      }
    }
  });
  /* Last Section */
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    document
      .querySelector(".nav-item a[href*=about]")
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
      autoplay = false;
      clearInterval(slideInterval);
    });
    btn.addEventListener("mouseleave", () => {
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

function video_open(event) {
  var lightBoxVideo = document.getElementById("onboardingVideo");
  if (event.target.classList.contains("video")) {
    lightBoxVideo.play();
  }
  event.target.nextElementSibling.style.display = "block";
  event.target.nextElementSibling.nextElementSibling.style.display = "block";
}

function video_close() {
  console.log(this.event.target);
  if (this.event.target.classList.contains("boxclose") || event.keyCode == 27) {
    this.event.target.parentNode.style.display = "none";
    this.event.target.parentNode.nextElementSibling.style.display = "none";
  }
  if (this.event.target.classList.contains("fade")) {
    this.event.target.style.display = "none";
    this.event.target.previousElementSibling.style.display = "none";
  }

  /* For video boxes, stop video on close */
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => video.pause());
  /*   var lightBoxVideo = document.getElementById("onboardingVideo");
  document.getElementById("light").style.display = "none";
  document.getElementById("fade").style.display = "none";
 */
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
$(document).ready(function () {
  $(".team-slider").slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

/* Course Tabs */
//styleActive link function and display resective tab content
var activeSection;
const styleActiveTabLink = (activeLink, tablinks) => {
  console.log(tablinks, activeLink);
  //default style
  // Remove styles of all tablinks/buttons
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
    tablinks[i].style.border = "none";
    tablinks[i].style.borderBottom = "3.5px solid #333";
    tablinks[i].style.borderRadius = "0px";
    tablinks[i].style.color = " #333";

    tablinks[tablinks.length - 1].style.borderRadius = "0 0 30px 0";
    tablinks[0].style.borderRadius = "0 0 0 30px ";
  }
  //active style
  activeLink.style.borderTop = "3.5px solid var(--equinix-red)";
  activeLink.style.borderBottom = "none";
  activeLink.style.borderRadius = "30px";
  activeLink.style.color = "var(--equinix-red)";
  if (activeLink.nextElementSibling) {
    activeLink.nextElementSibling.style.borderRadius = "0px 0px 0px 30px";
  }
  if (activeLink.previousElementSibling) {
    activeLink.previousElementSibling.style.borderRadius = " 0 0 30px 0";
  }
  if (
    activeLink.previousElementSibling == activeLink.parentNode.firstElementChild
  ) {
    activeLink.parentNode.firstElementChild.style.borderRadius =
      "0 0 30px 30px";
  }
  if (activeLink.nextElementSibling == activeLink.parentNode.lastElementChild) {
    activeLink.parentNode.lastElementChild.style.borderRadius = "0 0 30px 30px";
  }

  //hide all tab contents by defualt
  const tabcontent = activeLink.parentNode.querySelectorAll(".tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  const targetTab = activeLink.getAttribute("data-target-container");
  console.log(targetTab);
  document.getElementById(targetTab).style.display = "block";
};

function openPage(pageName, targetDiv) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tablinks = targetDiv.querySelectorAll(".tablink");

  //Assign click to the default open tab
  const defaultOpen = targetDiv.querySelector(".defaultOpen");
  defaultOpen.click();
  styleActiveTabLink(defaultOpen, tablinks);
  //add click event to tablinks
  tablinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      styleActiveTabLink(link, tablinks);
      activeSection = targetDiv;
    });
  });
}

/* Code to scroll to courses section from personas */
const goToCourse = (tab, element) => {
  //show the hidden section
  const targetDiv = document.querySelector("#" + tab);
  targetDiv.classList.add("active-section");
  setTimeout(() => {
    targetDiv.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  }, 350);
  openPage(tab, targetDiv);
};

//check if the hidden sections are in user's view port
//Adding a debounce function to avoid jumpy lags on the page due to scroll events being called multiple times
function debounce(func, wait) {
  var timeout;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(func, wait);
  };
}

//get all hidden sections
//if hiddensection is out of view port, hide it
//adding a debounce function so the scroll event is not triggered constantly and the page does not display a laggy behaviour
var hideOnScroll = debounce(() => {
  var visibleSections = document.querySelectorAll(".active-section");
  if (visibleSections) {
    visibleSections.forEach((section) => {
      if (!elementInViewport(section)) {
        section.classList.remove("active-section");
      }
    });
  }
}, 500);
/* Counter upper */
const countUp = debounce(() => {
  const counters = document.querySelectorAll(".counter");
  const speedSlow = 1000; // The lower the slower
  const speed = 500; // The lower the slower
  counters.forEach((counter) => {
    if (elementInViewport(counter)) {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        // Lower inc to slow and higher to slow
        var inc;
        if (target < 5000) {
          inc = target / speedSlow;
        } else {
          inc = target / speed;
        }

        // console.log(inc);
        // console.log(count);

        // Check if target is reached
        if (count < target) {
          // Add inc to count and output in counter
          counter.innerText = Math.ceil(count + inc);
          // Call function every ms
          setTimeout(updateCount, 1);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    }
  });
}, 500);

// When the user scrolls down 20px from the top of the document, show the button
window.addEventListener("scroll", hideOnScroll);
window.addEventListener("mousewheel", hideOnScroll);
window.addEventListener("scroll", countUp);
window.addEventListener("mousewheel", countUp);

//triggering hidediv on touch devices
var touchEvent = new Event("mousewheel");
window.addEventListener("touchmove", () => {
  window.dispatchEvent(touchEvent);
});

function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < window.pageYOffset + window.innerHeight &&
    left < window.pageXOffset + window.innerWidth &&
    top + height > window.pageYOffset &&
    left + width > window.pageXOffset
  );
}
/* Week Time line script */
$(document).ready(function () {
  let screenSize = window.matchMedia("(min-width:1200px)");
  markActives(screenSize);
  screenSize.addListener(markActives);
});

/* Progress on click */
const markActives = (size) => {
  if (size.matches) {
    paintBigScreen();
  } else {
    paintSmallScreen();
  }
};

/* Function to mark actives classes and draw progess bar on resize to mobile version*/
const paintSmallScreen = () => {
  $(document).on("click", ".step", function () {
    let lineProgress = $(this)
      .parent()
      .closest(".progress-bar-container")
      .children("#line")
      .children("#line-progress");
    $(this)
      .addClass("current")
      .prevAll()
      .addClass("active")
      .removeClass("current");
    $(this).nextAll().removeClass("active current");

    if (this.classList.contains("step1")) {
      lineProgress.css("height", "1%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week1")
        .addClass("active")
        .siblings()
        .removeClass("active");
    }
    if (this.classList.contains("step2")) {
      lineProgress.css("height", "12%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week2")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (this.classList.contains("step3")) {
      lineProgress.css("height", "24%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week3")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (this.classList.contains("step4")) {
      lineProgress.css("height", "34%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week4")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (this.classList.contains("step5")) {
      lineProgress.css("height", "45%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week5")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (this.classList.contains("step6")) {
      lineProgress.css("height", "58%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week6")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (this.classList.contains("step7")) {
      lineProgress.css("height", "70%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week7")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (this.classList.contains("step8")) {
      lineProgress.css("height", "86%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week8")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (this.classList.contains("step9")) {
      lineProgress.css("height", "90%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week9")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (this.classList.contains("step10")) {
      lineProgress.css("height", "100%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week10")
        .addClass("active")
        .siblings()
        .removeClass("active");
    }

    //Custom cases if the size of the course path is increased or decreased
    //Customer fundamentals(cf-beginner) has 11 weeks/sections, Hence adding custom styles the the last two sections
    if (
      this.classList.contains("step10") &&
      this.classList.contains("cf-beginner")
    ) {
      lineProgress.css("height", "90%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week10")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (
      this.classList.contains("step11") &&
      this.classList.contains("cf-beginner")
    ) {
      lineProgress.css("height", "100%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week11")
        .addClass("active")
        .siblings()
        .removeClass("active");
    }
  });
};
/* Function to mark actives classes and draw progess bar on resize to tablets and desktop version*/
const paintBigScreen = (tablnks) => {
  $(".tab-container").addClass(".container");
  $(document).on("click", ".step", function (e) {
    let lineProgress = $(this)
      .parent()
      .closest(".progress-bar-container")
      .children("#line")
      .children("#line-progress");
    $(this).addClass("current").prevAll().addClass("active");
    $(this).nextAll().removeClass("active");

    if (this.classList.contains("step1")) {
      lineProgress.css("width", "1%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week1")
        .addClass("active")
        .siblings()
        .removeClass("active");
    }
    //********************
    //co-beginner Line Progress

    if (this.classList.contains("step2")) {
      lineProgress.css("width", "11%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week2")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (this.classList.contains("step3")) {
      lineProgress.css("width", "23%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week3")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (this.classList.contains("step4")) {
      lineProgress.css("width", "34%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week4")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (this.classList.contains("step5")) {
      lineProgress.css("width", "44%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week5")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (this.classList.contains("step6")) {
      lineProgress.css("width", "56%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week6")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (this.classList.contains("step7")) {
      lineProgress.css("width", "67%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week7")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (this.classList.contains("step8")) {
      lineProgress.css("width", "78%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week8")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (this.classList.contains("step9")) {
      lineProgress.css("width", "89%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week9")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (this.classList.contains("step10")) {
      lineProgress.css("width", "100%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week10")
        .addClass("active")
        .siblings()
        .removeClass("active");
    }

    //Custom cases if the size of the course path is increased or decreased
    //Customer fundamentals(cf-beginner) has 11 weeks/sections, Hence adding custom styles the the last two sections
    if (
      this.classList.contains("step10") &&
      this.classList.contains("cf-beginner")
    ) {
      lineProgress.css("width", "90%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week10")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (
      this.classList.contains("step11") &&
      this.classList.contains("cf-beginner")
    ) {
      lineProgress.css("width", "100%");
      $(this)
        .parent()
        .parent()
        .parent()
        .children(".progress-content")
        .children(".week11")
        .addClass("active")
        .siblings()
        .removeClass("active");
    }
  });
};

/* Slide pane for the course steps */
/* Script for a smooth sliding slider-Different from the autotimed slider with smooth slides*/
var slideForward = document.querySelectorAll(".slideForward");
slideForward.forEach((hit) => {
  hit.onclick = function () {
    var containers = document.querySelectorAll(".scroll-pane");
    containers.forEach((container) => {
      sideScroll(container, "right", 200, 100, 170);
    });
  };
});

var slideBack = document.querySelectorAll(".slideBack");
slideBack.forEach((hit) => {
  hit.onclick = function () {
    var containers = document.querySelectorAll(".scroll-pane");
    containers.forEach((container) => {
      sideScroll(container, "left", 100, 100, 170);
    });
  };
});

function sideScroll(element, direction, speed, distance, step) {
  scrollAmount = 0;
  var slideTimer = setInterval(function () {
    if (direction == "left") {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
}

/* Modal(For View schedules) */
//

// Get the button that opens the modal
var modalBtns = document.querySelectorAll(".modal-button");

// When the user clicks the button, open the modal
modalBtns.forEach((btn) => {
  //get modal corresponsidng to the button clicked
  const modal = btn.nextElementSibling;
  //get corresponding close button for the modal above
  const closeBtn = modal.querySelector(".close");

  //display modal on btn click
  btn.onclick = () => {
    modal.style.display = "block";
  };
  closeBtn.onclick = () => {
    modal.style.display = "none";
  };
  //close modal when clicked anywhere outside hte modal
  window.onclick = function (event) {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none";
    }
  };
});
