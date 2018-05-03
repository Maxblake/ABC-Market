import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PhotoGrid from './PhotoGrid';
import Chat from './Chat';
import UploadForm from './UploadForm';
import NotFound from './NotFound';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Router = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ PhotoGrid } />
        <Route path="/login" component={ LoginForm } />
        <Route path="/chating" component={ Chat } />
        <Route path="/upload" component={ UploadForm } />
        <Route path="/signup" component={ SignupForm } />
        <Route component={ NotFound } />
      </Switch>
    </BrowserRouter>
);

export default Router;
