import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CachedIcon from "@material-ui/icons/Cached";
import SearchIcon from "@material-ui/icons/Search";
import * as React from "react";
import { FC } from "react";
import { refreshEvent } from "../../definition/AppEvents";
import { useEventService } from "../context/EventServiceContext";
import { useSearchQuery } from "../context/SearchQueryContext";
import { TaskCreator } from "./TaskCreator";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      // padding: theme.spacing(3),
    },
    grow: {
      flexGrow: 1,
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  })
);

export const MongoTasksBar: FC = ({ children }) => {
  const classes = useStyles();
  const eventService = useEventService();
  const [searchQuery, setSearchQuery] = useSearchQuery();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h5" noWrap>
            MongoTasks
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              defaultValue={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
            />
          </div>
          <div className={classes.grow} />
          <div>
            <TaskCreator />
            <IconButton
              aria-label="Refresh Data"
              color="inherit"
              onClick={() => eventService.trigger(refreshEvent)}
            >
              <CachedIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};
