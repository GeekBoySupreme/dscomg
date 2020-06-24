let style = require("./style.css");
import { Component } from "preact";
import { Countdown as CountdownController } from "./Countdown";

export default class Countdown extends Component {
  state = {
    isReset: false
  };

  componentDidMount() {
    if (!this.controller) {
      this.controller = new CountdownController(
        style,
        this.countdownContainer,
        this.state.isReset
      );
      this.controller.reset(this.state.isReset);
      this.controller.init();
    }
  }

  shouldComponentUpdate() {
    return !this.controller.isReset;
  }

  componentWillUnmount() {
    this.setState({
      isReset: true
    });

    this.controller.reset(this.state.isReset);
  }

  render() {
    return (
      <div>
        <img
          class={style.img}
          src={
            "https://res.cloudinary.com/distortedaura/image/upload/v1593002932/DSCOMG/Day_1_Website_1.png"
          }
        />
      </div>
    );
  }
}
