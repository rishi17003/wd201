'use strict';
const { Model} = require('sequelize');
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    // ... (existing code remains unchanged)

    static async showList() {
      console.log("My Todo list\n");
    
      console.log("Overdue");
      const overdueItems = await Todo.overdue();
      overdueItems.forEach(item => console.log(item.displayableString()));
      console.log("\n");
    
      console.log("Due Today");
      const dueTodayItems = await Todo.dueToday();
      dueTodayItems.forEach(item => console.log(item.displayableString()));
      console.log("\n");
    
      console.log("Due Later");
      const dueLaterItems = await Todo.dueLater();
      dueLaterItems.forEach(item => console.log(item.displayableString()));
    }
    
    static async overdue() {
      const currentDate = new Date();
      return await Todo.findAll({
        where: {
          dueDate: { [Op.lt]: currentDate },
          completed: false
        }
      });
    }
    
    static async dueToday() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
    
      return await Todo.findAll({
        where: {
          dueDate: today,
          completed: true
        }
      });
    }
    
    static async dueLater() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
    
      return await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: today },
          completed: false
        }
      });
    }
    
    static async markAsComplete(id) {
      const task = await Todo.findByPk(id);
      if (task) {
        task.completed = true;
        await task.save();
      } else {
        throw new Error('Task not found');
      }
    }
    
    displayableString() {
      // let checkbox = this.completed ? "[x]" : "[ ]";
      // return `${this.id}. ${checkbox} ${this.title} ${this.dueDate.toISOString().slice(0, 10)}`;
      let result = "";

      const dueDate = new Date(this.dueDate);

      if (dueDate.toDateString() === new Date().toDateString()) {
        const check = this.completed ? "[x]" : "[ ]";
        result = `${this.id}. ${check} ${this.title}`;
      } else {
        if (dueDate > new Date() && !this.completed) {
          const check = this.completed ? "[x]" : "[ ]";
          result = `${this.id}. ${check} ${this.title} ${dueDate.toISOString().split("T")[0]
            }`;
        } else {
          const check = this.completed ? "[x]" : "[ ]";
          result = `${this.id}. ${check} ${this.title} ${dueDate.toISOString().split("T")[0]
            }`;
        }
      }

      return result;
    }
  }

  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};