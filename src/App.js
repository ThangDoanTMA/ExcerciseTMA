import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EmployeeManagerComponent from './pages/home/EmployeeManagerComponent';
import EmployeeComponent from './pages/employee/EmployeeComponent';
import TeamComponent from './pages/team/TeamComponent';
import HeaderHome from './components/HeaderHome';
import DetailEmployee from './pages/detailEmployee/DetailEmployee';

function App() {
  return (
    <BrowserRouter>
      <HeaderHome />
      <Switch>
        <Route exact path={'/home'} component={EmployeeManagerComponent} />
        <Route exact path={'/team'} component={TeamComponent} />
        <Route exact path={'/employee'} component={EmployeeComponent} />
        <Route exact path={'/detailemployee/:id'} component={DetailEmployee} />
        <Route exact path={'/'} component={EmployeeManagerComponent} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
