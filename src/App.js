import AddBook from "./AddBook";
import BookProvider from "./BookContext";
import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./BookList";
import EditBook from "./EditBook";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <BookProvider>
        <Header />
        <main className="container mt-3">
          <Routes>
            {/* Add a Book */}
            <Route path="/add" element={<AddBook />} />
            {/* Edit a Book */}
            <Route path="/edit/:id" element={<EditBook />} />
            {/* Book list */}
            <Route index path="/" element={<BookList />} />
          </Routes>
        </main>
      </BookProvider>
    </BrowserRouter>
  );
}
