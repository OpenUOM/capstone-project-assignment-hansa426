const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./backend");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the database connection
db.init()
  .then(() => {
    console.log("Database initialized.");
  })
  .catch((err) => {
    console.error("Error initializing database:", err);
  });

// Endpoint to initialize the database
app.get("/dbinitialize", async function (req, res) {
  try {
    console.log("DB is getting initialized");
    let data = await db.dbinitialize();
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (err) {
    console.error("Error initializing database:", err);
    res.status(500).json({ error: "Failed to initialize the database." });
  }
});

// ============== Teacher Related Endpoints ==============

app.get("/listTeachers", async function (req, res) {
  try {
    console.log("Request received to list teachers");
    let data = await db.readTeachers();
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (err) {
    console.error("Error listing teachers:", err);
    res.status(500).json({ error: "Failed to list teachers." });
  }
});

app.post("/getTeacherInfo", async function (req, res) {
  try {
    let reqBody = req.body;
    console.log("Request received to get Teacher Info");
    let data = await db.readTeacherInfo(reqBody.id);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (err) {
    console.error("Error getting teacher info:", err);
    res.status(500).json({ error: "Failed to get teacher info." });
  }
});

app.post("/addTeacher", async function (req, res) {
  try {
    let reqBody = req.body;
    console.log("Request received to add teacher. Req body: " + JSON.stringify(reqBody));
    await db.addTeacher(reqBody.id, reqBody.name, reqBody.age);
    res.status(200).json({ message: "Teacher added successfully." });
  } catch (err) {
    console.error("Error adding teacher:", err);
    res.status(500).json({ error: "Failed to add teacher." });
  }
});

app.post("/editTeacher", async function (req, res) {
  try {
    let reqBody = req.body;
    console.log("Request received to update teacher. Req body: " + JSON.stringify(reqBody));
    await db.updateTeacher(reqBody.id, reqBody.name, reqBody.age);
    res.status(200).json({ message: "Teacher updated successfully." });
  } catch (err) {
    console.error("Error updating teacher:", err);
    res.status(500).json({ error: "Failed to update teacher." });
  }
});

app.post("/deleteTeacher", async function (req, res) {
  try {
    let reqBody = req.body;
    console.log("Request received to delete teacher. Req body: " + JSON.stringify(reqBody));
    await db.deleteTeacher(reqBody.id);
    res.status(200).json({ message: "Teacher deleted successfully." });
  } catch (err) {
    console.error("Error deleting teacher:", err);
    res.status(500).json({ error: "Failed to delete teacher." });
  }
});

// ============== Student Related Endpoints ==============

app.get("/listStudents", async function (req, res) {
  try {
    console.log("Request received to list students");
    let data = await db.readStudents();
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (err) {
    console.error("Error listing students:", err);
    res.status(500).json({ error: "Failed to list students." });
  }
});

app.post("/getStudentInfo", async function (req, res) {
  try {
    let reqBody = req.body;
    console.log("Request received to get Student Info");
    let data = await db.readStudentInfo(reqBody.id);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (err) {
    console.error("Error getting student info:", err);
    res.status(500).json({ error: "Failed to get student info." });
  }
});

app.post("/addStudent", async function (req, res) {
  try {
    let reqBody = req.body;
    console.log("Request received to add student. Req body: " + JSON.stringify(reqBody));
    await db.addStudent(reqBody.id, reqBody.name, reqBody.age, reqBody.religion);
    res.status(200).json({ message: "Student added successfully." });
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ error: "Failed to add student." });
  }
});

app.post("/editStudent", async function (req, res) {
  try {
    let reqBody = req.body;
    console.log("Request received to update Student. Req body: " + JSON.stringify(reqBody));
    await db.updateStudent(reqBody.id, reqBody.name, reqBody.age, reqBody.religion);
    res.status(200).json({ message: "Student updated successfully." });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ error: "Failed to update student." });
  }
});

app.post("/deleteStudent", async function (req, res) {
  try {
    let reqBody = req.body;
    console.log("Request received to delete student. Req body: " + JSON.stringify(reqBody));
    await db.deleteStudent(reqBody.id);
    res.status(200).json({ message: "Student deleted successfully." });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).json({ error: "Failed to delete student." });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

