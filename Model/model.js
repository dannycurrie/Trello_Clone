export default () => ({
  lists: () => [
    { id: 'foo', name: 'Test list' },
    { id: 'bar', name: 'Test list two' },
    { id: 'baz', name: 'Test list three' },
    { id: 'foo', name: 'Test list' },
    { id: 'bar', name: 'Test list two' },
    { id: 'baz', name: 'Test list three' },
    { id: 'foo', name: 'Test list' },
    { id: 'bar', name: 'Test list two' },
    { id: 'baz', name: 'Test list three' }
  ],
  cards: () => [
    {
      id: 'bar',
      listId: 'foo',
      text: 'Test Card'
    },
    {
      id: 'baz',
      listId: 'foo',
      text: 'Test Card 2'
    },
    {
      id: 'bav',
      listId: 'foo',
      text: 'Test Card three'
    },
    {
      id: 'barr',
      listId: 'bar',
      text: 'Test Card'
    },
    {
      id: 'bar',
      listId: 'baz',
      text: 'Test Card'
    },
    {
      id: 'baz',
      listId: 'bar',
      text: 'Test Card 2'
    },
    {
      id: 'bav',
      listId: 'baz',
      text: 'Test Card three'
    },
    {
      id: 'barr',
      listId: 'baz',
      text: 'Test Card'
    },
  ]
});