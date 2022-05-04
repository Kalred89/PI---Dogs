import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          
          <Route exact path='/'>
            <div className="body">
              <div className='landing'>
                <LandingPage />
              </div>
            </div>         
          </Route>  

          <Route exact path='/home'>
            <Home />
          </Route>

        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
