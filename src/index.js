const express = require('express')
require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server-express')
const jwt = require('jsonwebtoken')

const db = require('./db')
const models = require('./models')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const port = process.env.port || 4000
const DB_HOST = process.env.DB_HOST

// todo: 用户认证失败时，没有返回交互信息
const getUser = token => {
    if (token) {
        try {
            // return the user information from the token
            return jwt.verify(token, process.env.JWT_SECRET)
        } catch (err) {
            // if there's a problem with the token, throw an error
            throw new Error('Session invalid')
        }
    }
}

db.connect(DB_HOST)

const app = express()

// 设置 Apollo Server
const server = new ApolloServer({
    typeDefs, resolvers, context: ({ req }) => {
        // get the user token from the headers
        const token = req.headers.authorization
        // try to retrieve a user with the token
        const user = getUser(token)
        console.log(user)
        // add the user to the context
        return { models, user }
    }
})

server.applyMiddleware({ app, path: '/api' })

app.get('/', (req, res) => res.send('Hello, world!!!'))

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))