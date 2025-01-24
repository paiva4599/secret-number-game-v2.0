let numbersPool = [];
let secretNumber = randomNumberGenerator();
let attempts = 1;

initialMessage();


function changeContent(tag, message) {
    let title = document.querySelector(tag);
    title.innerHTML = message;
    responsiveVoice.speak(message);
}


function initialMessage(){
    changeContent("h1", "Secret Number Game");
    changeContent("p", "Choose a number between 0 and 10");
}


function verifyGuess() {
    let guess = document.querySelector("input").value;

    if (guess == secretNumber){
        let attemptWord = attempts > 1 ? "attempts" : "attempt";
        let attemptMessage = `You discovered the secret number with ${attempts} ${attemptWord}.`
        changeContent("h1", "Congratulations!");
        changeContent("p", attemptMessage);

        document.getElementById("restart").removeAttribute("disabled");
        document.getElementById("guess").setAttribute("disabled", true);
        console.log(numbersPool);
    } else if (guess > secretNumber) {
        changeContent("p", "The secret Number is less than " + guess);
    } else {
        changeContent("p", "The secret Number is greater than " + guess);
    }

    attempts ++;
    cleanTextField();
}


function randomNumberGenerator(){
    let randomNumber = parseInt(Math.random() * 10 + 1);
    if (numbersPool.length > 3){
        numbersPool = [];
    }
    
    if (numbersPool.includes(randomNumber)){
        return randomNumberGenerator();
    } else {
        numbersPool.push(randomNumber);
        return randomNumber;
    }
}


function cleanTextField(){
    guess = document.querySelector("input");
    guess.value = "";
}


function restartGame(){
    secretNumber = randomNumberGenerator();
    attempts = 1;
    initialMessage();

    document.getElementById("guess").removeAttribute("disabled");
    document.getElementById("restart").setAttribute("disabled", true);
}
