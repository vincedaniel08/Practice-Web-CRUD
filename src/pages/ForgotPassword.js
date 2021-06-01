import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import firebase from "../utils/firebase";
import {
    Button,
    TextField,
    Typography,
    Card,
} from "@material-ui/core";



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
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: "center",
        flexDirection: "column",
    },

    parentbox: {
        flex: 1,
        flexDirection: 'row',
    },

    childbox: {
        flexDirection: 'column'
    },


}));



export default function ForgotPassword() {

    const classes = useStyles();

    
    const history = useHistory();

    const [payload, setPayload] = useState({
        email: "",
       
    });

    const handleChange = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value })

    };

    const botsend = (e) => {
        e.preventDefault();

        //backend
        var auth = firebase.auth();
        var emailAddress = payload.email;
        
        auth.sendPasswordResetEmail(emailAddress).then(function() {
          // Email sent.
          alert("Email sent");
        }).catch(function(error) {
          // An error happened.
          alert("Your Email is not register");
        });


    };

    return (
        <div className={classes.root}>
            <Typography variant="h3" color="textPrimary" >Forgot Password</Typography>
            <Card className={classes.loginCard}>
                <form className={classes.loginForm}>
                <TextField className={classes.fields}
                        id="email" label="Email Address" variant="outlined"
                        onChange={handleChange("email")} value={payload.forgotemail} />
                        <Button className={classes.field2} variant="contained" color="primary" onClick={botsend} >Send</Button>
                     <Button className={classes.field1} variant="contained" color="default" onClick={() => { history.push("/login") }} > Login </Button>   
                    <Button className={classes.field1} variant="contained" color="default" onClick={() => { history.push("/registration") }} > Dont Have an Account </Button>
                    
                </form>
            </Card>
        </div>
    )
}
