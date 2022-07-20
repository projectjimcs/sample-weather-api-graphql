import express, { Express, Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql'
import { RootQueryType } from './qlmodules/types';
import { port } from './global';
import { connection } from './config/dbconfig';

const app: Express = express();

const schema: GraphQLSchema = new GraphQLSchema({
  query: RootQueryType
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.get('/', async (req: Request, res: Response) => {
  connection.query('SELECT * from `users`', (err, results, fields) => {
    if (err) throw err;

    console.log('The solution is: ', results);
  })

  connection.end();
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});