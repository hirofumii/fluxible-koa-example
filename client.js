/*global document, window */

import React from 'react';
import ReactDOM from 'react-dom';
import app from './app';
import Router from 'react-router';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const dehydratedState = window.App; // Sent from the server

function RenderApp(context) {
    const mountNode = document.getElementById('app');

    ReactDOM.render(
        <FluxibleComponent context={context.getComponentContext()}>
            <Router routes={context.getComponent()} history={createBrowserHistory()} />
        </FluxibleComponent>,
        mountNode
    );
}

app.rehydrate(dehydratedState, (err, context) => {
    if (err) throw err;

    window.context = context;
    RenderApp(context);
});
