import { h, Component } from "preact";
import IoLogo from "../../components/io_logo";
import Footer from "../../components/footer";
import axios from "axios";
import style from "./style";

export default class Badges extends Component {
  constructor(props) {
    super(props);

    this.state = {
      badges: [],
      user: props.user,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({ user: nextProps.user });

      const email = nextProps.user.email;
      axios
        .get("https://badges.dscomg.com/api/badges?email=" + email)
        .then((response) => {
          this.setState({ badges: response.data.badges });
        });
    }
  }

  handleScroll() {
    const ele = document.querySelector(".topappbar.mdc-top-app-bar");
    if (document.documentElement.scrollTop < 56) {
      ele.setAttribute("top", true);
    } else {
      ele.removeAttribute("top");
    }
  }

  componentWillMount() {}

  componentDidMount() {
    document.title = "Badges - DSCOMG 2020";
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll();

    const email = this.props.user.email;
    axios
      .get("https://badges.dscomg.com/api/badges?email=" + email)
      .then((response) => {
        this.setState({ badges: response.data.badges });
      });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.querySelector(".topappbar.mdc-top-app-bar").removeAttribute("top");
  }

  render({ rootPath }) {
    return (
      <div>
        <div class="hero">
          <IoLogo rootPath={rootPath + "/badges"} />
          <h3>My Badges</h3>
          <h4>{this.state.user ? this.state.user.email : "Sign In to start Getting badges"}</h4>
        </div>
        {this.state.user ? (
          <div>
            {this.state.badges.length === 0 ? (
              <div class={style.speakers}>
                No Badges earned! <br />Nevermind, it's not too late. Watch sessions to earn badges.
              </div>
            ) : (
              <div class={style.speakers}>
                {this.state.badges.map((item, index) => (
                  <div class={style.speaker_item}>
                    <div class={style.profile_pic}>
                      {item.image ? (
                        <img
                          alt={item.name}
                          class={style.speaker_profile_pic}
                          src={"https://badges.dscomg.com" + item.image}
                        />
                      ) : (
                        <img
                          alt={item.name}
                          class={style.speaker_profile_pic}
                          src={rootPath + "assets/person.svg"}
                        />
                      )}
                    </div>
                    <div class={style.speaker_name}>{item.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div class={style.speakers}>Sign-In to view badges</div>
        )}

        <div class={style.footer}>
          <SocialFooter rootPath={rootPath} />
          <Footer rootPath={rootPath} />
        </div>
      </div>
    );
  }
}
