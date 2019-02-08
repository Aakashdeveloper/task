const { mergeTypes } = require('merge-graphql-schemas');
const Hotel = require('./Hotel');

const types = [
    Hotel
];
module.exports = mergeTypes(types);
