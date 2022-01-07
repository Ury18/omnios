const express = require('express')
const logic = require('../models/file/logic')
const { tokenVerifierMiddleware } = require("../middleware/token-helper")

const fileRouter = express.Router();

fileRouter.route('/')
    .get(tokenVerifierMiddleware ,(req, res) => {
        try {
            logic.getFilesByUserId(req.tokenUserId)
                .then((files) => {
                    res.status(200).send(files)
                })
                .catch(({ message }) => {
                    res.status(400).send({ error: message })
                })
        } catch ({ message }) {
            res.status(400).send({ error: message })
        }
    })
    .post(tokenVerifierMiddleware, (req, res) => {
        try {
            req.body.owner = req.tokenUserId
            logic.createFile(req.body)
                .then((file) => {
                    res.status(200).send(file)
                })
                .catch(({ message }) => {
                    res.status(400).send({ error: message })
                })
        } catch ({ message }) {
            res.status(400).send({ error: message })
        }
    })

module.exports = fileRouter
