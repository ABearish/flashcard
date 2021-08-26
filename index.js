"use strict";
exports.__esModule = true;
var CardsClass_js_1 = require("./CardsClass.js");
var cardsContainer = document.getElementById("cards-container");
var prevBtn = document.getElementById("prev");
var nextBtn = document.getElementById("next");
var currentEl = document.getElementById("current");
var showBtn = document.getElementById("show");
var hideBtn = document.getElementById("hide");
var questionEl = document.getElementById("question");
var answerEl = document.getElementById("answer");
var addCardBtn = document.getElementById("add-container");
var clearBtn = document.getElementById("clear");
var addContainer = document.getElementById("add-container");
var removeCardBtn = document.getElementById("remove-card");
// create an array for DOM-elements
var cardsEl = [];
var cardData = new CardsClass_js_1["default"]();
getCardsData();
// Store Card Data
function createCards() {
    if (cardData.cards) {
        cardData.cards.forEach(function (card, idx) { return createCard(card, idx); });
    }
}
function createCard(data, idx) {
    var card = document.createElement("div");
    card.classList.add("card");
    if (idx === 0) {
        card.classList.add("active");
        removeCardBtn.style.display = "block";
    }
    card.innerHTML = "\n  <div class=\"inner-card\">\n    <div class=\"inner-card-front\">\n      <p>" + data.question + "</p>\n    </div>\n    <div class=\"inner-card-back\">\n      <p>" + data.answer + "</p>\n    </div>\n    </div>\n  ";
    card.addEventListener("click", function () { return card.classList.toggle("show-answer"); });
    // add to DOM cards
    cardsEl.push(card);
    cardsContainer.appendChild(card);
    updateCurrentText();
}
function updateCurrentText() {
    currentEl.innerHTML = cardData.getTotalCards();
    if (cardsEl.length === 0) {
        addContainer.classList.add("show");
    }
}
createCards();
// Get data from Local Storage
function getCardsData() {
    var cards = JSON.parse(localStorage.getItem("cards"));
    if (cards !== null) {
        cardData.addCards(cards);
    }
    else {
        addContainer.classList.add("show");
    }
}
// Add card to LocalStorage
function setCardsData(cards) {
    localStorage.setItem("cards", JSON.stringify(cards));
    window.location.reload();
}
// next button
nextBtn.addEventListener("click", function () {
    cardsEl[cardData.currentCard].className = "card left";
    cardData.incrementCards();
    cardsEl[cardData.currentCard].className = "card active";
    updateCurrentText();
});
// previous button
prevBtn.addEventListener("click", function () {
    cardsEl[cardData.currentCard].className = "card right";
    cardData.decrementCards();
    cardsEl[cardData.currentCard].className = "card active";
    updateCurrentText();
});
// show add container
showBtn.addEventListener("click", function () {
    addContainer.classList.add("show");
});
// hide add container
hideBtn.addEventListener("click", function () {
    addContainer.classList.remove("show");
});
// Add new Card
addCardBtn.addEventListener("click", function () {
    var question = questionEl.value;
    var answer = answerEl.value;
    if (question.trim() && answer.trim()) {
        var newCard = { question: question, answer: answer };
        cardData.addCard(newCard.question, newCard.answer);
        createCards();
        questionEl.value = "";
        answerEl.value = "";
        addContainer.classList.remove("show");
        setCardsData(cardData.cards);
    }
});
// clear cards button
clearBtn.addEventListener('click', function () {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    cardData.clearCards();
    window.location.reload();
});
removeCardBtn.addEventListener('click', function () {
    cardData.removeCurrentCard();
    setCardsData(cardData.cards);
    getCardsData();
    updateCurrentText();
    window.location.reload();
});
