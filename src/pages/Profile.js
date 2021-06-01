import React, { useState } from 'react';
import firebase from "../utils/firebase";
import { Avatar, Modal, makeStyles, Backdrop, Fade } from '@material-ui/core';
import Header from "./Header";



import {
    Button,
    OutlinedInput,
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton,
    
} from "@material-ui/core";

import {
    Visibility,
    VisibilityOff
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "30vh",

    },
    fields: {
        margin: theme.spacing(1),

    },
    field1: {
        margin: theme.spacing(1),
       
    },

    loginCard: {
        minWidth: '80px',



    },
    text: {
        justifyContent: "center",
        alignItems: "center",
        display: 'flex',
    },

    loginForm: {
        display: "flex",
        flexDirection: "column",

    },

    rootbox: {
        flex: .8,
        flexDirection: 'column',
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: "center",
      
    },

    parentbox: {
        flex: 1,
        flexDirection: 'row',
    },

    childbox: {
        flexDirection: 'column'
    },

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },


}));



export default function Profile() {

    
    var user = firebase.auth().currentUser;
    var email, photoUrl,displayName;
    const classes = useStyles();


    if (user != null) {

        email = user.email;
        displayName = user.displayName;
        photoUrl = user.photoURL;



    }



    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const handleClickShowPassword = (e) => {
        setPayload({ ...payload, showPassword: !payload.showPassword })

    }

    const handleClickShowCofirmPassword = (e) => {

        setPayload({ ...payload, showConfirmPassword: !payload.showConfirmPassword })
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }


   

    const [payload, setPayload] = useState({
        password: "",
        confirmPassword: "",
        showPassword: false,
        showConfirmPassword: false,
    });

    const handleChange = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value })

    };

    const botSave = (e) => {
        e.preventDefault();

        var user = firebase.auth().currentUser;
        if (payload.password !== payload.confirmPassword) {
            alert("Password and Confirm Password does not match");
        }

        //databse

        else {

      
            var newPassword = payload.password;

            user.updatePassword(newPassword).then(function () {
                // Update successful.
                alert("Update Password Success");


                setPayload("");
                handleClose();

            }).catch(function (error) {

                alert("Cant Update you Password");
            })

        }




    };




    return (
        <div>
            <Header/>
            <h1>Profile</h1>
            <Avatar src={photoUrl} />
            <p>Email: {email}</p>
            <p>Welcome {displayName}</p>

            <button type="button" onClick={handleOpen}>
                Change Password
                 </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="simple-modal-title">New password</h2>
                        <p id="simple-modal-description">
                            Enter your new password
                <div className={classes.root}>
                                <form className={classes.loginForm} >
                                    <FormControl className={classes.fields} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="password"
                                            type={payload.showPassword ? 'text' : 'password'}
                                            value={payload.password}
                                            onChange={handleChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {payload.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            labelWidth={70}
                                        />
                                    </FormControl>

                                    <FormControl className={classes.fields} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                        <OutlinedInput
                                            id="confirmPassword"
                                            type={payload.showConfirmPassword ? 'text' : 'password'}
                                            value={payload.confirmPassword}
                                            onChange={handleChange('confirmPassword')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowCofirmPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {payload.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            labelWidth={70}
                                        />
                                    </FormControl>
                                    <Button className={classes.field1} variant="contained" color="primary" onClick={botSave} >Save</Button>
                                </form>
                            </div>
                        </p>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}
