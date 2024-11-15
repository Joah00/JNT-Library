import React from "react";
import { useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");

  const handleLogout = () => {
    // Trigger a logout request to the server using token-based authentication
    fetch("http://localhost/jntlibrarydb/logout.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}` // Include the token in the Authorization header
        },
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            localStorage.removeItem("token"); // Clear the token on successful logout
            localStorage.removeItem("userRole"); // Optionally clear the user role
            navigate("/loginPage"); // Redirect to login page
        } else {
            console.error("Logout failed:", data.message);
        }
    })
    .catch((error) => console.error("Error during logout:", error));
};

  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData[role]?.map((val, key) => (
          <li
            key={key}
            className="row"
            onClick={val.title === "Logout" ? handleLogout : undefined}
          >
            {val.title === "Logout" ? (
              <div
                className="SidebarItem"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </div>
            ) : (
              <a href={val.link} className="SidebarItem">
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
