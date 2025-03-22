let tasks = JSON.parse(localStorage.getItem('tasks')) || []; 
 
const taskInput = document.getElementById('task-input'); 
const addTaskBtn = document.getElementById('add-task-btn'); 
const taskList = document.getElementById('task-list'); 
const filterBtns = document.querySelectorAll('.filter-btn'); 
 
addTaskBtn.addEventListener('click', () => { 
    const taskText = taskInput.value.trim(); 
    if (taskText) { 
        const newTask = { 
            id: Date.now(), 
            text: taskText, 
            completed: false 
        }; 
        tasks.push(newTask); 
        taskInput.value = ''; 
        saveTasks(); 
        renderTasks(); 
    } 
}); 
 
taskList.addEventListener('click', (e) => { 
    if (e.target.classList.contains('task-toggle')) { 
        const taskId = e.target.dataset.id; 
        const task = tasks.find(task => task.id == taskId); 
        task.completed = !task.completed; 
        saveTasks(); 
        renderTasks(); 
    } 
 
    
    if (e.target.classList.contains('edit-task')) { 
        const taskId = e.target.dataset.id; 
        const task = tasks.find(task => task.id == taskId); 
        const newText = prompt('Edit Task:', task.text); 
        if (newText) { 
            task.text = newText; 
            saveTasks(); 
            renderTasks(); 
        } 
    } 
 
     
    if (e.target.classList.contains('delete-task')) { 
        const taskId = e.target.dataset.id; 
        tasks = tasks.filter(task => task.id != taskId); 
        saveTasks(); 
        renderTasks(); 
    } 
}); 
 
filterBtns.forEach(btn => { 
    btn.addEventListener('click', () => { 
        const filter = btn.dataset.filter; 
        renderTasks(filter); 
    }); 
}); 
 
function saveTasks() { 
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
} 
 
function renderTasks(filter = 'all') { 
    taskList.innerHTML = ''; 
     
    
    let filteredTasks; 
    if (filter === 'completed') { 
        filteredTasks = tasks.filter(task => task.completed); 
    } else if (filter === 'pending') { 
        filteredTasks = tasks.filter(task => !task.completed); 
    } else { 
        filteredTasks = tasks; 
    } 
 
     
    filteredTasks.forEach(task => { 
        const taskItem = document.createElement('li'); 
        taskItem.classList.toggle('completed', task.completed); 
         
        taskItem.innerHTML = ` 
            <span class="task-toggle" data-id="${task.id}">${task.text}</span> 
            <button class="edit-task" data-id="${task.id}">Edit</button> 
            <button class="delete-task" data-id="${task.id}">Delete</button> 
        `; 
        taskList.appendChild(taskItem); 
    }); 
} 
 
renderTasks(); 
 
 
 
 
