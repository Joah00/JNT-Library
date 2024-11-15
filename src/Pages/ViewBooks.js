import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import SearchBar from "../Components/SearchBar";
import TableComponent from '../Components/TableComponent';
import "./ViewBooks.css";

function ViewBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    // Redirect to login if token is missing
    if (!token) {
      console.error("No token found, redirecting to login.");
      navigate("/loginPage");
      return;
    }

    // Fetch books if token is available
    fetch("http://localhost/jntlibrarydb/ViewBook.php", {
      headers: {
        "Authorization": `Bearer ${token}`, // Include token in Authorization header
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBooks(data.data);
          setFilteredData(data.data);
        } else {
          console.error("Error fetching books:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, [navigate]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    const lowercasedValue = value.toLowerCase();
    const filtered = books.filter((item) =>
      item.id.toString().includes(lowercasedValue) ||
      item.bookTitle.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  };

  return (
    <MainLayout header="View Books">
      <SearchBar placeholder="Search by ID" onChange={handleSearchChange} />
      <TableComponent columns={[
        { id: 'id', label: 'ID' },
        { id: 'bookTitle', label: 'Book Title' },
        { id: 'author', label: 'Author' },
        { id: 'type', label: 'Type' },
        { id: 'language', label: 'Language' },
        { id: 'availableQuantity', label: 'Available Quantity' },
      ]} data={filteredData} />
    </MainLayout>
  );
}

export default ViewBooks;
