import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import NotFound from './NotFound';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Router = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ App } />
        <Route path="/login" component={ LoginForm } />
        <Route path="/signup" component={ SignupForm } />
        <Route component={ NotFound } />
      </Switch>
    </BrowserRouter>
);

export default Router;
