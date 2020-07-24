import { createElement } from '../Components/utils.js';
import getModel from '../Model/model.js';
import { bindKeyElements } from './utils.js';
import card from '../Components/card.js';
import list from '../Components/list.js';
import addListButton from '../Components/add-list-button.js';

export default () => {
  const model = getModel(bindModel);

  const { app } = bindKeyElements(document);
  const listsContainer = createElement('div', {
    className: 'lists-container',
    parent: app,
  });

  const uiState = {
    creatingCard: false,
    creatingList: false,
  };

  const addCardFn = (data) => {
    if (uiState.creatingCard) {
      return;
    }
    uiState.creatingCard = true;
    model.addCard(data);
  };

  const updateCardFn = (id, data) => {
    uiState.creatingCard = false;
    model.updateCard(id, data);
  };

  const createList = list(listsContainer, addCardFn, updateCardFn);
  const createCard = card(updateCardFn);

  const createLists = () => {
    const lists = model.lists();
    lists.forEach(createList);
    // add list button
    addListButton(listsContainer, () => console.log('create list'));
  };

  const createCards = () => {
    const cards = model.cards();
    cards.forEach(createCard);
  };

  function bindModel() {
    createLists();
    createCards();
  }

  return {
    bindModel,
  };
};
