// CSV File Reading Logic
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

			// Email Validation Logic
			if (em != "") {
				if (
					(em =
						em.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) ||
						em[em.length - 3] === ".")
				) {
					document.querySelector("table#val").appendChild(creEle);
					valMail.push(em);
					valNo = valNo + 1;
				} else {
					document.querySelector("table#inval").appendChild(creEle);
					invalNo = invalNo + 1;
				}
			}
		});

		shuffleEffect(valCountElement, valNo);
		shuffleEffect(invalCountElement, invalNo);

		document.querySelector("#valCount").innerHTML = valNo;
		document.querySelector("#invalCount").innerHTML = invalNo;

		let submitBtn = document.getElementById("submit");
		submitBtn.addEventListener("click", (event) => {
			event.preventDefault(); // Prevent form submission behavior

			let name = document.getElementById("name").value;
			let subject = document.getElementById("subject").value;

			// Get the message content using textContent instead of value
			let messageElement = document.getElementById("message");
			let message = messageElement.textContent || messageElement.value;

			// Check if required fields are filled
			if (!name || !subject || !message) {
				alert("Please fill all the required fields before sending the email.");
				return;
			}

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
			}
			alert(valNo + " emails has been sent successfully.");
		});
	};
});

/* --------------------------------------------------------------------------- */

// Shuffling Effect Logic
let valCountElement = document.querySelector("#valCount");
let invalCountElement = document.querySelector("#invalCount");

function shuffleEffect(element, targetCount) {
	let count = parseInt(element.innerText);

	if (isNaN(count)) {
		count = 0;
	}

	if (count === targetCount) {
		return;
	}

	let increment = Math.ceil(Math.abs(targetCount - count) / 50);
	increment = targetCount < count ? -increment : increment;

	function updateCount() {
		count += increment;
		element.innerText = count;

		if (
			(increment > 0 && count >= targetCount) ||
			(increment < 0 && count <= targetCount)
		) {
			element.innerText = targetCount;
		} else {
			requestAnimationFrame(updateCount);
		}
	}

	updateCount();
}

valCountElement.innerText = 0;
invalCountElement.innerText = 0;

// Vanish Effect Placeholders
const textarea = document.getElementById("message");
textarea.addEventListener("focus", function () {
	this.placeholder = "";
});
textarea.addEventListener("blur", function () {
	this.placeholder = "Write your message here....";
});

const name = document.getElementById("name");
name.addEventListener("focus", function () {
	this.placeholder = "";
});
name.addEventListener("blur", function () {
	this.placeholder = "Your Name";
});

const subject = document.getElementById("subject");
subject.addEventListener("focus", function () {
	this.placeholder = "";
});
subject.addEventListener("blur", function () {
	this.placeholder = "Subject";
});
