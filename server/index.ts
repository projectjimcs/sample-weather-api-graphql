import express, { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql'
import { RootMutationType, RootQueryType } from './qlmodules/types';
import { port } from './global';
import { authentication } from './middleware/auth';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: Express = express();

const schema: GraphQLSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(corsOptions));

app.use(authentication);

app.use('/graphql', graphqlHTTP((req, res) => {
  return {
    schema: schema,
    graphiql: true,
    context: {
      req: req,
      res: res,
    }
  }
}));

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});