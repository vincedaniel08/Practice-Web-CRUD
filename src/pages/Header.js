import React from 'react';
import firebase from "../utils/firebase";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from "react-router-dom";


import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Payment from '@material-ui/icons/Payment';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    backgroundColor: 'black',
   
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
    
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export default function Header() {
    const history = useHistory();

    const Logout = () => {
    
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
        
      
        }).catch((error) => {
          // An error happened.
        });
    }    
    
    const [state, setState] = React.useState({

      left: false,
    
    });

    var user = firebase.auth().currentUser;
    var photoUrl;
    const classes = useStyles();


    if (user != null) {

        photoUrl = user.photoURL;
        


    }

  
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Drawer 
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Payment'].map((text) => (
          <ListItem button key={text} onClick={() => { history.push("/payment") }}>
            <ListItemIcon > <Payment /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
        {[""].map((anchor) => (
        <React.Fragment  key={anchor}>
          <IconButton className={classes.menuButton}  aria-label="menu"  color="inherit" onClick={toggleDrawer(anchor, true)}><MenuIcon />{anchor}</IconButton>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
         
          <Typography variant="h6"  className={classes.title}   onClick={() => { history.push("/home") }}>
            Reverb
          </Typography>
          {auth && (
            <div>
              
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={photoUrl} />
              </IconButton>
             
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleChange}></MenuItem>
                <MenuItem onClick={() => { history.push("/profile") }}>Profile</MenuItem>
                <MenuItem onClick={Logout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      </div>
   
  );
}
