import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ACTION_TYPES, BookContext } from "./BookContext";
const BookList = () => {
  const { state, dispatch } = useContext(BookContext);
  const navigate = useNavigate();
  const deleteHandler = (id) => {
    dispatch({ type: ACTION_TYPES.DELETE, payload: { id } });
  };
  const editHandler = (id) => {
    navigate("/edit/" + id);
  };
  const renderBooks = () => {
    return state.books.map((book, index) => {
      return (
        <li key={index} className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            <h4>{book.title}</h4>
            <div>
              <button
                onClick={() => editHandler(book.id)}
                type="button"
                className="btn btn-light"
              >
                Edit
              </button>
              <button
                onClick={() => deleteHandler(book.id)}
                type="button"
                className="btn ms-3 btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
          <p>ISBN: {book.ISBN}</p>
          <p>Author: {book.author}</p>
          <p>Publication Date:{book.publicationDate}</p>
        </li>
      );
    });
  };

  return (
    <>
      {!state.books.length && <p>Loading...</p>}
      <ul className="list-group">{renderBooks()}</ul>
    </>
  );
};

export default BookList;
