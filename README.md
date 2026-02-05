# Tic_Tac_Toe

A modern, interactive Tic-Tac-Toe game built with vanilla JavaScript, focusing on clean code principles, the **Module Pattern**, and **Factory Functions**.

### [Live Demo](https://codamee.github.io/Tic_Tac_Toe/)

### 🚀 Features

- **Dynamic Player Setup:** Custom names can be entered via a modal interface.
- **Reactive UI:** The game board updates in real-time using data attributes and DOM manipulation.
- **State Management:** Built using an internal game controller that handles win validation, draw detection, and turn-switching logic.
- **Clean Design:** Features a glassmorphism-inspired modal and a responsive grid layout.

### 🛠️ Technical Implementation

This project was developed to demonstrate mastery of:

- **The Module Pattern:** The `gameBoard` is wrapped in an IIFE (Immediately Invoked Function Expression) to keep the board state private and encapsulated.
- **Factory Functions:** Each `cell` is an individual object created via a factory, allowing for unique state management within every grid square.
- **Closures:** Used within the `gameController` to manage private variables like `winStatus` and `activePlayer`.
- **Event Delegation:** A single event listener is attached to the board container to manage clicks efficiently.

### 🧩 How it Works

1. **Initialization:** The `screenUi` function initializes the game and renders the board.
2. **Input:** Players enter their names; the `submitBtn` listener updates the player objects and hides the entrance form.
3. **Game Logic:**

- `playRound` checks if a move is valid.
- The `winPatterns` array (a 3D array of coordinates) is checked using the `.some()` method after every move.
- If no winner is found and all cells are filled, a draw is declared.

4. **Reset:** The game can be reset multiple times without a page refresh by clearing the internal `gameBoard` array and resetting the `winStatus`.

### 🖥️ Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/tic-tac-toe.git

```

2. Open `index.html` in your favorite browser.

