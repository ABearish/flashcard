import Cards from "./CardsClass.js";
const cardsContainer = document.getElementById("cards-container")! as HTMLElement;
const prevBtn = document.getElementById("prev")! as HTMLElement;
const nextBtn = document.getElementById("next")! as HTMLElement;
const currentEl = document.getElementById("current")! as HTMLElement;
const showBtn = document.getElementById("show")! as HTMLElement;
const hideBtn = document.getElementById("hide")! as HTMLElement;
const questionEl = document.getElementById("question")! as any;
const answerEl = document.getElementById("answer")! as any;
const addCardBtn = document.getElementById("add-container")! as HTMLElement;
const clearBtn = document.getElementById("clear")! as HTMLElement;
const addContainer = document.getElementById("add-container")! as HTMLElement;
const removeCardBtn = document.getElementById("remove-card")! as HTMLElement;



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
prevBtn.addEventListener("click", (): void => {
  cardsEl[cardData.currentCard].className = "card right";
  cardData.decrementCards();
  cardsEl[cardData.currentCard].className = "card active";
  updateCurrentText();
});

// show add container
showBtn.addEventListener("click", (): void => {
  addContainer.classList.add("show");
});

// hide add container
hideBtn.addEventListener("click", (): void => {
  addContainer.classList.remove("show");
});

// Add new Card
addCardBtn.addEventListener("click", (): void => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    cardData.addCard(newCard.question, newCard.answer);
    createCards();

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