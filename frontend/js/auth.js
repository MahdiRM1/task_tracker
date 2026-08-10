async function handleRegister() {
    try {
        const response = await apiPost('/register/', {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        });
    }catch (error) {
        document.getElementById('register-error').textContent = error.message;
        return;
    }

    window.location.href = 'login.html';
}

async function handleLogin() {
    try {
        const response = await apiPost('/login/', {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        });
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
    }catch (error) {
        document.getElementById('login-error').textContent = error.message;
        return;
    }

    window.location.href = 'index.html';
}

function handleLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    window.location.href = 'login.html';
}