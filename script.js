let upload = document.getElementById("upload");
upload.addEventListener("change", () => {
	let fr = new FileReader();
	fr.readAsText(upload.files[0]);
	fr.onload = function () {
		let Arr = fr.result.split(/\r?\n|\n/).map((e) => {
			return e.split(",");
		});
		let valNo = 0;
		let invalNo = 0;
		let valMail = [];
		Arr.forEach((e) => {
			let em = String(e);
			let m = e.map((e) => {
				return `<td>${e}</td>`;
			});
			let creEle = document.createElement("tr");
			creEle.innerHTML = m;
			if (em != "") {
				if (
					(em =
						em.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) ||
						em[em.length - 3] === ".")
				) {
					// strings are arrays of characters
					document.querySelector("table#val").appendChild(creEle);
					valMail.push(em);
					valNo = valNo + 1;
				} else {
					document.querySelector("table#inval").appendChild(creEle);
					invalNo = invalNo + 1;
				}
			}
		});

		document.querySelector("#valCount").innerHTML = valNo;
		document.querySelector("#invalCount").innerHTML = invalNo;

		let submitBtn = document.getElementById("submit");
		submitBtn.addEventListener("click", (event) => {
			event.preventDefault(); // Prevent form submission behavior
			console.log("Submit button clicked!");

			let name = document.getElementById("name").value;
			let subject = document.getElementById("subject").value;

			// Get the message content using textContent instead of value
			let messageElement = document.getElementById("message");
			let message = messageElement.textContent || messageElement.value;

			for (let i = 0; i < valMail.length; i++) {
				let templateParams = {
					to: valMail[i],
					name: name,
					message: message,
					subject: subject,
				};

				emailjs
					.send("service_jua499f", "template_x6ypoxs", templateParams)
					.then(
						function (response) {
							console.log("SUCCESS!", response.status, response.text);
						},
						function (error) {
							console.log("FAILED...", error);
						}
					);
				alert(valNo + " emails has been sent successfully.");
			}
		});
	};
});
