export default class Cards {
  currentCard = 0;
  totalCards = 0;
  constructor() {
    this.cards = [];
  }

  addCard(question, answer) {
    if (question.trim() && answer.trim()) {
      const newCard = new Card(question, answer);
      this.cards.push(newCard);
      this.totalCards++;
    }
  }

  addCards(arrOfCards) {
    for (const card of arrOfCards) {
      this.addCard(card.question, card.answer);
    }
  }

  clearCards() {
    this.cards = [];
    this.totalCards = 0;
    this.currentCard = 0;
  }

  incrementCards() {
    if (this.currentCard < this.totalCards - 1) {
      this.currentCard++;
    }
  }

  decrementCards() {
    if (this.currentCard > 0) {
      this.currentCard--;
    }
  }  

  getTotalCards() {
    return `${1 + this.currentCard} / ${this.cards.length}`
  }

  removeCurrentCard() {
    const newCards = this.cards.filter((card, idx) => {
      return idx !== this.currentCard;
    })
    this.cards = newCards;
  }
}

class Card {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
  }
}

