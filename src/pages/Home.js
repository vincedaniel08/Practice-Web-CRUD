import React, { useState, useEffect } from 'react';
import firebase from "../utils/firebase";
import { makeStyles, Grid, Button, Card, CardContent, Typography } from "@material-ui/core";
import Header from "./Header";
import Footer from "./Footer";
import CashInModal from "../modal/CashInModal";
import CashOutModal from "../modal/CashOutModal";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
    },
    balanceContainer: {
        width: 500
    },
    card: {
        backgroundColor: theme.palette.primary.main,
    },
    button:{
        width: 500,
        height: 50
    },
   

}));

const db = firebase.firestore();

export default function Home() {

    const classes = useStyles();
    const [state, setstate] = useState({
        balance: 0,
        userUid: "",
    });
    const [cashInOpen, setCashInOpen] = useState(false);
    const [cashOutOpen, setCashOutOpen] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            const currentUser = firebase.auth().currentUser;
            db.collection("cash")
                .doc(currentUser.uid)
               // .get()
               // .then(doc => {
                .onSnapshot((doc)=> {
                    //success
                    if (doc.exists) {
                        let cashDoc = doc.data();
                        setstate({ balance: cashDoc.balance, userUid: currentUser.uid});
                    } else {
                        db.collection("cash").doc(currentUser.uid).set({balance: 0})

                    }
                })
            };
              


        
        fetchData();
    }, [])

    return (
        <div className="mydiv">

            <Header />

            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item className={classes.balanceContainer}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Grid container direction="column">

                                <Grid item>
                                    <Typography variant="h4">Balance</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">{state.balance}</Typography>
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Button 
                    variant="contained" 
                    color="secondary" 
                    className={classes.button}
                    onClick={() => setCashInOpen(true)}> Cash-in
                    
                      </Button>
                </Grid>
                <Grid item>
                    <Button
                     variant="contained" 
                     color="secondary" 
                     className={classes.button}
                     onClick={() => setCashOutOpen(true)}> Cash-out 
                     </Button>
                </Grid>
            </Grid>
            <CashInModal open={cashInOpen} setOpen={setCashInOpen} userUid={state.userUid} />
            <CashOutModal open={cashOutOpen} setOpen={setCashOutOpen} userUid={state.userUid} />


            <Footer />
        </div>

    )
}
