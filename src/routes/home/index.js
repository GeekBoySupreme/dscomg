import { Component } from "preact";
import IoLogo from "../../components/io_logo";
import SocialFooter from "../../components/social_footer";
import Footer from "../../components/footer";
import GalleryBlock from "../../components/gallery_block";
import Countdown from "../../components/Countdown";
import style from "./style";

export default class Home extends Component {
  constructor(props) {
    super(props);
    if (typeof window !== "undefined") {
      this.io = new IntersectionObserver(
        entries => {
          const visibleEntries = entries.filter(e => e.isIntersecting);

          visibleEntries
            .filter(e => e.target instanceof HTMLImageElement)
            .forEach(e => {
              e.target.src = e.target.dataset.src;
            });
        },
        {
          /* Using default options. Details below */
        }
      );
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

  componentDidMount() {
    document.title = "DSCOMG 2020";
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll();

    const ele = document.querySelector(".belt");
    const cover = document.querySelector("#cover");
    const sponsorLogos = document.querySelectorAll(".sponsor_logo");

    if (!this.io) return;

    this.io.observe(ele);
    this.io.observe(cover);
    sponsorLogos.forEach(logo => this.io.observe(logo));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.querySelector(".topappbar.mdc-top-app-bar").removeAttribute("top");

    if (!this.io) return;
    this.io.disconnect();
  }

  render({ rootPath, partners }) {
    return (
      <div>
        <div class={`${style.hero} hero`}>
          <div class={style.hero_title}>
            <IoLogo rootPath={rootPath} />
            <h2>
              DSC OMG brings together developers from around the globe for talks,
              hands-on learning with DSC Leads and Google experts, and a first look at some of the
              amazing Community Projects at hand.
            </h2>
            <br />
            <h4>16 June 2019 · Sunway University, Bandar Sunway</h4>
          </div>
          <Countdown />
        </div>
        <div class={`${style.belt} belt`}>
          <img
            id="cover"
            crossorigin="anonymous"
            data-src="https://res.cloudinary.com/distortedaura/image/upload/v1591282861/DSCOMG/992162d2-175b-4360-b6ef-78d8ab082155.jpg"
          />
        </div>
        <div class={style.home_info}>
          <div class={style.text}>
            <h3>What you need to know, before you ask.</h3>
            <p>
              DSC OMG 2020 brings together the world class
              experts in Design, Android, Web, Machine Learning, Cloud technologies and much more
              for a week of sessions, workshops and showcases.
            </p>
          </div>
          <div class={style.stats}>
            <div class={style.stat}>
              <div class={style.number}>450+</div>
              <div class={style.label}>Attendees</div>
            </div>
            <div class={style.stat}>
              <div class={style.number}>1</div>
              <div class={style.label}>Week</div>
            </div>
          </div>
        </div>
        <GalleryBlock />
        {partners && (
          <div class={style.partners}>
            <h3>Partners</h3>
            <h4>To be Updated Soon</h4>
            {partners.main_partner && (
              {/* <a
                class={style.item}
                href={partners.main_partner.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  crossorigin="anonymous"
                  class="sponsor_logo"
                  data-src={partners.main_partner.image}
                  alt={partners.main_partner.name}
                />
              </a> */}
            )}
            {/* <h4>Community Partners</h4>
            {partners.partner && (
              <div class={style.partner}>
                <div class={style.sponsor}>
                  {partners.partner.map(item => (
                    <a
                      class={style.item}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        class="sponsor_logo"
                        crossorigin="anonymous"
                        data-src={item.image}
                        alt={item.name}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {partners.general_sponsor && (
              <div class={style.partner}>
                <h4>Our Mind-blowing Gold Sponsors</h4>
                <div class={style.sponsor}>
                  {partners.general_sponsor.map(item => (
                    <a
                      class={style.item}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        class="sponsor_logo"
                        crossorigin="anonymous"
                        data-src={item.image}
                        alt={item.name}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
            {partners.sponsors && (
              <div class={style.partner}>
                <h4>Our Awesome Silver Sponsors</h4>
                <div class={style.sponsor}>
                  {partners.sponsors.map(item => (
                    <a
                      class={style.item}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        class="sponsor_logo"
                        crossorigin="anonymous"
                        data-src={item.image}
                        alt={item.name}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
            {partners.community_sponsors && (
              <div class={style.partner}>
                <h4>Our Hardcore Fans</h4>
                <div class={style.sponsor}>
                  {partners.community_sponsors.map(item => (
                    <a
                      class={style.item}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        class="sponsor_logo"
                        crossorigin="anonymous"
                        data-src={item.image}
                        alt={item.name}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
            {partners.sponsors && (
              <div class={style.partner}>
                <h4>Official Ticketing Partner</h4>
                <div class={style.sponsor}>
                  {partners.ticketing_partner.map(item => (
                    <a
                      class={style.item}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        class="sponsor_logo"
                        crossorigin="anonymous"
                        data-src={item.image}
                        alt={item.name}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
            {partners.organizers && (
              <div class={style.partner}>
                <h4>With Love From</h4>
                <div class={style.sponsor}>
                  {partners.organizers.map(item => (
                    <a
                      class={style.item}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        class="sponsor_logo"
                        crossorigin="anonymous"
                        data-src={item.image}
                        alt={item.name}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )} */}
          </div>
        )}
        <SocialFooter rootPath={rootPath} />
        <Footer rootPath={rootPath} />
      </div>
    );
  }
}
