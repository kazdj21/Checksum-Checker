
const fileReader = new FileReader();

let uploadedFile1 = document.getElementById("file1");
let uploadedFile2 = document.getElementById("file2");
let submitBtn = document.getElementById("submit-btn");
let radio = document.querySelectorAll("input[type='radio']");
let resetBtn = document.querySelector("input[type='reset'");
let fileBuffer1 = undefined;
let fileBuffer2 = undefined;

resetBtn.addEventListener("click", function (e) {
    document.querySelector("#uploadbtn1").innerHTML = "Upload File";
    document.querySelector("#uploadbtn2").innerHTML = "Upload File";
    fileBuffer1 = undefined;
    fileBuffer2 = undefined;
    uploadedFile1.files[0] = undefined;
    uploadedFile2.files[0] = undefined;
    document.getElementById("message-box").classList.remove("message-box-appear");
    submitBtn.disabled = false;
    submitBtn.value = "Submit";
})

uploadedFile1.addEventListener("input", function (e) {
  
  document.querySelector("#uploadbtn1").innerHTML = "<i class='fa fa-solid fa-spinner'></i>";
  fileContents1 = fileReader.readAsBinaryString(uploadedFile1.files[0].slice(0, 10 * 1024 * 1024));

  fileReader.onload = function(e) {
    console.log(fileReader.result);
    fileBuffer1 = fileReader.result;
    // uploadedFile1.files[0].name.toString().substring(0,8);
    document.getElementById("uploadbtn1").innerHTML = "<i class=\"fa fa-solid fa-check\"></i>"
  }

});

uploadedFile2.addEventListener("input", function (e) {

  document.querySelector("#uploadbtn2").innerHTML = "<i class='fa fa-solid fa-spinner'></i>";
  fileContents2 = fileReader.readAsBinaryString(uploadedFile2.files[0].slice(0, 10 * 1024 * 1024));
  
  fileReader.onload = function(e) {
    console.log(fileReader.result);
    fileBuffer2 = fileReader.result;
    document.getElementById("uploadbtn2").innerHTML = "<i class=\"fa fa-solid fa-check\"></i>"
    //document.getElementById("uploadbtn2").innerHTML = uploadedFile2.files[0].name.toString().substring(0,8);
  }
  
  
});

submitBtn.addEventListener("click", function(e) {

    submitBtn.disabled = true;
    
    if (uploadedFile1.files[0] == undefined | uploadedFile2.files[0] == undefined) {
        document.getElementById("message-box").classList.add("message-box-appear");
        document.getElementById("completionMessage").innerHTML = `You are missing files!`;
    }

    setTimeout(function(e) {
        submitBtn.value = "Please wait";
    }, 1000);
    e.preventDefault();
    

    for (let i = 0; i < radio.length; i++) {
        // radio[i].checked ? console.log(radio[i].id) : console.log(`${radio[i].id} is not checked`)
        if (radio[i].checked) {
            switch (radio[i].id) {
                case "md5":
                    let md5_hash1 = objectHash.MD5(fileBuffer1);
                    let md5_hash2 = objectHash.MD5(fileBuffer2);
                    console.log(md5_hash1, md5_hash2);
                    messageUponCompletion(md5_hash1, md5_hash2);
                    document.getElementById("message-box").classList.add("message-box-appear");
                    setTimeout(function(e) {submitBtn.value = "Submit"}, 1000);
                    break;
                case "sha1":
                    let sha1_hash1 = objectHash.sha1(fileBuffer1);
                    let sha1_hash2 = objectHash.sha1(fileBuffer2);
                    console.log(sha1_hash1, sha1_hash2);
                    messageUponCompletion(sha1_hash1, sha1_hash2);
                    document.getElementById("message-box").classList.add("message-box-appear");
                    setTimeout(function(e) {submitBtn.value = "Submit"}, 1000);
                    break;
                default:
                    break;
            }
        }
    }

});

function messageUponCompletion(h1, h2) {
    let isEqual = "They are not equal."
    if (h1.toString() === h2.toString()) {
        isEqual = "They are equal."
    }
    document.getElementById("completionMessage").innerHTML = `${h1} and ${h2} are the generated hashes. ${isEqual}`;
}
