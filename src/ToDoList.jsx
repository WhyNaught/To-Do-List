import './App.css'
import {useState} from 'react'

export default function ToDoList(){
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [tempTask, setTempTask] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    function handleInputChange(event){
        if (isEditing) {
            setTempTask(event.target.value);
        } else {
            setNewTask(event.target.value);
        }
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask])
            setNewTask("");
        }
    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index){
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = 
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index){
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function editTask(index){
        setIsEditing(!isEditing);
        setEditingIndex(index);
        setTempTask(tasks[index]);
    }

    function saveTask() {
        setTasks(tasks.map((a, b) => {
            if (editingIndex === b) {
                return tempTask;
            } else {
                return a;
            }
        }))
        setEditingIndex(null);
        setIsEditing(!isEditing);
        setTempTask("");
    }

    return (
        <div className = "to-do-list">
            <h1>To-Do-List</h1>
            <input type = "text" placeholder='Start typing...' value = {newTask} onChange = {() => handleInputChange(event)}/>
            <button className = "add-button" onClick={() => addTask()}>Add Item</button>

            <ol>   
                {tasks.map((task, index) => (
                    (editingIndex !== index) ? (
                    <li key = {index}>
                        <span className='text'>{task}</span>
                        <button className='edit-button' onClick = {() => editTask(index)}>Edit</button>
                        <button className='delete-button' onClick = {() => deleteTask(index)}>Delete</button>
                        <button className='move-button' onClick = {() => moveTaskUp(index)}>Up</button>
                        <button className='move-button' onClick = {() => moveTaskDown(index)}>Down</button>
                    </li>
                    ) : (
                    <li key = {index}>
                        <input className = 'text' type = "text" value = {tempTask} onChange = {() => handleInputChange(event)}></input>
                        <button className='save-button' onClick = {() => saveTask()}>Save</button>
                        <button className='delete-button' onClick = {() => deleteTask(index)}>Delete</button>
                        <button className='move-button' onClick = {() => moveTaskUp(index)}>Up</button>
                        <button className='move-button' onClick = {() => moveTaskDown(index)}>Down</button>
                    </li>)
                )) }
            </ol>
        </div>
    );
}