let cards = document.querySelectorAll('.card');
let score = document.getElementById('score');
let timeDisplay = document.getElementById('time');
let clickCard = true;
let x = 0;
let flips = 0;
let hasLookdCard = false;
let lockBoard = false;
let firstCard, secondCard;
function lookCard() {
    time();
    flips++;
    if(lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('look');
    if (!hasLookdCard) {
        hasLookdCard = true;
        firstCard = this;
    } else {
        secondCard = this;
        check();
        win();        
    }     
}
function check() {
    if(firstCard.children[0].src === secondCard.children[0].src){
        firstCard.removeEventListener('click',lookCard);
        secondCard.removeEventListener('click',lookCard);
        score.innerHTML =+score.innerHTML+100;
        reset();
        x++;
        time();
    }else{
        lockBoard = true;
        score.innerHTML =+score.innerHTML - 10;
        setTimeout(() => {
        firstCard.classList.remove('look');
        secondCard.classList.remove('look');
        reset();      
        }, 1800);    
    }    
}
function reset() {
    hasLookdCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}
function win() {
    if (x===8) {
        clickCard = true;
        winConteiner();
    } 
}
function winConteiner () {
    let div = document.getElementById('win');
    div.style.display = 'flex';
    document.getElementById('timeResult').innerHTML = timeDisplay.innerHTML;
    document.getElementById('scoreResult').innerHTML = score.innerHTML;
    document.getElementById('flips').innerHTML = flips;
}
function newGame() {
    location.reload();
}
function startTimer(duration, display) {
    let timer = duration; 
    let minutes;
    let seconds;
    let myTimer = setInterval(startMyTimer,1000);
    function startMyTimer() {
        if (x===8) {
            clearInterval(myTimer);
        }else{
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timer++
        display.textContent = minutes + ":" + seconds; 
        }
    }      
}
function time() {
    if (clickCard) {
    startTimer(0,timeDisplay); 
    clickCard = false;
    
    }
}
(function shuffle(){
    cards.forEach(card=>{
        let rendomPos = Math.floor(Math.random() * 16);
        card.style.order = rendomPos;
    })
})();
cards.forEach(card => card.addEventListener('click',lookCard));

