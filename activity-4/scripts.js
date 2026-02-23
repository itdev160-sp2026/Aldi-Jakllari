console.log("=== Activity 4: Interactive To-Do List (Part 1) ===");

// Global variables for task management
let tasks = []; 
let taskIdCounter = 1;

// Part A: Element Creation Demonstrations
console.log("\n=== ELEMENT CREATION DEMONSTRATIONS ===");

// document.createElement() - Creates new HTML elements
const demoDiv = document.createElement("div"); 
const demoSpan = document.createElement("span"); 
const demoButton = document.createElement("button"); 

console.log("Created div element:", demoDiv);
console.log("Created span element:", demoSpan);
console.log("Created button element:", demoButton);

// Setting properties on created elements
demoDiv.textContent = "This is a demo div"; 
demoDiv.id = "demo-div"; 
demoSpan.innerHTML = "<strong>Demo span with HTML</strong>"; 
demoButton.textContent = "Demo Button";

console.log("Div after setting properties:", demoDiv);
console.log("Div textContent:", demoDiv.textContent);
console.log("Div id:", demoDiv.id);

// Part B: Element Styling Demonstrations
console.log("\n=== ELEMENT STYLING DEMONSTRATIONS ===");

// element.style.propertyName - Direct CSS property modification
demoDiv.style.backgroundColor = "lightblue"; 
demoDiv.style.padding = "10px"; 
demoDiv.style.border = "1px solid blue";

console.log("Applied direct styles to demo div");

// classList.add() - Adds CSS classes to element
demoDiv.classList.add("demo-class"); 
demoDiv.classList.add("highlighted");
console.log("Added classes. ClassList:", demoDiv.classList);

// classList.contains() - Checks if element has a specific class
console.log("Has 'demo-class':", demoDiv.classList.contains("demo-class"));

// classList.remove() - Removes CSS classes from element
demoDiv.classList.remove("highlighted"); 
console.log("After removing 'highlighted':", demoDiv.classList);

// classList.toggle() - Adds class if missing, removes if present
demoDiv.classList.toggle("active");
console.log("After toggling 'active':", demoDiv.classList);

// Add spacing styles for demo elements
demoSpan.style.marginTop = "10px";
demoSpan.style.display = "block";
demoButton.style.marginTop = "10px";
demoButton.style.display = "block";

console.log("Applied spacing styles to demo span and button");

// Part C: Element Appending Demonstrations
console.log("\n=== ELEMENT APPENDING DEMONSTRATIONS ===");

const outputDiv = document.getElementById("output");
console.log("Output div before appending:", outputDiv.children.length, "children");

// appendChild() - Adds element as the last child of parent
outputDiv.appendChild(demoDiv);
outputDiv.appendChild(demoSpan);
outputDiv.appendChild(demoButton);

console.log("Output div after appending:", outputDiv.children.length, "children");

// Part D: To-Do List Core Functionality
console.log("\n=== TO-DO LIST FUNCTIONALITY ===");

/**
 * addTask() - Main function to add a new task
 * Gets input value, validates it, creates task object and DOM element
 */
function addTask() {
    // Get the input element and its value
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    
    console.log(`Attempting to add task: "${taskText}"`);
    
    // Input validation - Check for empty input
    if (taskText === "") {
        alert("Please enter a task!");
        console.log("Task addition failed: empty input");
        return;
    }
    
    // Input validation - Check maximum length
    if (taskText.length > 100) {
        alert("Task is too long! Please keep it under 100 characters.");
        console.log("Task addition failed: too long");
        return;
    }
    
    // Create task object with all necessary properties
    const task = {
        id: taskIdCounter++,
        text: taskText,
        completed: false,
        createdAt: new Date()
    };
    
    // Add task object to the tasks array
    tasks.push(task);
    console.log("Task added to array:", task);
    
    // Create DOM element for the task
    const listItem = createTaskElement(task);
    
    // Append the new task to the unordered list
    const todoList = document.getElementById("todo-list");
    todoList.appendChild(listItem);
    
    // Clear the input field for next entry
    taskInput.value = "";
    
    // Update the statistics display
    updateTaskStats();
    
    console.log(`Task "${taskText}" added successfully. Total tasks: ${tasks.length}`);
}

