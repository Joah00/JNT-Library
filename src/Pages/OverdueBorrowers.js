import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import SearchBar from "../Components/SearchBar";
import TableComponent from '../Components/TableComponent';
import ButtonComponent from '../Components/ButtonComponent';
import PopupComponent from "../Components/PopupComponent";
import SnackbarComponent from "../Components/SnackbarComponent";
import "./OverdueBorrowers.css";

function OverdueBorrowers() {
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
    { id: 'userID', label: 'User ID' },
    { id: 'name', label: 'Name'},
    { id: 'bookName', label: 'Book Name' },
    { id: 'dueDate', label: 'Due Date' },
    { id: 'dateAndTime', label: 'Date & Time' },
    { id: 'action', label: 'Action' },
  ];
  
  const initialData = [
    { id: 1, name: 'Alice Johnson', userID: '001', bookName: 'The Great Gatsby', dueDate: '2023-11-01', dateAndTime: '2023-10-25 14:30:00', actions: [<ButtonComponent buttonName="Notify User"  onClick={handleOpen}/> ] },
    { id: 2, name: 'Bob Smith', userID: '002', bookName: '1984', dueDate: '2023-11-05', dateAndTime: '2023-10-26 09:00:00', actions: [<ButtonComponent buttonName="Notify User"  onClick={handleOpen}/> ] },
    { id: 3, name: 'Clara Oswald', userID: '003', bookName: 'To Kill a Mockingbird', dueDate: '2023-11-08', dateAndTime: '2023-10-27 16:45:00', actions: [<ButtonComponent buttonName="Notify User"  onClick={handleOpen}/> ] },
    { id: 4, name: 'David Tennant', userID: '004', bookName: 'Pride and Prejudice', dueDate: '2023-11-10', dateAndTime: '2023-10-30 10:00:00', actions: [<ButtonComponent buttonName="Notify User"  onClick={handleOpen}/> ] },
    { id: 5, name: 'Ella Fitzgerald', userID: '005', bookName: 'The Catcher in the Rye', dueDate: '2023-11-12', dateAndTime: '2023-11-01 15:45:00', actions: [<ButtonComponent buttonName="Notify User"  onClick={handleOpen}/> ] },
    { id: 6, name: 'Frank Sinatra', userID: '006', bookName: 'Les Misérables', dueDate: '2023-11-15', dateAndTime: '2023-11-02 11:00:00', actions: [<ButtonComponent buttonName="Notify User"  onClick={handleOpen}/> ] },
    { id: 7, name: 'Grace Hopper', userID: '007', bookName: 'Brave New World', dueDate: '2023-11-18', dateAndTime: '2023-11-03 12:00:00', actions: [<ButtonComponent buttonName="Notify User"  onClick={handleOpen}/> ] },
    { id: 8, name: 'Helen Mirren', userID: '008', bookName: 'Slaughterhouse Five', dueDate: '2023-11-20', dateAndTime: '2023-11-04 14:30:00', actions: [<ButtonComponent buttonName="Notify User"  onClick={handleOpen}/> ] },
    { id: 9, name: 'Ian McKellen', userID: '009', bookName: '1984', dueDate: '2023-11-23', dateAndTime: '2023-11-05 15:00:00', actions: [<ButtonComponent buttonName="Notify User"  onClick={handleOpen}/> ] },
    { id: 10, name: 'Judy Dench', userID: '010', bookName: 'Don Quixote', dueDate: '2023-11-25', dateAndTime: '2023-11-06 16:30:00', actions: [<ButtonComponent buttonName="Notify User"  onClick={handleOpen}/> ] },
    { id: 11, name: 'Keanu Reeves', userID: '011', bookName: 'The Brothers Karamazov', dueDate: '2023-11-28', dateAndTime: '2023-11-07 17:00:00', actions: [<ButtonComponent buttonName="Notify User"  onClick={handleOpen}/> ] },
    { id: 12, name: 'Lucy Liu', userID: '012', bookName: 'The Trial', dueDate: '2023-12-01', dateAndTime: '2023-11-08 18:30:00', actions: [<ButtonComponent buttonName="Notify User"  onClick={handleOpen}/> ] },
    { id: 13, name: 'Morgan Freeman', userID: '013', bookName: 'Moby Dick', dueDate: '2023-12-04', dateAndTime: '2023-11-09 19:00:00', actions: [<ButtonComponent buttonName="Notify User"  onClick={handleOpen}/> ] },
    { id: 14, name: 'Natalie Portman', userID: '014', bookName: 'War and Peace', dueDate: '2023-12-07', dateAndTime: '2023-11-10 20:00:00', actions: [<ButtonComponent buttonName="Notify User"  onClick={handleOpen}/> ] },
    { id: 15, name: 'Oscar Wilde', userID: '015', bookName: 'The Picture of Dorian Gray', dueDate: '2023-12-10', dateAndTime: '2023-11-11 21:00:00', actions: [<ButtonComponent buttonName="Notify User"  onClick={handleOpen}/> ] }
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
    <MainLayout header="Overdue Borrowers">
        <SearchBar placeholder="Search by ID" onChange={handleSearchChange}/>
        <TableComponent columns={columns} data={filteredData}/> 
        <PopupComponent open={isOpen} handleClose={handleClose} title="Notify User">
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

export default OverdueBorrowers;