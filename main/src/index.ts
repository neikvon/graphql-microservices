import * as Koa from 'koa'
import fetch from 'node-fetch'
import { HttpLink } from 'apollo-link-http'
import { ApolloServer } from 'apollo-server-koa'
import { makeRemoteExecutableSchema, introspectSchema } from 'graphql-tools'
import configs from './configs'
import logger from './helpers/logger'

async function applyMiddlewares (app: any, options: any) {
  for (let opt of options) {
    const link = new HttpLink({ uri: opt.uri, fetch })
    const schema = makeRemoteExecutableSchema({
      schema: await introspectSchema(link),
      link
    })

    const server = new ApolloServer({ schema })
    server.applyMiddleware({ app, path: configs.graphqlPrefix + opt.path })
  }
}

const options = [
  {
    path: '/s1',
    uri: 'http://localhost:3001/graphql'
  },
  {
    path: '/s2',
    uri: 'http://localhost:3002/graphql'
  }
]

const init = async () => {
  const app = new Koa()
  await applyMiddlewares(app, options)
  // const server = new ApolloServer(schema)
  // server.applyMiddleware({ app, path: configs.graphqlPrefix })

  const port = configs.server.port
  return app.listen({ port }, () => {
    logger.info(
      `\n🚀 Server ready at http://localhost:${port}${configs.graphqlPrefix}`
    )
  })
}

init().catch(logger.error.bind(logger))
