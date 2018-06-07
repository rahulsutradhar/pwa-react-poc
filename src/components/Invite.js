import React, {Component} from 'react';
import '../stylesheets/invite/InviteStyle.css';
import Header from "./header/Header";
import AddCalender from "./button/AddCalender";
import StartChirp from "./button/StartChirp";

class Invite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    onClickAddCalender() {
        console.log('button Clicked');
    }

    render() {
        return (
            <div className="App">

                <Header></Header>

                <div className="content-container">

                    <h1 className="title">Invitation</h1>
                    <p className="App-intro">{this.state.date.toLocaleDateString()}</p>

                    <AddCalender></AddCalender>

                    <StartChirp/>

                </div>

            </div>
        );
    }

}

export default Invite;
