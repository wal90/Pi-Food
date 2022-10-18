import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage.jsx'
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate';
import Detail from './components/Detail'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component= {LandingPage} />
        <Route path='/home' component={Home}/>
        <Route path='/create' component={RecipeCreate}/>
        <Route path='/recipes/:id' component={Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
