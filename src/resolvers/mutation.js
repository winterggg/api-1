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
    }
}