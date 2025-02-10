import axios from "axios";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Departments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [departments, setDepartments] = useState([]);
  const [page, setPage] = useState(0); //Page number
  const [size, setSize] = useState(10); //Page Size
  const [sortBy, setSortBy] = useState("departmentName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  const debouncedSearch = debounce(async (term) => {
    if (term.trim === "") {
      fetchDepartments();
    } else {
      searchDepartment(term);
    }
  }, 500);

  const fetchDepartments = async () => {
    try {
      const url = `http://localhost:8080/departments`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page, size, sortBy, sortOrder },
      });
      setDepartments(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error.message);
    }
  };

  const searchDepartment = async (term) => {
    try {
      const url = `http://localhost:8080/departments/search`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { searchTerm: term, page, size, sortBy, sortOrder },
      });
      setDepartments(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [searchTerm, page, size, sortBy, sortOrder]);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel(); //cleanup debounce on unmount
  }, [searchTerm]);

  return (
    <>
      <div>
        <h4>List of Departments</h4>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          {departments.length > 0 ? (
            departments.map((department) => (
              <Link
                key={department.department_id}
                to={`/departments/${department.department_id}`}
              >
                <div>
                  <h4>{department.department_id}</h4>
                  <h2>{department.departmentName}</h2>
                </div>
              </Link>
            ))
          ) : (
            <div>No departments found</div>
          )}
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
        <Outlet />
      </div>
    </>
  );
};

export default Departments;