/**
 * createTaskElement(task) - Creates and returns a DOM element for a task
 * @param {Object} task - The task object containing id, text, completed status
 * @returns {HTMLLIElement} The list item element ready to be appended
 */
function createTaskElement(task) {
    // Create main list item element
    const listItem = document.createElement("li");
    listItem.className = "task-item";
    listItem.setAttribute("data-task-id", task.id);
    
    // Create span for task text
    const taskTextSpan = document.createElement("span");
    taskTextSpan.className = "task-text"; 
    taskTextSpan.textContent = task.text;
    
    // Create span for status indicator
    const statusSpan = document.createElement("span");
    statusSpan.className = "task-status";
    
    // Set initial state based on task.completed value
    if (task.completed) {
        listItem.classList.add("done");
        statusSpan.textContent = "\u2713 Done";
        statusSpan.className += " status-done";
    } else {
        statusSpan.textContent = "\u23F3 Pending";
        statusSpan.className += " status-pending";
    }
    
    // Append spans to list item
    listItem.appendChild(taskTextSpan);
    listItem.appendChild(statusSpan);
    
    // Add click event to toggle completion status
    listItem.onclick = function() {
        toggleTaskCompletion(task.id);
    };
    
    console.log("Created task element:", listItem);
    return listItem; // Return the fully built element
}

// Part E: Task State Management

/**
 * toggleTaskCompletion(taskId) - Toggles a task between completed and pending
 * @param {number} taskId - The ID of the task to toggle
 */
function toggleTaskCompletion(taskId) {
    console.log(`Toggling completion for task ID: ${taskId}`);
    
    // Find the task in the tasks array using find() method
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        console.error(`Task with ID ${taskId} not found`);
        return;
    }
    
    // Toggle the completed status (true becomes false, false becomes true)
    task.completed = !task.completed;
    console.log(`Task "${task.text}" is now ${task.completed ? 'completed' : 'pending'}`);
    
    // Find the corresponding DOM element using the data attribute
    const listItem = document.querySelector(`[data-task-id="${taskId}"]`);
    const statusSpan = listItem.querySelector(".task-status");
    
    // Update the DOM element to match new state
    if (task.completed) {
        listItem.classList.add("done");
        statusSpan.textContent = "\u2713 Done";
        statusSpan.className = "task-status status-done";
    } else {
        listItem.classList.remove("done");
        statusSpan.textContent = "\u23F3 Pending";
        statusSpan.className = "task-status status-pending";
    }
    
    // Update statistics after state change
    updateTaskStats();
}

/**
 * updateTaskStats() - Calculates and updates the task statistics display
 * Shows total tasks, completed count, and pending count
 */
function updateTaskStats() {
    // Calculate statistics from tasks array
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    
    // Update DOM elements with new values
    // Update task count in header
    document.getElementById("taskCount").textContent = `(${totalTasks} task${totalTasks !== 1 ? 's' : ''})`;
    // Update total tasks display
    document.getElementById("totalTasks").textContent = `Total: ${totalTasks}`;
    // Update completed tasks display
    document.getElementById("completedTasks").textContent = `Completed: ${completedTasks}`;
    // Update pending tasks display
    document.getElementById("pendingTasks").textContent = `Pending: ${pendingTasks}`;
    
    console.log(`Stats updated - Total: ${totalTasks}, Completed: ${completedTasks}, Pending: ${pendingTasks}`);
}

// Add enter key functionality for input using simple event handling
document.getElementById("taskInput").onkeydown = function(event) {
    if (event.key === "Enter") {
        addTask();
    }
};

// Initialize application
console.log("To-Do List application initialized successfully!");
console.log("Try adding some tasks and clicking them to mark as complete!");

// Display initial demo content
const initialDemo = `
    <h3>DOM Manipulation Demonstrations</h3>
    <p>Element creation examples loaded above</p>
    <p>Styling and classList demonstrations complete</p>
    <p>Ready to create and manage to-do tasks!</p>
`;

// Use setTimeout to add content after initial page load
setTimeout(() => {
    document.getElementById("output").innerHTML = initialDemo + document.getElementById("output").innerHTML;
}, 100);