//code in this block executes after the page has loaded
let spinner_id_counter = 0;
$(document).ready(function () {
	// FYI: localStorage.content_type stores poem/song. Just incase.
	$("#rap-btn").click(function () {
		localStorage.setItem("content_type", "song");
		makeSongPoem("rap song")
	})
	$("#pop-btn").click(function () {
		localStorage.setItem("content_type", "song");
		makeSongPoem("pop song")
	})
	$("#rb-btn").click(function () {
		localStorage.setItem("content_type", "song");
		makeSongPoem("r&b song")
	})
	$("#country-btn").click(function () {
		localStorage.setItem("content_type", "song");
		makeSongPoem("country song")
	})
	$("#sonnet-btn").click(function () {
		localStorage.setItem("content_type", "poem");
		makeSongPoem("sonnet")
	})
	$("#lim-btn").click(function () {
		localStorage.setItem("content_type", "poem");
		makeSongPoem("limerick")
	})

	$("#topic-tick-btn").click(function () {
		let topic = document.getElementById("topic_text").value;
		topicModify(topic);
	})

	$("#reference-tick-btn").click(function () {
		let reference = document.getElementById("reference_text").value;
		referenceModify(reference);
	})

	$("#title-tick-btn").click(function () {
		gettitle();
	})

	$("#summary-tick-btn").click(function () {
		getsummary();
	})

	$("#artist-submit-btn").click(function () {
		let artist = document.getElementById("artist_text").value;
		artistModify(artist);
	})

	$("#topic_text").keyup(function () {
		if (event.keyCode === 13) {
			let topic = document.getElementById("topic_text").value;
			topicModify(topic);
		}
	})

	$("#artist_text").keyup(function () {
		if (event.keyCode === 13) {
			let artist = document.getElementById("artist_text").value;
			artistModify(artist);
		}
	})

	$("#reference_text").keyup(function () {
		if (event.keyCode === 13) {
			let topic = document.getElementById("reference_text").value;
			referenceModify(reference);
		}
	})
})

function add_spinner() {
	let newSpinnerDiv = $("<div>", { "class": "card spinner-align", "style": "width: 60%", "id": `main-spinner-${spinner_id_counter}` });
	let spinnerContent = $("<div>", { "class": "spinner-border spinner-align", "role": "status" });
	spinnerContent.append('<span class="sr-only spinner-align">Loading...</span>');
	newSpinnerDiv.append(spinnerContent);
	$("#all-cards").append(newSpinnerDiv);
}

function remove_spinner() {
	document.getElementById(`main-spinner-${spinner_id_counter}`).style.display = 'none';
	spinner_id_counter++;
}

