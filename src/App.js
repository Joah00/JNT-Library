import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import BorrowedBooks from './Pages/BorrowedBooks';
import ManageBooks from './Pages/ManageBooks';
import ManageBranches from './Pages/ManageBranches';
import ManageUsers from './Pages/ManageUsers';
import OverdueBorrowers from './Pages/OverdueBorrowers';
import MainLayout from './Layouts/MainLayout';

function App() {
  return (
    <div className="App">
      <>
      <Routes>
      <Route path="/" element={<Navigate to="/overdueBorrowers" />} />
        <Route path="/overdueBorrowers" element={<MainLayout><OverdueBorrowers/></MainLayout>} />
        <Route path="/borrowedBooks" element={<MainLayout><BorrowedBooks/></MainLayout>} />
        <Route path="/manageBooks" element={<MainLayout><ManageBooks/></MainLayout>} />
        <Route path="/manageUsers" element={<MainLayout><ManageUsers/></MainLayout>} />
        <Route path="/manageBranches" element={<MainLayout><ManageBranches/></MainLayout>} />
      </Routes>
    </>
    </div>
  );
}

export default App;
