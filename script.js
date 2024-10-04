document.addEventListener("DOMContentLoaded", () => {
    const boxesContainer = document.getElementById('boxes');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const winnerCountDisplay = document.getElementById('winnerCount');
    const increaseButton = document.getElementById('increase');
    const decreaseButton = document.getElementById('decrease');
    const maxValueInput = document.getElementById('maxValue');
     // Input for max value

    let winnerCount = 1; // Initialize winner count
    let totalBoxes = 10; // Total number of boxes
    let drawnNumbers = []; // Array to store drawn numbers
    let interval; // Interval for number generation

    // Create boxes for displaying numbers
    for (let i = 0; i < totalBoxes; i++) {
        const box = document.createElement('div');
        box.className = 'box';
        box.id = `box-${i}`;
        box.textContent = '00000'; // Default text for each box
        boxesContainer.appendChild(box);
    }

    // Event listener for increasing the winner count
    increaseButton.addEventListener('click', () => {
        if (winnerCount < 10) { // Limit to a maximum of 10 winners
            winnerCount++;
            winnerCountDisplay.textContent = winnerCount; // Update display
        }
    });

    // Event listener for decreasing the winner count
    decreaseButton.addEventListener('click', () => {
        if (winnerCount > 1) { // Limit to a minimum of 1 winner
            winnerCount--;
            winnerCountDisplay.textContent = winnerCount; // Update display
        }
    });

    // Event listener for the start button
    startButton.addEventListener('click', () => {
        const maxValue = parseInt(maxValueInput.value) || 10000; // Get max value from input

        // Check if the maxValue is greater than the winnerCount
        if (maxValue <= winnerCount) {
            alert('Maximal nomor yang ditarik harus lebih besar dari jumlah pemenang.');
            return;
        }

        // Reset drawn numbers and box contents before starting
        drawnNumbers = [];
        startButton.disabled = true; // Disable start button
        stopButton.disabled = false; // Enable stop button

        // Reset all boxes to their initial state (no winners)
        for (let i = 0; i < totalBoxes; i++) {
            const box = document.getElementById(`box-${i}`);
            box.textContent = '00000'; // Reset text to '00000'
            box.classList.remove('winner'); // Remove the winner highlight
        }

        // Start generating random numbers in all boxes
        interval = setInterval(() => {
            for (let i = 0; i < totalBoxes; i++) {
                let randomNum;
                do {
                    randomNum = Math.floor(Math.random() * maxValue) + 1; // Generate random number
                } while (drawnNumbers.includes(randomNum)); // Avoid duplicates
                
                document.getElementById(`box-${i}`).textContent = randomNum.toString().padStart(5, '0'); // Pad to 5 digits
            }
        }, 100); // Update every 100ms for smoother animation
    });

    // stopButton.addEventListener('click', () => {
    //     clearInterval(interval); // Stop generating numbers
    //     startButton.disabled = false; // Enable start button
    //     stopButton.disabled = true; // Disable stop button
    
    //     // Draw final numbers for winners
    //     drawnNumbers = []; // Reset drawn numbers
    //     let winnersList = JSON.parse(localStorage.getItem("winners")) || []; // Retrieve stored winners or empty array
    //     let selectedBoxes = []; // To track selected boxes for winning numbers
    
    //     // Draw final numbers for winners
    //     while (drawnNumbers.length < winnerCount) {
    //         let finalNum;
    //         do {
    //             finalNum = Math.floor(Math.random() * (parseInt(maxValueInput.value) || 10000)) + 1; // Generate final random number
    //         } while (drawnNumbers.includes(finalNum)); // Ensure uniqueness
    
    //         drawnNumbers.push(finalNum); // Add to drawn numbers
    
    //         // Select a random box to display the final number
    //         let randomBox;
    //         do {
    //             randomBox = Math.floor(Math.random() * totalBoxes); // Pick a random box
    //         } while (selectedBoxes.includes(randomBox)); // Avoid selecting the same box
    
    //         selectedBoxes.push(randomBox); // Add to selected boxes
    
    //         const winningBox = document.getElementById(`box-${randomBox}`);
    //         winningBox.textContent = finalNum.toString().padStart(5, '0'); // Show the final drawn number
    //         winningBox.classList.add('winner'); // Highlight the winning box
    
    //         // Store winner in local storage
    //         winnersList.push({
    //             id: winnersList.length + 1, // Winner index
    //             number: finalNum.toString().padStart(5, '0') // Winner number
    //         });
    //     }
    
    //     // Reset non-winner boxes to '00000'
    //     for (let i = 0; i < totalBoxes; i++) {
    //         if (!selectedBoxes.includes(i)) {
    //             const box = document.getElementById(`box-${i}`);
    //             box.textContent = '00000'; // Set non-winner boxes to '00000'
    //             box.classList.remove('winner'); // Ensure non-winners don't have the winner class
    //         }
    //     }
    
    //     // Save updated winners list to Local Storage
    //     localStorage.setItem("winners", JSON.stringify(winnersList));
    // });

    // Inside the stop button event listener
stopButton.addEventListener('click', () => {
    clearInterval(interval); // Stop generating numbers
    startButton.disabled = false; // Enable start button
    stopButton.disabled = true; // Disable stop button

    // Draw final numbers for winners
    drawnNumbers = []; // Reset drawn numbers
    let winnersList = JSON.parse(localStorage.getItem("winners")) || []; // Retrieve stored winners or empty array
    let selectedBoxes = []; // To track selected boxes for winning numbers

    const prize = document.getElementById("prize").value || 'N/A'; // Capture prize input, default to 'N/A'

    // Draw final numbers for winners
    while (drawnNumbers.length < winnerCount) {
        let finalNum;
        do {
            finalNum = Math.floor(Math.random() * (parseInt(maxValueInput.value) || 10000)) + 1; // Generate final random number
        } while (drawnNumbers.includes(finalNum)); // Ensure uniqueness

        drawnNumbers.push(finalNum); // Add to drawn numbers

        // Select a random box to display the final number
        let randomBox;
        do {
            randomBox = Math.floor(Math.random() * totalBoxes); // Pick a random box
        } while (selectedBoxes.includes(randomBox)); // Avoid selecting the same box

        selectedBoxes.push(randomBox); // Add to selected boxes

        const winningBox = document.getElementById(`box-${randomBox}`);
        winningBox.textContent = finalNum.toString().padStart(5, '0'); // Show the final drawn number
        winningBox.classList.add('winner'); // Highlight the winning box

        // Store winner in local storage with the prize information
        winnersList.push({
            id: winnersList.length + 1, // Winner index
            number: finalNum.toString().padStart(5, '0'), // Winner number
            prize: prize // Prize for the winner
        });
    }

    // Reset non-winner boxes to '00000'
    for (let i = 0; i < totalBoxes; i++) {
        if (!selectedBoxes.includes(i)) {
            const box = document.getElementById(`box-${i}`);
            box.textContent = '00000'; // Set non-winner boxes to '00000'
            box.classList.remove('winner'); // Ensure non-winners don't have the winner class
        }
    }

    // Save updated winners list to Local Storage
    localStorage.setItem("winners", JSON.stringify(winnersList));
});

});
