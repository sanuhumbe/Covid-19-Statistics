import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function CardGroup(props) {
  const classes = useStyles();
  const theme = useTheme();

  console.log(props.setParams.worldStatus);
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item lg={8} md={10} sm={12} xs={12}>
        <Grid container spacing={3}>
          <Grid item item lg={3} md={3} sm={4} xs={4}>
            <Card className={classes.root}>
              <CardContent className={classes.content} alignItems="center">
                <Typography variant="subtitle1">Total Cases</Typography>
                <div style={{ color: "#7b1fa2", fontSize: "26px" }}>
                  {props.setParams.worldStatus.totalCases}
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={3} md={3} sm={4} xs={4}>
            <Card className={classes.root}>
              <CardContent className={classes.content} alignItems="center">
                <Typography variant="subtitle1">Active Cases</Typography>
                <div style={{ color: "#f9a825", fontSize: "26px" }}>
                  {props.setParams.worldStatus.activeCases}
                </div>{" "}
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={3} md={3} sm={4} xs={4}>
            <Card className={classes.root}>
              <CardContent className={classes.content} alignItems="center">
                <Typography variant="subtitle1">Recovered Cases</Typography>
                <div style={{ color: "#4caf50", fontSize: "26px" }}>
                  {props.setParams.worldStatus.totalRecovered}
                </div>{" "}
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={3} md={3} sm={4} xs={4}>
            <Card className={classes.root}>
              <CardContent className={classes.content} alignItems="center">
                <Typography variant="subtitle1">Total Death</Typography>
                <div style={{ color: "#e91e63", fontSize: "26px" }}>
                  {props.setParams.worldStatus.totalDeaths}
                </div>{" "}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
