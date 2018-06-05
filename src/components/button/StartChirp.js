import React, {Component} from 'react';
import '../../stylesheets/invite/button/StartChirpStyle.css';
import Notifications, {notify} from 'react-notify-toast';

import {
    APPLICATION_KEY
} from "../../chirpconfig";

class StartChirp extends Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.onClickStartChirp = this.onClickStartChirp.bind(this);
    }

    /**
     * Life cycle method called onLoad
     */
    componentDidMount() {
        console.log("Chirp Button loaded");
        let audioContext = null;

        /**
         * Instantiates an audio context on which the Chirp will be played.
         */
        try {
            // Fix up for browser prefixing
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
        } catch (e) {
            console.log(e);
        }

        //get a reference to Chirp Connect
        this._chirp = new window.ChirpConnect(APPLICATION_KEY, audioContext);
    }

    /**
     * On Click start chirp
     * @returns {*}
     */
    onClickStartChirp() {
        console.log("Chirp Button Clicked");
        //for displaying toast message
        let myColor = {background: "#FFFFFF", text: "red"};

        if (this._chirp != null) {

            var code = "123456";
            var uint8array = new TextEncoder("utf-8").encode(code);
            var string = new TextDecoder("utf-8").decode(uint8array);
            console.log(uint8array);
            console.log(string);

            this._chirp.send(uint8array, err => {
                if (err) {
                    console.error(err);
                    //toast to display message
                    notify.show("Chirp Failed", "custom", 5000, myColor);
                } else {
                    //success, payload has been send
                    console.log('Chirp Payload has been send');
                    //toast to display message
                    notify.show("Payload send", "custom", 5000, myColor);
                }
            });
        } else {
            console.log("Chirp Variable is Null");
        }
    }

    render() {
        return (
            <div>
                <Notifications/>
                <button className="button-start-chirp"
                        onClick={this.onClickStartChirp}>Start Chirp
                </button>

            </div>
        );
    }
}

export default StartChirp;
