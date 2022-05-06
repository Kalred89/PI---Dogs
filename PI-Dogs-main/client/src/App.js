import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage/LandingPage';
import Details from './components/DogDetail/DogDetail';

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

          <Route exact path='/home' component={Home}/>
          <Route exact path='/dogs/:id' component={Details}/>
          <Route exact path='/createDog' component={'createDog'}/>
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
