
// Hello World in console
console.log("Hello, World!");

// Display Hello World on the webpage
document.getElementById("output").innerHTML = "<h2>Hello, World!</h2>";

// Variable Declarations
let studentName = "Aldi Jakllari";

// Number variable
const age = 35;

// Boolean variable
let isStudent = true;

// Null variable
let emptyValue = null;

// Undefined variable
let notAssigned;

// Console logging variables and their types
console.log("=== Variable Values ===");
console.log("Student Name:", studentName);
console.log("Age:", age);
console.log("Is Student:", isStudent);
console.log("Empty Value:", emptyValue);
console.log("Not Assigned:", notAssigned);

console.log("=== Variable Types ===");
console.log("typeof studentName:", typeof studentName);
console.log("typeof age:", typeof age);
console.log("typeof isStudent:", typeof isStudent);
console.log("typeof emptyValue:", typeof emptyValue);
console.log("typeof notAssigned:", typeof notAssigned);

// Demonstrating variable reassignment
console.log("=== Variable Reassignment ===");
console.log("Original studentName:", studentName);
studentName = "Peter Parker";
console.log("Updated studentName:", studentName);
