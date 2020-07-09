import { elementExists, createElement } from './utils.js';

export default (card) => {
  if (elementExists(card.id)) return;

  const parent = document.querySelector(`ul#${card.listId} `);
  const li = createElement('li', { parent });
  const cardClass = card.edit ? 'card edit' : 'card';
  const cardElement = createElement('div', {
    className: cardClass,
    parent: li,
    id: card.id,
  });

  if (card.edit) {
    const cardInput = createElement('div', {
      className: 'card-text-edit',
      parent: cardElement,
    });
    createElement('textarea', {
      dir: 'auto',
      placeholder: card.text,
      autofocus: true,
      parent: cardInput,
    });
  } else {
    createElement('div', { textContent: card.text, parent: cardElement });
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
  }
};
