const express = require("express");
const BookModel = require("../models/book.model");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get books by category
router.get("/", async (req, res) => {
  const { category } = req.query;
  try {
    const books = await BookModel.find({ category });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get books by author and category
router.get("/", async (req, res) => {
  const { author, category } = req.query;
  try {
    const books = await BookModel.find({ author, category });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add new book (Protected Route - Admin Only)
router.post("/", auth, async (req, res) => {
  try {
    const book = new BookModel(req.body);
    await book.save();
    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update book by ID (Protected Route - Admin Only)
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedBook) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete book by ID (Protected Route - Admin Only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await BookModel.findByIdAndDelete(id);
    if (deletedBook) {
      res.status(202).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
