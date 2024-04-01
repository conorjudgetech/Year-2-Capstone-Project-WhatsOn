import { ApolloServer } from "@apollo/server";
import { startStandAloneServer } from "@apollo/server/standalone";

const typeDefs = `# this a comment in graphql
# I need to declare the types that we need for our project
#If you're reading this on 1/4/2024 you will see there is no code underneath because we need the api from meetup!
`;



const resolvers = {

};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandAloneServer(server, {
    listen: {port:4000},
});

console.log(`GraphQL Server is ready at port ${url}`);