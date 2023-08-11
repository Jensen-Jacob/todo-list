import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3030;
let lists = [
  {
    listName: "Home",
    listAddr: "home",
    listID: "0",
    tasks: ["1", "two", "3"],
  },
  {
    listName: "Work",
    listAddr: "work",
    listID: "1",
    tasks: [],
  },
];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { lists: lists });
});

// app.get("/home", (req, res) => {
//   res.render("list.ejs", { listDetails: lists[0] });
// });

// app.get("/work", (req, res) => {
//   res.render("list.ejs", { listDetails: lists[1] });
// });

app.get("/:listName", (req, res) => {
  let reqVar = req.params.listName;
  console.log(reqVar);
  let index = lists.findIndex((item) => item.listAddr === `${reqVar}`);
  console.log(index);
  res.render("list.ejs", { listDetails: lists[index], lists: lists });
});

app.post("/addTask", (req, res) => {
  let newTask = req.body.task;
  let listID = req.body.listID;
  lists[listID].tasks.push(newTask);
  res.redirect(`/${req.body.listAddr}`);
});

app.post("/deleteTask", (req, res) => {
  // let newTask = req.body.task;
  let listID = req.body.listID;
  let taskID = req.body.taskID;
  lists[listID].tasks.splice(taskID, 1);
  res.redirect(`/${req.body.listAddr}`);
});

app.post("/addList", (req, res) => {
  let listName = req.body.listName;
  let listAddr = listName.split(" ").join("");
  let listID = lists.length;
  // console.log(listName, listID, listAddr.toLowerCase());
  let newList = {
    listName: listName,
    listAddr: listAddr,
    listID: listID,
    tasks: [],
  };
  // console.log(newList);
  lists.push(newList);
  res.redirect("/");
});

app.post("/deleteList", (req, res) => {
  // let newTask = req.body.task;
  let listID = req.body.listID;
  lists.splice(listID, 1);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
