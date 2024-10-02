let winnerCount = 0;
let totalBoxes = 10; // Total number of boxes
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

    increaseButton.addEventListener('click', () => {
        winnerCount++;
        winnerCountDisplay.textContent = winnerCount;
    });

    decreaseButton.addEventListener('click', () => {
        if (winnerCount > 0) {
            winnerCount--;
            winnerCountDisplay.textContent = winnerCount;
        }
    });

    startButton.addEventListener('click', () => {
        drawnNumbers = []; // Reset drawn numbers
        startButton.disabled = true;
        stopButton.disabled = false;

        // Start generating random numbers in all boxes
        interval = setInterval(() => {
            for (let i = 0; i < totalBoxes; i++) {
                const randomNum = Math.floor(Math.random() * 9999) + 1; // Random number between 1-9999
                document.getElementById(`box-${i}`).textContent = randomNum.toString().padStart(5, '0'); // Pad to 5 digits
            }
        }, 200); // Update every 200ms
    });

    stopButton.addEventListener('click', () => {
        clearInterval(interval);
        startButton.disabled = false;
        stopButton.disabled = true;

        // Reset all boxes to '00000' initially
        for (let i = 0; i < totalBoxes; i++) {
            document.getElementById(`box-${i}`).textContent = '00000';
        }

        // Draw final numbers
        drawnNumbers = [];
        while (drawnNumbers.length < winnerCount) {
            let randomNum;
            do {
                randomNum = Math.floor(Math.random() * totalBoxes);
            } while (drawnNumbers.includes(randomNum));
            drawnNumbers.push(randomNum);
            const finalNum = Math.floor(Math.random() * 9999) + 1; // Final drawn number between 1-9999
            document.getElementById(`box-${randomNum}`).textContent = finalNum.toString().padStart(5, '0'); // Show the final drawn number
        }
    });
});
