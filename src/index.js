const express = require('express')
require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server-express')

const db = require('./db')
const models = require('./models')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const port = process.env.port || 4000
const DB_HOST = process.env.DB_HOST

db.connect(DB_HOST)

const app = express()

// 设置 Apollo Server
const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ models }) })

server.applyMiddleware({ app, path: '/api' })

app.get('/', (req, res) => res.send('Hello, world!!!'))

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))