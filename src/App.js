import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./card/card";

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete assignment", completed: false,time: "12:30" },
    { id: 2, text: "Buy groceries", completed: true ,time: "6:30"},
    { id: 3, text: "Call mom", completed: false,time: "8:30" },
    { id: 4, text: "Go for a run", completed: true,time: "09:30"},
    { id: 5, text: "Read a book", completed: false ,time: "10:30"},
  ]);
  const [newTask, setNewTask] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("");

  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");


  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };
  const handleNewTaskChangeTime = (e) => {
    setNewTaskTime(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false ,time: newTaskTime}]);
      setNewTask("");
      setNewTaskTime("");
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditChange = (e) => {
    setEditedTaskText(e.target.value);
  };


  const startEditing = (taskId, taskText) => {
    setEditTaskId(taskId);
    setEditedTaskText(taskText);
  };

  const finishEditing = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: editedTaskText } : task
      )
    );
    setEditTaskId(null);
  };

  return (
    <>
      <div className="Container roboto-mono-normal">
        <div className="header">
          <div className="heading  ">
            <div className="heading-content">Task Manager</div>
          </div>
        </div>
        <div className="addTask">
          <div className="addTaskContainer">
            <div className="addTaskHeading">Add Task</div>
            <div className="addbutton">
              <input
                type="text"
                name="taskinput"
                id="task"
                placeholder="Enter task..."
                value={newTask}
                onChange={handleNewTaskChange}
              />
              <button onClick={addTask}>Add Task</button>
            </div>
           <div className="timeInput">
          <label   htmlFor="appt"> start time:</label>
  <input value={newTaskTime} onChange={handleNewTaskChangeTime} type="time" id="appt" name="appt" />

</div>

          </div>
        </div>
        <div className="content">
          <div className="LeftContent">
            <div className="leftContentContainer">
              <div className="addTaskHeading">Tasks</div>
              <div className="leftcards">
                {/* <Card />
                <div className="buttons">
                  <button>Edit</button>
                  <button>Delete</button>
                </div> */}
                {tasks.reverse().map((task) => (
                  <>
                    {editTaskId === task.id ? (
                      <>
                        <input
                        className="Edit"
                          type="text"
                          value={editedTaskText}
                          onChange={handleEditChange}
                        />
                         <div className="buttons">
                         <button onClick={() => finishEditing(task.id)}>
                          Save
                        </button>
                         </div>
                        
                      </>
                    ) : (
                      <div className="containerCard">
                      <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(task.id)}
                          style={{marginLeft:"0.3vh"}}
                        />
                     <div className="cardCover">
                     <Card text={task.text} time={task.time} />
                     </div>

                      
                       

                        <div className="Tbuttons">
                        <button
                          onClick={() => startEditing(task.id, task.text)}
                        >
                          Edit
                        </button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                        
                        </div>
                        
                      </div>
                    )}
                   
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="RightContent">
            <div className="completed">
              <div className="RightContentContainerTop">
                <div className="addTaskHeading">Completed</div>
                <div className="leftcards">
                {tasks.map((task) => (
                  <>
                    {task.completed === true ? (
                      <>
                      <Card text={task.text} />
                      </>
                    ) : (
                      <>                     
                      </>
                    )}
                   
                  </>
                ))}
                </div>
              </div>
            </div>
            <div className="incomplete">
              <div className="RightContentContainerBottom">
                <div className="addTaskHeading">InComplete</div>
                <div className="leftcards">
                {tasks.map((task) => (
                  <>
                    {task.completed === false ? (
                      <>
                      <Card text={task.text} />
                      </>
                    ) : (
                      <>                     
                      </>
                    )}
                   
                  </>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
