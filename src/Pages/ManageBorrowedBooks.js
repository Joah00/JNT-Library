import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import SearchBar from "../Components/SearchBar";
import TableComponent from "../Components/TableComponent";
import ButtonComponent from "../Components/ButtonComponent";
import PopupComponent from "../Components/PopupComponent";
import { TextField, IconButton, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./ManageBorrowedBooks.css";

function ManageBorrowedBooks() {
  const handleClose = () => setIsOpen(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState({});
  const [username, setUsername] = useState("");
  const [books, setBooks] = useState([
    { bookName: "", author: "", quantity: 1 },
  ]);

  const handleOpen = (details) => {
    setIsOpen(true);
    setBookDetails(details);
  };

  const handleAddBookRow = () => {
    setBooks([...books, { bookName: "", author: "", quantity: 1 }]);
  };

  const handleRemoveBookRow = (index) => {
    if (books.length > 1) {
      setBooks(books.filter((_, i) => i !== index));
    }
  };

  const handleBookChange = (index, field, value) => {
    const updatedBooks = books.map((book, i) => {
      if (i === index) {
        if (field === "quantity" && value < 0) {
          value = 0;
        }
        return { ...book, [field]: value };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const columns = [
    { id: "id", label: "ID" },
    { id: "userID", label: "User ID" },
    { id: "name", label: "Name" },
    { id: "dueDate", label: "Due Date" },
    { id: "bookName", label: "Book Name" },
    { id: "action", label: "Action" },
  ];

  const initialData = [
    {
      id: 1,
      name: "Alice Johnson",
      userID: "001",
      bookName: "The Great Gatsby",
      dueDate: "2023-11-01",
      actions: [
        <ButtonComponent
          buttonName="View Book Details"
          onClick={() =>
            handleOpen({
              bookName: "The Great Gatsby",
              language: "English",
              type: "Fiction",
            })
          }
        />,
      ],
    },
    {
      id: 2,
      name: "Bob Smith",
      userID: "002",
      bookName: "1984",
      dueDate: "2023-11-05",
      actions: [
        <ButtonComponent
          buttonName="View Book Details"
          onClick={() =>
            handleOpen({
              bookName: "1984",
              language: "English",
              type: "Dystopian",
            })
          }
        />,
      ],
    },
    {
      id: 3,
      name: "Clara Oswald",
      userID: "003",
      bookName: "To Kill a Mockingbird",
      dueDate: "2023-11-08",
      actions: [
        <ButtonComponent
          buttonName="View Book Details"
          onClick={() =>
            handleOpen({
              bookName: "To Kill a Mockingbird",
              language: "English",
              type: "Fiction",
            })
          }
        />,
      ],
    },
    {
      id: 4,
      name: "David Tennant",
      userID: "004",
      bookName: "Pride and Prejudice",
      dueDate: "2023-11-10",
      actions: [
        <ButtonComponent
          buttonName="View Book Details"
          onClick={() =>
            handleOpen({
              bookName: "Pride and Prejudice",
              language: "English",
              type: "Romance",
            })
          }
        />,
      ],
    },
    {
      id: 5,
      name: "Ella Fitzgerald",
      userID: "005",
      amount: "$30.00",
      bookName: "The Catcher in the Rye",
      dueDate: "2023-11-12",
      actions: [
        <ButtonComponent
          buttonName="View Book Details"
          onClick={() =>
            handleOpen({
              bookName: "The Catcher in the Rye",
              language: "English",
              type: "Fiction",
            })
          }
        />,
      ],
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

  const handleReturnBook = () => {
    // Placeholder for handling the return book functionality
  };

  const handleBorrowBook = () => {
    // Placeholder for handling the borrow book functionality
  };

  const handleClearFields = () => {
    // Set username to an empty string to clear the input
    setUsername("");

    // Reset the books array to its initial state with a single empty row
    setBooks([{ bookName: "", author: "", quantity: 1 }]);
  };

  return (
    <MainLayout header="Manage Borrowed Books">
      {/* User and Book Input Section */}
      <Box
        sx={{
          backgroundColor: "#e0e0e0",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "20px",
          width: "124%",
          marginLeft: "18px",
        }}
      >
        <Typography variant="h6" sx={{ color: "black" }}>
          Borrow/Return Book
        </Typography>

        {/* Username Field */}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Books Fields */}
        {books.map((book, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            gap="10px"
            marginTop="10px"
          >
            <TextField
              label="Book Name"
              variant="outlined"
              fullWidth
              value={book.bookName}
              onChange={(e) =>
                handleBookChange(index, "bookName", e.target.value)
              }
            />
            <TextField
              label="Author"
              variant="outlined"
              fullWidth
              value={book.author}
              onChange={(e) =>
                handleBookChange(index, "author", e.target.value)
              }
            />
            <TextField
              label="Quantity"
              type="number"
              variant="outlined"
              fullWidth
              value={book.quantity}
              onChange={(e) =>
                handleBookChange(index, "quantity", e.target.value)
              }
            />

            <IconButton
              color="primary"
              onClick={handleAddBookRow}
              sx={{ marginLeft: "8px" }}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleRemoveBookRow(index)}
              disabled={books.length === 1} // Disable if only one row is left
            >
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
        <Box
          display="flex"
          justifyContent="flex-end"
          marginTop="15px"
        >
          <ButtonComponent
            buttonName="Return Book"
            buttonWidth="200px"
            buttonHeight="50px"
            marginRight="10px"
            onClick={handleReturnBook}
          />
          <ButtonComponent
            buttonName="Borrow Book"
            buttonWidth="200px"
            buttonHeight="50px"
            marginRight="10px"
            onClick={handleBorrowBook}
          />
          <ButtonComponent
            buttonName="Clear"
            buttonWidth="200px"
            buttonHeight="50px"
            onClick={handleClearFields}
          />
        </Box>
      </Box>

      <SearchBar placeholder="Search by ID" onChange={handleSearchChange} />
      <TableComponent columns={columns} data={filteredData}/>
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

export default ManageBorrowedBooks;
