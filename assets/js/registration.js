document.addEventListener('DOMContentLoaded', () => {
    // Load the form data if available
    loadFormData();
    setupOptions();
});

function showStep(step) {
    const steps = document.querySelectorAll('.form-container');
    steps.forEach((stepDiv, index) => {
        if (index === step - 1) {
            stepDiv.classList.add('active');
        } else {
            stepDiv.classList.remove('active');
        }
    });
}

function nextStep(currentStep) {
    saveFormData(currentStep);
    if (currentStep === 1) {
        window.location.href = "survey1.html";
    } else if (currentStep === 2) {
        window.location.href = 'survey2.html';
    }
}

function prevStep(previousStep) {
    if (previousStep === 1) {
        window.location.href = 'index.html';
    } else if (previousStep === 2) {
        window.location.href = 'survey1.html';
    }
}

function setupOptions() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            const stepOptions = option.parentNode.querySelectorAll('.option');
            stepOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
}

function saveFormData(step) {
    if (step === 1) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
    } else if (step === 2) {
        const question1 = document.getElementById('question1').value;
        localStorage.setItem('question1', question1);
    } else if (step === 3) {
        const question2 = document.getElementById('question2').value;
        localStorage.setItem('question2', question2);
    }
}

function loadFormData() {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const question1 = localStorage.getItem('question1');
    const question2 = localStorage.getItem('question2');

    if (name) document.getElementById('name').value = name;
    if (email) document.getElementById('email').value = email;
    if (password) document.getElementById('password').value = password;
    if (question1) document.getElementById('question1').value = question1;
    if (question2) document.getElementById('question2').value = question2;
}

function submitForm() {
    saveFormData(3);
    alert('Survey Completed');
    // Optionally, redirect to a summary page or perform any final actions
}
