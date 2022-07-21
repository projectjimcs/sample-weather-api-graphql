import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLNonNull } from 'graphql';
import { getWeatherData, addUser, login, validateToken, logout } from './resolves';

const WeatherType = new GraphQLObjectType({
  name: 'Weather',
  description: 'Current weather of a given latitude and longitude',
  fields: () => ({
    shortDesc: { type: GraphQLString },
    description: { type: GraphQLString },
    temp: { type: GraphQLFloat },
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  description: 'The data in the user',
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
  })
});

const AuthDataType = new GraphQLObjectType({
  name: 'AuthData',
  description: 'Authentication data of the user',
  fields: () => ({
    userId: { type: GraphQLInt },
    token: { type: GraphQLString },
    tokenExpiry: { type: GraphQLInt },
  })
});

const ValidateTokenType = new GraphQLObjectType({
  name: 'ValidateToken',
  description: 'Boolean value to check token',
  fields: () => ({
    userId: { type: GraphQLInt },
    token: { type: GraphQLString },
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    weather: {
      type: WeatherType,
      description: 'Weather data given a latitude and longitude',
      args: {
        city: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args, context) => {
        if (!context.res.locals.isAuth) {
          throw new Error('Unauthenticated');
        }

        return getWeatherData(args.city);
      }
    },
    login: {
      type: AuthDataType,
      description: 'Retrieved data from login',
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args, context) => {
        return login(args.username, args.password, context.res);
      },
    },
    validate: {
      type: ValidateTokenType,
      description: 'Validating token being queries',
      resolve: (parent, args, context) => {
        return validateToken(context.req);
      }
    }
  })
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addUser: {
      type: UserType,
      description: 'Add a user',
      args: {
        username: { type : GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        return addUser(args.username, args.password);
      }
    },
    logout: {
      type: ValidateTokenType,
      description: 'Logout user',
      resolve: (parent, args, context) => {
        return logout(context);
      }
    }
  })
});

export {
  RootQueryType,
  RootMutationType,
};