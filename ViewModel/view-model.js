import getModel from '../Model/model.js';

const makeCreateElement = document => (type, options = {}) => {
  const element = document.createElement(type);

  for (let key of Object.keys(options)) {
    if (key == 'parent')
      options.parent.appendChild(element);
    else
      element[key] = options[key];
  }

  return element;
}

const bindKeyElements = document => {
  const app = document.querySelector('#app');
  const createElement = makeCreateElement(document);
  return {
    app,
    createElement
  }
}

const makeCreateList = (createElement, listsContainer) => list => {
  const container = createElement('div', { className: 'list-container', id: list.id, parent: listsContainer });
  // header
  const listHeader = createElement('div', { className: 'list-header', parent: container });
  createElement('div', { className: 'list-title', textContent: list.name, parent: listHeader });
  createElement('div', { className: 'list-menu', textContent: '...', parent: listHeader });
  // list
  createElement('ul', { id: list.id, parent: container });

  // add card button
  const addContainer = createElement('div', { className: 'add-container', parent: container });
  const addBtn = createElement('div', { className: 'add-btn', textContent: 'Add another card', parent: addContainer });
  createElement('span', { className: 'icon', textContent: '+', parent: addBtn });
  const createBtn = createElement('div', { className: 'create-btn', parent: addContainer });
  createElement('span', { className: 'icon', textContent: '+', parent: createBtn });
}

const makeCreateCard = (document, createElement) => card => {
  const parent = document.querySelector(`ul#${card.listId}`);
  console.log('parent: ', parent);
  const li = createElement('li', { parent });
  const cardElement = createElement('div', { className: 'card', parent: li });
  createElement('div', { textContent: card.text, parent: cardElement });
  const iconsContainer = createElement('div', { className: 'card-icons', parent: cardElement });
  for (let i = 0; i < 3; i++) {
    createElement('div', { className: 'icon', textContent: '+', parent: iconsContainer });
  }
}

export default document => {

  const model = getModel();

  const { app, createElement } = bindKeyElements(document);
  const listsContainer = createElement('div', { className: 'lists-container', parent: app });
  const createList = makeCreateList(createElement, listsContainer);
  const createCard = makeCreateCard(document, createElement);

  const createLists = () => {
    const lists = model.lists();
    lists.forEach(createList);
  }

  const createCards = () => {
    const cards = model.cards();
    cards.forEach(createCard);
  }

  return {
    bindModel: () => {
      createLists();
      createCards();
    }
  }
};