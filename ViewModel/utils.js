export const makeCreateElement = document => (type, options = {}) => {
  const element = document.createElement(type);

  for (let key of Object.keys(options)) {
    if (key == 'parent')
      options.parent.appendChild(element);
    else
      element[key] = options[key];
  }

  return element;
}

export const bindKeyElements = document => {
  const app = document.querySelector('#app');
  const createElement = makeCreateElement(document);
  return {
    app,
    createElement
  }
}

const getListId = id => `list-${id.split('list-')[1]}`;

const addCard = addToModel => e =>
  addToModel({
    listId: getListId(e.target.id),
  });

const elementExists = id => document.querySelector(`#${id}`) !== null;

export const makeCreateList = (createElement, listsContainer, addCardToModel) => list => {

  if (elementExists(list.id)) return;

  const container = createElement('div', { className: 'list-container', id: list.id, parent: listsContainer });
  // header
  const listHeader = createElement('div', { className: 'list-header', parent: container });
  createElement('div', { className: 'list-title', textContent: list.name, parent: listHeader });
  createElement('div', { className: 'list-menu', textContent: '...', parent: listHeader });
  // list
  createElement('ul', { id: list.id, parent: container });

  // add card button
  const addContainer = createElement('div', { className: 'add-container', parent: container });
  const addBtn = createElement('div', { className: 'add-btn', textContent: 'Add another card', parent: addContainer, id: `addCard - ${list.id} ` });
  addBtn.addEventListener('click', addCard(addCardToModel));
  createElement('span', { className: 'icon', textContent: '+', parent: addBtn });
  const createBtn = createElement('div', { className: 'create-btn', parent: addContainer });
  createElement('span', { className: 'icon', textContent: '+', parent: createBtn });
}

export const makeCreateCard = (document, createElement) => card => {
  if (elementExists(card.id)) return;

  const parent = document.querySelector(`ul#${card.listId} `);
  const li = createElement('li', { parent });
  const cardClass = card.edit ? 'card edit' : 'card';
  const cardElement = createElement('div', { className: cardClass, parent: li, id: card.id });

  if (card.edit) {
    const cardInput = createElement('div', { className: 'card-text-edit', parent: cardElement });
    createElement('textarea', { dir: 'auto', placeholder: card.text, autofocus: true, parent: cardInput });
  } else {
    createElement('div', { textContent: card.text, parent: cardElement });
    const iconsContainer = createElement('div', { className: 'card-icons', parent: cardElement });
    for (let i = 0; i < 3; i++) {
      createElement('div', { className: 'icon', textContent: '+', parent: iconsContainer });
    }
  }

}