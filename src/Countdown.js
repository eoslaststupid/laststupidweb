import React from 'react';
import './Countdown.css';

export default class Countdown extends React.Component{

  constructor(props) {
    super(props)

    this.state={
      remaining:0,
      day:'00',
      hour:'00',
      minute:'00',
      second:'00',
    }

    this.timer = undefined
  }

  shouldComponentUpdate(nextProps,nextState) {
    if (this.state.remaining === nextState.remaining) {
      return false
    }
    return true
  }

  componentWillReceiveProps(newProps) {
    let {seconds} = newProps;
    this.setState({remaining: seconds})
    this.setTimer()
  }

  componentDidMount() {
    let {seconds} = this.props;
    this.setState({remaining: seconds})
    this.setTimer()
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  setTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      let {remaining} = this.state;
      if(remaining >= 0) {
        let temHour = Math.floor((remaining / 3600) % 24);
        let temMinute = Math.floor((remaining / 60) % 60);
        let temSecond = Math.floor(remaining % 60);
        this.setState({
          hour: temHour >= 10 ? temHour : '0' + temHour,
          minute: temMinute >= 10 ? temMinute : '0' + temMinute,
          second: temSecond >= 10 ? temSecond : '0' + temSecond,
          remaining: remaining-1
        })
      }else{
        clearInterval(this.timer);
      }
    }, 1000)
  }

  // updateTime(){
  //   let lp = this.state.second;
  //   let timer = setInterval(function(){
  //     console.log("this.state.remaining:",this.state.remaining)
  //     if(this.state.remaining >= 0) {
  //       this.state.hour = Math.floor((this.state.remaining / 3600) % 24);
  //       this.state.minute = Math.floor((this.state.remaining / 60) % 60);
  //       lp = Math.floor(this.state.remaining % 60);
  //       this.state.remaining --;
  //     }else{
  //       clearInterval(timer);
  //     }
  //   }.bind(this),1000)
  // }

  render() {
    return (
      <p className="countDownTimer">
        {/*{this.updateTime()}*/}
        <span>{this.state.hour}</span> : <span>{this.state.minute}</span> : <span>{this.state.second}</span>

      </p>
    )
  }
}
