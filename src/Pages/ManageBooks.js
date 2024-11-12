import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import SearchBar from "../Components/SearchBar";
import TableComponent from "../Components/TableComponent";
import ButtonComponent from "../Components/ButtonComponent";
import PopupComponent from "../Components/PopupComponent";
import SnackbarComponent from "../Components/SnackbarComponent";
import PopupComponentWFields from "../Components/PopupComponentWFields";
import "./ManageBooks.css";

function ManageBooks() {
  const [books, setBooks] = useState([
    {
      id: 1,
      bookTitle: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      type: "Fiction",
      language: "English",
      currentQuantity: 3,
      totalQuantity: 5,
      actions: [
        <ButtonComponent
          key="update1"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 1,
              bookTitle: "The Great Gatsby",
              type: "Fiction",
              language: "English",
            })
          }
        />,
        <ButtonComponent
          key="delete1"
          buttonName="Delete"
          onClick={() =>
            handleOpenDelete({
              id: 1,
              bookTitle: "The Great Gatsby",
              type: "Fiction",
              language: "English",
            })
          }
        />,
      ],
    },
    {
      id: 2,
      bookTitle: "1984",
      author: "George Orwell",
      type: "Dystopian",
      language: "English",
      currentQuantity: 2,
      totalQuantity: 5,
      actions: [
        <ButtonComponent
          key="update2"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 2,
              bookTitle: "1984",
              type: "Dystopian",
              language: "English",
            })
          }
        />,
        <ButtonComponent
          key="delete2"
          buttonName="Delete"
          onClick={() =>
            handleOpenDelete({
              id: 2,
              bookTitle: "1984",
              type: "Dystopian",
              language: "English",
            })
          }
        />,
      ],
    },
    {
      id: 3,
      bookTitle: "One Hundred Years of Solitude",
      author: "Gabriel Garcia Marquez",
      type: "Magical Realism",
      language: "Spanish",
      currentQuantity: 4,
      totalQuantity: 8,
      actions: [
        <ButtonComponent
          key="update3"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 3,
              bookTitle: "One Hundred Years of Solitude",
              type: "Magical Realism",
              language: "Spanish",
            })
          }
        />,
        <ButtonComponent
          key="delete3"
          buttonName="Delete"
          onClick={() =>
            handleOpenDelete({
              id: 3,
              bookTitle: "One Hundred Years of Solitude",
              type: "Magical Realism",
              language: "Spanish",
            })
          }
        />,
      ],
    },
    {
      id: 4,
      bookTitle: "Pride and Prejudice",
      author: "Jane Austen",
      type: "Classic",
      language: "English",
      currentQuantity: 3,
      totalQuantity: 5,
      actions: [
        <ButtonComponent
          key="update4"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 4,
              bookTitle: "Pride and Prejudice",
              type: "Classic",
              language: "English",
            })
          }
        />,
        <ButtonComponent
          key="delete4"
          buttonName="Delete"
          onClick={() =>
            handleOpenDelete({
              id: 4,
              bookTitle: "Pride and Prejudice",
              type: "Classic",
              language: "English",
            })
          }
        />,
      ],
    },
    {
      id: 5,
      bookTitle: "The Alchemist",
      author: "Paulo Coelho",
      type: "Adventure",
      language: "Portuguese",
      currentQuantity: 6,
      totalQuantity: 10,
      actions: [
        <ButtonComponent
          key="update5"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 5,
              bookTitle: "The Alchemist",
              type: "Adventure",
              language: "Portuguese",
            })
          }
        />,
        <ButtonComponent
          key="delete5"
          buttonName="Delete"
          onClick={() =>
            handleOpenDelete({
              id: 5,
              bookTitle: "The Alchemist",
              type: "Adventure",
              language: "Portuguese",
            })
          }
        />,
      ],
    },
  ]);
  
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [newBookTemplate, setNewBookTemplate] = useState({
    id: books.length + 1,
    bookTitle: "",
    type: "",
    language: "",
    availability: "Available",
  });

  const handleOpenAddBook = () => {
    setNewBookTemplate({
      id: books.length + 1,
      bookTitle: "",
      type: "",
      language: "",
      availability: "Available",
    });
    setIsOpenAdd(true);
  };

  const handleAddNewBook = (newBookDetails) => {
    const newBook = {
      id: books.length + 1,
      ...newBookDetails,
      actions: [
        <ButtonComponent
          key={`update${newBookDetails.id}`}
          buttonName="Update"
          marginRight="7px"
          onClick={() => handleOpenUpdate(newBookDetails)}
        />,
        <ButtonComponent
          key={`delete${newBookDetails.id}`}
          buttonName="Delete"
          onClick={() => handleOpenDelete(newBookDetails)}
        />,
      ],
    };
    setBooks((currentBooks) => [...currentBooks, newBook]);
    setFilteredData((currentFiltered) => [...currentFiltered, newBook]);
    setIsOpenAdd(false);
    handleSnackbarOpen("New book added successfully");
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleOpenUpdate = (details) => {
    setBookDetails(details);
    setIsOpenUpdate(true);
  };

  const handleOpenDelete = (details) => {
    setBookDetails(details);
    setIsOpenDelete(true);
  };

  const handleClose = () => {
    setIsOpenUpdate(false);
    setIsOpenDelete(false);
  };

  const handleDeleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    setFilteredData(updatedBooks);
    handleClose();
    handleSnackbarOpen("Deleted successfully");
  };

  const handleUpdateBook = (updatedDetails) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedDetails.id ? { ...book, ...updatedDetails } : book
    );
    setBooks(updatedBooks);
    setFilteredData(updatedBooks);
    handleClose();
    handleSnackbarOpen("Updated successfully");
  };

  const columns = [
    { id: "id", label: "ID" },
    { id: "bookTitle", label: "Book Title" },
    { id: 'author', label: 'Author'},
    { id: "type", label: "Type" },
    { id: "language", label: "Language" },
    { id: "currentQuantity", label: "Current Quantity" },
    { id: "totalQuantity", label: "Total Quantity" },
    { id: "action", label: "Action" },
  ];

  const [filteredData, setFilteredData] = useState(books);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    filterData(value);
  };

  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase();
    const filtered = books.filter((book) =>
      book.id.toString().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  };

  return (
    <MainLayout header="Manage Books">
      <div className="content">
        <SearchBar placeholder="Search by ID" onChange={handleSearchChange} />
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
        details={newBookTemplate} // Ensure this is correctly initialized before passing
        fields={[
          { id: "bookTitle", label: "Book Title" },
          { id: "type", label: "Type" },
          { id: "language", label: "Language" },
          { id: "availability", label: "Availability" },
        ]}
        button1Name="Cancel"
        button2Name="Add Book"
        button2OnClick={handleAddNewBook}
      />

      <PopupComponentWFields
        open={isOpenUpdate}
        handleClose={handleClose}
        title="Update Book"
        userDetails={bookDetails} 
        fields={[
          { id: "bookTitle", label: "Book Title" },
          { id: "type", label: "Type" },
          { id: "language", label: "Language" },
          { id: "availability", label: "Availability" },
        ]}
        button1Name="Cancel"
        button2Name="Update"
        button2OnClick={handleUpdateBook}
      />

      <PopupComponent
        open={isOpenDelete}
        handleClose={handleClose}
        title="Delete Confirmation"
      >
        <div className="popup-container">
          <p>
            "Are you certain you wish to proceed with the deletion of the
            selected entry?"
          </p>
          <ButtonComponent
            buttonName="Confirm"
            buttonWidth="100px"
            onClick={() => handleDeleteBook(bookDetails.id)}
            marginRight="center"
          />
        </div>
      </PopupComponent>

      <SnackbarComponent
        open={snackbarOpen}
        handleClose={() => {
          setSnackbarOpen(false);
        }}
        message={snackbarMessage}
      />
    </MainLayout>
  );
}

export default ManageBooks;
