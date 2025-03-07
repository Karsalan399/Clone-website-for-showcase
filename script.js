document.addEventListener("DOMContentLoaded", function () {
    console.log("Netflix Clone Loaded!");

    // Redirect to Signup Page
    const getStartedBtn = document.getElementById("getStarted");
    if (getStartedBtn) {
        getStartedBtn.addEventListener("click", function () {
            window.location.href = "signup.html";
        });
    }

    // Signup Form Submission
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            localStorage.setItem("netflixUser", JSON.stringify({ name, email, password }));

            window.location.href = "browse.html";
        });
    }

    // Login Form Submission
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            const storedUser = JSON.parse(localStorage.getItem("netflixUser"));

            if (storedUser && storedUser.email === email && storedUser.password === password) {
                alert("Login Successful!");
                window.location.href = "browse.html";
            } else {
                alert("Invalid Email or Password");
            }
        });
    }

    // Browse Page User Check
    const userNameElement = document.getElementById("user-name");
    if (userNameElement) {
        const storedUser = JSON.parse(localStorage.getItem("netflixUser"));
        if (!storedUser) {
            window.location.href = "login.html";
        } else {
            userNameElement.textContent = storedUser.name;
            loadMovies();
        }
    }

    // Logout Button
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("netflixUser");
            window.location.href = "login.html";
        });
    }

    // Load Movies Dynamically
    function loadMovies() {
        const categories = {
            "trending-now": ["movie1.jpg", "movie2.jpg", "movie3.jpg"],
            "top-picks": ["movie4.jpg", "movie5.jpg", "movie6.jpg"],
            "action-movies": ["movie7.jpg", "movie8.jpg", "movie9.jpg"]
        };

        Object.keys(categories).forEach(category => {
            const container = document.getElementById(category);
            categories[category].forEach(img => {
                const movieDiv = document.createElement("div");
                movieDiv.classList.add("movie");
                movieDiv.innerHTML = `<img src="images/${img}" alt="Movie">`;
                container.appendChild(movieDiv);
            });
        });
    }
});
