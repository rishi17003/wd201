const todoList = require("../todo");
 let todos;
todos = todoList();

describe('TodoList Test Suite', () => {
  test('Should add new todo', () => {
    const todoItemsCount = todos.all.length;
    todos.add({
      title: 'Test todo 2',
      completed: false,
      dueDate: '2023-12-20',
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

    const overDueTodoItemsCount =todos.overdue().length;
    // add the over due task
    const overdueAdd = {title: 'Do Coding', dueDate: yesterday,completed:false};
    todos.add(overdueAdd);
    expect(todos.overdue().length).toEqual(overDueTodoItemsCount+1); 
    // const overdueItems=todos.overdue();
    // expect(overdueItems.length).toBe(1);
    // expect(overdueItems[0]).toEqual(overdueAdd);
  });

  test('Should retrieve due today items', () => {
    const dateToday = new Date();
    const formattedDate = (d) => d.toISOString().split('T')[0];
    const today = formattedDate(dateToday);
    const yesterday = formattedDate(new Date(dateToday.setDate(dateToday.getDate() - 1)));
    const tomorrow = formattedDate(new Date(dateToday.setDate(dateToday.getDate() + 2)));

    const DueTodayTodoItemsCount =todos.dueToday().length;
    const todayAdd={title: 'Do laundry',dueDate: today,completed:'false'};
    todos.add(todayAdd);
    expect(todos.dueToday().length).toEqual(DueTodayTodoItemsCount+1); 
    // const todayItems = todos.dueToday();
    // expect(todayItems.length).toBe(1);
    // expect(todayItems[0]).toEqual(todayAdd);
  });

  test('Should retrieve due later items', () => {
    const dateToday = new Date();
    const formattedDate = (d) => d.toISOString().split('T')[0];
    const today = formattedDate(dateToday);
    const yesterday = formattedDate(new Date(dateToday.setDate(dateToday.getDate() - 1)));
    const tomorrow = formattedDate(new Date(dateToday.setDate(dateToday.getDate() + 2)));

    const DueLaterTodoItemsCount =todos.dueLater().length;
    const laterAdd={title:'Return a book',dueDate:tomorrow,completed:false};
    todos.add(laterAdd);
    expect(todos.dueLater().length).toEqual(DueLaterTodoItemsCount+1); 
    // const laterItems = todos.dueLater();
    // expect(laterItems.length).toBe(1);
    // expect(laterItems[0]).toEqual(laterAdd);
  });
});
