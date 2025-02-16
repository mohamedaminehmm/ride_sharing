// Toggle between Log In and Sign Up forms
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginBtn.addEventListener('click', () => {
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
});

signupBtn.addEventListener('click', () => {
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
});

// Show/hide Chauffeur fields based on user type
const userType = document.getElementById('userType');
const chauffeurFields = document.getElementById('chauffeurFields');

userType.addEventListener('change', () => {
    if (userType.value === 'chauffeur') {
        chauffeurFields.style.display = 'block';
    } else {
        chauffeurFields.style.display = 'none';
    }
});

// Handle Sign Up form submission
document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const cin = document.getElementById('signupCin').value;
    const name = document.getElementById('signupName').value;
    const lastName = document.getElementById('signupLastName').value;
    const email = document.getElementById('signupEmail').value;
    const telephone = document.getElementById('signupTelephone').value;
    const userTypeValue = userType.value;

    let pictureBase64 = '';
    let cartegriseBase64 = '';

    if (userTypeValue === 'chauffeur') {
        const pictureFile = document.getElementById('uploadPicture').files[0];
        const cartegriseFile = document.getElementById('uploadCartegrise').files[0];

        if (pictureFile && cartegriseFile) {
            const reader1 = new FileReader();
            const reader2 = new FileReader();

            reader1.onload = function () {
                pictureBase64 = reader1.result;
                reader2.onload = function () {
                    cartegriseBase64 = reader2.result;
                    storeData(cin, name, lastName, email, telephone, userTypeValue, pictureBase64, cartegriseBase64);
                };
                reader2.readAsDataURL(cartegriseFile);
            };
            reader1.readAsDataURL(pictureFile);
        } else {
            alert('Please upload both picture and cartegrise.');
        }
    } else {
        storeData(cin, name, lastName, email, telephone, userTypeValue, pictureBase64, cartegriseBase64);
    }
});

// Handle Log In form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const cin = document.getElementById('loginCin').value;
    console.log('Login CIN:', cin); // For demonstration
    alert('Login successful!');
});

// Store data in variables (for demonstration)
function storeData(cin, name, lastName, email, telephone, userType, pictureBase64, cartegriseBase64) {
    const userData = {
        cin,
        name,
        lastName,
        email,
        telephone,
        userType,
        pictureBase64,
        cartegriseBase64
    };
    console.log(userData); // For demonstration
    alert('Sign up successful!');
}