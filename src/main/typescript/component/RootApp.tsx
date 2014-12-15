import { CssBaseline } from "@material-ui/core";
import * as React from "react";
import { FC } from "react";
import { EventServiceProvider } from "./context/EventServiceContext";
import { SearchQueryProvider } from "./context/SearchQueryContext";
import { TasksProvider } from "./context/TasksContext";
import { MongoTasksBar } from "./element/MongoTasksBar";
import { TaskList } from "./element/TaskList";

export const RootApp: FC = () => {
  return (
    <EventServiceProvider>
      <TasksProvider>
        <SearchQueryProvider>
          <CssBaseline />
          <MongoTasksBar>
            <TaskList />
          </MongoTasksBar>
        </SearchQueryProvider>
      </TasksProvider>
    </EventServiceProvider>
  );
};
