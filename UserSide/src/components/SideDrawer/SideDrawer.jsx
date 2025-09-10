import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Divider,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import {
  Dashboard,
  Dns,
  Search,
  Language,
  Http,
  Security,
  Lock,
  BugReport,
  Public,
  Insights,
  Description,
  Menu as MenuIcon,
  ChevronLeft,
} from "@mui/icons-material";

const drawerWidth = 240;
const collapsedWidth = 72;

// Guided Mode Menu
const guidedItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
  { text: "Analysis & Intel", icon: <Insights />, path: "/intel" },
  { text: "Report Generator", icon: <Description />, path: "/report" },
];

// Unguided Mode Menu
const unguidedItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
  { text: "Nmap", icon: <Dns />, path: "/nmap" },
  { text: "RustScan", icon: <Search />, path: "/rustscan" },
  { text: "Gobuster", icon: <Language />, path: "/gobuster" },
  { text: "WhatWeb", icon: <Http />, path: "/whatweb" },
  { text: "Nikto", icon: <Security />, path: "/nikto" },
  { text: "TestSSL", icon: <Lock />, path: "/testssl" },
  { text: "Nuclei", icon: <BugReport />, path: "/nuclei" },
  { text: "Subdomain Enum", icon: <Public />, path: "/subdomain-enum" },
  { text: "Analysis & Intel", icon: <Insights />, path: "/intel" },
  { text: "Report Generator", icon: <Description />, path: "/report" },
];

const SideDrawer = ({ type }) => {
  const [open, setOpen] = React.useState(false);

  // Select menu items based on mode
  const menuItems = type === "guided" ? guidedItems : unguidedItems;

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: "border-box",
          backgroundColor: "#0a0000",
          color: "#fff",
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
    >
      {/* Toggle button */}
      <div
        style={{
          display: "flex",
          justifyContent: open ? "flex-end" : "center",
          padding: "8px",
        }}
      >
        <IconButton onClick={() => setOpen(!open)} sx={{ color: "#ff6b6b" }}>
          {open ? <ChevronLeft /> : <MenuIcon />}
        </IconButton>
      </div>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      {/* Menu Items */}
      <List sx={{ py: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <Tooltip title={!open ? item.text : ""} placement="right" arrow>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&.active": {
                    backgroundColor: "rgba(255,80,80,0.2)",
                    borderLeft: "4px solid #ff3838",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#ff6b6b",
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideDrawer;
