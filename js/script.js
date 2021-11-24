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
    
    // AL CLICK SU OGNI SQUARE AGGIUNGO LA CLASSE "ACTIVE" ALLO SQUARE
    function squareClick() {
        this.classList.add('active');
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

