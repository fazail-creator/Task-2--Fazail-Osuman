const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const message = document.getElementById("message");

        try {

            const response = await fetch(
                "http://localhost:3000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            message.textContent = data.message;

        } catch (error) {

            message.textContent = "Something went wrong.";

            console.error(error);
        }

    });

}



const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const loginMessage = document.getElementById("loginMessage");

        try {

            const response = await fetch(
                "http://localhost:3000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            loginMessage.textContent = data.message;

            if (response.ok) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                window.location.href = "dashboard.html";
            }

        } catch (error) {

            loginMessage.textContent =
                "Something went wrong.";

            console.error(error);
        }

    });

}