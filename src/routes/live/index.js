import { Component } from "preact";
import IoLogo from "../../components/io_logo";
import SocialFooter from "../../components/social_footer";
import Footer from "../../components/footer";
import style from "./style";
import TimeFormat from "hh-mm-ss";
import moment from "moment-timezone";
import axios from "axios";
import Snackbar from "preact-material-components/Snackbar";
import "preact-material-components/Snackbar/style.css";

export default class EventLivePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remaining: 900000,
      user: props.user,
    };

    this.ticker = this.ticker.bind(this);
    this.subTimer = this.subTimer.bind(this);
    this.mainTimer = this.mainTimer.bind(this);
    this.resetSubTimer = this.resetSubTimer.bind(this);
  }

  showRefreshSnack = () => {
    this.snackbar.MDComponent.show({
      message: "Site updated. Refresh this page for better experience.",
      actionText: "Refresh",
      timeout: 5000,
      actionHandler: () => {
        window.location.reload();
      },
    });
  };

  componentWillUnmount() {
    window.removeEventListener("showRefreshSnack", this.showRefreshSnack);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({ user: nextProps.user });
    }
  }

  componentDidMount() {
    const user = this.props.user;
    this.setState({ user: user });
    window.addEventListener("showRefreshSnack", this.showRefreshSnack);
  }

  handleScroll() {
    const ele = document.querySelector(".topappbar.mdc-top-app-bar");
    if (document.documentElement.scrollTop < 56) {
      ele.setAttribute("top", true);
    } else {
      ele.removeAttribute("top");
    }
  }

  resetSubTimer() {
    console.log("Fired");
    clearInterval(this.state.subTimer);
    var subTimer = setInterval(this.subTimer, 900000);
    this.setState({ subTimer: subTimer, remaining: 900000 });
  }

  mainTimer() {
    var now = moment.tz("Asia/Kolkata");

    if (
      now >= moment.tz("2020-06-24 18:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-24 18:01", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-24 18:20", "Asia/Kolkata") &&
      now < moment.tz("2020-06-24 18:21", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-24 18:50", "Asia/Kolkata") &&
      now < moment.tz("2020-06-24 18:51", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-24 19:20", "Asia/Kolkata") &&
      now < moment.tz("2020-06-24 19:21", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-24 19:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-24 19:31", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-24 20:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-24 20:01", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-24 20:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-24 20:31", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-26 18:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 18:01", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-26 18:20", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 18:21", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-26 18:50", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 18:51", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-26 19:20", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 19:21", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-26 19:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 19:31", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-26 20:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 20:01", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-26 20:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 20:31", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-26 18:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 18:01", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-26 18:20", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 18:21", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-26 18:50", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 18:51", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-26 19:20", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 19:21", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-26 19:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 19:31", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-26 20:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 20:01", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-26 20:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 20:31", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-27 18:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-27 18:01", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-27 18:20", "Asia/Kolkata") &&
      now < moment.tz("2020-06-27 18:21", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-27 18:50", "Asia/Kolkata") &&
      now < moment.tz("2020-06-27 18:51", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-27 19:20", "Asia/Kolkata") &&
      now < moment.tz("2020-06-27 19:21", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-27 19:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-27 19:31", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-27 20:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-27 20:01", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-27 20:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-27 20:31", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-28 18:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-28 18:01", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-28 18:10", "Asia/Kolkata") &&
      now < moment.tz("2020-06-28 18:11", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    } else if (
      now >= moment.tz("2020-06-28 20:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-28 20:31", "Asia/Kolkata")
    ) {
      this.resetSubTimer();
    }
  }

  performPost() {
    var now = moment.tz("Asia/Kolkata");

    var sessionCurrent = "D0S0";

    if (
      now >= moment.tz("2020-06-24 18:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-24 18:20", "Asia/Kolkata")
    ) {
      sessionCurrent = "D1S1";
    } else if (
      now >= moment.tz("2020-06-24 18:20", "Asia/Kolkata") &&
      now < moment.tz("2020-06-24 18:50", "Asia/Kolkata")
    ) {
      sessionCurrent = "D1S2";
    } else if (
      now >= moment.tz("2020-06-24 18:50", "Asia/Kolkata") &&
      now < moment.tz("2020-06-24 19:20", "Asia/Kolkata")
    ) {
      sessionCurrent = "D1S3";
    } else if (
      now >= moment.tz("2020-06-24 19:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-24 20:00", "Asia/Kolkata")
    ) {
      sessionCurrent = "D1S4";
    } else if (
      now >= moment.tz("2020-06-24 20:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-24 20:30", "Asia/Kolkata")
    ) {
      sessionCurrent = "D1S5";
    } else if (
      now >= moment.tz("2020-06-24 20:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-24 21:00", "Asia/Kolkata")
    ) {
      sessionCurrent = "D1S6";
    } else if (
      now >= moment.tz("2020-06-25 18:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-25 18:20", "Asia/Kolkata")
    ) {
      sessionCurrent = "D2S1";
    } else if (
      now >= moment.tz("2020-06-25 18:20", "Asia/Kolkata") &&
      now < moment.tz("2020-06-25 18:50", "Asia/Kolkata")
    ) {
      sessionCurrent = "D2S2";
    } else if (
      now >= moment.tz("2020-06-25 18:50", "Asia/Kolkata") &&
      now < moment.tz("2020-06-25 19:20", "Asia/Kolkata")
    ) {
      sessionCurrent = "D2S3";
    } else if (
      now >= moment.tz("2020-06-25 19:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-25 20:00", "Asia/Kolkata")
    ) {
      sessionCurrent = "D2S4";
    } else if (
      now >= moment.tz("2020-06-25 20:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-25 20:30", "Asia/Kolkata")
    ) {
      sessionCurrent = "D2S5";
    } else if (
      now >= moment.tz("2020-06-25 20:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-25 21:00", "Asia/Kolkata")
    ) {
      sessionCurrent = "D2S6";
    } else if (
      now >= moment.tz("2020-06-26 18:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 18:20", "Asia/Kolkata")
    ) {
      sessionCurrent = "D3S1";
    } else if (
      now >= moment.tz("2020-06-26 18:20", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 18:50", "Asia/Kolkata")
    ) {
      sessionCurrent = "D3S2";
    } else if (
      now >= moment.tz("2020-06-26 18:50", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 19:20", "Asia/Kolkata")
    ) {
      sessionCurrent = "D3S3";
    } else if (
      now >= moment.tz("2020-06-26 19:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 20:00", "Asia/Kolkata")
    ) {
      sessionCurrent = "D3S4";
    } else if (
      now >= moment.tz("2020-06-26 20:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 20:30", "Asia/Kolkata")
    ) {
      sessionCurrent = "D3S5";
    } else if (
      now >= moment.tz("2020-06-26 20:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 21:00", "Asia/Kolkata")
    ) {
      sessionCurrent = "D3S6";
    } else if (
      now >= moment.tz("2020-06-27 18:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-27 18:20", "Asia/Kolkata")
    ) {
      sessionCurrent = "D4S1";
    } else if (
      now >= moment.tz("2020-06-27 18:20", "Asia/Kolkata") &&
      now < moment.tz("2020-06-27 18:50", "Asia/Kolkata")
    ) {
      sessionCurrent = "D4S2";
    } else if (
      now >= moment.tz("2020-06-27 18:50", "Asia/Kolkata") &&
      now < moment.tz("2020-06-27 19:20", "Asia/Kolkata")
    ) {
      sessionCurrent = "D4S3";
    } else if (
      now >= moment.tz("2020-06-27 19:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-27 20:00", "Asia/Kolkata")
    ) {
      sessionCurrent = "D4S4";
    } else if (
      now >= moment.tz("2020-06-27 20:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-27 20:30", "Asia/Kolkata")
    ) {
      sessionCurrent = "D4S5";
    } else if (
      now >= moment.tz("2020-06-27 20:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-27 21:00", "Asia/Kolkata")
    ) {
      sessionCurrent = "D4S6";
    } else if (
      now >= moment.tz("2020-06-28 18:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-28 18:10", "Asia/Kolkata")
    ) {
      sessionCurrent = "D5S1";
    } else if (
      now >= moment.tz("2020-06-28 18:10", "Asia/Kolkata") &&
      now < moment.tz("2020-06-28 20:30", "Asia/Kolkata")
    ) {
      sessionCurrent = "D5S2";
    } else if (
      now >= moment.tz("2020-06-28 20:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-28 21:00", "Asia/Kolkata")
    ) {
      sessionCurrent = "D5S3";
    } else if (
      now >= moment.tz("2020-06-24 11:19", "Asia/Kolkata") &&
      now < moment.tz("2020-06-24 12:22", "Asia/Kolkata")
    ) {
      sessionCurrent = "D1S3";
    }

    axios
      .post("https://badges.dscomg.com/api/session/", {
        session: sessionCurrent,
        email: this.props.user.email,
      })
      .then(
        (response) => {
          console.log(response.data);
          if (response.data.badgeEarned) {
            this.snackbar.MDComponent.show({
              message: "You earned a badge!",
              timeout: 5000,
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  subTimer() {
    this.setState({ remaining: 900000 });
    this.performPost();
  }

  ticker() {
    var remainingTime = this.state.remaining;
    this.setState({ remaining: remainingTime - 1000 });
  }

  componentDidMount() {
    document.title = "Event Live - DSCOMG 2020";
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll();

    var ticker = setInterval(this.ticker, 1000);
    this.setState({ ticker: ticker });

    var mainTimer = setInterval(this.mainTimer, 50000);
    this.setState({ mainTimer: mainTimer });

    var subTimer = setInterval(this.subTimer, 900000);
    this.setState({ subTimer: subTimer });
  }

  componentWillUnmount() {
    document.querySelector(".topappbar.mdc-top-app-bar").removeAttribute("top");

    clearInterval(this.state.mainTimer);
    clearInterval(this.state.subTimer);
    clearInterval(this.state.ticker);
  }

  render({ rootPath, user }) {
    return (
      <div class={style.scrollbar}>
        {/* {info && info.map_image && (<img class={style.mapImage} crossorigin="anonymous"  src={info.map_image} />)}
         */}
        <div class={`${style.hero} hero`}>
          <IoLogo rootPath={rootPath} />
          <h2>Watch live</h2>
          <iframe width="853" height="480" src="https://www.youtube.com/embed/vxwpPOz_5os" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <p>
            Stay Tuned here for the Live Sessions, updates and much, much more.
            <br />
            Also, subscribe to our YouTube Channel and hit the Bell Icon to get
            more updates.
          </p>
          <button class={style.action_button}>
            <b>
              {this.props.user
                ? `Claiming Points in ${TimeFormat.fromMs(
                    this.state.remaining
                  )}`
                : "Sign-In to earn badges"}
            </b>
          </button>
          <p>&nbsp;</p>
          <p style={{fontSize: "80%", padding: 0, margin: 0}}>* Claim points for each session to earn badges!</p>

          <br />
          <br />

          <div class={style.button_holder}>
            <a
              href="https://www.youtube.com/DiversityInDSC?reload=9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button class={style.action_button}>
                <b>Find us on YouTube</b>
              </button>
            </a>
          </div>
        </div>
        <Snackbar
          ref={(snackbar) => {
            this.snackbar = snackbar;
          }}
        />
        <div class={style.footer}>
          <SocialFooter rootPath={rootPath} />
          <Footer rootPath={rootPath} />
        </div>
      </div>
    );
  }
}
