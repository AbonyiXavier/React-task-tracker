import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch(
      "https://todolist-nodejs-mysql.herokuapp.com/api/todos"
    );
    const data = await res.json();

    return data.results;
  };

  // Add Task
  const addTask = async (task) => {
   const res = await fetch("https://todolist-nodejs-mysql.herokuapp.com/api/todo", {
     method: 'POST',
     headers: {
       'Content-type': 'application/json'
     },
     body: JSON.stringify(task)
   })
  
   const newTask = await res.json()
 
   setTasks([...tasks, newTask]);

  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`https://todolist-nodejs-mysql.herokuapp.com/api/todo/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToggle = await fetchTasks()
    for (let i = 0; i < taskToggle.length; i++) {
      const taskToggleData = taskToggle[i];
      const taskToggleId = taskToggle[i].id;
      if (taskToggleId === id) {
        const updatedTask = { ...taskToggleData, completed: !taskToggleData.completed }

        const res = await fetch(`https://todolist-nodejs-mysql.herokuapp.com/api/todo/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(updatedTask)
        })
        const data = await res.json()
    
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, completed: data.completed} : task
          )
        );
      }
      
    }
   
  };
  return (
    <div className="container">
      <Header
        onAddButton={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Task To Show"
      )}
    </div>
  );
}

export default App;
