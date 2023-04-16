import './App.css'
import { GlobalStyle } from './components/GlobalStyle'
import Pages from './pages'
// 导入 Apollo Client 库
import {
  ApolloClient, InMemoryCache, ApolloProvider
  , createHttpLink,
  gql
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

const uri = import.meta.env.VITE_API_URI
const httpLink = createHttpLink({ uri })
const cache = new InMemoryCache()

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true, // 开发环境下，开启 Apollo DevTools
})

// 读取本地缓存中的 isLoggedIn 状态
const data = {
  isLoggedIn: !!localStorage.getItem('token'),
}

// 将 isLoggedIn 状态写入缓存
cache.writeQuery({
  query: gql`
    query GetLoggedInUser {
      isLoggedIn @client
    }
  `,
  data
})

// 重置 isLoggedIn 状态
client.onResetStore(
  async () => await client.writeQuery({
    query: gql`
      query GetLoggedInUser {
        isLoggedIn @client
      }
    `,
    data: {
      isLoggedIn: false
    }
  })
)

function App() {

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  )
}

export default App