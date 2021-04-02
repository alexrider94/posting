import LoginPage from './pages/login/LoginPage';
import {NotFound} from './stories/NotFound';
import Board from './pages/board/Board';
import React from 'react';
import { GET_USER_INFO } from './services/API';
import {Header} from './stories/Header';
import {Footer} from './stories/Footer';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
const useStyles = makeStyles({
  app: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
})

const App: React.FC = () => {
  const loggedCheck = GET_USER_INFO().length ? true : false;
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Header></Header>
        <Router>
          <Switch>
            {<Route exact path="/" component={loggedCheck ? Board : LoginPage} />}
            <Route component={NotFound} />
          </Switch>
        </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;