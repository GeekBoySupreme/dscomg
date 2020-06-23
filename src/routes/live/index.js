import { Component } from "preact";
import IoLogo from "../../components/io_logo";
import SocialFooter from "../../components/social_footer";
import Footer from "../../components/footer";
import style from "./style";

export default class EventLivePage extends Component {
  handleScroll() {
    const ele = document.querySelector(".topappbar.mdc-top-app-bar");
    if (document.documentElement.scrollTop < 56) {
      ele.setAttribute("top", true);
    } else {
      ele.removeAttribute("top");
    }
  }

  componentDidMount() {
    document.title = "Event Live - DSCOMG 2020";
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll();
  }

  componentWillUnmount() {
    document.querySelector(".topappbar.mdc-top-app-bar").removeAttribute("top");
  }

  render({ rootPath, user }) {
    return (
        <div class={style.scrollbar}>
        {/* {info && info.map_image && (<img class={style.mapImage} crossorigin="anonymous"  src={info.map_image} />)}
         */}
        <div class={`${style.hero} hero`}>
        <IoLogo rootPath={rootPath} />
					<h2>Watch live</h2>
					<p>
					  Stay Tuned here for the Live Sessions, updates and much, much more.
					<br />
            Also, subscribe to our YouTube Channel and hit the Bell Icon to get more updates.
          </p>

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
        <div class={style.footer}>
          <SocialFooter rootPath={rootPath} />
          <Footer rootPath={rootPath} />
        </div>
      </div>
      
    );
  }
}
