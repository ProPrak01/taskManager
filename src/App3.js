import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
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
    <div className="App">
      <h1>Task Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Enter task..."
          value={newTask}
          onChange={handleNewTaskChange}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={handleEditChange}
                />
                <button onClick={() => finishEditing(task.id)}>Save</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <span className={task.completed ? 'completed' : ''}>
                  {task.text}
                </span>
                <button onClick={() => startEditing(task.id, task.text)}>
                  Edit
                </button>
              </>
            )}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
