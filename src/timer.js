import React from 'react';

class Timer extends React.Component {

    countdownDate = new Date(this.props.date).getTime();
    
    state = {
        timeUntil: 0
    }

    componentDidMount = () => {
        this.updateTimerOnInterval();
    }

    updateTimerOnInterval = () => {
        setInterval(() => { 
            let newTime = this.countdownDate - Date.now();
            this.setState({
                timeUntil: newTime
            })
        }, 1000);
    }

    convertUTToReadableTimer = (unixTime) => {
        var days = Math.floor(unixTime/ (1000 * 60 * 60 * 24));
        var hours = Math.floor((unixTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((unixTime % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((unixTime % (1000 * 60)) / 1000);

        return (
            <div>
                <b>{days}</b> days, <b>{hours}</b> hours, <b>{minutes}</b> minutes, <b>{seconds}</b> seconds
            </div>
        )
    }

    render = () => {
        return (
            <div>
                {this.convertUTToReadableTimer(this.state.timeUntil)}
            </div>
        )
    }
}

export default Timer;