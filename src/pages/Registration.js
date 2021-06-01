import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import firebase from "../utils/firebase";
import { Mail, Facebook, GitHub} from '@material-ui/icons';
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
        marginBottom: 20,
    },
   
    loginCard: {
        minWidth: '300px',
 
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

    rootbox:{
        flex: .8,
        flexDirection: 'column',
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: "center",

    },

    parentbox:{
        flex: 1,
        flexDirection: 'row', 
    },

    childbox:{
        flexDirection: 'column'
    },

}));



export default function Registration() {

    const classes = useStyles();

    const botgoogle = () => {

        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                history.push("/home");
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
                var credential = result.credential;

                // The signed-in user info.
                var user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var accessToken = credential.accessToken;
                history.push("/home");
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
                var credential = result.credential;

                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                var token = credential.accessToken;

                // The signed-in user info.
                var user = result.user;
                history.push("/home");

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
    
    const handleClickShowCofirmPassword = (e) => {
        
        setPayload({ ...payload, showConfirmPassword: !payload.showConfirmPassword })
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }


    const history = useHistory();

    const [payload, setPayload] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
        showConfirmPassword: false,
    });

    const handleChange = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value })

    };

    const botSignup = (e) => {
        e.preventDefault();

        if(payload.password !== payload.confirmPassword){
            alert("Password and Confirm Password does not match");
        }



        else{

        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          // Signed in 
          alert("Successfully Registered");
          
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorCode,errorMessage);
          // ..
        });

    }

    };

    return (
        <div className={classes.root}>
             <Typography variant="h3" color="textPrimary" >Sign Up</Typography>
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

                    <FormControl className={classes.fields} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="confirmPassword"
                            type={payload.showConfirmPassword? 'text' : 'password'}
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
                    <Button className={classes.field1} variant="contained" color="primary" onClick={botSignup} >Sign Up</Button>
                    <Typography variant="h7" color="textPrimary" className={classes.text}>Or Sign Up with</Typography>
                    <Box className={classes.rootbox}>
                    <Box className={classes.parentbox}> 
                    <Box className={classes.childbox}> <IconButton color="default" aria-label="add an alarm"onClick={botfacebook}>   <Facebook /> </IconButton>
                    <IconButton color="default" aria-label="add an alarm" onClick={botgoogle}> <Mail /> </IconButton>
                    <IconButton color="default" aria-label="add an alarm" onClick={botgithub}>  <GitHub/> </IconButton></Box>
                    </Box>  
                    </Box>
                    <Button className={classes.field1} variant="contained" color="default" onClick={() => { history.push("/login") }} >Already have an account</Button>
                    
                </form>
            </Card>
        </div>
    )
}
