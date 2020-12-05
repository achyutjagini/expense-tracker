//These imports will help us build the component and also define the styles
// to be used in the component.

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import AkihabaraImg from './../assets/images/Akihabara.jpg'
import {Link} from 'react-router-dom'
import auth from '../auth/auth-helper'
import ExpenseOverview from './../expense/ExpenseOverview'

//define the CSS styles that are required to style the elements in the component 
//by utilizing the Material-UI theme variables and
//makeStyles, which is a custom React hook API provided by Material-UI
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 800,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },

  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 350
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a':{
      color: '#4f83cc'
    } 
  }
}))
//The JSS style objects defined here will be injected into the 
//component using the hook returned by makeStyles. The makeStyles hook API 
//takes a function as an argument and gives access to our custom theme variables,
// which we can use when defining the styles.




//The Home component will contain a Material-UI Card with a headline,
//an image, and a caption, all styled with the styles we defined previously
// and returned by calling the useStyles() hook.

export default function Home(){
  const classes = useStyles()
  return (
        <>
          { auth.isAuthenticated() && 
            <ExpenseOverview/> 
          } 
          { !auth.isAuthenticated() && typeof window !== "undefined" && 
            (<Card className={classes.card}>
              <Typography variant="h6" className={classes.title}>
                Home Page
              </Typography>
              <CardMedia className={classes.media} image={AkihabaraImg} title="Akihabara"/>
              <Typography variant="body2" component="p" className={classes.credit} color="textSecondary"></Typography>
              <CardContent>
                <Typography variant="body1" component="p">
                  Welcome to Expense Tracker. <Link to='/signup'>Sign up</Link> or <Link to='/signin'>sign in</Link> to get started.
                </Typography>
              </CardContent>
            </Card>
            
            )
          }
        </>
    )
}
