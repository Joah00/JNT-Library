import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import SearchBar from "../Components/SearchBar";
import TableComponent from "../Components/TableComponent";
import ButtonComponent from "../Components/ButtonComponent";
import PopupComponent from "../Components/PopupComponent";
import "./BorrowedBooks.css";

function BorrowedBooks() {
  const handleClose = () => setIsOpen(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState({});

  const handleOpen = (details) => {
    setIsOpen(true);
    setBookDetails(details);
  };

  const columns = [
    { id: "id", label: "ID" },
    { id: "borrowedDate", label: "Borrowed Date" },
    { id: "dueDate", label: "Due Date" },
    { id: "bookName", label: "Book Name" },
  ];

  const initialData = [
    {
      id: 1,
      borrowedDate: "2023-10-01",
      dueDate: "2023-10-15",
      bookName: "To Kill a Mockingbird",
    },
    {
      id: 2,
      borrowedDate: "2023-09-25",
      dueDate: "2023-10-09",
      bookName: "1984",
    },
    {
      id: 3,
      borrowedDate: "2023-10-03",
      dueDate: "2023-10-17",
      bookName: "Pride and Prejudice",
    },
    {
      id: 4,
      borrowedDate: "2023-10-10",
      dueDate: "2023-10-24",
      bookName: "The Great Gatsby",
    },
    {
      id: 5,
      borrowedDate: "2023-09-30",
      dueDate: "2023-10-14",
      bookName: "Moby Dick",
    },
  ];

  const [filteredData, setFilteredData] = useState(initialData);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    filterData(value);
  };

  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase();
    const filtered = initialData.filter(
      (item) =>
        item.id.toString().includes(lowercasedValue) ||
        item.userID.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  };

  return (
    <MainLayout header="Borrowed Books">
      <SearchBar placeholder="Search by ID" onChange={handleSearchChange} />
      <TableComponent columns={columns} data={filteredData} />
      <PopupComponent
        open={isOpen}
        handleClose={handleClose}
        title="View Book Details"
      >
        <div className="popup-container">
          Book Name: {bookDetails.bookName} <br />
          Language: {bookDetails.language} <br />
          Type: {bookDetails.type} <br /> <br /> <br />
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
