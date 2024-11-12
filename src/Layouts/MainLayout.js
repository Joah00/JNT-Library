import React from 'react';
import SideBar from '../Components/Sidebar';
import './MainLayout.css'; 

function MainLayout({children, header}) {
  return (
    <div className="main-layout">
      <header className="header">
        <h1>JNT Library &emsp;|&emsp;{header}</h1>
      </header>
    
      <SideBar/>
      
      <div className="content-area">
        {children}
      </div>
      
    </div>
  );
}

export default MainLayout;
