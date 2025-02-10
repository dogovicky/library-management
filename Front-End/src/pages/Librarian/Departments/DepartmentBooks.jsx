import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const DepartmentBooks = () => {
  const { department_id } = useParams();
  const [books, setBooks] = useState(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(15);
  const [sortBy, setSortBy] = useState("bookTitle");
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (department_id) {
      getBooks();
    }
  }, [page, size, sortBy, sortOrder]);

  const getBooks = async () => {
    try {
      const url = `http://localhost:8080/departments/${department_id}`;
      const response = await axios.get(url, {
        params: { page, size, sortBy, sortOrder },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <h4>{department_id}</h4>
        <div>
          {error && <h2>{error}</h2>}
          {books &&
            books.map((book) => (
              <div key={book.bookId}>
                <h4>{book.bookTitle}</h4>
              </div>
            ))}
        </div>
        <div>
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
        <div>
          <Link to={`/departments/${department_id}/add-new-book`}>
            Add New Book
          </Link>
        </div>
      </div>
    </>
  );
};

export default DepartmentBooks;
