import React, { useState, useEffect } from "react";
import MainLayout from "../Layouts/MainLayout";
import SearchBar from "../Components/SearchBar";
import TableComponent from "../Components/TableComponent";
import ButtonComponent from "../Components/ButtonComponent";
import PopupComponent from "../Components/PopupComponent";
import SnackbarComponent from "../Components/SnackbarComponent";
import PopupComponentWFields from "../Components/PopupComponentWFields";
import "./ManageAccounts.css";

function ManageAccounts() {
  const columns = [
    { id: "username", label: "Username" },
    { id: "role", label: "Role" },
    { id: "action", label: "Action" },
  ];

  const initialUsers = [];

  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [userDetails, setUserDetails] = useState({});
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOpenUpdate = (id) => {
    console.log("Attempting to open update for user ID:", id);
    const user = users.find((user) => user.id === id);
    if (user) {
      setUserDetails({
        id: user.id,
        username: user.username,
        role: user.role,
      });
      setIsOpenUpdate(true);
      console.log("Update modal opened for user:", user);
    } else {
      console.log("No user found with ID:", id);
    }
};


  const handleOpenDelete = (id) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setUserDetails({ id: user.id });
      setIsOpenDelete(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    fetch("http://localhost/jntlibrarydb/ManageAccounts.php", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Fetched users:", data.data);
          const usersWithActions = data.data.map((user) => ({
            id: parseInt(user.id, 10),
            username: user.username,
            role: user.role,
            key: user.id, 
            actions: [
              <ButtonComponent
                key={`update-${user.id}`}
                buttonName="Update"
                maringRight="5px"
                onClick={() => handleOpenUpdate(user.id)}
              />,
              <ButtonComponent
                key={`delete-${user.id}`}
                buttonName="Delete"
                onClick={() => handleOpenDelete(user.id)}
              />,
            ],
          }));
          setUsers(usersWithActions);
          setFilteredUsers(usersWithActions);
        }
      })
      .catch((error) => console.error("Error fetching accounts:", error));
  }, []);
    

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  

  const handleUpdateUser = (updatedUserDetails) => {
    const token = localStorage.getItem("token");

    fetch("http://localhost/jntlibrarydb/ManageAccounts.php", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "update",
        id: updatedUserDetails.id, // Use hidden `id` for updating
        username: updatedUserDetails.username,
        password: updatedUserDetails.password, 
        role: updatedUserDetails.role,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const updatedUsers = users.map((user) =>
            user.id === updatedUserDetails.id
              ? { ...user, ...updatedUserDetails }
              : user
          );
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
          setIsOpenUpdate(false);
          handleSnackbarOpen("User updated successfully");
        } else {
          console.error("Failed to update user:", data.message);
        }
      })
      .catch((error) => console.error("Error updating user:", error));
  };


  const handleDeleteUser = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost/jntlibrarydb/ManageAccounts.php", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "delete",
        id: userDetails.id, // Use hidden `id` for deletion
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const updatedUsers = users.filter(
            (user) => user.id !== userDetails.id
          );
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
          setIsOpenDelete(false);
          handleSnackbarOpen("User deleted successfully");
        } else {
          console.error("Failed to delete user:", data.message);
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(value) ||
        user.role.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

   

  const handleOpenAddUser = () => {
    setUserDetails({
      id: users.length + 1,
      name: "",
      email: "",
      username: "",
    });
    setIsOpenAdd(true);
  };

  const handleAddNewUser = (newUserDetails) => {
    const token = localStorage.getItem("token");

    fetch("http://localhost/jntlibrarydb/ManageAccounts.php", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "add",
        username: newUserDetails.username,
        password: newUserDetails.password,
        role: newUserDetails.role,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Fetch updated data or update state with the new user
          handleSnackbarOpen("User added successfully");
        } else {
          console.error("Failed to add user:", data.message);
        }
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  return (
    <MainLayout header="Manage Accounts">
      <div className="content">
        <SearchBar
          placeholder="Search by Username"
          onChange={handleSearchChange}
        />
        <TableComponent columns={columns} data={filteredUsers} />

        <div className="addBtn">
          <ButtonComponent
            buttonName="Add New Account"
            buttonWidth="500px"
            buttonHeight="40px"
            marginRight="center"
            onClick={handleOpenAddUser}
          />
        </div>

        <PopupComponentWFields
          open={isOpenAdd}
          handleClose={() => setIsOpenAdd(false)}
          title="Add New Account"
          userDetails={userDetails}
          button1Name="Cancel"
          button2Name="Add User"
          button2OnClick={handleAddNewUser}
          fields={[
            { id: "username", label: "Username" },
            { id: "password", label: "Password" },
            { id: "role", label: "Role" },
          ]}
        />

        <PopupComponentWFields
          open={isOpenUpdate} // This should be true to show the popup
          handleClose={() => {
            console.log("Closing update popup"); // Debugging log
            setIsOpenUpdate(false);
          }}
          title="Update Account"
          userDetails={userDetails}
          button1Name="Cancel"
          button2Name="Update"
          button2OnClick={handleUpdateUser}
          fields={[
            { id: "username", label: "Username" },
            { id: "password", label: "Password" },
            { id: "role", label: "Role" },
          ]}
        />

        <PopupComponent
          open={isOpenDelete}
          handleClose={() => setIsOpenDelete(false)}
          title="Delete Confirmation"
          children={
            <div className="popup-container">
              <p>Are you sure you want to delete this user?</p>
              <ButtonComponent
                buttonName="Confirm"
                buttonWidth="auto"
                onClick={handleDeleteUser}
              />
            </div>
          }
        />
        <SnackbarComponent
          open={snackbarOpen}
          handleClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </div>
    </MainLayout>
  );
}

export default ManageAccounts;
