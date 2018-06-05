import React, {Component} from 'react';
import '../../stylesheets/invite/button/AddCalenderStyle.css';
import Notifications, {notify} from 'react-notify-toast';

import {
    GOOGLE_API_KEY,
    CLIENT_ID,
    DISCOVERY_DOCS,
    SCOPES
} from "../../googleapiconfig";

class AddCalender extends Component {

    constructor(props) {
        super(props);

        //binds this method with this
        this.onClickAddCalender = this.onClickAddCalender.bind(this);
        this.updateSigninStatus = this.updateSigninStatus.bind(this);
        this.initClient = this.initClient.bind(this);

        this.state = {
            event: {
                summary: 'Invitation to Your Friends Place',
                location: '303 A, The Island Society, HSR Lyout',
                description: 'Your friend has invited you to his society',
                start: {
                    date: "2018-06-06"
                },
                end: {
                    date: "2018-06-06"
                },
                recurrence: [],
                attendees: [],
                reminders: {
                    useDefault: false,
                    overrides: [
                        {method: 'email', minutes: 24 * 60},
                        {method: 'popup', minutes: 10}
                    ]
                }
            },
            isSignin: false
        }
    }

    /**
     * Lifecycle method called when the component is loaded
     */
    componentDidMount() {
        this.initializeGoogleAuthApi();
    }

    /**
     * Load Google Api Script, when compnent loads
     */
    initializeGoogleAuthApi() {
        console.log('LoadGoogle Auth');
        window.gapi.load('client:auth2', this.initClient);
    }

    /**
     * Init Call for google authentication
     */
    initClient() {
        window.gapi.client.init({
            apiKey: GOOGLE_API_KEY,
            discoveryDocs: [DISCOVERY_DOCS],
            clientId: CLIENT_ID,
            scope: SCOPES
        });
    };

    /**
     * On click add Calender button
     */
    onClickAddCalender() {
        if (!this.state.isSignin) {
            console.log("Call Google signIN");
            this.doGoogleAuth();
        } else {
            //call calender api
            console.log("Already Signin, Call Calender Event");
            this.insertCalenderEvent();
        }
    }

    /**
     * Perform Google sign in operation
     */
    doGoogleAuth() {
        let that = this;
        /**
         * This method call the api and then returns the response to the method
         */
        Promise.resolve(window.gapi.auth2.getAuthInstance().signIn())
            .then(
                //afte this is done , then this method is called
                that.updateSigninStatus
            );
    }


    /**
     * Callback method for sign success status
     * @param isSignedIn
     */
    updateSigninStatus(isSignedIn) {
        console.log(("called successfully! " + isSignedIn));

        if (isSignedIn) {

            if (!this.state.isSignin) {
                this.setState({
                    isSignin: true
                });

                //once signed in call the caledner
                console.log("After sign Call Calender : " + this.state.isSignin);
                this.insertCalenderEvent();
            }
            console.log("Signin Success now");

        } else {
            console.log("Signin NOT Success now");
            this.setState({
                isSignin: false
            });
        }
    };


    /**
     * Once the Authentication is done, call calender api to set an event
     * @returns {*}
     */
    insertCalenderEvent() {
        //for displaying toast message
        let myColor = {background: "#FFFFFF", text: "red"};

        console.log("Calling Event Insert");
        let request = window.gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': this.state.event
        });

        request.execute(function (event) {
            /**
             * This method checks if code = 400 then failed
             * then check the status of confirmation
             */
            if (typeof event.code !== "undefined") {
                console.log("Code exits")
                if (event.code === 400) {
                    //toast to display message
                    notify.show("Failed", "custom", 5000, myColor);

                    console.log("Error, Failed")
                }
            } else if (typeof event.status !== "undefined") {
                if (event.status === "confirmed") {
                    //toast to display message
                    notify.show("Event Added to Calender", "custom", 5000, myColor);

                    console.log('Event created: ' + event.htmlLink);
                }
            } else {
                //toast to display message
                notify.show("failed", "custom", 5000, myColor);
            }
        });
    }


    render() {
        return (
            <div>
                <Notifications/>
                <button className="button-add-calender"
                        onClick={this.onClickAddCalender}>Add to Calender
                </button>
            </div>
        );
    }
}

export default AddCalender;
