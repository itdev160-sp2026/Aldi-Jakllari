function checkAge() {
    const ageInput = document.getElementById("ageInput");
    const resultDiv = document.getElementById("result");
    const inputValue = ageInput.value.trim();

    console.log(`User input: "${inputValue}"`);

    resultDiv.className = "";

    if (inputValue === "") {
        resultDiv.textContent = "Please enter your age";
        resultDiv.className = "invalid";
        console.log("Result: Empty input");
        return;
    }

    const age = Number(inputValue);

    if (isNaN(age)) {
        resultDiv.textContent = "Invalid age - please enter a number";
        resultDiv.className = "invalid";
        console.log("Result: Not a number");
        return;
    }

    if (age < 0 || age > 150) {
        resultDiv.textContent = "Invalid age - please enter a realistic age (0-150)";
        resultDiv.className = "invalid";
        console.log("Result: Age out of range");
        return;
    }

    if (age >= 18) {
        resultDiv.textContent = `You are ${age} years old - You are an adult`;
        resultDiv.className = "adult";
        console.log(`Result: Adult (age: ${age})`);
    } else {
        resultDiv.textContent = `You are ${age} years old - You are a minor`;
        resultDiv.className = "minor";
        console.log(`Result: Minor (age: ${age})`);
    }
}