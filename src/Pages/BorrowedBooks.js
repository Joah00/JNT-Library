import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import SearchBar from "../Components/SearchBar";
import TableComponent from '../Components/TableComponent';
import ButtonComponent from '../Components/ButtonComponent';
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
    { id: 'id', label: 'ID' },
    { id: 'userID', label: 'User ID' },
    { id: 'name', label: 'Name'},
    { id: 'amount', label: 'Amount' },
    { id: 'dueDate', label: 'Due Date' },
    { id: 'bookName', label: 'Book Name' },
    { id: 'action', label: 'Action' },
  ];
  
  const initialData = [
    { id: 1, name: 'Alice Johnson', userID: '001', amount: '$20.00', bookName: 'The Great Gatsby', dueDate: '2023-11-01', actions: [<ButtonComponent buttonName="View Book Details" onClick={() => handleOpen({bookName: 'The Great Gatsby', language: 'English', type: 'Fiction'})}/> ] },
    { id: 2, name: 'Bob Smith', userID: '002', amount: '$15.50', bookName: '1984', dueDate: '2023-11-05', actions: [<ButtonComponent buttonName="View Book Details" onClick={() => handleOpen({bookName: '1984', language: 'English', type: 'Dystopian'})}/> ] },
    { id: 3, name: 'Clara Oswald', userID: '003', amount: '$18.75', bookName: 'To Kill a Mockingbird', dueDate: '2023-11-08', actions: [<ButtonComponent buttonName="View Book Details" onClick={() => handleOpen({bookName: 'To Kill a Mockingbird', language: 'English', type: 'Fiction'})}/> ] },
    { id: 4, name: 'David Tennant', userID: '004', amount: '$22.00', bookName: 'Pride and Prejudice', dueDate: '2023-11-10', actions: [<ButtonComponent buttonName="View Book Details" onClick={() => handleOpen({bookName: 'Pride and Prejudice', language: 'English', type: 'Romance'})}/> ] },
    { id: 5, name: 'Ella Fitzgerald', userID: '005', amount: '$30.00', bookName: 'The Catcher in the Rye', dueDate: '2023-11-12', actions: [<ButtonComponent buttonName="View Book Details" onClick={() => handleOpen({bookName: 'The Catcher in the Rye', language: 'English', type: 'Fiction'})}/> ] },
    { id: 6, name: 'Frank Sinatra', userID: '006', amount: '$25.00', bookName: 'Les Misérables', dueDate: '2023-11-15', actions: [<ButtonComponent buttonName="View Book Details" onClick={() => handleOpen({bookName: 'Les Misérables', language: 'French', type: 'Drama'})}/> ] },
    { id: 7, name: 'Grace Hopper', userID: '007', amount: '$12.00', bookName: 'Brave New World', dueDate: '2023-11-18', actions: [<ButtonComponent buttonName="View Book Details" onClick={() => handleOpen({bookName: 'Brave New World', language: 'English', type: 'Dystopian'})}/> ] },
    { id: 8, name: 'Helen Mirren', userID: '008', amount: '$13.45', bookName: 'Slaughterhouse Five', dueDate: '2023-11-20', actions: [<ButtonComponent buttonName="View Book Details" onClick={() => handleOpen({bookName: 'Slaughterhouse Five', language: 'English', type: 'Science Fiction'})}/> ] },
    { id: 9, name: 'Ian McKellen', userID: '009', amount: '$19.95', bookName: '1984', dueDate: '2023-11-23', actions: [<ButtonComponent buttonName="View Book Details" onClick={() => handleOpen({bookName: '1984', language: 'English', type: 'Dystopian'})}/> ] },
    { id: 10, name: 'Judy Dench', userID: '010', amount: '$14.30', bookName: 'Don Quixote', dueDate: '2023-11-25', actions: [<ButtonComponent buttonName="View Book Details" onClick={() => handleOpen({bookName: 'Don Quixote', language: 'Spanish', type: 'Adventure'})}/> ] },
    { id: 11, name: 'Keanu Reeves', userID: '011', amount: '$16.50', bookName: 'The Brothers Karamazov', dueDate: '2023-11-28', actions: [<ButtonComponent buttonName="View Book Details" onClick={() => handleOpen({bookName: 'The Brothers Karamazov', language: 'Russian', type: 'Philosophical'})}/> ] },
    { id: 12, name: 'Lucy Liu', userID: '012', amount: '$11.00', bookName: 'The Trial', dueDate: '2023-12-01', actions: [<ButtonComponent buttonName="View Book Details" onClick={() => handleOpen({bookName: 'The Trial', language: 'German', type: 'Fiction'})}/> ] },
    { id: 13, name: 'Morgan Freeman', userID: '013', amount: '$20.75', bookName: 'Moby Dick', dueDate: '2023-12-04', actions: [<ButtonComponent buttonName="View Book Details" onClick={() => handleOpen({bookName: 'Moby Dick', language: 'English', type: 'Adventure'})}/> ] },
    { id: 14, name: 'Natalie Portman', userID: '014', amount: '$23.50', bookName: 'War and Peace', dueDate: '2023-12-07', actions: [<ButtonComponent buttonName="View Book Details" onClick={() => handleOpen({bookName: 'War and Peace', language: 'Russian', type: 'Historical'})}/> ] },
    { id: 15, name: 'Oscar Wilde', userID: '015', amount: '$18.00', bookName: 'The Picture of Dorian Gray', dueDate: '2023-12-10', actions: [<ButtonComponent buttonName="View Book Details" onClick={() => handleOpen({bookName: 'The Picture of Dorian Gray', language: 'English', type: 'Philosophical'})}/> ] }
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
    item.userID.toLowerCase().includes(lowercasedValue)
  );
  setFilteredData(filtered);
};

  return (
    <MainLayout header="Borrowed Books">
      <SearchBar placeholder="Search by ID" onChange={handleSearchChange}/>
        <TableComponent columns={columns} data={filteredData}/> 
        <PopupComponent open={isOpen} handleClose={handleClose} title="View Book Details">
          <div className="popup-container">
            Book Name: {bookDetails.bookName} <br/>
            Language: {bookDetails.language} <br/>
            Type: {bookDetails.type} <br/> <br/> <br/>
            <ButtonComponent buttonName="Close" buttonWidth="auto" marginRight="center" onClick={handleClose}/>
          </div>
        </PopupComponent>
    </MainLayout>
  );
}

export default BorrowedBooks;
