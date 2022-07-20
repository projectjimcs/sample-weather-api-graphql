import { GraphQLObjectType, GraphQLString, GraphQLFloat } from 'graphql'

const GeocodeType = new GraphQLObjectType({
  name: 'Geocode',
  description: 'Geocode data of a given city',
  fields: () => ({
    name: { type: GraphQLString },
    lat: { type: GraphQLFloat },
    lon: { type: GraphQLFloat },
    country: { type: GraphQLString },
  })
});

const WeatherType = new GraphQLObjectType({
  name: 'Weather',
  description: 'Current weather of a given latitude and longitude',
  fields: () => ({
    main: { type: GraphQLString },
    description: { type: GraphQLString },
    icon: { type: GraphQLString },
    temp: { type: GraphQLFloat },
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    weather: {
      type: GraphQLString,
      description: 'What is the weather like?',
      resolve: () => 'Weather here',
    }
  })
});

export {
  RootQueryType,
};