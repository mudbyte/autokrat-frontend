/**
 *     Autokrat frontend
 *     Copyright (C) 2022  mudbyte e.V.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import MemberTable from "./MemberTable";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import MemberForm from "./MemberForm";
import {Navigate, Link, Route, Routes} from "react-router-dom";

const drawerWidth = 240;

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
      <div>
        <Toolbar/>
        <Divider/>
        <List>
          <ListItem component={Link} to="/members/new" key={'Add'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddIcon/>
              </ListItemIcon>
              <ListItemText style={{color: 'black'}} primary={'Mitglied hinzufügen'}/>
            </ListItemButton>
          </ListItem>
          <ListItem component={Link} to="/members" key={'Mitgliederliste'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FormatListBulletedIcon/>
              </ListItemIcon>
              <ListItemText style={{color: 'black'}} primary={'Mitgliederliste'}/>
            </ListItemButton>
          </ListItem>
        </List>
      </div>
  );

  return (
      <Box sx={{display: 'flex'}}>
        <CssBaseline/>
        <AppBar
            position="fixed"
            sx={{
              width: {sm: `calc(100% - ${drawerWidth}px)`},
              ml: {sm: `${drawerWidth}px`},
            }}
        >
          <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{mr: 2, display: {sm: 'none'}}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Mitgliederliste
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
            component="nav"
            sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
            aria-label="navigation entries"
        >
          <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{keepMounted: true}}
              sx={{
                display: {xs: 'block', sm: 'none'},
                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
              }}
          >
            {drawer}
          </Drawer>
          <Drawer
              variant="permanent"
              sx={{
                display: {xs: 'none', sm: 'block'},
                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
              }}
              open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
            component="main"
            sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
        >
          <Toolbar/>
          <Routes>
            <Route path="*" element={<Navigate replace to="/members"/>}/>
            <Route path="/members/new" element={<MemberForm/>}/>
            <Route path="/members" element={<MemberTable/>}/>
          </Routes>
        </Box>
      </Box>
  );
}

export default App;
