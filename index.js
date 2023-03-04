const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const todoList = [];
const complete = [];

const PORT = 1920;

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/addtask", (req, res) => {
  todoList.push(req.body.newtask);
  res.redirect("/");
});

app.use("/completetask", (req, res) => {
  const completetask = req.body.check;
  console.log("completed task");
  if (typeof completetask === "string") {
    complete.push(completetask);
    todoList.splice(todoList.indexOf(completetask), 1);
  }
  res.redirect("/");
});

app.use("/", (req, res) => {
  const newTodoList = todoList.map(
    (todo) =>
      `
    <form action="/completetask" method="POST">
      <input type="checkbox" name="check" value="${todo}">
        ${todo}
      </input>
      <button>complete</button>
    </form>`
  );
  const completeList = complete.map(
    (todo) => `<li><input type="checkbox" checked >${todo}</input></li>`
  );
  console.log(completeList);
  res.send(
    `<body>
      <h2>A Todo List</h2>
      <form action="/addtask" method="POST">
        <input type="text" name="newtask" placeholder="Add a new task"></input>
        <button type="submit">Add new task</button>
      </form>
      <h2>Added Task</h2>${newTodoList}
      <h2>Completed tasks</h2>${completeList}
    </body>`
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
