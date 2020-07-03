import getModel from '../Model/model.js';

export default document => {

  const model = getModel();

  const app = document.querySelector('#app');
  const listsContainer = document.createElement('div');
  listsContainer.className = '.lists-container';
  app.appendChild(listsContainer);


  const createList = list => {
    const container = document.createElement('div');
    container.className = 'list-container';
    const listHeader = document.createElement('div');
    listHeader.className = 'list-title';
    listHeader.textContent = list.name;
    container.appendChild(listHeader);
    listsContainer.appendChild(container);
  }

  const createLists = () => {
    const lists = model.lists();
    lists.forEach(createList);
  }

  return {
    bind: () => createLists(),
  }
};