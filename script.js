let savedData = [];

    function calculateTDEE() {
        var age = document.getElementById("age").value;
        var gender = document.getElementById("gender").value;
        var height = document.getElementById("height").value;
        var weight = document.getElementById("weight").value;
        var activity = document.getElementById("activity").value;

        if (age && gender && height && weight && activity) {
            var BMR;

            // Calculate BMR based on gender
            if (gender === "male") {
                BMR = 10 * weight + 6.25 * height - 5 * age + 5;
            } else if (gender === "female") {
                BMR = 10 * weight + 6.25 * height - 5 * age - 161;
            }

            // Adjust BMR based on activity level
            var activityMultiplier;
            switch (activity) {
                case "sedentary":
                    activityMultiplier = 1.2;
                    break;
                case "light":
                    activityMultiplier = 1.375;
                    break;
                case "moderate":
                    activityMultiplier = 1.55;
                    break;
                case "active":
                    activityMultiplier = 1.725;
                    break;
                case "superactive":
                    activityMultiplier = 1.9;
                    break;
                default:
                    activityMultiplier = 1;
            }

            // Calculate TDEE
            var TDEE = BMR * activityMultiplier;

            // Macro calculations (example percentages)
            var protein = (TDEE * 0.4) / 4; // 40% Protein
            var carbs = (TDEE * 0.3) / 4;   // 30% Carbs
            var fats = (TDEE * 0.3) / 9;    // 30% Fats

            // Save and display the result
            var userEntry = {
                age: age,
                gender: gender,
                height: height,
                weight: weight,
                activity: activity,
                tdee: TDEE.toFixed(2),
                protein: protein.toFixed(2),
                carbs: carbs.toFixed(2),
                fats: fats.toFixed(2),
            };

            savedData.push(userEntry);
            displaySavedData();
        } else {
            document.getElementById("result").innerHTML = "<p>Please fill out all fields.</p>";
        }{
            document.getElementById('result').innerHTML=''
        }
    }

    function displaySavedData() {
        var savedListContainer = document.getElementById("savedList");
        savedListContainer.innerHTML = ''; // Clear previous list

        savedData.forEach((entry, index) => {
            var savedItem = document.createElement("div");
            savedItem.classList.add("saved-item");

            savedItem.innerHTML = `
                <p>Age: ${entry.age}, Gender: ${entry.gender}, Height: ${entry.height} cm, Weight: ${entry.weight} kg, 
                   Activity: ${entry.activity}, TDEE: ${entry.tdee} Calories</p>
                <p>Protein: ${entry.protein}g, Carbs: ${entry.carbs}g, Fats: ${entry.fats}g</p>
                <button class="remove-btn" onclick="removeEntry(${index})">Remove</button>
            `;

            savedListContainer.appendChild(savedItem);
        });
    }

    function removeEntry(index) {
        savedData.splice(index, 1);  // Remove the entry from the saved data array
        displaySavedData();  // Re-display the saved data
    }