import React, {
  Component
} from "react";
import Button from './Button';

export default class StopWatch extends Component {
  constructor(props) {
    super(props)

    // set initial states
    this.state = {
      time: 0,
      start: 0,
      isOn: false
    }

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  // start timer when loaded
  componentDidMount() {
    this.startTimer();
  }
  

  startTimer() {
    // overwrite the initial state
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
      isOn: true
    })
    // set timer every second; set state time
    this.StopWatch = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1000);
  }

  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.StopWatch)
  }

  resetTimer() {
    this.setState({
      time: 0,
      isOn: false
    })
    clearInterval(this.StopWatch)
  }
  
  timerFormat(time) {   
    // ~~ is a shorthand for Math.floor
    // millisecond to seconds
    time = ~~(time / 1000);
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  render() {
    console.log(this.state.time)
    let startBtn
    let resetBtn
    // Act as toggle
    if (this.state.isOn) {
      startBtn = <Button label="pause" handleClick={this.stopTimer} />
    } else {
      startBtn = <Button label="start" handleClick={this.startTimer} />
    }

    if (this.state.time == 0) {
      resetBtn = <Button label="reset" disabled />
    } else {
      resetBtn = <Button label="reset" handleClick={this.resetTimer} />
    }


    return (
      <div>
        <h3>timer: {this.timerFormat(this.state.time)}</h3>
        {startBtn}
        {resetBtn}
      </div>
    );
  }
}