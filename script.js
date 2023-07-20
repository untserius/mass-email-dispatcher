// Email Validation Checker


let upload = document.getElementById("chooseFile"); // assigning new variable to the element containing id = "chooseFile".
upload.addEventListener("change", function () { // adding event listener to the element.
    let data = new FileReader(); // creating new FileReader object - read the contents of a file and store them as a string.
    data.readAsText(upload.files[0]); // readAsText() - reading the file as text, upload.files[0] - the first file in the "upload" element.
    data.onload = function () { // object.unload = function () {} - adding event listener to the FileReader object "data".
        let text = data.result // 
 }); 