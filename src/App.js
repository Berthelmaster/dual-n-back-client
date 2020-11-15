import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Game from './components/Game'

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <Route path="/" component={Game} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
