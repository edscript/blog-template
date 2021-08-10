const db = require('../../database')
const mockDb = require('mock-knex')

const userDb = require('../../models/user.model')
mockDb.mock(db)

const tracker = require('mock-knex').getTracker()

const userTest = {
    username: 'testuser',
    password: '123456',
}

beforeEach(() => {
    tracker.install()
})

afterEach(() => {
    tracker.uninstall()
})

const queryResponseObject = {
    id: 1,
    username: 'justTesting',
    password: 'passwordTest',
}

describe('User model', () => {
    describe('Create method', () => {
        it('Insert a new user and return it', async () => {
            tracker.once('query', (query) => {
                expect(query.method).toBe('insert')
                query.response(queryResponseObject)
            })

            const user = await userDb.create(userTest)

            expect(user).toMatchObject(queryResponseObject)
        }),
            it('Insert an empty user and returns a error', async () => {
                await expect(
                    userDb.create({ username: '', password: '' })
                ).rejects.toThrow('User "username" must be provided')
                await expect(
                    userDb.create({ username: 'test', password: '' })
                ).rejects.toThrow('User "password" must be provided')
            })
    })

    describe('Get method', () => {
        it('Get a specific user by id', async () => {
            tracker.once('query', (query) => {
                expect(query.method).toBe('first')
                query.response(queryResponseObject)
            })

            const user = await userDb.get({ id: 1 })

            expect(user).toMatchObject(queryResponseObject)
        })
        it('Get a specific user with empty id and returns an error', async () => {
            await expect(userDb.get({ id: '' })).rejects.toThrow(
                'User "id" must be provided'
            )
        })
    })

    describe('Update method', () => {
        it('Update an existing user and return it', async () => {
            const updatedUser = {
                id: 1,
                username: 'updated user',
                password: 'updated password',
            }

            tracker.once('query', (query) => {
                expect(query.method).toBe('update')
                query.response(updatedUser)
            })

            const user = await userDb.update(queryResponseObject)

            expect(user).toMatchObject(updatedUser)
        }),
            it('Update an empty user and returns a error', async () => {
                await expect(
                    userDb.update({ id: -1, username: '', password: '' })
                ).rejects.toThrow('User "id" must be provided')
                await expect(
                    userDb.update({ id: 1, username: '', password: '' })
                ).rejects.toThrow('User "username" must be provided')
                await expect(
                    userDb.update({ id: 1, username: 'test', password: '' })
                ).rejects.toThrow('User "password" must be provided')
            })
    })

    describe('Delete method', () => {
        it.todo('Delete an existing user and return id deleted'),
            it('Delete an empty user returns a error', async () => {
                await expect(userDb.delete({ id: -1 })).rejects.toThrow(
                    'User "id" must be provided'
                )
            })
    })
})
