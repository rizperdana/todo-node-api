const express = require("express");
const router = express.Router();
const todo = require("../controllers/todo");

router.route("/").post(todo.createTodo);

router.route("/").get(todo.getTodos);

router.route("/:id").get(todo.getTodoById);

router.route("/:id").put(todo.updateTodo);

router.route("/:id").delete(todo.deleteTodo);

module.exports = router;