const fileReader = new FileReader();
const fileInputs = document.querySelectorAll(".fileInput");
const radio = document.querySelectorAll("input[type='radio']");
const submit = document.querySelector("input[type='submit']");

let fileBuffer1 = undefined;
let fileBuffer2 = undefined;

fileInputs[0].addEventListener("input", function(event) {


    let fileInputText = fileInputs[0].nextElementSibling;
    fileInputText.innerHTML = "Uploading";
    fileInputText.classList.remove("equal");
    fileInputText.classList.remove("inequal");
    fileContents = fileReader.readAsBinaryString(fileInputs[0].files[0].slice(0, 10 * 1024 * 1024));
    fileReader.onload = function (e) {

        fileBuffer1 = fileReader.result;
        fileInputText.innerHTML = "Uploaded";

    }

});

fileInputs[1].addEventListener("input", function(event) {

    let fileInputText = fileInputs[1].nextElementSibling;
    fileInputText.innerHTML = "Uploading";
    fileInputText.classList.remove("equal");
    fileInputText.classList.remove("inequal");
    fileContents = fileReader.readAsBinaryString(fileInputs[1].files[0].slice(0, 10 * 1024 * 1024));

    fileReader.onload = function (e) {

        fileBuffer2 = fileReader.result;
        fileInputText.innerHTML = "Uploaded";

    }

});

submit.addEventListener("click", function(event) {

    event.preventDefault();

    let fileInputText1 = fileInputs[0].nextElementSibling;
    let fileInputText2 = fileInputs[1].nextElementSibling;

    for (let i = 0; i < radio.length; i++) {

        if (radio[i].checked) {

            switch (radio[i].id) {

                case "md5":

                    file1 = objectHash.MD5(fileBuffer1);
                    file2 = objectHash.MD5(fileBuffer2);

                    fileInputText1 = fileInputs[0].nextElementSibling;
                    fileInputText1.classList.remove("equal");
                    fileInputText1.classList.remove("inequal");
                    fileInputText1.innerHTML = file1;

                    fileInputText2 = fileInputs[1].nextElementSibling;
                    fileInputText2.innerHTML = file2;
                    fileInputText2.classList.remove("equal");
                    fileInputText2.classList.remove("inequal");

                    if (file1 === file2) {

                        fileInputText1.classList.add("equal");
                        fileInputText2.classList.add("equal");

                    } else {

                        fileInputText1.classList.add("inequal");
                        fileInputText2.classList.add("inequal");

                    }
                    break;
                
                case "sha1":
                    file1 = objectHash.sha1(fileBuffer1);
                    file2 = objectHash.sha1(fileBuffer2);
    
                    fileInputText1 = fileInputs[0].nextElementSibling;
                    fileInputText1.classList.remove("equal");
                    fileInputText1.classList.remove("inequal");
                    fileInputText1.innerHTML = file1;
    
                    fileInputText2 = fileInputs[1].nextElementSibling;
                    fileInputText2.innerHTML = file2;
                    fileInputText2.classList.remove("equal");
                    fileInputText2.classList.remove("inequal");
    
                    if (file1 === file2) {
    
                        fileInputText1.classList.add("equal");
                        fileInputText2.classList.add("equal");
    
                    } else {
    
                        fileInputText1.classList.add("inequal");
                        fileInputText2.classList.add("inequal");
    
                    }
                    break;
                    
                    default:
                        break;

            }

        }

    }

})