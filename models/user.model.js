const db = require('../database')

const user = {}

user.create = async ({ username, password }) => {
    if (!username) {
        throw new Error('User "username" must be provided')
    }

    if (!password) {
        throw new Error('User "password" must be provided')
    }

    const user = await db('users').insert({ username, password }).returning('*')

    return user
}

user.get = async ({ id }) => {
    if (!id || id < 0) {
        throw new Error('User "id" must be provided')
    }

    const user = await db('users').select({ id }).first()

    return user
}

user.update = async ({ id, username, password }) => {
    if (!id || id < 0) {
        throw new Error('User "id" must be provided')
    }

    if (!username) {
        throw new Error('User "username" must be provided')
    }

    if (!password) {
        throw new Error('User "password" must be provided')
    }

    const user = await db('users')
        .select({ id })
        .first()
        .update({ username, password })

    return user
}

user.delete = async ({ id }) => {
    if (!id || id < 0) {
        throw new Error('User "id" must be provided')
    }

    const user = await db('users').select({ id }).first().delete()

    return user
}

module.exports = user
