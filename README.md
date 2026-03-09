1️⃣ What is the difference between var, let, and const?

var, let, and const are used to declare variables in JavaScript.

var:
• Old way to declare variables
• Function scoped
• Can be re-declared and updated

let:
• Introduced in ES6
• Block scoped
• Cannot be re-declared but can be updated

const:
• Block scoped
• Cannot be re-declared or updated after assignment

Example:
• var a = 10;
• let b = 20;
• const c = 30;



2️⃣ What is the spread operator (...)?

The spread operator (...) is used to expand or spread elements of an array or object.
It is often used to copy or merge arrays/objects.

Example:
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

console.log(arr2); 
// [1, 2, 3, 4, 5]



3️⃣ What is the difference between map(), filter(), and forEach()?

These methods are used to work with arrays.

map():
• Applies a function to each element
• Returns a new array

const numbers = [1,2,3];
const result = numbers.map(n => n * 2);
// [2,4,6]


filter():
• Selects elements based on a condition
• Returns a new array

const numbers = [1,2,3,4];
const result = numbers.filter(n => n > 2);
// [3,4]


forEach():
• Runs a function for each element
• Does not return a new array

numbers.forEach(n => console.log(n));



4️⃣ What is an arrow function?

• An arrow function is a shorter way to write functions in JavaScript (introduced in ES6).

It uses the => syntax and makes code shorter and cleaner.

Example:

const add = (a, b) => {
  return a + b;
};

Short version:
const add = (a, b) => a + b;



5️⃣ What are template literals?

• Template literals are a modern way to create strings in JavaScript using backticks ( ).

• They allow you to insert variables easily using ${}.

Example:

let name = "Afrin";
let message = `Hello ${name}`;

console.log(message);

Output:

Hello Afrin