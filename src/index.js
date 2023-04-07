const express = require('express')
require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server-express')

const db = require('./db')
const models = require('./models')

const port = process.env.port || 4000
const DB_HOST = process.env.DB_HOST

db.connect(DB_HOST)

const typeDefs = gql`
 type Note {
    id: ID!
    content: String!
    author: String!
 }

 type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
 }

 type Mutation {
    newNote(content: String!): Note!
 }
 `

const resolvers = {
    Query: {
        hello: () => 'Hello, world!',
        notes: async () => {
            return await models.Note.find()
        },
        note: (parent, args) => {
            return models.Note.findById(args.id)
        }
    },
    Mutation: {
        newNote: async (parent, args) => {
            return await models.Note.create({
                content: args.content,
                author: 'Winter Ji'
            })
        }
    }
}

const app = express()

// 设置 Apollo Server
const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app, path: '/api' })

app.get('/', (req, res) => res.send('Hello, world!!!'))

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))