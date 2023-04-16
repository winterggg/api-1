import { BrowserRouter as Router, Route, Routes, Navigate, RouteProps } from 'react-router-dom';

import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import Layout from '../components/Layout';
import NotePage from './note';
import SignUp from './signup';
import SignIn from './signin';
import { gql, useQuery } from '@apollo/client';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

type PrivateComponentProps = {
  component: React.ComponentType<any>;

};

// todo: ugly fix, need to read the friendly docs later
const PrivateComponent = ({ component: Component }: PrivateComponentProps) => {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Component /> : <Navigate to="/signin" />;
};


const Pages = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* https://stackoverflow.com/questions/69866581/property-exact-does-not-exist-on-type */}
          <Route path="/" element={<Home />} />
          <Route path="/mynotes" element={<PrivateComponent component={MyNotes} />} />
          <Route path="/favorites" element={<PrivateComponent component={Favorites} />} />
          <Route path="/note/:id" element={<NotePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default Pages;