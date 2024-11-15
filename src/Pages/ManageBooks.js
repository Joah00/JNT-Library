import React, { useState, useEffect } from "react";
import MainLayout from "../Layouts/MainLayout";
import SearchBar from "../Components/SearchBar";
import TableComponent from "../Components/TableComponent";
import ButtonComponent from "../Components/ButtonComponent";
import PopupComponent from "../Components/PopupComponent";
import SnackbarComponent from "../Components/SnackbarComponent";
import PopupComponentWFields from "../Components/PopupComponentWFields";
import "./ManageBooks.css";

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [bookDetails, setBookDetails] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch books from the API on component load
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    fetch("http://localhost/jntlibrarydb/ManageBooks.php?action=getBooks", {
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.data);
          const booksData = data.data.map((book) => ({
            ...book,
            actions: [
              <ButtonComponent
                key={`update${book.id}`}
                buttonName="Update"
                marginRight="7px"
                onClick={() => handleOpenUpdate(book)}
              />,
              <ButtonComponent
                key={`delete${book.id}`}
                buttonName="Delete"
                onClick={() => handleOpenDelete(book)}
              />,
            ],
          }));
          setBooks(booksData);
          setFilteredData(booksData);
        }
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleOpenAddBook = () => {
    setIsOpenAdd(true);
  };

 

  const handleOpenUpdate = (details) => {
    setBookDetails(details);
    setIsOpenUpdate(true);
  };
  
  const handleOpenDelete = (details) => {
    setBookDetails(details);
    setIsOpenDelete(true);
  };
  
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const columns = [
    { id: "id", label: "ID" },
    { id: "bookTitle", label: "Book Title" },
    { id: "author", label: "Author" },
    { id: "type", label: "Type" },
    { id: "language", label: "Language" },
    { id: "currentQuantity", label: "Current Quantity" },
    { id: "totalQuantity", label: "Total Quantity" },
    { id: "actions", label: "Actions" },
  ];

  const handleSearchChange = (event) => {
    const value = event.target.value;
    const lowercasedValue = value.toLowerCase();
    const filtered = books.filter((book) =>
      book.bookTitle.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  };

  const handleAddNewBook = (newBookDetails) => {
    const token = localStorage.getItem("token");
  
    fetch("http://localhost/jntlibrarydb/ManageBooks.php?action=addBook", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBookDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const newBook = {
            ...newBookDetails,
            id: data.id,
            actions: [
              <ButtonComponent
                key={`update${data.id}`}
                buttonName="Update"
                onClick={() => handleOpenUpdate(newBookDetails)}
              />,
              <ButtonComponent
                key={`delete${data.id}`}
                buttonName="Delete"
                onClick={() => handleOpenDelete(newBookDetails)}
              />,
            ],
          };
          setBooks((currentBooks) => [...currentBooks, newBook]);
          setFilteredData((currentFiltered) => [...currentFiltered, newBook]);
          setIsOpenAdd(false);
          handleSnackbarOpen("New book added successfully");
        } else {
          handleSnackbarOpen(data.message || "Failed to add book.");
        }
      })
      .catch((error) => handleSnackbarOpen(`Error adding book: ${error.message}`));
  };
  
  const handleUpdateBook = (updatedDetails) => {
    const token = localStorage.getItem("token");
  
    fetch("http://localhost/jntlibrarydb/ManageBooks.php?action=updateBook", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const updatedBooks = books.map((book) =>
            book.id === updatedDetails.id ? { ...book, ...updatedDetails } : book
          );
          setBooks(updatedBooks);
          setFilteredData(updatedBooks);
          setIsOpenUpdate(false);
          handleSnackbarOpen("Book updated successfully");
        } else {
          handleSnackbarOpen(data.message || "Failed to update book.");
        }
      })
      .catch((error) => handleSnackbarOpen(`Error updating book: ${error.message}`));
  };
  
  const handleDeleteBook = (id) => {
    const token = localStorage.getItem("token");
  
    fetch("http://localhost/jntlibrarydb/ManageBooks.php?action=deleteBook", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`, // Add token to headers
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          const updatedBooks = books.filter((book) => book.id !== id);
          setBooks(updatedBooks);
          setFilteredData(updatedBooks);
          setIsOpenDelete(false);
          handleSnackbarOpen("Book deleted successfully");
        } else {
          handleSnackbarOpen(data.message || "Failed to delete book.");
        }
      })
      .catch((error) => handleSnackbarOpen(`Error deleting book: ${error.message}`));
  };

  return (
    <MainLayout header="Manage Books">
      <div className="content">
        <SearchBar placeholder="Search by Book Title" onChange={handleSearchChange} />
        <TableComponent columns={columns} data={filteredData} />
      </div>
      <div className="addBtn">
        <ButtonComponent
          buttonName="Add New Book"
          buttonWidth="500px"
          buttonHeight="40px"
          marginRight="center"
          onClick={handleOpenAddBook}
        />
      </div>

      <PopupComponentWFields
        open={isOpenAdd}
        handleClose={() => setIsOpenAdd(false)}
        title="Add New Book"
        fields={[
          { id: "bookTitle", label: "Book Title" },
          { id: "author", label: "Author" },
          { id: "type", label: "Type" },
          { id: "language", label: "Language" },
          { id: "currentQuantity", label: "Current Quantity" },
          { id: "totalQuantity", label: "Total Quantity" },
        ]}
        button1Name="Cancel"
        button2Name="Add Book"
        button2OnClick={handleAddNewBook}
      />

      <PopupComponentWFields
        open={isOpenUpdate}
        handleClose={() => setIsOpenUpdate(false)}
        title="Update Book"
        userDetails={bookDetails}
        fields={[
          { id: "bookTitle", label: "Book Title" },
          { id: "author", label: "Author" },
          { id: "type", label: "Type" },
          { id: "language", label: "Language" },
          { id: "currentQuantity", label: "Current Quantity" },
          { id: "totalQuantity", label: "Total Quantity" },
        ]}
        button1Name="Cancel"
        button2Name="Update"
        button2OnClick={handleUpdateBook}
      />

      <PopupComponent
        open={isOpenDelete}
        handleClose={() => setIsOpenDelete(false)}
        title="Delete Confirmation"
      >
        <div className="popup-container">
          <p>Are you sure you want to delete this book?</p>
          <ButtonComponent
            buttonName="Confirm"
            buttonWidth="100px"
            onClick={() => handleDeleteBook(bookDetails?.id)}
          />
        </div>
      </PopupComponent>

      <SnackbarComponent
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </MainLayout>
  );
}

export default ManageBooks;
