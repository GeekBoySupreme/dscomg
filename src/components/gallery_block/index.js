/**
 * Copyright 2016 Oleh Zasadnyy, GDG Lviv
 * Source: https://github.com/gdg-x/hoverboard
 */

import { Component } from "preact";
import style from "./style";

export default class GalleryBlock extends Component {
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
    if (!this.io) return;

    const elements = document.querySelectorAll(`.${style.grid_item}`);

    elements.forEach(element => this.io.observe(element));
  }

  componentWillUnmount() {
    if (!this.io) return;

    this.io.disconnect();
  }

  render() {
    return (
      <div class={style.photos_grid}>
        <img
          crossorigin="anonymous"
          class={style.grid_item}
          data-src="https://ik.imagekit.io/sh7tot7lqad/20190824_141027_DO_NXlBiN.jpg"
        />
        <img
          crossorigin="anonymous"
          class={style.grid_item}
          data-src="https://ik.imagekit.io/sh7tot7lqad/_DSC0962_i8mYjA5WX.JPG"
        />
        <img
          crossorigin="anonymous"
          class={style.grid_item}
          data-src="https://ik.imagekit.io/sh7tot7lqad/IMG_20190824_190220_utbmiRXh6.jpg"
        />
        <img
          crossorigin="anonymous"
          class={style.grid_item}
          data-src="https://ik.imagekit.io/sh7tot7lqad/029A2551_2epF-lUl2.JPG"
        />
        <img
          crossorigin="anonymous"
          class={style.grid_item}
          data-src="https://ik.imagekit.io/sh7tot7lqad/IMG_20190823_164740_Q5K2CN6ld.jpg"
        />
        <img
          crossorigin="anonymous"
          class={style.grid_item}
          data-src="https://ik.imagekit.io/sh7tot7lqad/992162d2-175b-4360-b6ef-78d8ab082155_8_nPKocLs.jpg"
        />
        <img
          crossorigin="anonymous"
          class={style.grid_item}
          data-src="https://ik.imagekit.io/sh7tot7lqad/AVI_6315_Rh3vXlQaJq.JPG"
        />
        <img
          crossorigin="anonymous"
          class={style.grid_item}
          data-src="https://ik.imagekit.io/sh7tot7lqad/IMG_20190823_170659_ifXRJIY4V.jpg"
        />
        <div crossorigin="anonymous" class={style.gallery_info}>
          <div>
            <h2>Developer Student Club India highlights</h2>
            <p>
              Developer Student Clubs has been a vibrant community for Developers across the world. Check out photos
              from featured talks, hands-on learning sessions, and after-hours
              fun.
            </p>
          </div>
          {/* <a
            href="https://photos.app.goo.gl/uw6aRmAurGVjafrt8"
            target="_blank"
            rel="noopener noreferrer"
          >
            See all photos
          </a> */}
        </div>
      </div>
    );
  }
}
