import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import Details from './components/DogDetail/DogDetail';
import DogCreation from './components/DogCreation/DogCreation';

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
          <Route exact path='/createDog' component={DogCreation}/>
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
