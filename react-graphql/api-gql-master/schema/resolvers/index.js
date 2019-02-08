const {mergeResolvers}= require('merge-graphql-schemas')

const Hotel = require('./Hotel');
const resolvers = [
    Hotel
]
module.exports = mergeResolvers(resolvers);
