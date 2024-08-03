#!/usr/bin/env node

import inquirer from "inquirer";

async function main() {
    // Prompt user for ATM card and PIN input
    let input = await inquirer.prompt([
        { message: "Enter ATM card", name: "card" },
        { message: "Enter 4-digit PIN", type: "number", name: "pin" },
    ]);

    // Check if entered PIN is correct
    if (input.pin !== 1234) {
        console.log("Entered PIN is wrong. Card rejected!");
        return; // Exit the program
    }

    console.log("Entered PIN is correct. Card accepted.");

    // Present menu options to the user
    let screen = await inquirer.prompt([
        { message: "Select an option", type: "list", name: "options", choices: ["Reset pin", "Cash Deposit", "Cash Withdraw", "Balance Inquiry"] },
    ]);

    // Handle selected option
    let balance = 120000; // Initial balance
    switch (screen.options) {
        case "Reset pin":
            console.log("Enter previous PIN.");
            let changePin = await inquirer.prompt([{ message: "Enter new PIN", type: "number", name: "newPin" }]);
            console.log("Pin has been changed successfully!");
            break;
        case "Cash Deposit":
            let cashDeposit = await inquirer.prompt([{ message: "Enter amount of cash you want to deposit", type: "number", name: "amount" }]);
            balance += cashDeposit.amount;
            console.log("Cash has been deposited successfully! Your new balance is:", balance);
            break;
        case "Cash Withdraw":
            let cashWithdraw = await inquirer.prompt([{ message: "Enter amount of cash you want to withdraw", type: "number", name: "amount" }]);
            if (cashWithdraw.amount > balance) {
                console.log("Not enough balance!");
            } else {
                balance -= cashWithdraw.amount;
                console.log("Cash has been withdrawn successfully! Your current balance is:", balance);
            }
            break;
        case "Balance Inquiry":
            console.log("Your balance is:", balance);
            break;
        default:
            console.log("Invalid option. Please try again!");
    }

    console.log("Thank you for using the ATM machine!");
}

// Execute the main function
main();
