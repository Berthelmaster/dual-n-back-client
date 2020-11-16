import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Game from './components/Game'
import Login from './components/Login'
import Error from './components/Error'
import Rules from './components/Rules'

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
        <Switch>
          <Route path="/login" exact component={Login} />
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
