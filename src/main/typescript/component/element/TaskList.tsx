import { Container, Grid } from "@material-ui/core";
import * as React from "react";
import { useSearchQuery } from "../context/SearchQueryContext";
import { useTasks } from "../context/TasksContext";
import { TaskCard } from "./TaskCard";

export const TaskList = () => {
  const tasks = useTasks();
  const [searchQuery] = useSearchQuery();

  return (
    <Container fixed maxWidth="sm">
      <Grid container spacing={3}>
        {tasks
          .filter(task => !searchQuery || task.title.includes(searchQuery))
          .map(task => (
            <Grid item xs={12}><TaskCard task={task} /></Grid>
          ))}
      </Grid>
    </Container>
  );
};
