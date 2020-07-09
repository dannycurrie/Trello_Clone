import { createElement } from '../Components/utils.js';
import getModel from '../Model/model.js';
import { bindKeyElements } from './utils.js';
import card from '../Components/card.js';
import list from '../Components/list.js';

export default (document) => {
  const model = getModel(bindModel);

  const { app } = bindKeyElements(document);
  const listsContainer = createElement('div', {
    className: 'lists-container',
    parent: app,
  });
  const createList = list(listsContainer, model.addCard);

  const createLists = () => {
    const lists = model.lists();
    lists.forEach(createList);
  };

  const createCards = () => {
    const cards = model.cards();
    cards.forEach(card);
  };

  function bindModel() {
    createLists();
    createCards();
  }

  return {
    bindModel,
  };
};
