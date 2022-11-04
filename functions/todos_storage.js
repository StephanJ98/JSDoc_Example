import { readFile, writeFile } from 'node:fs/promises'

const path = 'storage/todo.json'

/**
 * @typedef {Object} Todo
 * @property {number} id - ID of the task
 * @property {string} title - Title of the task
 * @property {boolean} completed - Says if the the task is done or not
 */

/**
 * Retrieve the data file and return it as a promise.
 * @return {Promise<Todo[]>} Returns an array with the tasks stored in the local storage file.
 * 
 * @function
 */
export async function findTodos() {
    const data = await readFile(path, 'utf8')
    return JSON.parse(data)
}

/**
 * Adds the new taks to the local storage and retrieve the new task as a promise.
 * @param {Object} Todo - Destructured object that contains title and completed
 * @param {string} Todo.title - Title of the task
 * @param {boolean} Todo.completed - Says if the the task is done or not
 * 
 * @returns {Promise<Todo>} Returns the task how is going to be stored in the local storage file.
 * 
 * @function
 */
export async function createTodos({ title, completed = false }) {
    const todo = { title, completed, id: Date.now() }
    const todos = [...await findTodos(), todo]
    await writeFile(path, JSON.stringify(todos))
    return todo
}

/**
 * Removes a taks on the local storage and saves the changes on the local storage.
 * @param {number} id - ID of the task to remove
 * 
 * @function
 */
export async function removeTodos(id) {
    const todos = await findTodos()
    await writeFile(path, JSON.stringify(todos.filter(todo => todo.id !== id)))
}