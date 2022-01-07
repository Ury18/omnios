const express = require('express')
const logic = require('../models/user/logic')
const { createToken } = require('../middleware/token-helper');

const userRouter = express.Router();

userRouter.route('/')
    .post((req, res) => {
        try {
            logic.createUser(req.body)
                .then((user) => {
                    const token = createToken(user.id)
                    user.token = token
                    res.status(200).send(user)
                })
                .catch(({ message }) => {
                    if (message == "User validation failed: email: is already in use") {
                        res.status(400).send({ error: "Email en uso" })
                    } else{
                        res.status(400).send({ error: message })
                    }
                })
        } catch ({ message }) {
            res.status(400).send({ error: message })
        }
    })

//Endpoint to authenticate
userRouter.route('/authenticate')
    .post((req, res) => {
        try {
            logic.authenticateUser(req.body)
                .then((user) => {
                    const token = createToken(user.id)
                    user.token = token
                    res.json(user)
                })
                .catch(({ message }) => {
                    res.status(401).json({ error: message })
                })
        } catch ({ message }) {
            res.status(400).send({ error: message })
        }
    })

module.exports = userRouter
