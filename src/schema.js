const { gql } = require("apollo-server-express")

module.exports = gql`
scalar DateTime

type Note {
    id: ID!
    content: String!
    author: String!
    createdAt: DateTime!
    updatedAt: DateTime!
}

type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    notes: [Note!]!
}

type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
}

type Mutation {
    newNote(content: String!): Note!
    deleteNote(id: ID!): Boolean!
    updateNote(id: ID!, content: String!): Note!
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String!, email: String!, password: String!): String!
}
`