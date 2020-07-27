import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid, makeStyles, Hidden, Button } from "@material-ui/core";

import { NavBar } from "./components/Header/NavBar/NavBar";
import { HeaderMenu } from "./components/Header/HeaderMenu/HeaderMenu";
import { Trade } from "./components/Trades/Trade";
import { Details } from "./components/Details/Details";
import { Chat } from "./components/Dialog/Chat";

const useStyles = makeStyles(({ spacing, palette, breakpoints }) => ({
  notFound: {
    padding: "30px",
    fontFamily: "sans-serif"
  },
  mainContainer: {
    [breakpoints.down('sm')]: {
      width: "100%",
      top: "120px",
      bottom: "0px",
      position: "fixed"
    }
  }  
}));

export const App: React.FC = () => {
  const classes = useStyles()
  const [tradesDisplayed, setTradesDisplay] = useState(true);
  const [detailsDisplayed, setDetailsDisplay] = useState(false);
  const [chatDisplayed, setChatsDisplay] = useState(false);
  const showTrades = () => {
    setTradesDisplay(true);
    setDetailsDisplay(false);
    setChatsDisplay(false);
  }
  const showDetails = () => {
    setTradesDisplay(false);
    setDetailsDisplay(true);
    setChatsDisplay(false);
  }
  const showChat = () => {
    setTradesDisplay(false);
    setDetailsDisplay(false);
    setChatsDisplay(true);
  }
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact />
        <Route exact path="/sell" component={HeaderMenu} />
        <Route exact path="/sell/trades">
          <HeaderMenu />
          <Grid container className={classes.mainContainer}>
            <Grid xs={12} md={3} item>
              <Trade />
            </Grid>
          </Grid>
        </Route>
        <Route exact path="/sell/trades/:trade?">
          <HeaderMenu />
          <Grid container className={classes.mainContainer}>
            <Hidden mdUp>
              <Grid xs={12} item>
              <Button onClick={() => showTrades()}>Trades</Button>
              <Button onClick={() => showDetails()}>Trade details</Button>
              <Button onClick={() => showChat()}>Chat</Button>
              </Grid>
            </Hidden>
            <Hidden smDown={!tradesDisplayed}>
              <Grid xs={12} md={3} item>
                <Trade />
              </Grid>
            </Hidden>
            <Hidden smDown={!chatDisplayed}>
              <Grid xs={12} md={6} item>
                <Chat />
              </Grid>
            </Hidden>
            <Hidden smDown={!detailsDisplayed}>
              <Grid xs={12} md={3} item>
                <Details />
              </Grid>
            </Hidden>
          </Grid>
        </Route>
        <Route><p className={`${classes.notFound} ${classes.mainContainer}`}>Sorry — we cannot find the page you have requested.</p></Route>
      </Switch>
    </BrowserRouter>
  );
};
