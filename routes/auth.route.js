const router = require('express').Router()
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
    const { username, password } = req.body

    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = {
        username,
        password: encryptedPassword,
    }

    try {
        const id = await User.create(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/login', (req, res) => {})

module.exports = router
