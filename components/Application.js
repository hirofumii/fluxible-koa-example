/*globals document*/

import React from 'react';
import Nav from './Nav';
import Timestamp from './Timestamp';
import ApplicationStore from '../stores/ApplicationStore';

class Application extends React.Component {
    static contextTypes = {
        getStore: React.PropTypes.func,
        executeAction: React.PropTypes.func
    };
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                <Nav />
                {this.props.children}
                <Timestamp />
            </div>
        );
    }
}

export default Application;