function makeSongPoem(genre) {
	let prompt = "Make a " + genre + " for me"
	// <div class="spinner-border" id="main-spinner" role="status">
	{/* <span class="sr-only">Loading...</span> */ }
	// </div>
	add_spinner();

	$.ajax({
		url: "/makesongpoem",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({ "prompt": prompt }),
		dataType: "json",
		success: function (data) {
			console.log(data);
			if (String(data).trim() !== "") {
				remove_spinner();
				let newRow = $("<div>", { "class": "card", "style": "width: 60%" })

				let content = $("<p>", { "class": "card-title" });
				content.html(data)

				localStorage.setItem("genre", genre);
				localStorage.setItem("genre_context", data);

				let continueButton = $("<a>", { "href": "/topic_modify", "class": "continue-anchor-align" });
				let buttonContent = $("<button>", { "class": "btn", "id": "continue-btn", "type": "button" });
				buttonContent.append("continue");
				continueButton.append(buttonContent);

				newRow.append(content)
				newRow.append(continueButton)

				$("#all-cards").append(newRow)
				// document.getElementById("main-spinner").style = { "display": "none" };
			}
			else {
				alert("Try again.");
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("error: " + errorThrown);
		}
	});
}

function topicModify(input_topic) {
	let prompt = `Modify the following ${localStorage.getItem("genre")} to include ${input_topic} in it: \n${localStorage.getItem("genre_context")}`;
	console.log(prompt);
	add_spinner();

	$.ajax({
		url: "/topicmodify",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({ "prompt": prompt }),
		dataType: "json",
		success: function (data) {
			if (String(data).trim() !== "") {
				console.log("success");
				remove_spinner();

				let newRow = $("<div>", { "class": "card", "style": "width: 60%" })

				let content = $("<h5>", { "class": "card-title" });
				content.html(data)

				// localStorage.setItem("genre", genre);
				localStorage.setItem("genre_context", data);

				let continueButton = $("<a>", { "href": "/artist_modify", "class": "continue-anchor-align" });
				let buttonContent = $("<button>", { "class": "btn", "id": "continue-btn", "type": "button" });
				buttonContent.append("continue");
				continueButton.append(buttonContent);

				newRow.append(content)
				newRow.append(continueButton)

				$("#all-cards").append(newRow)
			}
			else {
				alert("Sorry: Try again");
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("error: " + errorThrown);
		}
	});
}

//add artist
function artistModify(input_artist) {
	let prompt = `Modify the following ${localStorage.getItem("genre")} to be in the style of ${input_artist}: \n${localStorage.getItem("genre_context")}`;
	console.log(prompt);
	add_spinner();

	$.ajax({
		url: "/topicmodify",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({ "prompt": prompt }),
		dataType: "json",
		success: function (data) {
			remove_spinner();

			if (String(data).trim() !== "") {
				console.log("success");
				let newRow = $("<div>", { "class": "card", "style": "width: 60%" })

				let content = $("<h5>", { "class": "card-title" });
				content.html(data)

				// localStorage.setItem("genre", genre);
				localStorage.setItem("genre_context", data);

				let continueButton = $("<a>", { "href": "/reference_modify", "class": "continue-anchor-align" });
				let buttonContent = $("<button>", { "class": "btn", "id": "continue-btn", "type": "button" });
				buttonContent.append("continue");
				continueButton.append(buttonContent);

				newRow.append(content)
				newRow.append(continueButton)

				$("#all-cards").append(newRow)
			}
			else {
				alert("Sorry: Try again");
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("error: " + errorThrown);
		}
	});
}

//add reference

function referenceModify(input_reference) {
	let prompt = `Modify the following ${localStorage.getItem("genre")}  to have references to ${input_reference}: \n${localStorage.getItem("genre_context")}`;
	console.log(prompt);
	add_spinner();

	$.ajax({
		url: "/topicmodify",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({ "prompt": prompt }),
		dataType: "json",
		success: function (data) {
			remove_spinner();

			if (String(data).trim() !== "") {
				console.log("success");
				let newRow = $("<div>", { "class": "card", "style": "width: 60%" })

				let content = $("<h5>", { "class": "card-title" });
				content.html(data)

				// localStorage.setItem("genre", genre);
				localStorage.setItem("genre_context", data);

				let continueButton = $("<a>", { "href": "/title", "class": "continue-anchor-align" });
				let buttonContent = $("<button>", { "class": "btn", "id": "continue-btn", "type": "button" });
				buttonContent.append("continue");
				continueButton.append(buttonContent);

				newRow.append(content)
				newRow.append(continueButton)

				$("#all-cards").append(newRow)
			}
			else {
				alert("Sorry: Try again");
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("error: " + errorThrown);
		}
	});
}

function gettitle() {
	let prompt = `Generate a title for this ${localStorage.getItem("genre")}: \n${localStorage.getItem("genre_context")}`;
	console.log(prompt);
	add_spinner();

	$.ajax({
		url: "/topicmodify",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({ "prompt": prompt }),
		dataType: "json",
		success: function (data) {
			remove_spinner();

			if (String(data).trim() !== "") {
				console.log("success");
				let newRow = $("<div>", { "class": "card", "style": "width: 60%" })

				let content = $("<h5>", { "class": "card-title" });
				content.html(data)

				// localStorage.setItem("genre", genre);

				let continueButton = $("<a>", { "href": "/summarize", "class": "continue-anchor-align" });
				let buttonContent = $("<button>", { "class": "btn", "id": "continue-btn", "type": "button" });
				buttonContent.append("continue");
				continueButton.append(buttonContent);

				newRow.append(content)
				newRow.append(continueButton)

				$("#all-cards").append(newRow)
			}
			else {
				alert("Sorry: Try again");
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("error: " + errorThrown);
		}
	});
}

function getsummary() {
	let prompt = `Summarize the ${localStorage.getItem("genre")} and explain its meaning: \n${localStorage.getItem("genre_context")}`;
	console.log(prompt);
	add_spinner();

	$.ajax({
		url: "/topicmodify",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({ "prompt": prompt }),
		dataType: "json",
		success: function (data) {
			remove_spinner();

			if (String(data).trim() !== "") {
				console.log("success");
				let newRow = $("<div>", { "class": "card", "style": "width: 60%" })

				let content = $("<h5>", { "class": "card-title" });
				content.html(data)

				// localStorage.setItem("genre", genre);

				let continueButton = $("<a>", { "href": "/", "class": "continue-anchor-align" });
				let buttonContent = $("<button>", { "class": "btn", "id": "home-btn", "type": "button" });
				buttonContent.append("Home");
				continueButton.append(buttonContent);

				newRow.append(content)
				newRow.append(continueButton)

				$("#all-cards").append(newRow)
			}
			else {
				alert("Sorry: Try again");
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("error: " + errorThrown);
		}
	});
}