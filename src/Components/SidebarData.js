import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BackHandIcon from '@mui/icons-material/BackHand';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ApartmentIcon from '@mui/icons-material/Apartment';
import React from 'react';

export const SidebarData = [
    {
        title: "Overdue Borrowers",
        icon: <AccessTimeIcon/>,
        link: "/overdueBorrowers"
    },
    {
        title: "Borrowed Books",
        icon: <AutoStoriesIcon/>,
        link: "/borrowedBooks"
    },
    {
        title: "Manage Books",
        icon: <BackHandIcon/>,
        link: "/manageBooks"
    },
    {
        title: "Manage Users",
        icon: <ManageAccountsIcon/>,
        link: "/manageUsers"
    },
    {
        title: "Manage Branches",
        icon: <ApartmentIcon/>,
        link: "/manageBranches"
    }
]
