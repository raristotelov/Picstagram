import { Route, Switch } from 'react-router-dom';

import Main from './components/Main';
import './App.css';

function App() {
    return (
        <Switch>
            <Route path="/main" component={Main}></Route>
        </Switch>
    );
}

export default App;
