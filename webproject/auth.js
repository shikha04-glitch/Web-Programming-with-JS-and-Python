// Signup Logic
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem(email, JSON.stringify(user));
        alert("Signup successful! Please login.");
        window.location.href = "login.html";
    });
}

// Login Logic
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const storedUser = JSON.parse(localStorage.getItem(email));

        if (storedUser && storedUser.password === password) {
            localStorage.setItem("loggedInUser", email);
            alert("Login successful!");
            window.location.href = "mood.html";
        } else {
            alert("Invalid email or password!");
        }
    });
}
