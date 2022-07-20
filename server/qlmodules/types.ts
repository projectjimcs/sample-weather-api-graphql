import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInt } from 'graphql';
import { getGeocodeData, getWeatherData } from './resolves';

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
    password: { type: GraphQLString },
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
        lat: { type: GraphQLFloat },
        lon: { type: GraphQLFloat },
      },
      resolve: (parent, args) => {
        return getWeatherData(args.lat, args.lon);
      }
    },
    geocode: {
      type: GeocodeType,
      description: 'Geocode data for a given city',
      args: {
        city: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        return getGeocodeData(args.city);
      },
    }
  })
});

export {
  RootQueryType,
};