import { IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";
import { Task } from "../../definition/Task";
import { deleteTask, updateTaskState } from "../../dao/TaskDao";
import { useEventService } from "../context/EventServiceContext";
import { refreshEvent } from "../../definition/AppEvents";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    transition: "all 0.2s ease-in-out",
  },
  done: {
    opacity: 0.5,
  },
  cardContent: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    "&:last-child": {
      paddingBottom: theme.spacing(2),
    },
    minHeight: 80,
  },
  grow: {
    flexGrow: 1,
  },
}));

interface TaskCardProps {
  task: Task;
}

const getElevation = (isFocused: boolean, task: Task) => {
  if(isFocused) {
    return task.done ? 0 : 10;
  }
  return task.done ? 0 : 1;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const classes = useStyles();
  const [isFocused, setFocused] = React.useState(false);
  const eventService = useEventService();

  const onDelete = () => {
    deleteTask(task).then(() => eventService.trigger(refreshEvent));
  };

  const onChecked = () => {
    updateTaskState(task, !task.done).then(() =>
      eventService.trigger(refreshEvent)
    );
  };

  return (
    <Card
      className={`${classes.root} ${task.done ? classes.done : null}`}
      onMouseOver={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      elevation={getElevation(isFocused, task)}
    >
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="h2">
          {task.title}
        </Typography>
        <div className={classes.grow} />
        {isFocused && (
          <div>
            <IconButton
              aria-label="Refresh Data"
              color="inherit"
              onClick={onChecked}
            >
              {task.done ? <CheckIcon /> : <CheckBoxOutlineBlankIcon />}
            </IconButton>
            <IconButton
              aria-label="Refresh Data"
              color="inherit"
              onClick={onDelete}
            >
              <CloseIcon />
            </IconButton>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
