const jwt = require('jsonwebtoken')
const userLogic = require('../models/user/logic')

const tokenHelper = {
    jwtSecret: "omnios",

    createToken(userId, ttl) {
        return jwt.sign({ sub: userId }, this.jwtSecret, { expiresIn: ttl || '4h' })
    },

    verifyToken(token) {
        const { sub } = jwt.verify(token, this.jwtSecret)

        if (!sub) {
            throw Error(`Subject not present in ${Token}`)
        }

        return sub
    },

    propagateRequestInfo(req, res, next, token) {
        try {
            const userId = this.verifyToken(token)
            req.tokenUserId = userId
            next()

        } catch ({ message }) {
            req.tokenUserId = null
            next()
        }
    },

    tokenVerifierMiddleware(req, res, next) {
        const { headers: { authorization }, body } = req

        if (authorization) {
            const token = authorization.substring(7)
            this.propagateRequestInfo(req, res, next, token)
        } else if (req.body && req.body.authToken) {
            const token = req.body.authToken
            this.propagateRequestInfo(req, res, next, token)
        } else {
            req.tokenUserId = null
            next()
        }

    }

}

const { createToken, verifyToken, tokenVerifierMiddleware } = tokenHelper

tokenHelper.createToken = createToken.bind(tokenHelper)
tokenHelper.verifyToken = verifyToken.bind(tokenHelper)
tokenHelper.tokenVerifierMiddleware = tokenVerifierMiddleware.bind(tokenHelper)

module.exports = tokenHelper
