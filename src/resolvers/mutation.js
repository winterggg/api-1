const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express')
require('dotenv').config()

const gravatar = require('../util/gravatar')

module.exports = {
    newNote: async (parent, args, { models }) => {
        return await models.Note.create({
            content: args.content,
            author: 'Winter Ji'
        })
    },
    deleteNote: async (parent, args, { models }) => {
        try {
            const res = await models.Note.findByIdAndRemove(args.id)
            return !!res
        } catch (err) {
            return false
        }
    },
    updateNote: async (parent, { content, id }, { models }) => {
        return await models.Note.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    content
                }
            },
            {
                new: true // return the new note instead of the old one
            }
        )
    },
    signUp: async (parent, { username, email, password }, { models }) => {
        // normalize email address
        email = email.trim().toLowerCase()
        // hash the password
        const hashed = await bcrypt.hash(password, 10)
        // create the gravatar url
        const avatar = gravatar(email)
        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            })
            // create and return the json web token
            return jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        } catch (err) {
            console.log(err)
            // if there's a problem creating the account, throw an error
            throw new Error('Error creating account')
        }
    },
    signIn: async (parent, { username, email, password }, { models }) => {
        if (email) {
            // normalize email address
            email = email.trim().toLowerCase()
        }
        const user = await models.User.findOne({
            $or: [{ email }, { username }]
        })

        // if no user is found, throw an authentication error
        if (!user) {
            throw new AuthenticationError('Error signing in')
        }

        // if the passwords don't match, throw an authentication error
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            throw new AuthenticationError('Error signing in')
        }

        // create and return the json web token
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    },
}