/* eslint-disable */

import Vue from "vue"
import { play } from "vue-play"
import Carousel from "../src/Carousel.vue"
import Slide from "../src/Slide.vue"

const containerWidth = "800";
const images = [
  "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
]

const generateSlideImages = (createElement) => images.map((image) =>
  createElement(Slide, {}, [
    createElement(
      "img",
      {
        style: { width: "calc(100% - 30px)"},
        attrs: { src: image, alt: 'my new image' }
      }
    )
  ])
)

const createContainer = (createElement, width, content) => createElement(
  'div',
  {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '40px',
    }
  },
  [
    createElement(
      'div',
      {
        style: {
          width: `${width}px`
        }
      },
      content
    )
  ]
)

play("Carousel", module)
  .add("Default", h => createContainer(
      h, containerWidth, [h(Carousel, { props: {
        perPage: 1,
        navigationArrows: true,
        showPagination: true,
        slideDisabledStyle: true
      } }, generateSlideImages(h))]
    )
  )
  .add("3 With Dots and Nav Arrows", h => createContainer(
    h, containerWidth, [h(Carousel, { props: {
      perPage: 3,
      navigationArrows: true,
      verticallyCenterNavArrows: true,
      showPagination: true
    } }, generateSlideImages(h))]
  )
)
.add("With Thumbs", h => createContainer(
    h, "700", [h(Carousel, { props: {
      perPage: 1,
      paginationEnabled: false,
      showThumbs: true
    } }, generateSlideImages(h))]
  )
)
.add("Dark Mode", h => createContainer(
    h, containerWidth, [h(Carousel, { props: {
      perPage: 3,
      paginationEnabled: false,
      navigationArrows: true,
      verticallyCenterNavArrows: true,
      darkMode: true
    } }, generateSlideImages(h))]
  )
)

.add("Smaller", h => createContainer(
  h, "600", [h(Carousel, { props: {
    perPage: 3,
    paginationEnabled: false,
    navigationArrows: true,
    verticallyCenterNavArrows: true,
    darkMode: true
  } }, generateSlideImages(h))]
)
)
