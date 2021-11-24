// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - 
// abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, 
// altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, 
// cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.


// Funzione CLICK to PLAY
document.getElementById('play').addEventListener('click', startGame);
function startGame() {
    // Game options
    const numberOfBombs = 16;

    // CREO LA GRIGLIA CON GLI SQUARE
    // Array di numeri in base al livello
    const level = document.getElementById('dropdown').value;
    let numberOfSquares;
    if (level == 'easy') {
        numberOfSquares = 100;
        gridDimension = 10;
    } else if (level == 'medium') {
        numberOfSquares = 81; 
        gridDimension = 9;
    } else if (level == 'hard') {
        numberOfSquares = 49;
        gridDimension = 7;
    }

    // Genero array di 16 bombe
    const bombsArray = generateBombs(numberOfSquares, numberOfBombs);
    console.log(bombsArray);

    // Calcolo num max tentativi che si possono fare
    const maxTries = numberOfSquares - bombsArray.length;

    // Genero array che contiene bombe non azzeccate
    const rightTriesArray = [];
    
    // Richiamo funzione Genera Numeri nell Griglia
    let generatedNumbers = generateGridNumbers(numberOfSquares);
    
    // Per ogni numero nell'array creo una cella e la appendo al grid
    const myGrid = document.getElementById('grid');
    myGrid.innerHTML = '';
    
    for(let i = 0; i < generatedNumbers.length; i++) {
        
        const thisNumber = generatedNumbers[i];
        const newSquare = generateGridItem(thisNumber, gridDimension);
    
        // Evento CLICK
        newSquare.addEventListener('click', squareClick);
         
        // Aggiungo l'elemento alla griglia
        myGrid.appendChild(newSquare);
    }

    // _____________________
    // | PROJECT FUNCTIONS |- Da lasciare dentro la funzione start game per far sì che vengano lette (funzioni impure)
    // Funzione Click
    function squareClick() {
        // Per leggerre il numero che c'è dentro la cella
        const clickedNumber = parseInt ( this.querySelector('span').textContent );
        
        // Se numero dentro array bombe il gioco finisce
        if (bombsArray.includes(clickedNumber)) {
            // Aggiungo classe 'bomb' alla cella e diventa rossa
            this.classList.add('bomb');
        } else {
            // Aggiungo classe 'active' alla cella e diventa azzurra
            this.classList.add('active');
            // Per far sì che la cella non venga più cliccata dopo il primo click
            this.style.pointerEvents = 'none';

            // Numero selezionato viene aggiunto all'array bombe non azzeccate
            rightTriesArray.push(clickedNumber);
        }
    }
}

// _____________
// | FUNCTIONS |

// Funzione genera array con X numeri

// quantityOfNumbers: quanti numeri dovrà generare
// return: array di numeri
function generateGridNumbers (quantityOfNumbers) {
    const numbersArray = [];

    for ( let i= 1; i <= quantityOfNumbers; i++) {
         numbersArray.push(i);
    }
    return numbersArray;
}

// Funzione crea un elemento della griglia

// number: numero da inserire nello square
// cellDimension: numero di celle per riga
// return: Torna l'elemento html creato
function generateGridItem(number, cellDimension) {
    const newSquare = document.createElement('div');
    newSquare.classList.add('square');
    newSquare.innerHTML = `<span>${number}</span>`;

    // Numero squares in base ai livelli
    newSquare.style.width = `calc(100% / ${cellDimension})`;
    newSquare.style.height = `calc(100% / ${cellDimension})`;

    return newSquare;
}

// FUNZIONI PER LE BOMBE
// Genero array di bombe

// maxRangeNumber: numero max di bombe in base al numero di elementi della griglia
// numberOfBombs: numero bombe
// return: array bombe
function generateBombs(maxRangeNumber, numberOfBombs) {
    const arrayBombs = [];
    // Finché array non ha numberOfBombs elementi
    while (arrayBombs.length < numberOfBombs) {
        // Genero numero random
        const randomNumber = getRndInteger(1, maxRangeNumber);

        // Se elemento non è già presente lo pusho
        if(!arrayBombs.includes(randomNumber)) {
            arrayBombs.push(randomNumber);
        }
    }
    return arrayBombs;
}

// Funzione genera numeri random
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
  
