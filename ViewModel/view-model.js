import getModel from '../Model/model.js';
import {
  bindKeyElements,
  makeCreateCard,
  makeCreateList,
} from './utils.js';

export default document => {

  const model = getModel(bindModel);

  const { app, createElement } = bindKeyElements(document);
  const listsContainer = createElement('div', { className: 'lists-container', parent: app });
  const createList = makeCreateList(createElement, listsContainer, model.addCard);
  const createCard = makeCreateCard(document, createElement);

  const createLists = () => {
    const lists = model.lists();
    lists.forEach(createList);
  }

  const createCards = () => {
    const cards = model.cards();
    cards.forEach(createCard);
  }

  function bindModel() {
    createLists();
    createCards();
  }

  return {
    bindModel,
  }
};