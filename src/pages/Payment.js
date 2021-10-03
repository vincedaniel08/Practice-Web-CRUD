import React, { useState, useEffect } from 'react';
import firebase from "../utils/firebase";
import { makeStyles, Grid, Button, Card, CardContent, Typography } from "@material-ui/core";
import Header from "./Header";
import CashInModal from "../modal/CashInModal";
import CashOutModal from "../modal/CashOutModal";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@material-ui/data-grid';

import "../App.css";

import dayjs from "dayjs";
import localizeFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizeFormat);

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
    },
    balanceContainer: {
        
        margin: theme.spacing(1),

    },
    card: {
        backgroundColor: theme.palette.primary.main,
    },
    button:{
        margin: theme.spacing(.5),
    },
    historyContainer:{
        width: 400,
        marginBottom: 20,
        display: 'flex', 
        alignItems: "center",
        justifyContent: "center"
        
    },
    
    
   

}));

const db = firebase.firestore();

export default function Payment() {

    const classes = useStyles();
    const [state, setstate] = useState({
        balance: 0,
        userUid: "",
        
    });


    const [transaction, setTransaction] = useState([]);
    const [cashInOpen, setCashInOpen] = useState(false);
    const [cashOutOpen, setCashOutOpen] = useState(false);
    const columns =[
        {
            field: "amount",
            headerName: "Amount",
            width: 126,
        },
        {
            field: "type",
            headerName: "Transaction Type",
            width: 115,
        },
        {
            field: "created_at",
            headerName: "Date",
            width: 145,
            renderCell: (params) => (
            <Typography>{dayjs(params.value).format("LLL")}</Typography>
            ),
        },
    ];

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
                        fetchTransaction(currentUser.uid);
                    } else {
                        db.collection("cash")
                        .doc(currentUser.uid)
                        .set({balance: 0})

                    }   
                })
            };
              
            const fetchTransaction = (userUid) => {
                db.collection("cash")
                .doc(userUid)
                .collection("history")
                .orderBy("created_at")
                .onSnapshot((doc)=> {

                    let transactionList=[];
                    doc.forEach(trans=> {
                        transactionList.push({...trans.data(),id: trans.id});
                    }) 

                    setTransaction(transactionList);
                })
            }

        
        fetchData();
    }, [])

    function CustomToolbar() {
        return (
          <GridToolbarContainer>
            <GridToolbarExport />
          </GridToolbarContainer>
        );
      }

    return (
        <div>
        <Header />
     
        <div className="mydiv" >

           
            <Typography variant ="h2">Payment</Typography>
            <Grid container direction="column" alignItems="center" item spacing={2}  className={classes.historyContainer}>

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

                <Grid item container direction="column" spacing={2} >
                  {/* {transaction.map(t =>(
                           
                                <Typography>{`${t.amount} - ${t.type} - ${t.created_at}`}</Typography>      
                    ))} 
                  */}

                  <DataGrid 
                  columns={columns} 
                  rows={transaction} 
                  pageSize={10} 
                  autoHeight
                  components={{ Toolbar: CustomToolbar }}
                  disableSelectionOnClick
                  disableMultipleSelection
                  />


                </Grid>
            
            </Grid>
            <CashInModal open={cashInOpen} setOpen={setCashInOpen} userUid={state.userUid} />
            <CashOutModal open={cashOutOpen} setOpen={setCashOutOpen} userUid={state.userUid} />

        
            </div>
         
         
           
        </div>

    )
}
