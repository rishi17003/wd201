const todoList = require('../todo');

describe('TodoList Test Suite', () => {
  let todos;

  beforeAll(() => {
    todos = todoList();

    const dateToday = new Date();
    const formattedDate = (d) => d.toISOString().split('T')[0];
    const today = formattedDate(dateToday);
    const yesterday = formattedDate(new Date(dateToday.setDate(dateToday.getDate() - 1)));
    const tomorrow = formattedDate(new Date(dateToday.setDate(dateToday.getDate() + 2)));

    todos.add({
      title: 'Test todo 1',
      completed: false,
      dueDate: today,
    });

    todos.add({
      title: 'Submit assignment',
      completed: false,
      dueDate: yesterday,
    });

    // todos.add({
    //   title: 'Service Vehicle',
    //   completed: false,
    //   dueDate: today,
    // });

    todos.add({
      title: 'File taxes',
      completed: false,
      dueDate: tomorrow,
    });
  });

  test('Should add new todo', () => {
    const todoItemsCount = todos.all.length;
    todos.add({
      title: 'Test todo 2',
      completed: false,
      dueDate: new Date().toISOString().split('T')[0],
    });
    expect(todos.all.length).toBe(todoItemsCount + 1);
  });

  test('Should mark a todo as complete', () => {
    expect(todos.all[0].completed).toBe(false);
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test('Should retrieve overdue items', () => {
    const dateToday = new Date();
    const formattedDate = (d) => d.toISOString().split('T')[0];
    const today = formattedDate(dateToday);
    const yesterday = formattedDate(new Date(dateToday.setDate(dateToday.getDate() - 1)));
    const tomorrow = formattedDate(new Date(dateToday.setDate(dateToday.getDate() + 2)));
    const overdueItems = todos.overdue();
    expect(overdueItems.length).toEqual(1);
    expect(overdueItems[0].title).toEqual('Submit assignment');
    expect(overdueItems[0].dueDate).toEqual(yesterday);
  });

  test('Should retrieve due today items', () => {
    const todayItems = todos.dueToday();
    expect(todayItems.length).toEqual(2);
    expect(todayItems.some(item => item.title === 'Test todo 1')).toBe(true);
  });

  test('Should retrieve due later items', () => {
    const laterItems = todos.dueLater();
    expect(laterItems.length).toEqual(1);
    expect(laterItems[0].title).toEqual('File taxes');
  });
});
