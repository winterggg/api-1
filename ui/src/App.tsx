import './App.css'
import { GlobalStyle } from './components/GlobalStyle'
import Pages from './pages'
// 导入 Apollo Client 库
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const uri = import.meta.env.VITE_API_URI
const cache = new InMemoryCache()
const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true, // 开发环境下，开启 Apollo DevTools
})


function App() {

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  )
}

export default App
