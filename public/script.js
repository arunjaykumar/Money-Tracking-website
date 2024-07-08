// Initialize an empty array to store expenses
let expenses = [];

// Initialize the total amount to zero
let totalAmount = 0;

// Get references to the DOM elements
const categorySelect = document.getElementById("category_select");
const amountInput = document.getElementById("amount_input");
const InfoInput = document.getElementById("info");
const dateInput = document.getElementById("date_input");
const addBtn = document.getElementById("add_btn");
const expenseTableBody = document.getElementById("expense-table-body");
const totalAmountCell = document.getElementById("total-amount");

// Add event listener to the "Add" button
addBtn.addEventListener("click", function () {
  // Get values from input fields
  const category = categorySelect.value;
  const info = InfoInput.value;
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  // Validate input fields
  if (category === "") {
    alert("Please select a category");
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }
  if (info === "") {
    alert("Please enter a valid info");
    return;
  }
  if (date === "") {
    alert("Please select a date");
    return;
  }

  // Add the new expense to the expenses array
  expenses.push({ category, amount, info, date });

  // Update the total amount based on the category
  if (category === "Income") {
    totalAmount += amount;
  } else if (category === "Expense") {
    totalAmount -= amount;
  }

  // Update the total amount displayed
  totalAmountCell.textContent = totalAmount;

  // Create a new row in the expense table
  const newRow = expenseTableBody.insertRow();

  // Insert cells for the new row
  const categoryCell = newRow.insertCell();
  const AmountCell = newRow.insertCell();
  const InfoCell = newRow.insertCell();
  const dateCell = newRow.insertCell();
  const deleteCell = newRow.insertCell();

  // Create and configure the delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", function () {
    // Remove the expense from the expenses array
    expenses.splice(expenses.indexOf(expense), 1);

    // Update the total amount based on the category
    if (category === "Income") {
      totalAmount -= amount;
    } else if (category === "Expense") {
      totalAmount += amount;
    }

    // Update the total amount displayed
    totalAmountCell.textContent = totalAmount;

    // Remove the row from the table
    expenseTableBody.removeChild(newRow);
  });

  // Get the newly added expense
  const expense = expenses[expenses.length - 1];

  // Set the text content for the cells
  categoryCell.textContent = expense.category;
  AmountCell.textContent = expense.amount;
  InfoCell.textContent = expense.info;
  dateCell.textContent = expense.date;

  // Append the delete button to the delete cell
  deleteCell.appendChild(deleteBtn);
});

// Loop through existing expenses to display them
for (const expense of expenses) {
  // Update the total amount based on the category
  if (expense.category === "Income") {
    totalAmount += expense.amount;
  } else if (expense.category === "Expense") {
    totalAmount -= expense.amount;
  }

  // Update the total amount displayed
  totalAmountCell.textContent = totalAmount;

  // Create a new row in the expense table
  const newRow = expenseTableBody.insertRow();

  // Insert cells for the new row
  const categoryCell = newRow.insertCell();
  const AmountCell = newRow.insertCell();
  const InfoCell = newRow.insertCell();
  const dateCell = newRow.insertCell();
  const deleteCell = newRow.insertCell();

  // Create and configure the delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", function () {
    // Remove the expense from the expenses array
    expenses.splice(expenses.indexOf(expense), 1);

    // Update the total amount based on the category
    if (expense.category === "Income") {
      totalAmount -= expense.amount;
    } else if (expense.category === "Expense") {
      totalAmount += expense.amount;
    }

    // Update the total amount displayed
    totalAmountCell.textContent = totalAmount;

    // Remove the row from the table
    expenseTableBody.removeChild(newRow);
  });

  // Set the text content for the cells
  categoryCell.textContent = expense.category;
  AmountCell.textContent = expense.amount;
  InfoCell.textContent = expense.info;
  dateCell.textContent = expense.date;

  // Append the delete button to the delete cell
  deleteCell.appendChild(deleteBtn);
}
