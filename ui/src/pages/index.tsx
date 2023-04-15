import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import Layout from '../components/Layout';
import NotePage from './note';

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* https://stackoverflow.com/questions/69866581/property-exact-does-not-exist-on-type */}
          <Route path="/" Component={Home} />
          <Route path="/mynotes" Component={MyNotes} />
          <Route path="/favorites" Component={Favorites} />
          <Route path="/note/:id" Component={NotePage} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default Pages;