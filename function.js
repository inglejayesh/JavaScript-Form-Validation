let userDetails;   //globally declared
let retryCount;

// JSON getItem
document.addEventListener("DOMContentLoaded", function (event) {
    retryCount = 3;
    userDetails = localStorage.getItem('userDetails');
    if (userDetails != null) {
        userDetails = JSON.parse(userDetails);
        let firstName = userDetails.name.replace(/[\s]/g, " ").split(' ')[0];
        let introText = 'Dear ' + firstName + ',Thank you for your inquiry. A four digit verification number has been sent to your phone number: ' + userDetails.mobileNumber;

        document.getElementById('displayParaMessage').innerHTML = introText;
    } else {
        alert('User details NOT FOUND!`');
        window.location.href = "index.html";
    }
});

// check OTP function 

function checkOTP() {
    let inputOTP = document.getElementById('inputOTP').value;
    let isValidOTP = false;
    let OTP = userDetails.otp;
    console.log(OTP);
    console.log(inputOTP);
    if (OTP == inputOTP) {
        localStorage.removeItem('userDetails');
        alert("Validation Successfull");
        window.location.href = "https://print2block.com/"
        isValidOTP = false;
    }
    else {
        retryCount--;
        document.getElementById('errorInOtp').innerHTML = '*Please Enter Valid OTP. Only ' + retryCount + 'attempts left.';
        if (retryCount == 0) {
            /// removing the data in the form 
            localStorage.removeItem('userDetails');
            alert("Exceeded Registration Attempts")
            window.location.href = "https://print2block.com/404-Error-Not-Found/"
        } else {
            reloadForm();
            isValidOTP = true;
        }

    }
    return isValidOTP;

};
//// reload or refresh the page
function reloadForm() {
    document.getElementById("form").reset();
};
