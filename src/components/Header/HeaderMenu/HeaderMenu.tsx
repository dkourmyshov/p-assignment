import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down('sm')]: {
      position: "fixed",
      width: "100%",
      top: "65px"
    }
  },
}));

export const HeaderMenu: React.FC = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);

  const tabSwitcher = useCallback(
    (event: React.ChangeEvent<{}>, nextTab: number) => {
      setCurrentTab(nextTab);
    },
    []
  );
  return (
    <Paper className={classes.root}>
      <Tabs
        value={currentTab}
        onChange={tabSwitcher}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
      >
        <Tab label="Overview" />
        <Tab label="Trades" component={Link} to="/sell/trades" />
        <Tab label="Disputes" />
        <Tab label="Your offers" />
        <Tab label="My team" />
        <Tab label="Trade History" />
      </Tabs>
    </Paper>
  );
};
