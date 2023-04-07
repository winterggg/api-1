module.exports = {
    hello: () => 'Hello, world!',
    notes: async (parent, args, { models }) => {
        return await models.Note.find()
    },
    note: (parent, args, { models }) => {
        return models.Note.findById(args.id)
    }
}