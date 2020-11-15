import React from 'react'
import Button from '@material-ui/core/Button';  
import Menu from '@material-ui/core/Menu';  
import MenuItem from '@material-ui/core/MenuItem';  
import AppBar from '@material-ui/core/AppBar';  
import Toolbar from '@material-ui/core/Toolbar';  
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { Divider, IconButton } from '@material-ui/core';

export default function Header() {
    const [openMenu, setOpenMenu] = React.useState(null);

    const handleClick = (event) => {
      setOpenMenu(true);
    };
  
    const handleClose = () => {
        setOpenMenu(false);
    };

    

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClick}
                    >
                    <MenuIcon fontSize="large" aria-label="menu" style={{ marginRight: [16] }} />
                    </IconButton>
                    <Menu open={openMenu} onClose={handleClose}>
                        <MenuItem>Login</MenuItem>
                        <MenuItem>Logout</MenuItem>
                    </Menu>
                    <Typography variant="h6">
                    Dual-N-Back | The Game
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
