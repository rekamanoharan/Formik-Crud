import { createContext, useReducer, useEffect } from "react";

export const BookContext = createContext(null);
const BOOK_API_URL =
  "https://my-json-server.typicode.com/dmitrijt9/book-api-mock/books";
export const ACTION_TYPES = {
  ADD: "ADD",
  DELETE: "DELETE",
  EDIT: "EDIT",
  LIST: "LIST",
};

const initialState = {
  books: [],
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    }
    case ACTION_TYPES.LIST: {
      return {
        ...state,
        books: action.payload,
      };
    }
    case ACTION_TYPES.EDIT: {
      const updateBooks = state.books.map((book) => {
        if (book.id === Number(action.payload.id)) {
          return action.payload;
        }
        return book;
      });
      return {
        ...state,
        books: updateBooks,
      };
    }
    case ACTION_TYPES.DELETE: {
      const updateBooks = state.books.filter((book) => {
        return book.id !== Number(action.payload.id);
      });
      return {
        ...state,
        books: updateBooks,
      };
    }
    default:
      return state;
  }
};

const formatBooksData = (books) => {
  return books.map((book) => {
    return {
      ...book,
      author: "Jhon Doe",
      ISBN: book.isbn,
      publicationDate: new Date().toISOString().split("T")[0],
    };
  });
};

const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);
  const getBooks = async () => {
    const response = await fetch(BOOK_API_URL);
    const books = await response.json();
    const formatBooks = formatBooksData(books);
    dispatch({ type: ACTION_TYPES.LIST, payload: formatBooks });
  };
  useEffect(() => {
    getBooks();
  }, []);
  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;
