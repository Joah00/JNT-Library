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
    { id: 'bookName', label: 'Book Name' },
    { id: 'author', label: 'Author'},
    { id: 'quantityLeft', label: 'Quantity Left' },
    { id: 'action', label: 'Action' },
  ];
  
  const initialData = [
    { id: 1, author: 'Alice Johnson', bookName: '001', bookName: 'The Great Gatsby', quantityLeft: '10/10', dateAndTime: '2023-10-25 14:30:00', actions: [<ButtonComponent buttonName="View Book Details"  onClick={handleOpen}/> ] },
    { id: 2, author: 'Bob Smith', bookName: '002', bookName: '1984', quantityLeft: '10/10', dateAndTime: '2023-10-26 09:00:00', actions: [<ButtonComponent buttonName="View Book Details"  onClick={handleOpen}/> ] },
    { id: 3, author: 'Clara Oswald', bookName: '003', bookName: 'To Kill a Mockingbird', quantityLeft: '10/10', dateAndTime: '2023-10-27 16:45:00', actions: [<ButtonComponent buttonName="View Book Details"  onClick={handleOpen}/> ] },
    { id: 4, author: 'David Tennant', bookName: '004', bookName: 'Pride and Prejudice', quantityLeft: '10/10', dateAndTime: '2023-10-30 10:00:00', actions: [<ButtonComponent buttonName="View Book Details"  onClick={handleOpen}/> ] },
    { id: 5, author: 'Ella Fitzgerald', bookName: '005', bookName: 'The Catcher in the Rye', quantityLeft: '10/10', dateAndTime: '2023-11-01 15:45:00', actions: [<ButtonComponent buttonName="View Book Details"  onClick={handleOpen}/> ] },
    { id: 6, author: 'Frank Sinatra', bookName: '006', bookName: 'Les Misérables', quantityLeft: '10/10', dateAndTime: '2023-11-02 11:00:00', actions: [<ButtonComponent buttonName="View Book Details"  onClick={handleOpen}/> ] },
    { id: 7, author: 'Grace Hopper', bookName: '007', bookName: 'Brave New World', quantityLeft: '10/10', dateAndTime: '2023-11-03 12:00:00', actions: [<ButtonComponent buttonName="View Book Details"  onClick={handleOpen}/> ] },
    { id: 8, author: 'Helen Mirren', bookName: '008', bookName: 'Slaughterhouse Five', quantityLeft: '10/10', dateAndTime: '2023-11-04 14:30:00', actions: [<ButtonComponent buttonName="View Book Details"  onClick={handleOpen}/> ] },
    { id: 9, author: 'Ian McKellen', bookName: '009', bookName: '1984', quantityLeft: '10/10', dateAndTime: '2023-11-05 15:00:00', actions: [<ButtonComponent buttonName="View Book Details"  onClick={handleOpen}/> ] },
    { id: 10, author: 'Judy Dench', bookName: '010', bookName: 'Don Quixote', quantityLeft: '10/10', dateAndTime: '2023-11-06 16:30:00', actions: [<ButtonComponent buttonName="View Book Details"  onClick={handleOpen}/> ] },
    { id: 11, author: 'Keanu Reeves', bookName: '011', bookName: 'The Brothers Karamazov', quantityLeft: '10/10', dateAndTime: '2023-11-07 17:00:00', actions: [<ButtonComponent buttonName="View Book Details"  onClick={handleOpen}/> ] },
    { id: 12, author: 'Lucy Liu', bookName: '012', bookName: 'The Trial', quantityLeft: '10/10', dateAndTime: '2023-11-08 18:30:00', actions: [<ButtonComponent buttonName="View Book Details"  onClick={handleOpen}/> ] },
    { id: 13, author: 'Morgan Freeman', bookName: '013', bookName: 'Moby Dick', quantityLeft: '10/10', dateAndTime: '2023-11-09 19:00:00', actions: [<ButtonComponent buttonName="View Book Details"  onClick={handleOpen}/> ] },
    { id: 14, author: 'Natalie Portman', bookName: '014', bookName: 'War and Peace', quantityLeft: '10/10', dateAndTime: '2023-11-10 20:00:00', actions: [<ButtonComponent buttonName="View Book Details"  onClick={handleOpen}/> ] },
    { id: 15, author: 'Oscar Wilde', bookName: '015', bookName: 'The Picture of Dorian Gray', quantityLeft: '10/10', dateAndTime: '2023-11-11 21:00:00', actions: [<ButtonComponent buttonName="View Book Details"  onClick={handleOpen}/> ] }
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
      item.bookName.toLowerCase().includes(lowercasedValue)
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