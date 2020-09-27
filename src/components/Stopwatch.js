import React, { Component } from 'react'

export default class Stopwatch extends Component {

    state = {
        isRunning: false,
        elapseTime: 0, // represent the amount of time that passed by.
        previousTime: 0,
    }

    componentDidMount() {
        // Gets called by React as soon as a component is inserted or mounted into the DOM.
        // tick() is triggered every .1s to avoid delay caused by setInterval().
        // Instead, We'll do some calculations based on Date.now() to update the number shown in stopwatch.
        this.intervalID = setInterval(() => this.tick(), 100);  
    }

    componentWillUnmount() {
        // Gets called by React as soon as a component is deleted or unmounted form the DOM.
        clearInterval(this.intervalID);
    }

    tick = () => {
        if(this.state.isRunning) {
            const now = Date.now();
            this.setState(prevState => ({
                previousTime: now,
                elapseTime: prevState.elapseTime + (now - prevState.previousTime),
            }));
        }
    }

    handleStopwatch = () => {
        this.setState(prevState => ({
            isRunning: !this.state.isRunning,
        }));

        if(!this.state.isRunning) {
            this.setState({previousTime: Date.now()}); 
            // Date.now returns the exact number of ms elapsed since
            // January 1st of 1970, or epoch time. And it's how dates
            // and time are stored in JavaScript.
        }
    }

    handleReset = () => {
        // This will not stop the timer.
        this.setState({elapseTime: 0});
    }

    render() {

        const seconds = Math.floor(this.state.elapseTime / 1000);

        return (
            <div className="stopwatch">
                <h2>Stopwatch</h2>
                <span className="stopwatch-time">{seconds}</span>
                <button onClick={this.handleStopwatch}>{this.state.isRunning ? "Stop" : "Start"}</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        )
    }
}
