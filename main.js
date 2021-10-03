//json loader

document.addEventListener("DOMContentLoaded", function (event) {
    localStorage.removeItem('userDetails');
});


// only alphabets min two words max 4 char. checkname function

function checkname() {
    document.getElementById('errorInName').innerHTML = '';

    var fullName = document.getElementById('fullName').value;
    let replaceName = fullName.replace(/\s\s+/g, ' ');
    console.log('Name: ', replaceName);
    var studentFullName = replaceName;
    var details = []
    var details = studentFullName.split(' ');
    console.log("StudentFirstName = " + details[0]);
    let isValidName = false;
    var nameRegx = /^\s*?[a-zA-Z]{4,}([\s]+)([a-zA-Z]{4,}([\s]*)){1,}$/;
    if (fullName.trim() == "") {
        document.getElementById('errorInName').innerHTML = '*Blank are not allowed';
        isValidName = false;
    }
    else if (fullName.length > 100) {
        document.getElementById('errorInName').innerHTML = "*Only 100 character allowed ";
        isValidName = false;
    } else if (!nameRegx.test(fullName)) {
        document.getElementById('errorInName').innerHTML = "*Please Enter Valid Name";
        isValidName = false;
    }
    else {
        isValidName = true;
    }
    return isValidName;
};

// email validation

function checkemail() {
    document.getElementById('errorInEmail').innerHTML = '';

    var Email = document.getElementById('Email').value;
    console.log('Email: ', Email);
    let isValidEmail = false;
    //regex
    var regx = /^([a-zA-Z0-9\.-]+)@([a-zA-Z]+).([a-z]{2,8})(.[a-z]{2,8})?$/;
    if (!regx.test(Email)) {
        document.getElementById('errorInEmail').innerHTML = "*Please Enter Valid Email.";
        isValidEmail = false;
    }
    else {
        isValidEmail = true;
    }
    return isValidEmail;
};

//  (123) - 456 - 7890 pattern tracing 

function setNumberFormat() {

    let mobileNumber = document.getElementById('mobileNumber').value;

    if (mobileNumber && mobileNumber.length == 4 && mobileNumber[0] == '(') {
        mobileNumber = mobileNumber.substring(0, 3);
        document.getElementById('mobileNumber').value = mobileNumber;
    }

    let onlyNumber = mobileNumber.replace(/[^0-9]/g, "");
    let newNumber = onlyNumber;
    let numberInfo = '';
    const numberLen = onlyNumber != null ? onlyNumber.length : 0;


    if (numberLen > 10) {
        onlyNumber = onlyNumber.substring(0, 10);
    }


    if (numberLen > 2) {
        const proNumber = onlyNumber.substring(0, 3);
        newNumber = '(' + proNumber + ')';
        if (proNumber >= 621 && proNumber <= 799) {
            numberInfo = 'Reliance Jio';
        } else if (proNumber >= 801 && proNumber <= 920) {
            numberInfo = 'Idea';
        } else if (proNumber >= 921 && proNumber <= 999) {
            numberInfo = 'Vodafone';
        }
    }


    if (numberLen > 3) {
        const stateNumber = onlyNumber.substring(3, 6);
        newNumber = newNumber + ' - ' + stateNumber;
        if (numberLen > 5 && numberInfo.length > 0) {
            let stateDetails = stateList.find(x => x.no == stateNumber);
            if (stateDetails != null) {
                numberInfo += ', ' + stateDetails.state;
            }
        }
    }
    if (numberLen > 6) {
        newNumber = newNumber + ' - ' + onlyNumber.substring(6, 10);
    }
    document.getElementById('mobileNumber').value = newNumber;
    document.getElementById('numberInfo').innerHTML = numberInfo;
    if (onlyNumber.length == 10) {
        checkmobile();
    }

};

// mobile number verify function

function checkmobile() {
    document.getElementById('errorInNumber').innerHTML = '';
    var mobileNumber = document.getElementById('mobileNumber').value;
    console.log('number: ', mobileNumber);
    var numberReg = /^[(][0-9]{3}[)]\s-\s[0-9]{3}\s-\s[0-9]{4,4}$/;
    let isValidInput = false;
    if (numberReg.test(mobileNumber)) {
        let onlyNumber = mobileNumber.replace(/[\s()-]/g, "");
        let providerNumber = +onlyNumber.substring(0, 3);
        let stateNumber = +onlyNumber.substring(3, 6);

        if ((providerNumber > 620 && providerNumber < 1000 && providerNumber != 800) == false) {
            isValidInput = false;
        } else if (stateList.findIndex(x => x.no == stateNumber) == -1) {
            isValidInput = false;
        } else {
            isValidInput = true;
        }
    }
    else {
        isValidInput = false;
    }
    if (isValidInput == false) {
        document.getElementById('errorInNumber').innerHTML = '*Please Enter Valid Number.';
    }
    return isValidInput;
};

///submit form function

function submit_form() {
    document.getElementById('errorInNumber').innerHTML = '';

    let isFormValid = true;
    if (checkname() == false) {
        isFormValid = false;
    }
    if (checkemail() == false) {
        isFormValid = false;
    }
    if (checkmobile() == false) {
        isFormValid = false;
    }
    if (isFormValid == true) {

        let OTP = '';
        var digits = '0123456789';

        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        console.log('otp = ', OTP);
        let userDetails = {
            name: document.getElementById('fullName').value,
            emal: document.getElementById('Email').value,
            mobileNumber: document.getElementById('mobileNumber').value,
            otp: OTP
        };
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        window.location.href = "message.html";
        return OTP;
    }

    console.log('isFormValid: ', isFormValid);
    return isFormValid;
};

// states lists
let stateList = [
    { no: 110, state: "Andhra Pradesh" },
    { no: 120, state: "Arunachal Pradesh" },
    { no: 130, state: "Assam" },
    { no: 140, state: "Bihar" },
    { no: 150, state: "Chhattisgarh" },
    { no: 160, state: "Goa" },
    { no: 170, state: "Gujarat" },
    { no: 180, state: "Haryana" },
    { no: 190, state: "Himachal Pradesh" },
    { no: 200, state: "Jammu and Kashmir" },
    { no: 210, state: "Jharkhand" },
    { no: 220, state: "Karnataka" },
    { no: 230, state: "Kerala" },
    { no: 240, state: "Madhya Pradesh" },
    { no: 250, state: "Maharashtra" },
    { no: 260, state: "Manipur" },
    { no: 270, state: "Meghalaya" },
    { no: 280, state: "Mizoram" },
    { no: 290, state: "Nagaland" },
    { no: 300, state: "Odisha" },
    { no: 310, state: "Punjab" },
    { no: 320, state: "Rajasthan" },
    { no: 330, state: "Sikkim" },
    { no: 340, state: "Tamil Nadu" },
    { no: 350, state: "Telangana" },
    { no: 360, state: "Tripura" },
    { no: 370, state: "Uttarakhand" },
    { no: 380, state: "Uttar Pradesh" },
    { no: 390, state: "West Bengal" },
    { no: 400, state: "Andaman and Nicobar Islands" },
    { no: 410, state: "Chandigarh" },
    { no: 420, state: "Dadra and Nagar Haveli" },
    { no: 430, state: "Daman and Diu" },
    { no: 440, state: "Delhi" },
    { no: 450, state: "Lakshadweep" },
    { no: 460, state: "Puducherry" }
];