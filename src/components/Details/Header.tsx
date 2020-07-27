import React from "react";
import { Grid, Typography, Button, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { pay } from "../../redux/actions/actions";

const useStyles = makeStyles({
  info: {
    paddingTop: "30px",
  },
  button: {
    margin: "20px",
  },
  main: {
    padding: "10px"
  }
});

export const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.main}>

      <Grid
        className={classes.info}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h5">You are trading with Chanaar</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" color="textSecondary">
            Started 23 minutes ago
          </Typography>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={() => dispatch(pay())}
          >
            Release bitcoins
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
