import React from 'react';
import { 
    Container,
    Grid,
    Box,
    Link
} from '@material-ui/core' ;
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        
        width: '100%',
        height: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', //Here is the trick
        bottom: 0,
        
    },
   
  }));

export default function Footer() {
    const classes = useStyles();

    return (
       <footer  className={classes.root}>
           <Box
           px={{xs: 3, sm: 10}}
           py={{xs: 5, sm: 10}}
           bgcolor="black" color="white"
           textAlign="center">
               <Container maxWidth="1g">
                   <Grid container spacing={5}>
                       <Grid item xs={12} sm={4} >
                           <Box borderBottom={1} border>Help</Box>
                           <Box>
                               <Link href ="/" color="inherit">
                                   Contact
                               </Link>
                           </Box>
                           <Box>
                               <Link href ="/" color="inherit">
                                   Support
                               </Link>
                           </Box>
                           <Box>
                               <Link href ="/" color="inherit">
                                   Privacy
                               </Link>
                           </Box>

                       </Grid>
                       <Grid item xs={12} sm={4} >
                       <Box borderBottom={1}>Account</Box>
                           <Box>
                               <Link href ="/" color="inherit">
                                   Contact
                               </Link>
                           </Box>
                           <Box>
                               <Link href ="/" color="inherit">
                                   Support
                               </Link>
                           </Box>
                           <Box>
                               <Link href ="/" color="inherit">
                                   Privacy
                               </Link>
                           </Box>

                       </Grid>
                       <Grid item xs={12} sm={4} >
                       <Box borderBottom={1}>Message</Box>
                           <Box>
                               <Link href ="/" color="inherit">
                                   Contact
                               </Link>
                           </Box>
                           <Box>
                               <Link href ="/" color="inherit">
                                   Support
                               </Link>
                           </Box>
                           <Box>
                               <Link href ="/" color="inherit">
                                   Privacy
                               </Link>
                           </Box>

                       </Grid>

                   </Grid>
                <Box textAlign="center" pt={{xs: 5, sm:10}} pb={{xs: 5, sm: 0}} >
                    Web CRUD &reg; {new Date().getFullYear()}
                </Box>
               </Container>
           </Box>
       </footer>
    )
}
