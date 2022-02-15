const Todo = require("../models/todo");
const asyncHandler = require("express-async-handler");

// @route   POST api/todos
// @desc    Create todo data
// @access  Public
exports.createTodo = asyncHandler(async(req, res, next) => {
    if (!req.body.title) {
        res.status(400).send({ message: "Title cannot be empty!" });
        return;
    }

    const { title, description, tags } = req.body;

    const todo = await Todo.create({
        title,
        description,
        tags
    });

    if (todo) {
        res.status(201).json({
            success: {
                todo: {
                    title: todo.title,
                    description: todo.description,
                    completed: todo.completed,
                    tags: todo.tags,
                }
            }
        });
    } else {
        res.status(400)
        throw new Error("Todo not created");
    }
});

// @route   GET api/todos
// @desc    Get all todos
// @access  Public
exports.getTodos = asyncHandler(async(req, res, next) => {
    const title = req.body.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    const todo = await Todo.find(condition);
    if (todo) {
        res.status(200).json({
            success: {
                message: "Todo fetched successfully",
                todo: todo
            }
        });
    } else {
        res.status(404);
        throw new Error("Todo is empty");
    }
});

// @route   GET api/todos
// @desc    Fetch single todos data
// @access  Public
exports.getTodoById = asyncHandler(async(req, res, next) => {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
        res.status(200).json({
            success: {
                message: "Todo fetched successfully",
                todo: todo
            }
        });
    } else {
        res.status(404);
        throw new Error("Todo not found");
    }
});

// @route   PUT api/todos
// @desc    Edit todo data
// @access  Public
exports.updateTodo = asyncHandler(async(req, res, next) => {
    const todo = await Todo.findOne({ _id: req.params.id });

    if (!todo) {
        res.status(404);
        throw new Error("Todo don't exist");
    }

    todo.set(req.body);
    const updateTodo = await todo.save();
    res.status(200).json({
        success: {
            todo: updateTodo
        }
    });
});

// @route   DELETE api/todos
// @desc    Delete todo data
// @access  Public
exports.deleteTodo = asyncHandler(async(req, res, next) => {
    const todo = await Todo.findByIdAndRemove(req.params.id);

    if (!todo) {
        res.status(404);
        throw new Error(`Todo not found for id=${req.params.id}`);
    } else {
        res.status(200).json({
            success: {
                message: "Todo deleted successfully"
            }
        });
    };
});