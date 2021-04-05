import LoginPage from './pages/login/LoginPage';
import {NotFound} from './stories/NotFound';
import Board from './pages/board/Board';
import React, {Suspense} from 'react';
import {Header} from './stories/Header';
import {Footer} from './stories/Footer';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from './recoil/atoms';
const useStyles = makeStyles({
  app: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
})

const App: React.FC = () => {
  const userAuthInfo = useRecoilValue(userState);
  const loggedCheck = userAuthInfo.isAuth ? true : false;
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Header></Header>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {<Route exact path="/" component={loggedCheck ? Board : LoginPage} />}
                <Route component={NotFound} />
              </Switch>
          </Suspense>
        </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;