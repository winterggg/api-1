const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express')
const mongoose = require('mongoose')
require('dotenv').config()

const gravatar = require('../util/gravatar')

module.exports = {
    newNote: async (parent, args, { models, user }) => {
        if (!user) {
            return new AuthenticationError('您必须登录才能创建笔记')
        }
        return await models.Note.create({
            content: args.content,
            author: mongoose.Types.ObjectId(user.id)
        })
    },
    deleteNote: async (parent, args, { models, user }) => {
        if (!user) {
            return new AuthenticationError('您必须登录才能删除笔记')
        }
        const note = await models.Note.findById(args.id)
        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError('您没有权限删除该笔记')
        }

        try {
            await note.remove()
            return !!note
        } catch (err) { // if note is null
            return false
        }
    },
    updateNote: async (parent, { content, id }, { models, user }) => {
        if (!user) {
            return new AuthenticationError('您必须登录才能更新笔记')
        }

        const note = await models.Note.findById(id)
        if (note && String(note.author) !== user.id) {
            console.log('Note author', note.author)
            console.log('User ID', user.id)
            throw new ForbiddenError('您没有权限更新该笔记')
        }

        note.content = content
        return await note.save()
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
    toggleFavorite: async (parent, { id }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError();
        }

        let noteCheck = await models.Note.findById(id)
        const hasUser = noteCheck.favoritedBy.indexOf(user.id)

        if (hasUser >= 0) {
            return await models.Note.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: -1
                    }
                },
                {
                    new: true
                }
            )
        } else {
            return await models.Note.findByIdAndUpdate(
                id,
                {
                    $push: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: 1
                    }
                },
                {
                    new: true
                }
            )
        }
    }
}