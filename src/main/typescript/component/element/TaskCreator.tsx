import { IconButton, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import * as React from "react";
import { createTask } from "../../dao/TaskDao";
import { useEventService } from "../context/EventServiceContext";
import { refreshEvent } from "../../definition/AppEvents";

export const TaskCreator = () => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const eventService = useEventService();

  const handleClose = () => setOpen(false);

  const submit = () => {
    handleClose();
    createTask({ title, done: false }).then(() => {
      setTitle("");
      eventService.trigger(refreshEvent);
    });
  };

  return (
    <>
      <IconButton
        aria-label="Refresh Data"
        color="inherit"
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Create a new task
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
