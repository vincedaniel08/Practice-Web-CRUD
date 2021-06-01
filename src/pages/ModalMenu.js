import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
   
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


const week = [
    {
        value: 'ADOBO',
        label: 'Monday',
    },
    {
        value: 'EUR',
        label: 'Tueday',
    },
    {
        value: 'BTC',
        label: 'Thursday',
    },
    {
        value: 'JPY',
        label: 'Friday',
    },
];


export default function ModalMenu() {

    const history = useHistory();

    const handleChange = (event) => {
        setdate(event.target.value);
       
    };
    
    const botSave = (e) => {

        history.push("/home");




    };

    const [date, setdate] = React.useState('EUR');

    const [open, setOpen] = React.useState(false);

   
    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();
 

    return (
       

          


        <Modal handleOpen
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

                        <form className={classes.root} noValidate autoComplete="off">

                            <TextField
                                id="standard-select-currency"
                                select
                                label="Select"
                                value={date}
                                onChange={handleChange}
                                helperText="Please select your currency"
                            >
                                {week.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </form>

                        <Button variant="contained" color="primary" onClick={botSave} >Save</Button>

                    </div>

                </Fade>
            </Modal>
            
          

    )
}
