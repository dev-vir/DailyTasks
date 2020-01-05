const form = document.querySelector('form');
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task")

loadEventListener();

function loadEventListener() {

    // DOM Event Listener
    document.addEventListener('DOMContentLoaded', getTaskFromLS)

    // Add List to Task
    form.addEventListener('submit', addTask);

    // Remove task from Task Collection
    taskList.addEventListener('click', removeTask)

    // Clear task list from
    clearBtn.addEventListener('click', clearTaskList); 

    // Filter the Task List
    filter.addEventListener('keyup', filterTask)
}

function addTask(e) {

    if(taskInput.value === '') {
        alert('No Task to add. Please add some task to input box')
    }else {
        // Create new List Element
        const li = document.createElement('li');
        
        // Add class to list Element
        li.className = "collection-item"

        // Create text node and append it to node
        li.appendChild(document.createTextNode(taskInput.value));

        // Create new Link element
        const link = document.createElement('a');

        // Add class to link
        link.className = "delete-item secondary-content";

        // Add delete icon to the link;
        link.innerHTML = "<i class='fa fa-remove'></i>"

        // Append link to li
        li.appendChild(link)

        // Append list to colection
        taskList.appendChild(li);

        // Store tasks to Local Store
        storeTaskToLS(taskInput.value);

        taskInput.value = '';
    }

    // // Create new List Element
    // const li = document.createElement('li');
    
    // // Add class to list Element
    // li.className = "collection-item"

    // // Create text node and append it to node
    // li.appendChild(document.createTextNode(taskInput.value));

    // // Create new Link element
    // const link = document.createElement('a');

    // // Add class to link
    // link.className = "delete-item secondary-content";

    // // Add delete icon to the link;
    // link.innerHTML = "<i class='fa fa-remove'></i>"

    // // Append link to li
    // li.appendChild(link)

    // // Append list to colection
    // taskList.appendChild(li);

    // taskInput.value = '';


    e.preventDefault()
}

function storeTaskToLS(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Show LS saved task to List
function getTaskFromLS() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }


    tasks.forEach(function(task){
        // Create new List Element
        const li = document.createElement('li');
        
        // Add class to list Element
        li.className = "collection-item"

        // Create text node and append it to node
        li.appendChild(document.createTextNode(task));

        // Create new Link element
        const link = document.createElement('a');

        // Add class to link
        link.className = "delete-item secondary-content";

        // Add delete icon to the link;
        link.innerHTML = "<i class='fa fa-remove'></i>"

        // Append link to li
        li.appendChild(link)

        // Append list to colection
        taskList.appendChild(li);
    }) 
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            removeTaskFromLS(e.target.parentElement.parentElement)
        }
    }
}

// Deleting Task from LocalStorage index wise
function removeTaskFromLS(taskName) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index){
        if (taskName.textContent === task) {
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Function for clearing Task List
function clearTaskList(e) {
    if(confirm("Are you sure, you want to delete all your task?")) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        // Clear TaskList from LS
        clearTasksFromLS();
    }
}

function clearTasksFromLS() {
    localStorage.clear();
}


// Filter task list Function
// function filterTask(e) {
//     const text = e.target.value.toLowerCase();

//     const items = document.querySelectorAll('.collection-item')

//     items.forEach(function(task) {
//         const item = task.firstChild.textContent;
//         if (item.toLowerCase().indexOf(text) != -1) {
//             task.style.display = 'block';
//         } else {
//             task.style.display = 'none';
//         }
//     })
// }


function filterTask(e) {
    const text = e.target.value.toLowerCase();

    const items = document.querySelectorAll('.collection-item');

    items.forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}
