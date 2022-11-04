import { createTodos, findTodos, removeTodos } from "../todos_storage.js"
import { json } from 'node:stream/consumers'


/**
 * API - Retrieve the data file.
 * 
 * @return {Todo[]} Returns an array with the tasks stored in the local storage file.
 * 
 * @function
 */
export const find = async () => {
    const data = await findTodos()
    return data
}

/**
 * Adds the new taks to the local storage and retrieve the new task as a JSON.
 * 
 * @param {Request} req - Request object
 * @returns {Todo} Returns the task how is going to be stored in the local storage file.
 * 
 * @function
 */
export const create = async (req) => {
    const newTodo = await createTodos(await json(req))
    return newTodo
}

/**
 * 
 * @param {Response} res - Response object
 * @param {string} url - URL of the request
 * 
 * @function
 */
export const remove = async (res, url) => {
    const id = parseInt(url.searchParams.get('id'), 10)
    await removeTodos(id)
    res.writeHead(204)
}