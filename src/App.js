import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Login from './Login'
import Main from './Main'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={() => <Login />} />
        <Route path="/main" exact component={() => <Main />} />
      </Switch>
    </Router>
  );
}

export default App;
