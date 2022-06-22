const CARDS = document.querySelectorAll('.card');
let hesFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;
//    this.classList.toggle('flip');  o Toglle deixa o efeito de virar e desvirar a carta varias vezes
    this.classList.add('flip');

    if (!hesFlippedCard){
        hesFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hesFlippedCard = false;
    checkForMath();
}

function checkForMath(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500)
}

function resetBoard(){
    [hesFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    CARDS.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12); //math.floor arredonda para um número inteiro, Math.random sorteia um número e no caso será 12 números pois foi multiplicado por 12
        card.style.order = ramdomPosition;
    })
})();

CARDS.forEach(card => {
    card.addEventListener('click', flipCard)
})