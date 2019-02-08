import ApolloClient  from 'apollo-boost';
const connector = new ApolloClient({
    uri: "https://api-gql.herokuapp.com/graphql"
})

export default connector;