document.addEventListener("DOMContentLoaded", () => {

    // ---------- PROJECT OPEN ----------
    window.openProject = function (page) {
        window.location.href = page;
    };

    // ---------- SCROLL REVEAL ----------
    const reveals = document.querySelectorAll('.reveal');

    window.addEventListener('scroll', () => {
        reveals.forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                section.classList.add('active');
            }
        });
    });

    // ---------- CLICK HIGHLIGHT ----------
    const sections = document.querySelectorAll('.reveal');

    sections.forEach(section => {
        section.addEventListener('click', () => {

            // remove active-click from all
            sections.forEach(sec => sec.classList.remove('active-click'));

            // add to clicked one
            section.classList.add('active-click');
        });
    });

    // ---------- MODAL ----------
    const modal = document.getElementById("msgModal");
    const anonForm = document.querySelector(".anon-form");
    const normalForm = document.querySelector(".normal-form");

    window.openModal = function () {
        modal.style.display = "flex";
    };

    window.closeModal = function () {
        modal.style.display = "none";
        anonForm.style.display = "none";
        normalForm.style.display = "none";
    };

    window.showAnonymous = function () {
        anonForm.style.display = "block";
        normalForm.style.display = "none";
    };

    window.showNormal = function () {
        normalForm.style.display = "block";
        anonForm.style.display = "none";
    };

});
// ---------- CLICK GLOW FOR CARDS ----------
const cards = document.querySelectorAll('.project-card, .service-card');

cards.forEach(card => {
    card.addEventListener('click', () => {

        cards.forEach(c => c.classList.remove('active-click'));

        card.classList.add('active-click');
    });
});

