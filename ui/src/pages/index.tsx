import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';

const Pages = () => {
  return (
    <Router>
      <Routes>
      {/* https://stackoverflow.com/questions/69866581/property-exact-does-not-exist-on-type */}
      <Route path="/" Component={Home} />
      <Route path="/mynotes" Component={MyNotes} />
      <Route path="/favorites" Component={Favorites} />
      </Routes>
    </Router>
  );
};

export default Pages;