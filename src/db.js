const mongoose = require('mongoose');

module.exports = {
    connect: DB_HOST => {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose.set('useFindAndModify', false);
        // collection.ensureIndex is deprecated. Use createIndexes instead.
        mongoose.set('useCreateIndex', true);
        mongoose.connect(DB_HOST);
        mongoose.connection.on('error', err => {
            console.error(err);
            console.log(
                'MongoDB connection error. Please make sure MongoDB is running.'
            );
            process.exit();
        }).on('connected', () => {
            console.log('MongoDB connected');
        });
    },

    close: () => {
        mongoose.connection.close();
    }
}