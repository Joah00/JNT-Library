import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import ViewBooks from './Pages/ViewBooks';
import BorrowedBooks from './Pages/BorrowedBooks';
import ManageAccounts from './Pages/ManageAccounts';
import ManageBooks from './Pages/ManageBooks';
import ManageBorrowedBooks from './Pages/ManageBorrowedBooks';
import MainLayout from './Layouts/MainLayout';

function App() {
  return (
    <div className="App">
      <>
      <Routes>
        <Route path="/" element={<Navigate to="/loginPage" />} />
        <Route path="/loginPage" element={<LoginPage/>} />
        <Route path="/viewBooks" element={<MainLayout><ViewBooks/></MainLayout>} />
        <Route path="/borrowedBooks" element={<MainLayout><BorrowedBooks/></MainLayout>} />
        <Route path="/manageAccounts" element={<MainLayout><ManageAccounts/></MainLayout>} />
        <Route path="/manageBooks" element={<MainLayout><ManageBooks/></MainLayout>} />
        <Route path="/manageBorrowedBooks" element={<MainLayout><ManageBorrowedBooks/></MainLayout>} />
      </Routes>
    </>
    </div>
  );
}

export default App;
