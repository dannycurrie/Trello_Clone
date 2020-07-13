import { elementExists, createElement, clearElementChildren } from './utils.js';

const cardText = (cardElement, text) =>
  createElement('div', { textContent: text, parent: cardElement });

const cardInput = (cardElement, updateCard) => {
  const cardInput = createElement('div', {
    className: 'card-text-edit',
    parent: cardElement,
  });
  const input = createElement('textarea', {
    dir: 'auto',
    placeholder: 'Enter a title',
    autofocus: true,
    parent: cardInput,
  });

  input.addEventListener('keypress', (e) => {
    if (e.which === 13) updateCard({ text: e.target.value });
  });

  input.addEventListener('blur', (e) => {
    updateCard({ text: e.target.value });
  });
};

const cardFooter = (cardElement) => {
  const iconsContainer = createElement('div', {
    className: 'card-icons',
    parent: cardElement,
  });
  for (let i = 0; i < 3; i++) {
    createElement('div', {
      className: 'icon',
      textContent: '+',
      parent: iconsContainer,
    });
  }
};

export default (update) => (card) => {
  if (!card.changed) return;

  const updateCard = (newCardData) => {
    update(card.id, { ...card, ...newCardData });
  };

  const parent = document.querySelector(`ul#${card.listId} `);

  let cardElement;
  const cardClass = card.edit ? 'card edit' : 'card';

  if (elementExists(card.id)) {
    cardElement = document.querySelector(`#${card.id}`);
    if (card.removed) {
      cardElement.remove();
      return;
    }
    clearElementChildren(cardElement);
  } else {
    const li = createElement('li', { parent });
    cardElement = createElement('div', {
      className: cardClass,
      parent: li,
      id: card.id,
    });
  }

  if (card.edit) cardInput(cardElement, updateCard);
  else {
    cardText(cardElement, card.text);
    cardFooter(cardElement);
  }
};
