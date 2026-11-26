/* =================================
   1. OPENING SCREEN
================================= */

const introScreen = document.getElementById("introScreen");
const enterWebsite = document.getElementById("enterWebsite");

enterWebsite.addEventListener("click", function () {

    introScreen.classList.add("hide");

    document.body.classList.add("page-loaded");

});


/* =================================
   2. MOBILE NAVIGATION
================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    menuToggle.textContent =
        navLinks.classList.contains("active") ? "✕" : "☰";

});

document.querySelectorAll(".nav-links a").forEach(function (item) {

    item.addEventListener("click", function () {

        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";

    });

});


/* =================================
   3. DARK MODE & LIGHT MODE
================================= */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("websiteTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

function updateThemeIcon() {

    const isDark = document.body.classList.contains("dark-mode");

    themeToggle.textContent = isDark ? "☀" : "☾";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"
    );

}

updateThemeIcon();

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "websiteTheme",
        isDark ? "dark" : "light"
    );

    updateThemeIcon();

});


/* =================================
   4. TYPING ANIMATION
================================= */

const typingText = document.getElementById("typingText");

const words = [
    "Information Systems Student",
    "Creative Learner",
    "Future Professional"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1600);
            return;

        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex = (wordIndex + 1) % words.length;

        }

    }

    setTimeout(typeEffect, deleting ? 45 : 90);

}

typeEffect();


/* =================================
   5. SCROLL REVEAL
================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});

revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =================================
   6. ANIMATED COUNTERS
================================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let current = 0;

            const increment = target / 35;

            const timer = setInterval(function () {

                current += increment;

                if (current >= target) {

                    counter.textContent = target;
                    clearInterval(timer);

                } else {

                    counter.textContent = Math.floor(current);

                }

            }, 35);

            counterObserver.unobserve(counter);

        }

    });

}, {
    threshold: 0.5
});

counters.forEach(function (counter) {

    counterObserver.observe(counter);

});


/* =================================
   7. CUSTOM CURSOR
================================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {

    let mouseX = 0;
    let mouseY = 0;

    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener("mousemove", function (event) {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";

    });

    function animateCursor() {

        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = outlineX + "px";
        cursorOutline.style.top = outlineY + "px";

        requestAnimationFrame(animateCursor);

    }

    animateCursor();

    document.querySelectorAll("a, button").forEach(function (item) {

        item.addEventListener("mouseenter", function () {

            cursorOutline.style.width = "48px";
            cursorOutline.style.height = "48px";

        });

        item.addEventListener("mouseleave", function () {

            cursorOutline.style.width = "32px";
            cursorOutline.style.height = "32px";

        });

    });

}


/* =================================
   8. AUTOMATIC FOOTER YEAR
================================= */

const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

/* GALLERY */

// GALLERY SLIDER
const gallerySlider = document.getElementById("gallerySlider");
const galleryNext = document.getElementById("galleryNext");
const galleryPrev = document.getElementById("galleryPrev");

galleryNext.addEventListener("click", () => {
    gallerySlider.scrollBy({
        left: gallerySlider.clientWidth * 0.8,
        behavior: "smooth"
    });
});

galleryPrev.addEventListener("click", () => {
    gallerySlider.scrollBy({
        left: -gallerySlider.clientWidth * 0.8,
        behavior: "smooth"
    });
});

/* =================================
   CERTIFICATES SLIDER
================================= */

const certificateSlider = document.getElementById("certificateSlider");
const certificateNext = document.getElementById("certificateNext");
const certificatePrev = document.getElementById("certificatePrev");

function moveCertificate(direction) {
    if (!certificateSlider) return;

    const card = certificateSlider.querySelector(".certificate-card");

    if (!card) return;

    const gap = 22;
    const distance = card.offsetWidth + gap;

    certificateSlider.scrollBy({
        left: direction * distance,
        behavior: "smooth"
    });
}

if (certificateNext && certificatePrev) {
    certificateNext.addEventListener("click", function () {
        moveCertificate(1);
    });

    certificatePrev.addEventListener("click", function () {
        moveCertificate(-1);
    });
}

/* =================================
   CERTIFICATE IMAGE PREVIEW
================================= */

const certificateModal = document.getElementById("certificateModal");
const certificateModalImage = document.getElementById("certificateModalImage");
const certificateModalClose = document.getElementById("certificateModalClose");

document.querySelectorAll(".certificate-preview").forEach(function (button) {

    button.addEventListener("click", function () {

        const imageSource = button.dataset.src;

        certificateModalImage.src = imageSource;
        certificateModalImage.alt =
            button.querySelector("img").alt;

        certificateModal.showModal();

    });

});

if (certificateModalClose) {
    certificateModalClose.addEventListener("click", function () {
        certificateModal.close();
    });
}

// Tutup modal ketika area luar gambar diklik
if (certificateModal) {
    certificateModal.addEventListener("click", function (event) {

        if (event.target === certificateModal) {
            certificateModal.close();
        }

    });
}

/* MUSIC PLAYER */

const backgroundMusic = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");

musicToggle.addEventListener("click", function () {

    if (backgroundMusic.paused) {

        backgroundMusic.play();

        musicToggle.textContent = "Ⅱ";
        musicToggle.setAttribute("aria-label", "Jeda musik");

    } else {

        backgroundMusic.pause();

        musicToggle.textContent = "▶";
        musicToggle.setAttribute("aria-label", "Putar musik");

    }

});

backgroundMusic.addEventListener("ended", function () {

    musicToggle.textContent = "▶";

});
