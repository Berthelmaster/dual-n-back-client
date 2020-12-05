import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Game from './components/Game'
import Login from './components/Login'
import Register from './components/Register'
import Error from './components/Error'
import Rules from './components/Rules'
import { helpers } from "./helpers";
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
        <Switch>
          <PrivateRoute path="/login" exact component={Login} />
          <PrivateRoute path="/register" exact component={Register} />
          <Route path="/rules" exact component={Rules} />
          <Route path="/" exact component={Game} />
          <Route path="*" component={Error} />
        </Switch>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
