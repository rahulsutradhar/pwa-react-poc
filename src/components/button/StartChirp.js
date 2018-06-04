import React, {Component} from 'react';
import '../../stylesheets/invite/button/StartChirpStyle.css';

class StartChirp extends Component {

    constructor(props) {
        super(props);
        this.onClickStartChirp = this.onClickStartChirp.bind(this);
    }

    /**
     * Life cycle method
     */
    componentDidMount() {

    }

    /**
     * On Click start chirp
     * @returns {*}
     */
    onClickStartChirp() {
        console.log("Chirp Button Clicked")
    }

    render() {
        return (
            <div>
                <button className="button-start-chirp"
                        onClick={this.onClickStartChirp}>Start Chirp
                </button>
            </div>
        );
    }
}

export default StartChirp;
