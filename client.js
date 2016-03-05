/*global document, window */

import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';
import app from './app';
import Router from 'react-router';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const debugClient = debug('Example');
const dehydratedState = window.App; // Sent from the server

debugClient('rehydrating app');

function RenderApp(context){
    debugClient('React Rendering');
    const mountNode = document.getElementById('app');

    ReactDOM.render(
        <FluxibleComponent context={context.getComponentContext()}>
            <Router routes={context.getComponent()} history={createBrowserHistory()} />
        </FluxibleComponent>,
        mountNode,
        () => debugClient('React Rendered')
    );
}

app.rehydrate(dehydratedState, (err, context) => {
    if (err) throw err;

    window.debug = debug;
    window.context = context;

    RenderApp(context);
});
