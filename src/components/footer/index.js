import { Component } from "preact";
import style from "./style";

export default class Footer extends Component {
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

  componentDidMount() {
    const ele = document.querySelector(`.footer_logo`);

    if (!this.io || !ele ) return;

    this.io.observe(ele);
  }

  componentWillUnmount() {
    if (!this.io) return;
    this.io.disconnect();
  }

  render({ rootPath }) {
    return (
      <div class={style.footer}>
        <div class={style.footer_logo}>
          <img
		  	class="footer_logo"
            crossorigin="anonymous"
            alt="GDG Kuala Lumpur Logo"
            data-src="https://res.cloudinary.com/shangyilim/image/upload/v1554985776/new-gdgkl.svg"
          />
        </div>
        <div class={style.footer_links}>
          <div class={style.footer_link}>
            <a href="https://events.gdgkl.org/ioxkl19/">I/O Extended KL 2019</a>
            <a href={rootPath + "schedule"}>Schedule</a>
            <a href={rootPath + "speakers"}>Speakers</a>
            <a href={rootPath + "faq"}>FAQ</a>
            <a href={rootPath + "faq/communityguidelines"}>
              Community Guidelines
            </a>
          </div>
        </div>
      </div>
    );
  }
}
