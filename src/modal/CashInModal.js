import React, { useState } from 'react';
import firebase from "../utils/firebase";
import { makeStyles, Modal, Paper, TextField, Typography, Grid, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: 500,
        padding: theme.spacing(3),
    }
}));

const db = firebase.firestore();

export default function CashInModal({ open, setOpen, userUid }) {
    const classes = useStyles();

    const [state,setState] =useState({
        amount: 0,
    }); 

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (prop) => (e)=> {
        setState({...state, [prop]: e.target.value})
    }

    const cashin = (e) => {
        e.preventDefault();
        if(state.amount <= 0){
            alert("Amount must be higher than 0")
        } else {
            const batch = db.batch();

            const historyRef = db
            .collection("cash")
            .doc(userUid)
            .collection("history").doc();
            
            batch.set(historyRef, {
                type: "cash-in",
                amount: state.amount,
                created_at: new Date(),
            });
       
         
            let balanceRef = db.collection("cash").doc(userUid);

            batch.update(balanceRef, {
                balance: firebase.firestore.FieldValue.increment(state.amount)});


                batch.commit().then(() => {
                    handleClose();
                }).catch(err=>{
                    //error
                });

           
        }
     
    };

    return (
        <Modal
            open={open}
           // onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.root}

        >

            <Paper className={classes.paper}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography variant="h5" color="secondary">
                            Cash-in
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField variant="outlined" label="Amount" fullWidth value={state.amount} onChange={handleChange("amount")}>
                        </TextField>
                    </Grid>
                    <Grid item container spacing={2} justify="flex-end">
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={cashin}>Confirm</Button>
                        </Grid>
                        <Grid item>
                        <Button variant="contained" color="default" onClick={handleClose}>Cancel</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    );
}
