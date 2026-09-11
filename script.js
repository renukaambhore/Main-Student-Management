
// ==================================================
// FASTAPI URL
// ==================================================

const API_URL = "http://127.0.0.1:8000";


// ==================================================
// TAB FUNCTION
// ==================================================

function openTab(tabId, button) {

    const tabs =
        document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.classList.remove("active");
    });


    const buttons =
        document.querySelectorAll(".tab-button");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });


    document
        .getElementById(tabId)
        .classList.add("active");


    button.classList.add("active");
}


// ==================================================
// CREATE
// ==================================================

async function createStudent() {

    const name =
        document.getElementById("createName").value.trim();

    const course =
        document.getElementById("createCourse").value.trim();

    const marks =
        document.getElementById("createMarks").value;


    const result =
        document.getElementById("createResult");


    if (!name) {

        result.value =
            "Please enter Student Name.";

        return;
    }


    if (!course) {

        result.value =
            "Please enter Course.";

        return;
    }


    if (marks === "") {

        result.value =
            "Please enter Marks.";

        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/students?name=${encodeURIComponent(name)}&course=${encodeURIComponent(course)}&marks=${parseInt(marks)}`,
            {
                method: "POST"
            }
        );


        const data =
            await response.json();


        if (response.ok) {

            result.value =
                "Student created successfully!";

            document.getElementById("createName").value = "";

            document.getElementById("createCourse").value = "";

            document.getElementById("createMarks").value = "";

        } else {

            result.value =
                data.detail || "Error: " + JSON.stringify(data);
        }


    } catch (error) {

        result.value =
            "FastAPI server is not running.";

        console.error(error);
    }
}


// ==================================================
// READ
// ==================================================

async function getStudents() {

    const result =
        document.getElementById("readResult");


    result.value =
        "Loading students...";


    try {

        const response =
            await fetch(`${API_URL}/students`);


        const data =
            await response.json();


        if (!response.ok) {

            result.value =
                data.detail || "Error loading students.";

            return;
        }


        const students =
            data.data;


        if (!students || students.length === 0) {

            result.value =
                "No students found.";

            return;
        }


        let output = "";


        students.forEach(student => {

            output +=
                `Student ID : ${student.id}\n` +

                `Name       : ${student.name}\n` +

                `Course     : ${student.course}\n` +

                `Marks      : ${student.marks}\n` +

                `${"-".repeat(35)}\n`;

        });


        result.value = output;


    } catch (error) {

        result.value =
            "FastAPI server is not running.";

        console.error(error);
    }
}


// ==================================================
// UPDATE
// ==================================================

async function updateStudent() {

    const id =
        document.getElementById("updateId").value;

    const name =
        document.getElementById("updateName").value.trim();

    const course =
        document.getElementById("updateCourse").value.trim();

    const marks =
        document.getElementById("updateMarks").value;


    const result =
        document.getElementById("updateResult");


    if (!id) {

        result.value =
            "Please enter Student ID.";

        return;
    }


    if (!name) {

        result.value =
            "Please enter Name.";

        return;
    }


    if (!course) {

        result.value =
            "Please enter Course.";

        return;
    }


    if (marks === "") {

        result.value =
            "Please enter Marks.";

        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/students/${parseInt(id)}?name=${encodeURIComponent(name)}&course=${encodeURIComponent(course)}&marks=${parseInt(marks)}`,
            {
                method: "PUT"
            }
        );


        const data =
            await response.json();


        if (response.ok) {

            result.value =
                "Student updated successfully!";

        } else {

            result.value =
                data.detail || "Error updating student.";
        }


    } catch (error) {

        result.value =
            "FastAPI server is not running.";

        console.error(error);
    }
}


// ==================================================
// DELETE
// ==================================================

async function deleteStudent() {

    const id =
        document.getElementById("deleteId").value;


    const result =
        document.getElementById("deleteResult");


    if (!id) {

        result.value =
            "Please enter Student ID.";

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/students/${parseInt(id)}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (response.ok) {

            result.value =
                "Student deleted successfully!";

            document.getElementById("deleteId").value = "";

        } else {

            result.value =
                data.detail || "Error deleting student.";
        }


    } catch (error) {

        result.value =
            "FastAPI server is not running.";

        console.error(error);
    }
}

