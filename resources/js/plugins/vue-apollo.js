import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import Cookies from 'js-cookie'
import Vue from 'vue'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

// HTTP connection to the API
const httpLink = createUploadLink({
  // You should use an absolute URL here
  uri: `${process.env.MIX_APP_URL}/graphql`,
  headers: {
    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
  }
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

export default new VueApollo({
  defaultClient: apolloClient
})
