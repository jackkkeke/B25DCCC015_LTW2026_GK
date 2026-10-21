
import React from "react";

class WorkTimer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds + 1
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { seconds } = this.state;

    return <p>Đã xem: {seconds} giây</p>;
  }
}

export default WorkTimer;
