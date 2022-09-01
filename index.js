const fileReader = new FileReader();
const fileInputs = document.querySelectorAll(".fileInput");
const submit = document.querySelector("input[type=submit]");
const radio = document.querySelectorAll("input[type='radio']");

let fileBuffer1 = undefined;
let fileBuffer2 = undefined;

fileInputs[0].addEventListener("input", function(event) {

    fileInputText = fileInputs[0].nextElementSibling;
    fileInputText.innerHTML = "Uploading";
    fileContents = fileReader.readAsArrayBuffer(fileInputs[0].files[0].slice(0, 10 * 1024 * 1024));
    fileReader.onload = function (e) {

        fileBuffer1 = fileReader.result;
        fileInputText.innerHTML = "Uploaded";

    }

});

fileInputs[1].addEventListener("input", function(event) {

    fileInputText = fileInputs[1].nextElementSibling;
    fileInputText.innerHTML = "Uploading";
    fileContents = fileReader.readAsArrayBuffer(fileInputs[1].files[0].slice(0, 10 * 1024 * 1024));

    fileReader.onload = function (e) {

        fileBuffer2 = fileReader.result;
        fileInputText.innerHTML = "Uploaded";

    }

});

submit.addEventListener("click", function(event) {

    event.preventDefault();
    const p1 = fileInputs[0].nextElementSibling.nextElementSibling;
    const p2 = fileInputs[1].nextElementSibling.nextElementSibling;

    p1.classList.value = ""
    p2.classList.value = ""

    if (fileInputs[0] === undefined | fileInputs[1] === undefined) {

        console.log("Upload some files please.");

    } else {

        for (let i = 0; i < radio.length; i++) {

            if (radio[i].checked) {

                switch (radio[i].id) {

                    case "md5":
                        file1 = objectHash.MD5(fileBuffer1);
                        file2 = objectHash.MD5(fileBuffer2);
                        p1.innerHTML = file1;
                        p2.innerHTML = file2;

                        if (file1 === file2) {

                            p1.classList.add("equal")
                            p2.classList.add("equal")

                        } else {

                            p1.classList.add("inequal");
                            p2.classList.add("inequal");

                        }


                        console.log(file1, file2, file1 === file2);
                        break;
                    case "sha1":
                        file1 = objectHash.sha1(fileBuffer1);
                        file2 = objectHash.sha1(fileBuffer2);
                        p1.innerHTML = file1;
                        p2.innerHTML = file2;

                        if (file1 === file2) {

                            p1.classList.add("equal")
                            p2.classList.add("equal")

                        } else {

                            p1.classList.add("inequal");
                            p2.classList.add("inequal");

                        }


                        console.log(file1, file2, file1 === file2);
                        break;
                    default:
                        console.log("none was selected");
                        break;

                }

            }

        }

    }

})
