import { Request, RequestHandler, Response } from 'express';
import Book from '../models/book.model';

export const createBook = async (req: Request, res: Response) => {
  try {
    const createdBook = await Book.create(req.body);
    const book = await Book.findById(createdBook._id).select('-__v'); 
    console.log(book)

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book
    });
  } catch (error) {
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error
    });
  }
};


export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;
    const query: any = {};
    if (filter) query.genre = filter;

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(parseInt(limit as string));

    res.json({
      success: true,
      message: 'Books retrieved successfully',
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving books',
      error
    });
  }
};

export const getBookById: RequestHandler = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      res.status(404).json({ success: false, message: 'Book not found' });
      return;
    }
    res.json({
      success: true,
      message: 'Book retrieved successfully',
      data: book
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook: RequestHandler = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true
    });
    if (!book) {
      res.status(404).json({ success: false, message: 'Book not found' });
      return;
    }
    res.json({
      success: true,
      message: 'Book updated successfully',
      data: book
    });
  } catch (error) {
    next(error);
  }
};



export const deleteBook: RequestHandler = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) {
      res.status(404).json({ success: false, message: 'Book not found' });
      return; // Return here just to exit early, but don't return the res object
    }
    res.json({ success: true, message: 'Book deleted successfully', data: null });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error });
  }
};

