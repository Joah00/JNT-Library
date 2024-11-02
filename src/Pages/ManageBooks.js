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
      type: "Fiction",
      language: "English",
      availability: "Available",
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
      type: "Dystopian",
      language: "English",
      availability: "Available",
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
          key="delete1"
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
      bookTitle: "To Kill a Mockingbird",
      type: "Novel",
      language: "English",
      availability: "Out of Stock",
      actions: [
        <ButtonComponent
          key="update3"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 3,
              bookTitle: "To Kill a Mockingbird",
              type: "Novel",
              language: "English",
            })
          }
        />,
        <ButtonComponent
          key="delete3"
          buttonName="Delete"
          onClick={() => handleOpenDelete({ id: 3 })}
        />,
      ],
    },
    {
      id: 4,
      bookTitle: "Pride and Prejudice",
      type: "Romance",
      language: "English",
      availability: "Available",
      actions: [
        <ButtonComponent
          key="update4"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 4,
              bookTitle: "Pride and Prejudice",
              type: "Romance",
              language: "English",
            })
          }
        />,
        <ButtonComponent
          key="delete4"
          buttonName="Delete"
          onClick={() => handleOpenDelete({ id: 4 })}
        />,
      ],
    },
    {
      id: 5,
      bookTitle: "The Catcher in the Rye",
      type: "Fiction",
      language: "English",
      availability: "Available",
      actions: [
        <ButtonComponent
          key="update5"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 5,
              bookTitle: "The Catcher in the Rye",
              type: "Fiction",
              language: "English",
            })
          }
        />,
        <ButtonComponent
          key="delete5"
          buttonName="Delete"
          onClick={() => handleOpenDelete({ id: 5 })}
        />,
      ],
    },
    {
      id: 6,
      bookTitle: "Les Misérables",
      type: "Historical Fiction",
      language: "French",
      availability: "Out of Stock",
      actions: [
        <ButtonComponent
          key="update6"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 6,
              bookTitle: "Les Misérables",
              type: "Historical Fiction",
              language: "French",
            })
          }
        />,
        <ButtonComponent
          key="delete6"
          buttonName="Delete"
          onClick={() => handleOpenDelete({ id: 6 })}
        />,
      ],
    },
    {
      id: 7,
      bookTitle: "Brave New World",
      type: "Dystopian",
      language: "English",
      availability: "Available",
      actions: [
        <ButtonComponent
          key="update7"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 7,
              bookTitle: "Brave New World",
              type: "Dystopian",
              language: "English",
            })
          }
        />,
        <ButtonComponent
          key="delete7"
          buttonName="Delete"
          onClick={() => handleOpenDelete({ id: 7 })}
        />,
      ],
    },
    {
      id: 8,
      bookTitle: "Slaughterhouse Five",
      type: "Science Fiction",
      language: "English",
      availability: "Available",
      actions: [
        <ButtonComponent
          key="update8"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 8,
              bookTitle: "Slaughterhouse Five",
              type: "Science Fiction",
              language: "English",
            })
          }
        />,
        <ButtonComponent
          key="delete8"
          buttonName="Delete"
          onClick={() => handleOpenDelete({ id: 8 })}
        />,
      ],
    },
    {
      id: 9,
      bookTitle: "The Hobbit",
      type: "Fantasy",
      language: "English",
      availability: "Available",
      actions: [
        <ButtonComponent
          key="update9"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 9,
              bookTitle: "The Hobbit",
              type: "Fantasy",
              language: "English",
            })
          }
        />,
        <ButtonComponent
          key="delete9"
          buttonName="Delete"
          onClick={() => handleOpenDelete({ id: 9 })}
        />,
      ],
    },
    {
      id: 10,
      bookTitle: "Don Quixote",
      type: "Adventure",
      language: "Spanish",
      availability: "Available",
      actions: [
        <ButtonComponent
          key="update10"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 10,
              bookTitle: "Don Quixote",
              type: "Adventure",
              language: "Spanish",
            })
          }
        />,
        <ButtonComponent
          key="delete10"
          buttonName="Delete"
          onClick={() => handleOpenDelete({ id: 10 })}
        />,
      ],
    },
    {
      id: 11,
      bookTitle: "The Brothers Karamazov",
      type: "Philosophical Novel",
      language: "Russian",
      availability: "Available",
      actions: [
        <ButtonComponent
          key="update11"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 11,
              bookTitle: "The Brothers Karamazov",
              type: "Philosophical Novel",
              language: "Russian",
            })
          }
        />,
        <ButtonComponent
          key="delete11"
          buttonName="Delete"
          onClick={() => handleOpenDelete({ id: 11 })}
        />,
      ],
    },
    {
      id: 12,
      bookTitle: "The Trial",
      type: "Absurdist Fiction",
      language: "German",
      availability: "Out of Stock",
      actions: [
        <ButtonComponent
          key="update12"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 12,
              bookTitle: "The Trial",
              type: "Absurdist Fiction",
              language: "German",
            })
          }
        />,
        <ButtonComponent
          key="delete12"
          buttonName="Delete"
          onClick={() => handleOpenDelete({ id: 12 })}
        />,
      ],
    },
    {
      id: 13,
      bookTitle: "Moby Dick",
      type: "Adventure",
      language: "English",
      availability: "Available",
      actions: [
        <ButtonComponent
          key="update13"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 13,
              bookTitle: "Moby Dick",
              type: "Adventure",
              language: "English",
            })
          }
        />,
        <ButtonComponent
          key="delete13"
          buttonName="Delete"
          onClick={() => handleOpenDelete({ id: 13 })}
        />,
      ],
    },
    {
      id: 14,
      bookTitle: "War and Peace",
      type: "Historical Novel",
      language: "Russian",
      availability: "Available",
      actions: [
        <ButtonComponent
          key="update14"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 14,
              bookTitle: "War and Peace",
              type: "Historical Novel",
              language: "Russian",
            })
          }
        />,
        <ButtonComponent
          key="delete14"
          buttonName="Delete"
          onClick={() => handleOpenDelete({ id: 14 })}
        />,
      ],
    },
    {
      id: 15,
      bookTitle: "The Picture of Dorian Gray",
      type: "Philosophical Novel",
      language: "English",
      availability: "Available",
      actions: [
        <ButtonComponent
          key="update15"
          buttonName="Update"
          marginRight="7px"
          onClick={() =>
            handleOpenUpdate({
              id: 15,
              bookTitle: "The Picture of Dorian Gray",
              type: "Philosophical Novel",
              language: "English",
            })
          }
        />,
        <ButtonComponent
          key="delete15"
          buttonName="Delete"
          onClick={() => handleOpenDelete({ id: 15 })}
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
    { id: "type", label: "Type" },
    { id: "language", label: "Language" },
    { id: "availability", label: "Availability" },
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
