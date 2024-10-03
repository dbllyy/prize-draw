let winnerCount = 1;
const totalBoxes = 10; // Total number of boxes
let drawnNumbers = [];
let interval;

document.addEventListener("DOMContentLoaded", () => {
    const boxesContainer = document.getElementById('boxes');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const winnerCountDisplay = document.getElementById('winnerCount');
    const increaseButton = document.getElementById('increase');
    const decreaseButton = document.getElementById('decrease');

    // Create boxes
    for (let i = 0; i < totalBoxes; i++) {
        const box = document.createElement('div');
        box.className = 'box';
        box.id = `box-${i}`;
        box.textContent = '00000';
        boxesContainer.appendChild(box);
    }

    // Handle increase button
    increaseButton.addEventListener('click', () => {
        if (winnerCount < 10) { // Limit to max 10 winners
            winnerCount++;
            winnerCountDisplay.textContent = winnerCount;
        }
    });

    // Handle decrease button
    decreaseButton.addEventListener('click', () => {
        if (winnerCount > 1) { // Limit to min 1 winner
            winnerCount--;
            winnerCountDisplay.textContent = winnerCount;
        }
    });
    startButton.addEventListener('click', () => {
        drawnNumbers = []; // Reset drawn numbers
        startButton.disabled = true;
        stopButton.disabled = false;
    
        // Reset all boxes to their initial state (no winners)
        for (let i = 0; i < totalBoxes; i++) {
            const box = document.getElementById(`box-${i}`);
            box.textContent = '00000'; // Reset text to '00000'
            box.classList.remove('winner'); // Remove the winner highlight (reset color to white)
        }
    
        // Start generating random numbers in all boxes
        interval = setInterval(() => {
            for (let i = 0; i < totalBoxes; i++) {
                const randomNum = Math.floor(Math.random() * 10000) + 1; // Random number between 1-10000
                document.getElementById(`box-${i}`).textContent = randomNum.toString().padStart(5, '0'); // Pad to 5 digits
            }
        }, 100); // Update every 100ms for smoother animation
    });
    
    stopButton.addEventListener('click', () => {
        clearInterval(interval);
        startButton.disabled = false;
        stopButton.disabled = true;
    
        // Reset all boxes to '00000' initially
        for (let i = 0; i < totalBoxes; i++) {
            document.getElementById(`box-${i}`).textContent = '00000';
            document.getElementById(`box-${i}`).classList.remove('winner'); // Remove winner class
        }
    
        // Draw final numbers
        drawnNumbers = [];
        let selectedBoxes = [];
    
        // Get current number of rows in the table (to continue counting winners)
        let winnersList = JSON.parse(localStorage.getItem("winners")) || []; // Retrieve stored winners or empty array
    
        while (drawnNumbers.length < winnerCount) {
            let randomNum;
            do {
                randomNum = Math.floor(Math.random() * totalBoxes);
            } while (drawnNumbers.includes(randomNum) || selectedBoxes.includes(randomNum)); // Avoid duplicates
            drawnNumbers.push(randomNum);
            selectedBoxes.push(randomNum); // Add to selected boxes
    

            // Random number between 1-10000
            const finalNum = Math.floor(Math.random() * 10000) + 1; 
            const winningBox = document.getElementById(`box-${randomNum}`);
            winningBox.textContent = finalNum.toString().padStart(5, '0'); // Show the final drawn number
            winningBox.classList.add('winner'); // Highlight the winning box
    
            // Store winner in local storage
            winnersList.push({
                id: winnersList.length + 1, // Winner index
                number: finalNum.toString().padStart(5, '0') // Winner number
            });
        }
    
        // Save updated winners list to Local Storage
        localStorage.setItem("winners", JSON.stringify(winnersList));
    
        // Optionally redirect to winners page after a delay
        // window.location.href = "winners.html"; // Uncomment this line if you want to redirect automatically
    });
    
});
