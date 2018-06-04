import React, {Component} from 'react';
import logo from '../../images/myGate_logo_web.png';
import '../../stylesheets/invite/header/HeaderStyle.css';

class Header extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
            </div>
        );
    }
}

export default Header;
