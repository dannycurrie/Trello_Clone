export default () => ({
  lists: () => [
    { id: 1, name: 'test' }
  ],
  cards: () => [
    {
      id: 1,
      listId: 1,
      text: 'test card'
    }
  ]
});