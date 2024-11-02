import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css";
import { SidebarData } from "./SidebarData"; 

function Sidebar() {
  const [updateToggle, setUpdateToggle] = useState(false);

  const handleClick = () => {
    setUpdateToggle(!updateToggle);
  };

  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className={window.location.pathname === val.link ? "row active" : "row"}
              onClick={handleClick} 
            >
              <Link to={val.link} className="SidebarItem" onClick={handleClick}>
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
