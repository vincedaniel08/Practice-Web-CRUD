import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Mail, Facebook, GitHub } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import firebase from "../utils/firebase";
import ModalMenu from './ModalMenu'
import {
    Button,
    TextField,
    Typography,
    OutlinedInput,
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton,
    Card,
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
        height: "100vh",


    },
    fields: {
        margin: theme.spacing(1),

    },
    field1: {
        margin: theme.spacing(1),

    },

    field2: {
        margin: theme.spacing(1),
        marginBottom: 20,
    },

    text: {
        justifyContent: "center",
        alignItems: "center",
        display: 'flex',
    },

    loginCard: {
        minWidth: '300px',

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


}));



export default function Login() {

    const classes = useStyles();


    const botgoogle = () => {

        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
              

                // This gives you a Google Access Token. You can use it to access the Google API.
               
                // The signed-in user info.
           
               
               
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                alert(errorCode,email,credential,errorMessage);
            });
    }

    const botfacebook = () => {

        var provider = new firebase.auth.FacebookAuthProvider();

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
               

                // The signed-in user info.
               

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
              
                <ModalMenu/>
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                alert(errorCode,email,credential,errorMessage);
            });
    }

    const botgithub = () => {

        var provider = new firebase.auth.GithubAuthProvider();

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
               

                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                

                // The signed-in user info.
               
                <ModalMenu/>

                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                alert(errorCode,email,credential,errorMessage);
                
            });

    }

    const handleClickShowPassword = (e) => {
        setPayload({ ...payload, showPassword: !payload.showPassword })
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    const history = useHistory();

    const [payload, setPayload] = useState({
        email: "",
        password: "",
        showPassword: false,
    });

    const handleChange = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value })

    };

    const botlogin = (e) => {
        e.preventDefault();

        //backend
        firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then((user) => {
                // Signed in
                alert("Successfully Sign In");
                history.push("/home");
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorCode,errorMessage);
            });



    };

    return (
        <div className={classes.root}>
            <Typography variant="h3" color="textPrimary" >Sign In</Typography>
            <Card className={classes.loginCard}>
                <form className={classes.loginForm}>
                    <TextField className={classes.fields}
                        id="email" label="Email Address" variant="outlined"
                        onChange={handleChange("email")} value={payload.email} />

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
                    <Button className={classes.field2} variant="contained" color="primary" onClick={botlogin} >Login</Button>
                    <Typography variant="h7" color="textPrimary" className={classes.text} >Or Sign In with</Typography>
                    <Box className={classes.rootbox}>
                        <Box className={classes.parentbox}>
                            <Box className={classes.childbox}> <IconButton color="default" aria-label="add an alarm" onClick={botfacebook}> <Facebook /> </IconButton>
                                <IconButton color="default" aria-label="add an alarm" onClick={botgoogle}> <Mail /> </IconButton>
                                <IconButton color="default" aria-label="add an alarm" onClick={botgithub}> <GitHub /> </IconButton></Box>
                        </Box>
                    </Box>
                    <Button className={classes.field1} variant="contained" color="default" onClick={() => { history.push("/registration") }} > Dont Have Account </Button>
                    <Button className={classes.field2} variant="contained" color="secondary"onClick={() => { history.push("/forgotpassword") }} >Forgot Password</Button>
                </form>
            </Card>
        </div>
    )
}
