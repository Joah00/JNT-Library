import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PageviewIcon from '@mui/icons-material/Pageview';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';

  export const SidebarData = {
    ADMIN: [
      { title: "Manage Books", link: "/manageBooks", icon: <ManageSearchIcon/> },
      { title: "Manage Accounts", link: "/manageAccounts", icon: <ManageAccountsIcon/> },
      { title: "View Books", link: "/viewBooks", icon: <PageviewIcon/> },
      {
        title: "Logout",
        icon: <LogoutIcon/>,
        link: "/loginPage"
    },
    ],
    USER: [
      { title: "View Books", link: "/viewBooks", icon: <PageviewIcon/> },
      {
        title: "Logout",
        icon: <LogoutIcon/>,
        link: "/loginPage"
    },
    ],
  };