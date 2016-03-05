/**
 * This leverages Koa to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import logger from 'koa-logger';
import convert from 'koa-convert';
import path from 'path';
import serialize from 'serialize-javascript';
import navigateAction from './actions/navigate';
import debugLib from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/server';
import HtmlComponent from './components/Html';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';
import { match, RoutingContext } from 'react-router';
import app from './app';

const env = process.env.NODE_ENV;
const debug = debugLib('Example');
const server = new Koa();

server.use(convert(serve(path.join(__dirname, '/build'))));
server.use(convert(bodyParser()));
server.use(convert(logger()));

server.use((ctx, next) => {

    const context = app.createContext();
    debug('Executing navigate action');

    return new Promise((resolve, reject) => {

        match({routes: app.getComponent(), location: ctx.url}, (error, redirectLocation, renderProps) => {

            if (error) {

                ctx.throw(error.message, 500);

            } else if (redirectLocation) {

                ctx.redirect(redirectLocation.pathname + redirectLocation.search);

            } else if (renderProps) {

                context.executeAction(navigateAction, {path: ctx.url}, () => {

                    debug('Exposing context state');
                    const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

                    debug('Rendering Application component into html');

                    const markup = ReactDOM.renderToString(
                        <FluxibleComponent context={context.getComponentContext()}>
                            <RoutingContext {...renderProps} />
                        </FluxibleComponent>
                    );
                    const htmlElement = React.createElement(HtmlComponent, {
                        clientFile: env === 'production' ? 'main.min.js' : 'main.js',
                        context: context.getComponentContext(),
                        state: exposed,
                        markup: markup
                    });

                    const html = ReactDOM.renderToStaticMarkup(htmlElement);
                    debug('Sending markup');
                    resolve(html);
                });

            } else {
              ctx.throw('Not Found', 404);
            }
        });
    }).then(result => {
        ctx.response.body = '<!DOCTYPE html>' + result;
        ctx.response.type = 'html';
        debug('Sending markup');
    }).catch(error => {
        console.error(error);
    });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('Application listening on port ' + port);

export default server;
