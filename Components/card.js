import {
  elementExists,
  createElement,
  clearElementChildren,
  getCardElement,
  getListElement,
} from './utils.js';

const cardElement = (id, parent, edit) => {
  const li = createElement('li', { parent, draggable: true });
  li.addEventListener('dragstart', (ev) => {
    ev.dataTransfer.setData('text/plain', id);
  });
  return createElement('div', {
    className: edit ? 'card edit' : 'card',
    parent: li,
    id,
  });
};

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

const NEW = 'NEW';
const MOVED = 'MOVED';
const UPDATED = 'UPDATED';
const REMOVED = 'REMOVED';

export default (update) => (card) => {
  if (!card.changed) return;

  const updateCard = (newCardData) => {
    update(card.id, { ...card, ...newCardData });
  };

  const parent = getListElement(card.listId);

  let cardState = '';
  if (!elementExists(card.id)) cardState = NEW;
  else if (card.moved) cardState = MOVED;
  else if (card.removed) cardState = REMOVED;
  else cardState = UPDATED;

  let element;

  // GET / CREATE CARD ELEMENT
  switch (cardState) {
    case NEW:
      // create new element
      element = cardElement(card.id, parent, card.edit);
      break;

    case MOVED: {
      // remove existing element and create new element in new location
      element = getCardElement(card.id);
      element.remove();
      element = cardElement(card.id, parent, false);
      break;
    }

    case UPDATED: {
      // clear existing element ready for updated content
      element = getCardElement(card.id);
      clearElementChildren(element);
      break;
    }

    case REMOVED: {
      // remove existing element
      element = getCardElement(card.id);
      element.remove();
      return;
    }
  }

  if (card.edit) cardInput(element, updateCard);
  else {
    cardText(element, card.text);
    cardFooter(element);
  }
};
