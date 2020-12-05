import React from 'react'
import Menu from '@material-ui/core/Menu';  
import MenuItem from '@material-ui/core/MenuItem';  
import AppBar from '@material-ui/core/AppBar';  
import Toolbar from '@material-ui/core/Toolbar';  
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { helpers } from "../helpers";
import { useHistory } from "react-router-dom";

export default function Header() {
    const [openMenu, setOpenMenu] = React.useState(false);
    const anchorRef = React.useRef(null);
    let history = useHistory();

    const handleClick = (event) => {
      setOpenMenu(true);
    };
  
    const handleClose = () => {
        setOpenMenu(false);
    };

    const logout = () => {
        helpers.DeleteToken();
        helpers.DeleteUsername();
        history.push('/');
        setOpenMenu(false);
    }

    const isLoggedIn = helpers.GetToken() ? true : false;

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClick}
                    >
                    <MenuIcon fontSize="large" aria-label="menu" style={{ marginRight: [16] }} ref={anchorRef} />
                    </IconButton>
                    <Menu open={openMenu} anchorEl={anchorRef.current} onClose={handleClose}>
                        <MenuItem component={Link} to={'/'} onClick={handleClose}>Game</MenuItem>
                        <MenuItem component={Link} to={'/rules'} onClick={handleClose}>Rules</MenuItem>
                        {isLoggedIn == false &&
                        <MenuItem component={Link} to={'/login'} onClick={handleClose} >Login</MenuItem>
                        }
                        {isLoggedIn == true &&
                        <MenuItem onClick={handleClose} onClick={logout}>Logout</MenuItem>
                        }
                    </Menu> 
                    <Typography variant="h6">
                    Dual-N-Back | The Game
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
