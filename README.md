# vue-Carousel-Presets

This is an updated version of the popular carousel package Vue-carousel.
## Installation

``` bash
npm install vue-carousel-preset
```

or if you prefer yarn

``` bash
yarn add vue-carousel-preset
```

## Usage

### Global

installing vue-carousel-preset globally:

``` js
import Vue from 'vue';
import VueCarousel from 'vue-carousel-preset';

Vue.use(VueCarousel);
```
This will make **&lt;carousel&gt;** and **&lt;slide&gt;** available to all components within your Vue app.

### Local

Include the carousel directly into your component using import:

``` js
import { Carousel, Slide } from 'vue-carousel-preset';

export default {
  ...
  components: {
    Carousel,
    Slide
  }
  ...
};
```

### Configuration
| Property                    | Type    | Default | Description                                                                                                                                                                                                                                                                           |
|:----------------------------|:--------|:--------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| adjustableHeight            | Boolean | false   | Adjust the height of the carousel for the current slide. |

| adjustableHeightEasing      | String  |         | Slide transition easing for adjustableHeight. Any valid CSS transition easing accepted. |

| autoplay                    | Boolean | false   | Flag to enable autoplay.                    |

| autoplayDirection           | String  | forward | Sets the autoplay direction for the carousel during autoplay. By default it is forward ut can also be set to backward. If an incorrect string is supplied it will default to forward. |
| navigationArrows            | Boolean | false   | Show navigation arrows.                     |
| verticallyCenterNavArrows   | Boolean | false   | Show navigation arrows on the right and left of the carousel slides.     |
| slideDisabledStyle          | Boolean | false   | adds opacity on non disabled slides and removes overflow hidden. |
| showThumbs                  | Boolean | false   | Show Thumbnails underneath slides.           |
| darkMode                    | Boolean | false   | Uses gray arrow svgs for the navigation arrows |
| autoplayHoverPause          | Boolean | true    | Flag to pause autoplay on hover.  |
| autoplayTimeout             | Number  | 2000    | Time elapsed before advancing slide in autoplay.                                                                                                                                                                                                                                      |
| centerMode                  | Boolean | false   | Center images when the size is less than the container width.                                                                                                                                                                                                                         |
| easing                      | String  | ease    | Slide transition easing. Any valid CSS transition easing accepted.                                                                                                                                                                                                                    |
| loop                        | Boolean | false   | Flag to make the carousel loop around when it reaches the end.                                                                                                                                                                                                                        |
| minSwipeDistance            | Number  | 8       | Minimum distance for the swipe to trigger a slide advance.                                                                                                                                                                                                                            |
| mouseDrag                   | Boolean | true    | Flag to toggle mouse dragging.                                                                                                                                                                                                                                                        |
| navigateTo                  | Number  | 0       | Listen for an external navigation request using this prop.                                                                                                                                                                                                                            |
| navigationClickTargetSize   | Number  | 8       | Amount of padding to apply around the label in pixels.                                                                                                                                                                                                                                |
| navigationNextLabel         | String  | ▶       | Text content of the navigation next button.                                                                                                                                                                                                                                           |
| navigationPrevLabel         | String  | ◀       | Text content of the navigation prev button.                                                                                                                                                                                                                                           |
| paginationActiveColor       | String  | #000000 | The fill color of the active pagination dot. Any valid CSS color is accepted.                                                                                                                                                                                                         |
| paginationColor             | String  | #efefef | The fill color of pagination dots. Any valid CSS color is accepted.                                                                                                                                                                                                                   |
| paginationPosition          | String  | bottom  | The position of pagination dots. Possible values are `bottom`, `bottom-overlay`, `top` and `top-overlay`. The overlay values place the pagination component over the images.                                                                                                          |
| paginationEnabled           | Boolean | true    | Flag to render pagination component.                                                                                                                                                                                                                                                  |
| paginationPadding           | Number  | 10      | The padding inside each pagination dot. Pixel values are accepted.                                                                                                                                                                                                                    |
| paginationSize              | Number  | 10      | The size of each pagination dot. Pixel values are accepted.                                                                                                                                                                                                                           |
| perPage                     | Number  | 2       | Maximum number of slides displayed on each page.                                                                                                                                                                                                                                      |
| resistanceCoef              | Number  | 20      | Resistance coefficient to dragging on the edge of the carousel. This dictates the effect of the pull as you move towards the boundaries.                                                                                                                                              |
| scrollPerPage               | Boolean | true    | Scroll per page, not per item.                                                                                                                                                                                                                                                        |
| spacePadding                | Number  | 0       | Stage padding option adds left and right padding style (in pixels) onto VueCarousel-inner.                                                                                                                                                                                            |
| spacePaddingMaxOffsetFactor | Number  | 0       | Specify by how much should the space padding value be multiplied of, to re-arange the final slide padding.                                                                                                                                                                            |
| speed                       | Number  | 500     | Slide transition speed. Number of milliseconds accepted.                                                                                                                                                                                                                              |
| tagName                     | String  | slide   | Name (tag) of slide component. Overwrite with coponent name when extending slide component.                                                                                                                                                                                           |
| value                       | Number  |         | Support for v-model functionality. Setting this value will change the current page to the number inputted (if between 0 and pageCount).                                                                                                                                               |


### Events
| Event                     | Type    | Emitter  | Description                                                                                                                                                                                                                                                                         |
|:--------------------------|:--------|:---------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| pageChange                | Number  | Carousel | "pageChange" event emits the value of the current page                                                                                                                                                                                                                                |
| slideclick                | Object  | Slide    | "slideclick" event throws the *dataset* object of the selected element                                                                                                                                                                                                                |
| transitionEnd             |         | Carousel | "transitionEnd" event is thrown when the transition end is reached                                                                                                                                                                                                                    |

### HTML Structure

Once the **Carousel** and **Slide** components are installed globally or imported, they can be used in templates in the following manner:

``` vue
  <carousel :per-page="1" :navigate-to="someLocalProperty" :mouse-drag="false">
    <slide>
      Slide 1 Content
    </slide>
    <slide>
      Slide 2 Content
    </slide>
  </carousel>
```

To listen for the 'slideclick' event you can do the following:

``` vue
  <carousel>
    <slide
        data-index="0"
        data-name="MySlideName"
        @slideclick="handleSlideClick">
      Slide 1 Content
    </slide>
    ...
  </carousel>
```

``` js
  handleSlideClick (dataset) => {
    console.log(dataset.index, dataset.name)
  }
```
## Development

A sandboxed dev environment is provided by [vue-play](https://github.com/vue-play/vue-play). Changes made to the component files will appear in real time in the sandbox.

To begin development, run:

``` bash
yarn install
yarn dev
```

then navigate to `http://localhost:5000`

To modify and add sandbox scenarios, edit `play/index.js`

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
