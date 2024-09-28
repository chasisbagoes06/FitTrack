document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('form[name="registrationForm"]');
    const loginForm = document.querySelector('form[name="loginForm"]');
    const clearDataButton = document.getElementById('clearDataButton');
    const accountInfoButton = document.getElementById('accountInfoButton');
    const accountUsername = document.getElementById('accountUsername');
    const accountEmail = document.getElementById('accountEmail');
    const accountPicture = document.getElementById('accountPicture');

    function getStoredUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : {};
    }

    function clearLoginData() {
        localStorage.removeItem('currentUser');
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Login form submitted');

            const email = loginForm.elements.email.value;
            const password = loginForm.elements.password.value;
            const errorMessage = document.getElementById('errorMessage');
            const users = getStoredUsers();

            console.log('Email:', email);
            console.log('Password:', password);

            if (users[email] && users[email].password === password) {
                console.log('Login successful');
                localStorage.setItem('currentUser', email);
                window.location.href = 'my home.html';
            } else {
                console.log('Login failed');
                errorMessage.textContent = 'Invalid email or password';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            console.log('Register form submitted');

            const name = registerForm.elements.name.value;
            const email = registerForm.elements.email.value;
            const password = registerForm.elements.password.value;
            const profilePicture = registerForm.elements.profilePicture.files[0];
            const registerMessage = document.getElementById('registerMessage');
            const users = getStoredUsers();

            if (users[email]) {
                registerMessage.textContent = 'Email already exists';
            } else {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const pictureData = e.target.result;
                
                    users[email] = { name: name, password: password, picture: pictureData };
                    localStorage.setItem('users', JSON.stringify(users));
                    console.log('Registered with name:', name, 'email:', email, 'and password:', password);
                    
                    window.location.href = 'survey1.html';
                };
                reader.readAsDataURL(profilePicture);
            }
        });
    }

    if (clearDataButton) {
        clearDataButton.addEventListener('click', function() {
   
            clearLoginData();
        
            window.location.href = 'login.html';
        });
    }

    if (accountInfoButton) {
        accountInfoButton.addEventListener('click', function() {
    
            window.location.href = 'account.html';
        });
    }

    if (accountUsername && accountEmail && accountPicture) {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const users = getStoredUsers();
            const user = users[currentUser];
            accountUsername.textContent = user.name; 
            accountEmail.textContent = currentUser; 

            if (user.picture) {
                const img = document.createElement('img');
                img.src = user.picture;
                img.alt = 'Profile Picture';
                img.style.maxWidth = '100px'; 
                img.style.maxHeight = '100px'; 
                accountPicture.innerHTML = '';
                accountPicture.appendChild(img);
            }
        }
    }

    function clearLoginData() {
        localStorage.clear(); 
    }
});
