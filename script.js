let upload = document.getElementById('upload'); 
upload.addEventListener('change', () => {       
    let fr = new FileReader();                  
    fr.readAsText(upload.files[0]);             
    fr.onload = function () {
                                                
        let Arr = fr.result.split(/\r?\n|\n/).map(e => {
            return e.split(',');
        });
        let valNo = 0;
        let invalNo = 0;
        let valMail = [];
        Arr.forEach(e => {
            let em = String(e);
            let m = e.map(e => {
                return `<td>${e}</td>`;
            })
            let creEle = document.createElement("tr");
            creEle.innerHTML = m;

            if (em != "") {
                if (em = em.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) 
                    || em[em.length - 3] === '.') // strings are arrays of characters
                {
                    document.querySelector("table#val").appendChild(creEle);
                    valMail.push(em);
                    valNo = valNo + 1;
                    return false;
                } else {
                    document.querySelector("table#inval").appendChild(creEle);
                    invalNo = invalNo + 1;
                    return false;
                }
            }
        });
        
        document.querySelector('#valCount').innerHTML = valNo;
        document.querySelector('#invalCount').innerHTML = invalNo;
    };
}); 