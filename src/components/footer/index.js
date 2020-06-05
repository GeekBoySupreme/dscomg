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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="162"
          height="87"
          viewBox="0 0 1362 237"
        >
          <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <g transform="translate(-233 -211)">
              <g transform="translate(233 211)">
                <g transform="translate(674.834)">
                  <g fill="#4185F3" transform="translate(486.606 .314)">
                    <path
                      d="M6.97423671 122.036951L25.4402153 196.592765 68.3130762 225.215978 123.025461 225.215978 173.556851 211.102569 193.613645 165.066032 193.613645 122.036951z"
                      opacity="0.229"
                    ></path>
                    <path
                      fillRule="nonzero"
                      d="M102.364 235.186c66.568 0 97.34-45.53 97.34-105.504 0-2.512 0-7.85-.628-13.502H124.03v16.642h56.206c-1.256 51.182-24.178 84.78-77.558 84.78-55.578-.314-83.838-41.448-83.21-100.166.314-59.032 27.632-99.852 83.21-99.852 34.54 0 58.404 18.212 69.08 46.158l17.898-5.652C177.724 23.236 147.894 0 102.364 0 36.11 0 0 47.414 0 117.436c0 70.336 36.424 117.75 102.364 117.75z"
                    ></path>
                  </g>
                  <g fill="#049C59">
                    <path
                      d="M6.58 122.350951L25.0459786 196.906765 67.9188395 225.529978 122.631224 225.529978 173.162615 211.416569 193.219408 165.380032 193.219408 122.350951z"
                      opacity="0.229"
                    ></path>
                    <path
                      fillRule="nonzero"
                      d="M102.678 235.5c67.824 0 102.992-48.356 102.992-117.75S170.502 0 102.678 0C35.168 0 0 48.356 0 117.75S35.168 235.5 102.678 235.5zm0-17.584c-55.578-.314-83.838-41.448-83.21-100.166.314-59.032 27.632-100.166 83.21-100.166 55.578.314 83.524 41.134 83.524 100.166 0 58.718-27.946 100.166-83.524 100.166z"
                    ></path>
                  </g>
                  <g transform="translate(240.56 4.71)">
                    <path
                      fill="#FFBD00"
                      d="M12.7816312 117.640951L12.7816312 37.1393898 37.4389844 67.9894745 105.823521 206.728754 204.211569 26.5370346 211.942608 117.640951 151.353987 117.640951 105.823521 220.819978 59.1270852 117.640951z"
                      opacity="0.294"
                    ></path>
                    <path
                      fill="#FABB07"
                      fillRule="nonzero"
                      d="M17.584 226.08L17.584 41.448 101.736 226.08 116.808 226.08 200.96 41.448 200.96 225.766 218.544 225.766 218.544 0 201.274 0 109.272 200.018 16.956 0 0 0 0 226.08z"
                    ></path>
                  </g>
                </g>
                <path
                  fill="#A8A8A8"
                  fillRule="nonzero"
                  d="M97.026 229.22c50.868-7.222 75.674-53.38 75.674-111.47 0-57.776-24.806-104.562-75.674-111.47-10.99-1.57-24.492-1.57-29.516-1.57H0v226.08h68.803c5.638-.01 18.394-.125 28.223-1.57zM67.51 213.206H19.154V22.294H67.51c8.792 0 20.096.628 27.318 1.884 41.762 7.222 58.718 44.902 58.718 93.572 0 48.356-16.642 86.35-58.718 93.572-7.222 1.256-18.212 1.884-27.318 1.884zM284.798 235.5c47.414 0 80.384-24.492 80.384-64.998 0-42.39-35.796-53.38-53.066-58.404l-45.53-13.502c-18.212-5.338-42.704-13.502-42.704-38.622 0-23.864 23.236-42.39 56.206-42.39 34.226.314 60.916 20.724 65.312 51.81l18.84-3.454C357.646 25.748 324.99 0 280.088 0c-43.96 0-75.36 24.492-75.36 60.602 0 27.318 17.27 44.274 47.414 53.066l56.834 16.956c15.386 4.71 37.994 13.502 37.994 40.192 0 28.574-25.434 47.1-61.858 47.1-35.796 0-63.114-18.526-70.964-48.67l-18.212 3.14c7.85 38.936 42.076 63.114 88.862 63.114zm202.53 0c52.752 0 85.722-29.516 97.654-75.046l-18.84-4.71c-9.734 37.994-36.11 62.172-78.814 62.172-55.578 0-83.838-41.448-83.524-100.166.628-59.032 27.946-100.166 83.524-100.166 42.704 0 69.08 24.178 78.814 61.858l18.84-4.396C573.05 29.516 540.08 0 487.328 0 419.818 0 384.65 48.356 384.65 117.75S419.818 235.5 487.328 235.5z"
                ></path>
              </g>
            </g>
          </g>
        </svg>
        </div>
        <div class={style.footer_links}>
          <div class={style.footer_link}>
            <a href="https://events.gdgkl.org/ioxkl19/">DSCOMG 2020</a>
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
