import React, { useState } from "react";
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
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "username", label: "Username" },
    { id: "action", label: "Action" },
  ];

  const initialUsers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      username: "alicej",
      actions: [
        <ButtonComponent
          key="update1"
          buttonName="Update"
          marginRight="7px"
          onClick={() => handleOpenUpdate(1)}
        />,
        <ButtonComponent
          key="delete1"
          buttonName="Delete"
          onClick={() => handleOpenDelete(1)}
        />,
      ],
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@example.com",
      username: "bobs",
      actions: [
        <ButtonComponent
          key="update2"
          buttonName="Update"
          marginRight="7px"
          onClick={() => handleOpenUpdate(2)}
        />,
        <ButtonComponent
          key="delete2"
          buttonName="Delete"
          onClick={() => handleOpenDelete(2)}
        />,
      ],
    },
    {
      id: 3,
      name: "Clara Oswald",
      email: "clara.oswald@example.com",
      username: "clara",
      actions: [
        <ButtonComponent
          key="update3"
          buttonName="Update"
          marginRight="7px"
          onClick={() => handleOpenUpdate(3)}
        />,
        <ButtonComponent
          key="delete3"
          buttonName="Delete"
          onClick={() => handleOpenDelete(3)}
        />,
      ],
    },
    {
      id: 4,
      name: "David Tennant",
      email: "david.tennant@example.com",
      username: "davidt",
      actions: [
        <ButtonComponent
          key="update4"
          buttonName="Update"
          marginRight="7px"
          onClick={() => handleOpenUpdate(4)}
        />,
        <ButtonComponent
          key="delete4"
          buttonName="Delete"
          onClick={() => handleOpenDelete(4)}
        />,
      ],
    },
    {
      id: 5,
      name: "Ella Fitzgerald",
      email: "ella.fitzgerald@example.com",
      username: "ellaf",
      actions: [
        <ButtonComponent
          key="update5"
          buttonName="Update"
          marginRight="7px"
          onClick={() => handleOpenUpdate(5)}
        />,
        <ButtonComponent
          key="delete5"
          buttonName="Delete"
          onClick={() => handleOpenDelete(5)}
        />,
      ],
    },
    {
      id: 6,
      name: "Frank Sinatra",
      email: "frank.sinatra@example.com",
      username: "franks",
      actions: [
        <ButtonComponent
          key="update6"
          buttonName="Update"
          marginRight="7px"
          onClick={() => handleOpenUpdate(6)}
        />,
        <ButtonComponent
          key="delete6"
          buttonName="Delete"
          onClick={() => handleOpenDelete(6)}
        />,
      ],
    },
    {
      id: 7,
      name: "Grace Hopper",
      email: "grace.hopper@example.com",
      username: "graceh",
      actions: [
        <ButtonComponent
          key="update7"
          buttonName="Update"
          marginRight="7px"
          onClick={() => handleOpenUpdate(7)}
        />,
        <ButtonComponent
          key="delete7"
          buttonName="Delete"
          onClick={() => handleOpenDelete(7)}
        />,
      ],
    },
    {
      id: 8,
      name: "Helen Mirren",
      email: "helen.mirren@example.com",
      username: "helenm",
      actions: [
        <ButtonComponent
          key="update8"
          buttonName="Update"
          marginRight="7px"
          onClick={() => handleOpenUpdate(8)}
        />,
        <ButtonComponent
          key="delete8"
          buttonName="Delete"
          onClick={() => handleOpenDelete(8)}
        />,
      ],
    },
    {
      id: 9,
      name: "Ian McKellen",
      email: "ian.mckellen@example.com",
      username: "ianm",
      actions: [
        <ButtonComponent
          key="update9"
          buttonName="Update"
          marginRight="7px"
          onClick={() => handleOpenUpdate(9)}
        />,
        <ButtonComponent
          key="delete9"
          buttonName="Delete"
          onClick={() => handleOpenDelete(9)}
        />,
      ],
    },
    {
      id: 10,
      name: "Judy Dench",
      email: "judy.dench@example.com",
      username: "judyd",
      actions: [
        <ButtonComponent
          key="update10"
          buttonName="Update"
          marginRight="7px"
          onClick={() => handleOpenUpdate(10)}
        />,
        <ButtonComponent
          key="delete10"
          buttonName="Delete"
          onClick={() => handleOpenDelete(10)}
        />,
      ],
    },
    {
      id: 11,
      name: "Keanu Reeves",
      email: "keanu.reeves@example.com",
      username: "keanur",
      actions: [
        <ButtonComponent
          key="update11"
          buttonName="Update"
          marginRight="7px"
          onClick={() => handleOpenUpdate(11)}
        />,
        <ButtonComponent
          key="delete11"
          buttonName="Delete"
          onClick={() => handleOpenDelete(11)}
        />,
      ],
    },
    {
      id: 12,
      name: "Lucy Liu",
      email: "lucy.liu@example.com",
      username: "lucyl",
      actions: [
        <ButtonComponent
          key="update12"
          buttonName="Update"
          marginRight="7px"
          onClick={() => handleOpenUpdate(12)}
        />,
        <ButtonComponent
          key="delete12"
          buttonName="Delete"
          onClick={() => handleOpenDelete(12)}
        />,
      ],
    },
    {
      id: 13,
      name: "Morgan Freeman",
      email: "morgan.freeman@example.com",
      username: "morganf",
      actions: [
        <ButtonComponent
          key="update13"
          buttonName="Update"
          marginRight="7px"
          onClick={() => handleOpenUpdate(13)}
        />,
        <ButtonComponent
          key="delete13"
          buttonName="Delete"
          onClick={() => handleOpenDelete(13)}
        />,
      ],
    },
    {
      id: 14,
      name: "Natalie Portman",
      email: "natalie.portman@example.com",
      username: "nataliep",
      actions: [
        <ButtonComponent
          key="update14"
          buttonName="Update"
          marginRight="7px"
          onClick={() => handleOpenUpdate(14)}
        />,
        <ButtonComponent
          key="delete14"
          buttonName="Delete"
          onClick={() => handleOpenDelete(14)}
        />,
      ],
    },
    {
      id: 15,
      name: "Oscar Wilde",
      email: "oscar.wilde@example.com",
      username: "oscarw",
      actions: [
        <ButtonComponent
          key="update15"
          buttonName="Update"
          marginRight="7px"
          onClick={() => handleOpenUpdate(15)}
        />,
        <ButtonComponent
          key="delete15"
          buttonName="Delete"
          onClick={() => handleOpenDelete(15)}
        />,
      ],
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [userDetails, setUserDetails] = useState({});
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleOpenAddUser = () => {
    setUserDetails({
      id: users.length + 1,  
      name: "",
      email: "",
      username: ""
    });
    setIsOpenAdd(true);
  };

  const handleAddNewUser = (newUserDetails) => {
    const newUser = {
      ...newUserDetails,
      id: users.length + 1,  // Properly assign a new ID
      actions: [
        <ButtonComponent
          key={`update${users.length + 1}`}
          buttonName="Update"
          marginRight="7px"
          onClick={() => handleOpenUpdate(newUserDetails)}
        />,
        <ButtonComponent
          key={`delete${users.length + 1}`}
          buttonName="Delete"
          onClick={() => handleOpenDelete(newUserDetails)}
        />,
      ],
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    setFilteredUsers(prevFiltered => [...prevFiltered, newUser]);
    setIsOpenAdd(false);
    handleSnackbarOpen("New user added successfully");
  };

  const handleOpenUpdate = (id) => {
    const user = users.find(user => user.id === id);
    if (user) {
      setUserDetails(user);
      setIsOpenUpdate(true);
    }
  };

  const handleUpdateUser = (updatedUserDetails) => {
    const updatedUsers = users.map(user =>
      user.id === updatedUserDetails.id ? {...user, ...updatedUserDetails} : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setIsOpenUpdate(false);
    handleSnackbarOpen("User updated successfully");
  };
  

  const handleOpenDelete = (id) => {
    const user = users.find(user => user.id === id);
    if (user) {
      setUserDetails(user);
      setIsOpenDelete(true);
    }
  };

  const handleDeleteUser = () => {
    const updatedUsers = users.filter(user => user.id !== userDetails.id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setIsOpenDelete(false);
    handleSnackbarOpen("User deleted successfully");
  };
  

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.username.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  return (
    <MainLayout header="Manage Accounts">
      <div className="content">
        <SearchBar
          placeholder="Search by Name, Email, or Username"
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
            { id: "name", label: "Name" },
            { id: "email", label: "Email" },
            { id: "username", label: "Username" },
          ]}
        />

        <PopupComponentWFields
          open={isOpenUpdate}
          handleClose={() => setIsOpenUpdate(false)}
          title="Update Account"
          userDetails={userDetails}
          button1Name="Cancel"
          button2Name="Update"
          button2OnClick={handleUpdateUser}
          fields={[
            { id: "name", label: "Name" },
            { id: "email", label: "Email" },
            { id: "username", label: "Username" }
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
