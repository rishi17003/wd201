const todoList = require('../todo');
const{all,markAsComplete,add,overdue,dueToday,dueLater}=todoList();

describe("Todolist Test Suite" , () =>{
    beforeAll(()=>{
            const dateToday = new Date();
    const formattedDate = (d) => d.toISOString().split('T')[0];
    const today = formattedDate(dateToday);
    const yesterday = formattedDate(new Date(dateToday.setDate(dateToday.getDate() - 1)));
    const tomorrow = formattedDate(new Date(dateToday.setDate(dateToday.getDate() + 2)));
        add(
            {
                title:"Test todo",
                completed: false,
                dueDate: today
            }
        );
        add(
            {
                title: 'Submit assignment',
                completed: false,
                dueDate: yesterday
            }
        );
        // add(
        //     {
        //         title: 'Service Vehicle',
        //         completed: false, 
        //         dueDate: today
        //     }
        // );
        add(
            {
                title: 'File taxes',
                completed: false,
                dueDate: tomorrow
            }
        );
    })
    test("Should add new todo" , () => {
        const todoItemsCount = all.length;
        add(
            {
                title:"Test todo",
                completed: false,
                dueDate: new Date().toISOString().slice(0,10)
            }
        );
        expect(all.length).toBe(todoItemsCount + 1);
    });
    test("Should mark a todo as complete", () =>{
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    })
    test('Should retrieve overdue items', () => {
        // const overdueItems = overdue();
        // const today = new Date().toISOString().slice(0, 10);
        // expect(overdueItems.length).toBeGreaterThan(0);
        expect(overdue().length).toEqual(1);
      });
    test('Should retrieve due today items', () => {
        // const todayItems = dueToday();
        // const today = new Date().toISOString().slice(0, 10);
        // expect(todayItems.length).toBeGreaterThan(0);
        expect(dueToday().length).toEqual(2);
      });
    test('Should retrieve due later items', () => {
        // const laterItems = dueLater();
        // const today = new Date().toISOString().slice(0, 10);
        // expect(laterItems.length).toBeGreaterThan(0);
        expect(dueLater().length).toEqual(1);
      });
})
