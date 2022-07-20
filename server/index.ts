import express, { Express, Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql'
import { RootMutationType, RootQueryType } from './qlmodules/types';
import { port } from './global';
import { authentication } from './middleware/auth';

const app: Express = express();

const schema: GraphQLSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(authentication);

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});