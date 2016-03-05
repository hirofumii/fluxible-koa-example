import React from 'react';
import { Link } from 'react-router';

export default class Nav extends React.Component {
    static contextTypes = {
        history: React.PropTypes.object.isRequired,
        location: React.PropTypes.object.isRequired
    };
    render() {
        return (
            <ul className="pure-menu pure-menu-horizontal">
                <li className={this.context.location.pathname === '/' ? 'pure-menu-selected' : ''}>
                    <Link to='/'>Home</Link>
                </li>
                <li className={this.context.history.isActive('/about') ? 'pure-menu-selected' : ''}>
                    <Link to='/about'>About</Link>
                </li>
            </ul>
        );
    }
}
