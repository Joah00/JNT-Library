import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import SearchBar from "../Components/SearchBar";
import TableComponent from '../Components/TableComponent';
import ButtonComponent from '../Components/ButtonComponent';
import PopupComponent from "../Components/PopupComponent";
import SnackbarComponent from "../Components/SnackbarComponent";
import "./ViewBooks.css";

function ViewBooks() {
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleSnackbarOpen = () => setSnackbarOpen(true);
  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleNotify = () => {
    handleClose();
    handleSnackbarOpen();
  };

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'bookTitle', label: 'Book Title' },
    { id: 'author', label: 'Author'},
    { id: 'type', label: 'Type' },
    { id: 'language', label: 'Language' },
    { id: 'availableQuantity', label: 'Available Quantity' },
  ];
  
  const initialData = [
    {
      id: 1,
      bookTitle: "To Kill a Mockingbird",
      author: "Harper Lee",
      type: "Fiction",
      language: "English",
      availableQuantity: 4,
    },
    {
      id: 2,
      bookTitle: "1984",
      author: "George Orwell",
      type: "Dystopian",
      language: "English",
      availableQuantity: 2,
    },
    {
      id: 3,
      bookTitle: "One Hundred Years of Solitude",
      author: "Gabriel Garcia Marquez",
      type: "Magical Realism",
      language: "Spanish",
      availableQuantity: 5,
    },
    {
      id: 4,
      bookTitle: "Pride and Prejudice",
      author: "Jane Austen",
      type: "Classic",
      language: "English",
      availableQuantity: 3,
    },
    {
      id: 5,
      bookTitle: "The Alchemist",
      author: "Paulo Coelho",
      type: "Adventure",
      language: "Portuguese",
      availableQuantity: 6,
    },
    {
      id: 6,
      bookTitle: "Les Misérables",
      author: "Victor Hugo",
      type: "Historical Fiction",
      language: "French",
      availableQuantity: 1,
    },
    {
      id: 7,
      bookTitle: "War and Peace",
      author: "Leo Tolstoy",
      type: "Historical Fiction",
      language: "Russian",
      availableQuantity: 4,
    },
    {
      id: 8,
      bookTitle: "The Divine Comedy",
      author: "Dante Alighieri",
      type: "Epic Poetry",
      language: "Italian",
      availableQuantity: 2,
    },
    {
      id: 9,
      bookTitle: "Don Quixote",
      author: "Miguel de Cervantes",
      type: "Classic",
      language: "Spanish",
      availableQuantity: 5,
    },
    {
      id: 10,
      bookTitle: "The Odyssey",
      author: "Homer",
      type: "Epic",
      language: "Greek",
      availableQuantity: 3,
    },
  ];


  const [filteredData, setFilteredData] = useState(initialData);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    filterData(value);
  };

  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase();
    const filtered = initialData.filter(item => 
      item.id.toString().includes(lowercasedValue) || 
      item.bookTitle.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  };

  return (
    <MainLayout header="View Books">
        <SearchBar placeholder="Search by ID" onChange={handleSearchChange}/>
        <TableComponent columns={columns} data={filteredData}/> 
        <PopupComponent open={isOpen} handleClose={handleClose} title="Book Details">
          <div className="popup-container">
            <p>"Do you wish to notify this user for overdue borrowing?"</p>
            <ButtonComponent buttonName="Confirm" buttonWidth="auto" onClick={handleNotify} marginRight="center"/>
          </div>
        </PopupComponent>
        <SnackbarComponent 
          open={snackbarOpen} 
          handleClose={handleSnackbarClose} 
          message="Notification sent successfully" 
        />
    </MainLayout>
  );
}

export default ViewBooks;