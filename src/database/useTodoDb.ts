import * as SQLite from 'expo-sqlite';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const useTodoDb = () => {
  const db = SQLite.openDatabaseSync('todos.db');

  const setup = async () => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed INTEGER DEFAULT 0
      );
    `);
  };

  const getTodos = async () => {
    return await db.getAllAsync<Todo>('SELECT * FROM todos');
  };

  const addTodo = async (title: string) => {
    await db.runAsync('INSERT INTO todos (title) VALUES (?)', [title]);
  };

  return { setup, getTodos, addTodo };
};
