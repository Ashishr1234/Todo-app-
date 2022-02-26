const express = require("express");
const app = express();
const cors = require("cors");
//const PORT = process.env.PORT || 3000;
//require("dotenv").config();
app.use(cors());
//parser
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://aish:tqk38Zt9o7uZfN0S@cluster0.owuhd.mongodb.net/todo', { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

const todoSchema = new mongoose.Schema({
  text: String,
});
const todoModel = mongoose.model("todo", todoSchema);

app.get("/", async (req, res) => {
  //get todos from database
  const todos = await todoModel.find();
  res.json(todos);
});
app.post("/add", async (req, res) => {
  const todo = new todoModel({
    text: req.body.text,
  });
  await todo.save();

  const todos = await todoModel.find();
  res.json(todos);
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await todoModel.deleteOne({ id });
  const todos = await todoModel.find();
  res.json(todos);
});

app.listen(4000, () => {
  console.log("server started on port 4000");
});
