import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import SearchBar from "../Components/SearchBar";
import TableComponent from '../Components/TableComponent';
import ButtonComponent from '../Components/ButtonComponent';
import PopupComponent from "../Components/PopupComponent";
import SnackbarComponent from "../Components/SnackbarComponent";
import PopupComponentWFields from "../Components/PopupComponentWFields";
import "./ManageBranches.css";

function ManageBranches() {
  const initialData = [
    { id: 1, branchName: 'Central Library', contactNo: '1234567890', Location: '101 Main St', actions: [<ButtonComponent key="update1" buttonName="Update" marginRight="7px" onClick={() => handleOpenUpdate(1)} />, <ButtonComponent key="delete1" buttonName="Delete" onClick={() => handleOpenDelete(1)} />] },
    { id: 2, branchName: 'Westside Branch', contactNo: '1234567891', Location: '202 West St', actions: [<ButtonComponent key="update2" buttonName="Update" marginRight="7px" onClick={() => handleOpenUpdate(2)} />, <ButtonComponent key="delete2" buttonName="Delete" onClick={() => handleOpenDelete(2)} />] },
    { id: 3, branchName: 'Eastside Branch', contactNo: '1234567892', Location: '303 East Ave', actions: [<ButtonComponent key="update3" buttonName="Update" marginRight="7px" onClick={() => handleOpenUpdate(3)} />, <ButtonComponent key="delete3" buttonName="Delete" onClick={() => handleOpenDelete(3)} />] },
    { id: 4, branchName: 'North Branch', contactNo: '1234567893', Location: '404 North Rd', actions: [<ButtonComponent key="update4" buttonName="Update" marginRight="7px" onClick={() => handleOpenUpdate(4)} />, <ButtonComponent key="delete4" buttonName="Delete" onClick={() => handleOpenDelete(4)} />] },
    { id: 5, branchName: 'South Branch', contactNo: '1234567894', Location: '505 South Dr', actions: [<ButtonComponent key="update5" buttonName="Update" marginRight="7px" onClick={() => handleOpenUpdate(5)} />, <ButtonComponent key="delete5" buttonName="Delete" onClick={() => handleOpenDelete(5)} />] },
    { id: 6, branchName: 'Riverdale Library', contactNo: '1234567895', Location: '606 River Rd', actions: [<ButtonComponent key="update6" buttonName="Update" marginRight="7px" onClick={() => handleOpenUpdate(6)} />, <ButtonComponent key="delete6" buttonName="Delete" onClick={() => handleOpenDelete(6)} />] },
    { id: 7, branchName: 'Lakeside Library', contactNo: '1234567896', Location: '707 Lake Ln', actions: [<ButtonComponent key="update7" buttonName="Update" marginRight="7px" onClick={() => handleOpenUpdate(7)} />, <ButtonComponent key="delete7" buttonName="Delete" onClick={() => handleOpenDelete(7)} />] },
    { id: 8, branchName: 'Mountain View Library', contactNo: '1234567897', Location: '808 Mountain Pl', actions: [<ButtonComponent key="update8" buttonName="Update" marginRight="7px" onClick={() => handleOpenUpdate(8)} />, <ButtonComponent key="delete8" buttonName="Delete" onClick={() => handleOpenDelete(8)} />] },
    { id: 9, branchName: 'Valley Forge Library', contactNo: '1234567898', Location: '909 Valley Rd', actions: [<ButtonComponent key="update9" buttonName="Update" marginRight="7px" onClick={() => handleOpenUpdate(9)} />, <ButtonComponent key="delete9" buttonName="Delete" onClick={() => handleOpenDelete(9)} />] },
    { id: 10, branchName: 'Hilltop Library', contactNo: '1234567899', Location: '1010 Hill St', actions: [<ButtonComponent key="update10" buttonName="Update" marginRight="7px" onClick={() => handleOpenUpdate(10)} />, <ButtonComponent key="delete10" buttonName="Delete" onClick={() => handleOpenDelete(10)} />] },
    { id: 11, branchName: 'Seaside Library', contactNo: '1234567810', Location: '1111 Sea Blvd', actions: [<ButtonComponent key="update11" buttonName="Update" marginRight="7px" onClick={() => handleOpenUpdate(11)} />, <ButtonComponent key="delete11" buttonName="Delete" onClick={() => handleOpenDelete(11)} />] },
    { id: 12, branchName: 'Forest Grove Library', contactNo: '1234567811', Location: '1212 Forest Ln', actions: [<ButtonComponent key="update12" buttonName="Update" marginRight="7px" onClick={() => handleOpenUpdate(12)} />, <ButtonComponent key="delete12" buttonName="Delete" onClick={() => handleOpenDelete(12)} />] },
    { id: 13, branchName: 'Desert Sands Library', contactNo: '1234567812', Location: '1313 Desert Dr', actions: [<ButtonComponent key="update13" buttonName="Update" marginRight="7px" onClick={() => handleOpenUpdate(13)} />, <ButtonComponent key="delete13" buttonName="Delete" onClick={() => handleOpenDelete(13)} />] },
    { id: 14, branchName: 'City Center Library', contactNo: '1234567813', Location: '1414 Center St', actions: [<ButtonComponent key="update14" buttonName="Update" marginRight="7px" onClick={() => handleOpenUpdate(14)} />, <ButtonComponent key="delete14" buttonName="Delete" onClick={() => handleOpenDelete(14)} />] },
    { id: 15, branchName: 'Suburban Library', contactNo: '1234567814', Location: '1515 Suburb Ln', actions: [<ButtonComponent key="update15" buttonName="Update" marginRight="7px" onClick={() => handleOpenUpdate(15)} />, <ButtonComponent key="delete15" buttonName="Delete" onClick={() => handleOpenDelete(15)} />] }
  ];

  const [branches, setBranches] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [branchDetails, setBranchDetails] = useState({});
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackBarMessage, setSnackbarMessage] = useState({});
  

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOpenAddBranch = () => {
    setBranchDetails({
      id: branches.length + 1,
      branchName: "",
      contactNo: "",
      Location: ""
    });
    setIsOpenAdd(true);
  };

  const handleAddNewBranch = (newBranchDetails) => {
    const newBranch = {
      ...newBranchDetails,
      actions: createActions(newBranchDetails.id)
    };
    setBranches([...branches, newBranch]);
    setFilteredData([...branches, newBranch]);
    setIsOpenAdd(false);
    handleSnackbarOpen("New branch added successfully");
  };

  const handleOpenUpdate = (id) => {
    const branch = branches.find(b => b.id === id);
    setBranchDetails(branch);
    setIsOpenUpdate(true);
  };

  const handleUpdateBranch = (updatedBranchDetails) => {
    const updatedBranches = branches.map(branch =>
      branch.id === updatedBranchDetails.id ? { ...branch, ...updatedBranchDetails } : branch
    );
    setBranches(updatedBranches);
    setFilteredData(updatedBranches);
    setIsOpenUpdate(false);
    handleSnackbarOpen("Branch updated successfully");
  };

  const handleOpenDelete = (id) => {
    const branch = branches.find(b => b.id === id);
    setBranchDetails(branch);
    setIsOpenDelete(true);
  };

  const handleDeleteBranch = () => {
    const updatedBranches = branches.filter(branch => branch.id !== branchDetails.id);
    setBranches(updatedBranches);
    setFilteredData(updatedBranches);
    setIsOpenDelete(false);
    handleSnackbarOpen("Branch deleted successfully");
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    const filtered = branches.filter(branch =>
      branch.id.toString().includes(value) ||
      branch.branchName.toLowerCase().includes(value) ||
      branch.contactNo.includes(value) ||
      branch.Location.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const createActions = (id) => [
    <ButtonComponent key={`update${id}`} buttonName="Update" marginRight="7px" onClick={() => handleOpenUpdate(id)} />,
    <ButtonComponent key={`delete${id}`} buttonName="Delete" onClick={() => handleOpenDelete(id)} />
  ];

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'branchName', label: 'Branch Name' },
    { id: 'contactNo', label: 'Contact No' },
    { id: 'Location', label: 'Location' },
    { id: 'action', label: 'Action' }
  ];

  return (
    <MainLayout header="Manage Branches">
      <div className="content">
        <SearchBar placeholder="Search by ID" onChange={handleSearchChange} />
        <TableComponent columns={columns} data={filteredData} />
        <div className="addBtn">
          <ButtonComponent
            buttonName="Add New Branch"
            buttonWidth="500px"
            buttonHeight="40px"
            marginRight="center"
            onClick={handleOpenAddBranch}
          />
        </div>

        <PopupComponentWFields
          open={isOpenAdd}
          handleClose={() => setIsOpenAdd(false)}
          title="Add New Branch"
          userDetails={branchDetails}
          button1Name="Cancel"
          button2Name="Add Branch"
          button2OnClick={handleAddNewBranch}
          fields={[
            { id: "branchName", label: "Branch Name" },
            { id: "contactNo", label: "Contact No" },
            { id: "Location", label: "Location" }
          ]}
        />

        <PopupComponentWFields
          open={isOpenUpdate}
          handleClose={() => setIsOpenUpdate(false)}
          title="Update Branch"
          userDetails={branchDetails}
          button1Name="Cancel"
          button2Name="Update"
          button2OnClick={handleUpdateBranch}
          fields={[
            { id: "branchName", label: "Branch Name" },
            { id: "contactNo", label: "Contact No" },
            { id: "Location", label: "Location" }
          ]}
        />

        <PopupComponent
          open={isOpenDelete}
          handleClose={() => setIsOpenDelete(false)}
          title="Delete Confirmation"
          children={
            <div className="popup-container">
              <p>Are you sure you want to delete this branch?</p>
              <ButtonComponent
                buttonName="Confirm"
                buttonWidth="auto"
                onClick={handleDeleteBranch}
              />
            </div>
          }
        />

        <SnackbarComponent
          open={snackbarOpen}
          handleClose={handleSnackbarClose}
          message="Operation completed successfully"
        />
      </div>
    </MainLayout>
  );
}

export default ManageBranches;
