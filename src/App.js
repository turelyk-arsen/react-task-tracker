import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  // const x = 'Arsen'
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    // {
    //   id: 1,
    //   text: "Doctors Appointmen",
    //   day: "Feb 5th at 2:30pm",
    //   reminder: true,
    // },
    // {
    //   id: 2,
    //   text: "Meeting at School",
    //   day: "Feb 6th at 1:30pm",
    //   reminder: true,
    // },
    // {
    //   id: 3,
    //   text: "Food Shopping",
    //   day: "Feb 5th at 2:30pm",
    //   reminder: false,
    // },
  ]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/task");
    const data = await res.json();
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/task/${id}`);
    const data = await res.json();
    return data;
  };

  // delete task
  const deleteTask = async (id) => {
    // console.log("delete", id);
    await fetch(`http://localhost:5000/task/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // add task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/task", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    // console.log(task)
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  const toggleReminder = async (id) => {
    // console.log(id);
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <h1>REACT</h1>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        {showAddTask && <AddTask onAdd={addTask} />}
        {/* <h1>Hello React and {x}</h1> */}
        {tasks.length > 0 ? (
          <Tasks
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleReminder}
          />
        ) : (
          "No Tasks To Show"
        )}
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>{" "}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
