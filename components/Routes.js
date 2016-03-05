import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Application from './Application';
import Home from './Home';
import About from './About';
import NotFound from './NotFound';

const routes = (
    <Route name="app" path="/" component={Application}>
        <IndexRoute component={Home}/>
        <Route path="about" component={About}/>
        <Route path="*" component={NotFound}/>
    </Route>
);

export default routes;
