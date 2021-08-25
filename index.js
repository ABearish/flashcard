import Cards from "./CardsClass.js";
const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-container");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");
const removeCardBtn = document.getElementById("remove-card");


// create an array for DOM-elements
const cardsEl = [];

const cardData = new Cards();
getCardsData();

// Store Card Data
function createCards() {
  if (cardData.cards) {
    cardData.cards.forEach((card, idx) => createCard(card, idx));
  }
}

function createCard(data, idx) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (idx === 0) {
    card.classList.add("active");
    removeCardBtn.style.display = "block";
  }
  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
      <p>${data.answer}</p>
    </div>
    </div>
  `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));
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
  const cards = JSON.parse(localStorage.getItem("cards"));
  if (cards !== null) {
    cardData.addCards(cards);
  } else {
    addContainer.classList.add("show");
  }
}


// Add card to LocalStorage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

// next button
nextBtn.addEventListener("click", () => {
  cardsEl[cardData.currentCard].className = "card left";
  cardData.incrementCards();
  cardsEl[cardData.currentCard].className = "card active";
  updateCurrentText();
});

// previous button
prevBtn.addEventListener("click", () => {
  cardsEl[cardData.currentCard].className = "card right";
  cardData.decrementCards();
  cardsEl[cardData.currentCard].className = "card active";
  updateCurrentText();
});

// show add container
showBtn.addEventListener("click", () => {
  addContainer.classList.add("show");
});

// hide add container
hideBtn.addEventListener("click", () => {
  addContainer.classList.remove("show");
});

// Add new Card
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    cardData.addCard(newCard.question, newCard.answer);
    createCards(newCard);

    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");
    setCardsData(cardData.cards);
  }
});

// clear cards button
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  cardData.clearCards();
  window.location.reload();
})

removeCardBtn.addEventListener('click', () => {
  cardData.removeCurrentCard();
  setCardsData(cardData.cards);
  getCardsData();
  updateCurrentText();
  window.location.reload();
})