import React from 'react';
import SideBar from '../Components/Sidebar';
import './MainLayout.css'; 

function MainLayout({children, header}) {
  return (
    <div className="main-layout">
      <header className="header">
        <h1>J-Library</h1>
      </header>
    
      <SideBar/>
      
      <div className="content-area">
        <h2>{header}</h2>
        {children}
      </div>
      
    </div>
  );
}

export default MainLayout;
