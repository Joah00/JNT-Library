import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BackHandIcon from '@mui/icons-material/BackHand';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ApartmentIcon from '@mui/icons-material/Apartment';
import React from 'react';

export const SidebarData = [
    {
        title: "View Books",
        icon: <AccessTimeIcon/>,
        link: "/viewBooks"
    },
    {
        title: "Borrowed Books",
        icon: <AutoStoriesIcon/>,
        link: "/borrowedBooks"
    },
    {
        title: "Manage Accounts",
        icon: <BackHandIcon/>,
        link: "/manageAccounts"
    },
    {
        title: "Manage Books",
        icon: <ManageAccountsIcon/>,
        link: "/manageBooks"
    },
    {
        title: "Manage Borrowed Books",
        icon: <ApartmentIcon/>,
        link: "/manageBorrowedBooks"
    },
    {
        title: "Logout",
        icon: <AccessTimeIcon/>,
        link: "/loginPage"
    },
]
