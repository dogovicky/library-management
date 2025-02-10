import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NewBook = () => {
  const { department_id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [book, setBook] = useState({
    bookTitle: "",
    departmentId: "",
    authors: [""],
  });

  // useEffect(() => {
  //   if (department_id) {
  //     setBook((prevBook) => ({ ...prevBook, department_id }));
  //   }
  // }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleAuthorChange = (index, value) => {
    const newAuthors = [...book.authors];
    newAuthors[index] = value;
    setBook({ ...book, authors: newAuthors });
  };

  const addAuthorField = () => {
    setBook({ ...book, authors: [...book.authors, ""] });
  };

  const removeAuthorField = (index) => {
    const newAuthors = book.authors.filter((_, i) => i !== index);
    setBook({ ...book, authors: newAuthors });
  };

  const saveBook = async (e) => {
    e.preventDefault();
    console.log(token);
    // const newBook = {
    //   bookId: book.bookId,
    //   bookTitle: book.bookTitle,
    //   department_id: book.department_id,
    //   authors: book.authors,
    // };
    // console.log(newBook);
    try {
      const url = `http://localhost:8080/departments/${department_id}/add-new-book`;
      const response = await axios.post(url, JSON.stringify(book), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        alert("Book added successfully");
        navigate(`/departments/${department_id}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <h4>Add New Book</h4>
        <div>
          <form action="post">
            <div>
              <div>
                <input
                  type="text"
                  name="departmentId"
                  value={book.departmentId}
                  onChange={handleInputChange}
                />
              </div>
              {/* <div>
                <input
                  type="text"
                  name="bookId"
                  placeholder="Book ID"
                  onChange={handleInputChange}
                  value={book.bookId}
                />
              </div> */}
            </div>
            <div>
              <input
                type="text"
                name="bookTitle"
                placeholder="Book Title"
                onChange={handleInputChange}
                value={book.bookTitle}
              />
            </div>
            <div>
              {book.authors.map((author, index) => (
                <div key={index}>
                  <input
                    type="text"
                    // name="author"
                    placeholder="Author Name"
                    value={author}
                    onChange={(e) => handleAuthorChange(index, e.target.value)}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeAuthorField(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <div>
                <button type="button" onClick={addAuthorField}>
                  Add Author
                </button>
              </div>
            </div>
            <input type="submit" value="Save Book" onClick={saveBook} />
          </form>
        </div>
      </div>
    </>
  );
};

export default NewBook;
