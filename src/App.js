// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './card/card';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://task-manager-server-kappa-eosin.vercel.app/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleNewTaskChangeTime = (e) => {
    setNewTaskTime(e.target.value);
  };

  const addTask = async () => {
    if (newTask.trim() !== '') {
      try {
        const response = await axios.post('https://task-manager-server-kappa-eosin.vercel.app/api/tasks', { text: newTask, time: newTaskTime });
        setTasks([...tasks, response.data]);
        setNewTask('');
        setNewTaskTime('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    try {
      const task = tasks.find((task) => task._id === taskId);
      const response = await axios.put(`https://task-manager-server-kappa-eosin.vercel.app/api/tasks/${taskId}`, { ...task, completed: !task.completed });
      setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)));
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`https://task-manager-server-kappa-eosin.vercel.app/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditChange = (e) => {
    setEditedTaskText(e.target.value);
  };

  const startEditing = (taskId, taskText) => {
    setEditTaskId(taskId);
    setEditedTaskText(taskText);
  };

  const finishEditing = async (taskId) => {
    try {
      const task = tasks.find((task) => task._id === taskId);
      const response = await axios.put(`https://task-manager-server-kappa-eosin.vercel.app/api/tasks/${taskId}`, { ...task, text: editedTaskText });
      setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)));
      setEditTaskId(null);
    } catch (error) {
      console.error('Error finishing editing task:', error);
    }
  };

  return (
    <>
      <div className="Container roboto-mono-normal">
        <div className="header">
          <div className="heading">
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
              <label htmlFor="appt">Start time:</label>
              <input
                value={newTaskTime}
                onChange={handleNewTaskChangeTime}
                type="time"
                id="appt"
                name="appt"
              />
            </div>
          </div>
        </div>
        <div className="content">
          <div className="LeftContent">
            <div className="leftContentContainer">
              <div className="addTaskHeading">Tasks</div>
              <div className="leftcards">
                {tasks.slice().reverse().map((task) => (
                  <div key={task._id} className="containerCard">
                    {editTaskId === task._id ? (
                      <>
                        <input
                          className="Edit"
                          type="text"
                          value={editedTaskText}
                          onChange={handleEditChange}
                        />
                        <div className="buttons">
                          <button onClick={() => finishEditing(task._id)}>Save</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(task._id)}
                          style={{ marginLeft: '0.3vh' }}
                        />
                        <div className="cardCover">
                          <Card text={task.text} time={task.time} />
                        </div>
                        <div className="Tbuttons">
                          <button onClick={() => startEditing(task._id, task.text)}>Edit</button>
                          <button onClick={() => deleteTask(task._id)}>Delete</button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="RightContent">
            <div className="completed">
              <div className="RightContentContainerTop">
                <div className="addTaskHeading">Completed</div>
                <div className="leftcards">
                  {tasks.filter((task) => task.completed).map((task) => (
                    <Card key={task._id} text={task.text} time={task.time} />
                  ))}
                </div>
              </div>
            </div>
            <div className="incomplete">
              <div className="RightContentContainerBottom">
                <div className="addTaskHeading">Incomplete</div>
                <div className="leftcards">
                  {tasks.filter((task) => !task.completed).map((task) => (
                    <Card key={task._id} text={task.text} time={task.time} />
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
