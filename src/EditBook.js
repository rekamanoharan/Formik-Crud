import { useContext } from "react";
import { Formik } from "formik";
import { ACTION_TYPES, BookContext } from "./BookContext";
import { useParams, useNavigate } from "react-router-dom";
const EditBook = () => {
  const navigate = useNavigate();
  const { id: bookId } = useParams();
  const { state, dispatch } = useContext(BookContext);
  const findBook = state.books.find((book) => {
    return book.id === Number(bookId);
  });
  const validationHandler = (data) => {
    const errors = {};
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (!value) {
        errors[key] = `${key} is required`;
      }
    });
    return errors;
  };

  const onSubmitHandler = (values, { setSubmitting }) => {
    dispatch({
      type: ACTION_TYPES.EDIT,
      payload: { ...values, id: Number(bookId) },
    });
    setSubmitting(false);
    navigate("/");
  };

  return (
    <section>
      <h3>Update book</h3>
      <Formik
        initialValues={{
          title: findBook.title,
          author: findBook.author,
          ISBN: findBook.ISBN,
          publicationDate: findBook.publicationDate,
        }}
        validate={validationHandler}
        onSubmit={onSubmitHandler}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              {errors.title && touched.title && (
                <div className="form-text text-danger">{errors.title}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author Name
              </label>
              <input
                type="text"
                name="author"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.author}
              />
              {errors.author && touched.author && (
                <div className="form-text text-danger">{errors.author}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="ISBN" className="form-label">
                ISBN Number
              </label>
              <input
                type="text"
                name="ISBN"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ISBN}
              />
              {errors.ISBN && touched.ISBN && (
                <div className="form-text text-danger">{errors.ISBN}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="publicationDate" className="form-label">
                Publication date
              </label>
              <input
                type="date"
                name="publicationDate"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.publicationDate}
              />
              {errors.publicationDate && touched.publicationDate && (
                <div className="form-text text-danger">
                  {errors.publicationDate}
                </div>
              )}
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Update
            </button>
          </form>
        )}
      </Formik>
    </section>
  );
};

export default EditBook;
