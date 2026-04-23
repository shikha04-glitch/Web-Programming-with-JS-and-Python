// Contact Form Validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill all the fields.");
    } else {
        alert("Thank you, " + name + "! Your message has been sent.");
        console.log("Form Submitted:", name, email, message);
        this.reset();
    }
});

// Dynamic Year in Footer
document.getElementById("year").textContent = new Date().getFullYear();
