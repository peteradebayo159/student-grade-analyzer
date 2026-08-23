let students = [];


// Get HTML elements
const studentForm = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const studentScore = document.getElementById("studentScore");

const studentList = document.getElementById("studentList");
const emptyMessage = document.getElementById("emptyMessage");

const clearAllButton = document.getElementById("clearAll");


// Add student
studentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = studentName.value.trim();
    const score = Number(studentScore.value);


    // Validate score
    if (score < 0 || score > 100) {
        alert("Score must be between 0 and 100.");
        return;
    }


    // Create student object
    const student = {
        id: Date.now(),
        name: name,
        score: score
    };


    // Add student to array
    students.push(student);


    // Clear inputs
    studentName.value = "";
    studentScore.value = "";

    studentName.focus();


    // Update page
    analyzeStudents();

});


// Analyze students
function analyzeStudents() {

    studentList.innerHTML = "";


    // If no students
    if (students.length === 0) {

        studentList.innerHTML = `
            <p id="emptyMessage">
                No students added yet.
            </p>
        `;

        updateStatistics();

        return;
    }


    // Loop through students
    for (const student of students) {

        const grade = getGrade(student.score);


        const studentCard = document.createElement("div");

        studentCard.classList.add("student");


        studentCard.innerHTML = `

            <div class="student-info">

                <h3>${student.name}</h3>

                <p>
                    Score: ${student.score}
                </p>

            </div>


            <div class="student-actions">

                <span class="grade">
                    Grade ${grade}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})"
                >
                    Delete
                </button>

            </div>

        `;


        studentList.appendChild(studentCard);

    }


    // Update statistics
    updateStatistics();

}


// Determine grade
function getGrade(score) {

    if (score >= 70) {
        return "A";

    } else if (score >= 60) {
        return "B";

    } else if (score >= 50) {
        return "C";

    } else if (score >= 45) {
        return "D";

    } else if (score >= 40) {
        return "E";

    } else {
        return "F";
    }

}


// Calculate statistics
function updateStatistics() {

    if (students.length === 0) {

        document.getElementById("totalStudents").textContent = "0";
        document.getElementById("averageScore").textContent = "0";
        document.getElementById("highestScore").textContent = "0";
        document.getElementById("lowestScore").textContent = "0";
        document.getElementById("passedStudents").textContent = "0";
        document.getElementById("failedStudents").textContent = "0";

        return;
    }


    let total = 0;

    let highest = students[0].score;
    let highestStudent = students[0].name;

    let lowest = students[0].score;
    let lowestStudent = students[0].name;

    let passed = 0;
    let failed = 0;


    // Loop through students
    for (const student of students) {

        // Total
        total += student.score;


        // Highest
        if (student.score > highest) {

            highest = student.score;
            highestStudent = student.name;

        }


        // Lowest
        if (student.score < lowest) {

            lowest = student.score;
            lowestStudent = student.name;

        }


        // Pass / Fail
        if (student.score >= 50) {

            passed++;

        } else {

            failed++;

        }

    }


    // Average
    const average = total / students.length;


    // Display statistics
    document.getElementById("totalStudents").textContent =
        students.length;

    document.getElementById("averageScore").textContent =
        average.toFixed(2);

    document.getElementById("highestScore").textContent =
        `${highest} (${highestStudent})`;

    document.getElementById("lowestScore").textContent =
        `${lowest} (${lowestStudent})`;

    document.getElementById("passedStudents").textContent =
        passed;

    document.getElementById("failedStudents").textContent =
        failed;

}


// Delete student
function deleteStudent(id) {

    students = students.filter(function (student) {

        return student.id !== id;

    });


    analyzeStudents();

}


// Clear all students
clearAllButton.addEventListener("click", function () {

    if (students.length === 0) {
        return;
    }


    const confirmClear = confirm(
        "Are you sure you want to remove all students?"
    );


    if (confirmClear) {

        students = [];

        analyzeStudents();

    }

});