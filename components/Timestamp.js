import React from 'react';
import updateTime from '../actions/updateTime';
import TimeStore from '../stores/TimeStore';
import { connectToStores } from 'fluxible-addons-react';

@connectToStores([TimeStore], (context) => {
    return context.getStore(TimeStore).getState()
})
export default class Timestamp extends React.Component {
    static contextTypes = {
        getStore: React.PropTypes.func,
        executeAction: React.PropTypes.func
    };
    constructor(props, context) {
        super(props, context);
    }
    onReset() {
        this.context.executeAction(updateTime);
    }
    render() {
        return (
            <em onClick={this.onReset.bind(this)} style={{fontSize: '.8em'}}>
                {this.props.time}
            </em>
        );
    }
}
