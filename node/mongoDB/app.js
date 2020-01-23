const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to Database..."))
    .catch(() => console.log("Error connecting to the db"))
const studentSchema = new mongoose.Schema({
    rollNo: String,
    name: String,
    stream: String
})
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tag: [String],
    students: [studentSchema]
})

const Course = new mongoose.model('Course', courseSchema);
const Student = new mongoose.model('Student', studentSchema);
const student = new Student({
    rollNo: "UE163005",
    name: "Akshay Kumar",
    stream: "CSE"
})

const course = new Course({
    name: "Compiler Design",
    author: "Arun Jaitely",
    tag: "Associate Professor",
    students: [student]
});

const saveObject = async () => {
    const result = await course.save();
    console.log(result);
}

const findObject = async () => {
    const result = await Course
    .find({name: "Compiler Design"}) 
    .select( {name : 1, tag : 1, author : 1} )
    .sort({author : 1}) 
    console.log(result)
}
findObject();

//saveObject();
