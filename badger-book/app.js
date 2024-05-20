
fetch('https://cs571.org/api/s24/hw2/students', {
    headers: {
        "X-CS571-ID": CS571.getBadgerId() // You may hardcode your Badger ID instead.
    }
})


.then(res => {
	if (res.status === 200 || res.status === 304) {
		return res.json()
	} else {
		throw new Error();
	}
})


.then(data =>{
	allStudents = data
	console.log(data);

	document.getElementById("num-results").innerText = data.length;

	buildStudents(data);
    
	
	
	
})

.catch(err => {
	console.error("Could not get the featured students.")
})


function buildStudents(stud) {

		const studentsDiv = document.getElementById("students");
		studentsDiv.innerHTML = ''; // Clear existing student entries
	
		stud.forEach(student => {

			const studentDiv = document.createElement("div");
			studentDiv.className = "col-xl-3 col-lg-4 col-md-6 col-xs-12 col-sm-12"; 

			const nameSpan = document.createElement("h2");
        	nameSpan.innerText = `${student.name.first} ${student.name.last}`;
			studentDiv.appendChild(nameSpan);

			const breakLine = document.createElement("br");

			const studMajor = document.createElement("h6");
			studMajor.innerText = `${student.major}`;
			studentDiv.appendChild(studMajor);

			const intro = document.createElement("p");
			intro.innerText = `${student.name.first}` + " is taking " + `${student.numCredits}` + " credits and " + (student.fromWisconsin === true ? "is" : "is not") + " from Wisconsin.";
			studentDiv.appendChild(intro);

			const interests = document.createElement("p");
			interests.innerText = "They have " + `${student.interests.length}` + " interests including..."; 

			const interestList = document.createElement("ul");
        	for(let step of student.interests) {
            	const node = document.createElement("li");
            	node.innerText = step;
            	interestList.appendChild(node)
				studentDiv.appendChild(interests);
				// Add click listener to interestItem
				interestList.addEventListener("click", (e) => {
				const selectedInterest = e.target.innerText;
				// TODO update the search terms to search just for the
				//      selected interest, and re-run the search!
				document.getElementById("search-interest").value = selectedInterest;
			})
			studentDiv.appendChild(interestList);
        	}
		
			studentsDiv.appendChild(studentDiv);
        
		});

}


let allStudents = [];
function handleSearch(e) {
	
	e?.preventDefault(); // You can ignore this; prevents the default form submission!
	document.getElementById("students").innerHTML = "";

	// TODO Implement the search
	let nameSearch = document.getElementById("search-name").value.toLowerCase().trim();
	let majorSearch = document.getElementById("search-major").value.toLowerCase().trim();
	let interestSearch = document.getElementById("search-interest").value.toLowerCase().trim();

	const filteredStudents = allStudents.filter(stud => {

		if (nameSearch && !`${stud.name.first} ${stud.name.last}`.toLowerCase().includes(nameSearch)) {
            return false;
        }
        
        if (majorSearch && stud.major.toLowerCase().indexOf(majorSearch) === -1) {
            return false;
        }

        if (interestSearch && !stud.interests.some(interest => interest.toLowerCase().includes(interestSearch))) {
            return false;
        }
        
        return true;
    });

    		// Display filtered students
    		document.getElementById("num-results").innerText = filteredStudents.length;
			buildStudents(filteredStudents);

}

document.getElementById("search-btn").addEventListener("click", handleSearch);