function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateColorOptions(correctColor) {
    const colors = new Set();
    colors.add(correctColor);

    while (colors.size < 6) {
        colors.add(getRandomColor());
    }

    return Array.from(colors).sort(() => Math.random() - 0.5);
}

let targetColor = getRandomColor();
let score = 0;

function startGame() {
    targetColor = getRandomColor();
    document.getElementById("colorBox").style.backgroundColor = targetColor;
    document.getElementById("gameStatus").textContent = "";

    const colorOptions = generateColorOptions(targetColor);
    const buttons = document.querySelectorAll(".colorOption");

    buttons.forEach((button, index) => {
        button.style.backgroundColor = colorOptions[index];
        button.onclick = () => checkGuess(colorOptions[index]);
    });
}

function checkGuess(selectedColor) {
    if (selectedColor === targetColor) {
        document.getElementById("gameStatus").textContent = "Correct! 🎉";
        score++;
        triggerCelebration(); 
    } else {
        document.getElementById("gameStatus").textContent = "Wrong! Try again.";
    }

    document.getElementById("score").textContent = score;
}

function triggerCelebration() {
    const confettiContainer = document.createElement("div");
    confettiContainer.classList.add("confetti-container");
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random()}s`;
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        confettiContainer.remove();
    }, 3000);
}

document.getElementById("newGameButton").addEventListener("click", startGame);
startGame();
