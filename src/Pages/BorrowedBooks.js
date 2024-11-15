import React, { useState, useEffect } from "react";
import MainLayout from "../Layouts/MainLayout";
import SearchBar from "../Components/SearchBar";
import TableComponent from "../Components/TableComponent";
import ButtonComponent from "../Components/ButtonComponent";
import PopupComponent from "../Components/PopupComponent";
import "./BorrowedBooks.css";

function BorrowedBooks() {
  const [filteredData, setFilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState({});

  // Fetch borrowed books on component load
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token
  
    fetch("http://localhost/jntlibrarydb/BorrowedBook.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Set token in Authorization header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setFilteredData(data.data);
        } else {
          console.error("Error fetching borrowed books:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching borrowed books:", error));
  }, []);
  

  const handleSearchChange = (event) => {
    const value = event.target.value;
    filterData(value);
  };

  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase();
    const filtered = filteredData.filter(
      (item) =>
        item.id.toString().includes(lowercasedValue) ||
        item.bookName.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  };

  const columns = [
    { id: "id", label: "ID" },
    { id: "borrowedDate", label: "Borrowed Date" },
    { id: "dueDate", label: "Due Date" },
    { id: "bookName", label: "Book Name" },
  ];

  const handleClose = () => setIsOpen(false);

  return (
    <MainLayout header="Borrowed Books">
      <SearchBar
        placeholder="Search by Book Name or ID"
        onChange={handleSearchChange}
      />
      <TableComponent columns={columns} data={filteredData} />
      <PopupComponent
        open={isOpen}
        handleClose={handleClose}
        title="View Book Details"
      >
        <div className="popup-container">
          Book Name: {bookDetails.bookName} <br />
          Borrowed Date: {bookDetails.borrowedDate} <br />
          Due Date: {bookDetails.dueDate} <br />
          <ButtonComponent
            buttonName="Close"
            buttonWidth="auto"
            marginRight="center"
            onClick={handleClose}
          />
        </div>
      </PopupComponent>
    </MainLayout>
  );
}

export default BorrowedBooks;
