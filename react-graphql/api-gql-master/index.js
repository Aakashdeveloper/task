require('dotenv').config();
const app = require('express')();
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const cors = require('cors');
const bodyParser = require('body-parser');

const schema = require('./schema');
require('./models').connect()

app.use(cors());
const buildOptions = (req, res) => {
    return {
        context: {token: ''},
        schema
    }
}
app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));

if (process.env.ENV == 'development') {
    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
    }));
}
app.listen(process.env.PORT, () => {
    console.log('info', `Running a GraphQL API server at ${process.env.HOST}:${process.env.PORT}`);
});
