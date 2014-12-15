import * as React from "react";
import { loadTasks } from "../../dao/TaskDao";
import { Task } from "../../definition/Task";
import { useEventService } from "./EventServiceContext";
import { LoadingView } from "../view/LoadingView";

const TasksContext = React.createContext<Task[]>([]);

export const TasksProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const eventServie = useEventService();

  const loadData = () =>
    loadTasks().then(loadedTasks => {
      setTasks(loadedTasks);
      setLoaded(true);
    });

  React.useEffect(() => {
    loadData();
    return eventServie.subscribe(loadData);
  }, []);

  return (
    <TasksContext.Provider value={tasks}>
      {loaded ? children :<LoadingView /> }
    </TasksContext.Provider>
  );
};

export const useTasks = () => React.useContext(TasksContext);
