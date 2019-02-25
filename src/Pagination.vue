<template>
  <div
    class="VueCarousel-pagination"
    v-bind:class="{ [`VueCarousel-pagination--${paginationPositionModifierName}`]: paginationPositionModifierName }"
  >

  <!-- Left nav arrow -->
    <div
      v-if="carousel.navigationArrows"
      aria-label="Previous page"
      :tabindex="canAdvanceBackward ? 0 : -1"
      class="VueCarousel-navigation-prev"
      v-on:click="triggerPageAdvance('backward')"
      v-bind:class="{
        'VueCarousel-center-arrows': carousel.verticallyCenterNavArrows,
        'VueCarousel-navigation-button': !carousel.verticallyCenterNavArrows,
        'VueCarousel-navigation-center-prev': carousel.verticallyCenterNavArrows,
        'VueCarousel-navigation-prev': !carousel.verticallyCenterNavArrows,
      }"
      :style="[
        carousel.darkMode ? { background: 'url(' + leftDark + ')' } : { background: 'url(' + leftArrow + ')' },
        carousel.paginationEnabled ? { top: 'calc(50% - 35px)' } : { top: '50%' }
        ]"
    ></div>

    <!-- Pagination dots -->
    <div
      v-if="carousel.paginationEnabled"
      class="VueCarousel-dot-container"
      role="tablist"
      :style="`margin-top: ${carousel.paginationPadding * 2}px;`"
    >
      <button
        v-for="(page, index) in paginationCount"
        :key="`${page}_${index}`"
        class="VueCarousel-dot"
        aria-hidden="false"
        role="tab"
        :title="getDotTitle(index)"
        :value="getDotTitle(index)"
        :aria-label="getDotTitle(index)"
        :aria-selected="isCurrentDot(index) ? 'true' : 'false'"
        v-bind:class="{ 'VueCarousel-dot--active': isCurrentDot(index) }"
        v-on:click="goToPage(index)"
        :style="`
          margin-${paginationPropertyBasedOnPosition}: ${carousel.paginationPadding * 2}px;
          padding: ${carousel.paginationPadding}px;
          width: ${carousel.paginationSize}px;
          height: ${carousel.paginationSize}px;
          background-color: ${isCurrentDot(index) ? carousel.paginationActiveColor : carousel.paginationColor};
        `"
      ></button>
    </div>

    <!-- Thumbnails -->
    <div
      class="VueCarousel-thumbs-container"
      v-if="carousel.showThumbs"
    >
      <img
        v-for="(image, index) in thumbNails"
        :key="index"
        v-on:click="goToPage(index)"
        class="VueCarousel-image"
        :src="image.src"
        :alt="image.alt">
    </div>

    <!-- Right nav arrow -->
    <div
      v-if="carousel.navigationArrows"
      aria-label="Next page"
      :tabindex="canAdvanceForward ? 0 : -1"
      class="VueCarousel-navigation-next"
      v-on:click.prevent="triggerPageAdvance()"
      v-bind:class="{
        'VueCarousel-center-arrows': carousel.verticallyCenterNavArrows,
        'VueCarousel-navigation-center-next': carousel.verticallyCenterNavArrows,
        'VueCarousel-navigation-next': !carousel.verticallyCenterNavArrows,
        'VueCarousel-navigation-button': !carousel.verticallyCenterNavArrows
      }"
      :style="[
        carousel.darkMode ? { background: 'url(' + rightDark + ')' } : { background: 'url(' + rightArrow + ')' },
        carousel.paginationEnabled ? { top: 'calc(50% - 35px)' } : { top: '50%' }
      ]"
    ></div>
  </div>
</template>

<script>
import rightDark from './arrow-right-dark.svg';
import rightArrow from './arrow-right.svg';
import leftDark from './arrow-left-dark.svg';
import leftArrow from './arrow-left.svg';

export default {
  name: "pagination",
  inject: ["carousel"],
  data() {
    return {
      thumbNails: [],
      rightDark: rightDark,
      rightArrow: rightArrow,
      leftDark: leftDark,
      leftArrow: leftArrow
    }
  },
  computed: {
    paginationPositionModifierName() {
      const { paginationPosition } = this.carousel;
      // guard to add only required class modifiers
      if (paginationPosition.indexOf("overlay") < 0) return;
      return paginationPosition;
    },
    paginationPropertyBasedOnPosition() {
      return this.carousel.paginationPosition.indexOf("top") >= 0
        ? "bottom"
        : "top";
    },
    paginationCount() {
      return this.carousel && this.carousel.scrollPerPage
        ? this.carousel.pageCount
        : this.carousel.slideCount && this.carousel.currentPerPage
          ? this.carousel.slideCount - this.carousel.currentPerPage + 1
          : 0;
    },
    /**
     * @return {Boolean} Can the slider move forward?
     */
    canAdvanceForward() {
      return this.carousel.canAdvanceForward || false;
    },
    /**
     * @return {Boolean} Can the slider move backward?
     */
    canAdvanceBackward() {
      return this.carousel.canAdvanceBackward || false;
    }
  },
  mounted() {
    this.thumbNails = document.getElementsByTagName('img')
  },
  methods: {
    /**
     * Change page by index
     * @param {number} index
     * return {void}
     */
    goToPage(index) {
      /**
       * @event paginationclick
       * @type {number}
       */
      this.$emit("paginationclick", index);
    },
    /**
     * Check on current dot
     * @param {number} index - dot index
     * @return {boolean}
     */
    isCurrentDot(index) {
      return index === this.carousel.currentPage;
    },

    /**
     * Generate dot title
     * @param {number} index - dot index
     * @return {string}
     */
    getDotTitle(index) {
      return this.carousel.$children[index].title
        ? this.carousel.$children[index].title
        : `Item ${index}`;
    },
    /**
     * Trigger page change on +/- 1 depending on the direction
     * @param {"backward"} [direction]
     * @return {void}
     */
    triggerPageAdvance(direction) {
      /**
       * @event paginationclick
       * @type {string}
       */
      this.$emit("navigationclick", direction);
    }
  }
};
</script>

<style scoped>
.VueCarousel-pagination {
  width: 100%;
  text-align: center;
}

.VueCarousel-pagination--top-overlay {
  position: absolute;
  top: 0;
}

.VueCarousel-pagination--bottom-overlay {
  position: absolute;
  bottom: 0;
}

.VueCarousel-dot-container {
  display: inline-block;
  margin: 0 auto;
  padding: 0;
}

.VueCarousel-dot {
  display: inline-block;
  cursor: pointer;
  appearance: none;
  border: none;
  background-clip: content-box;
  box-sizing: content-box;
  padding: 0;
  border-radius: 100%;
  outline: none;
}

.VueCarousel-dot:focus {
  outline: none;
}

.VueCarousel-navigation-button {
  display: inline-block;
  box-sizing: border-box;
  margin-bottom: -15px;
  user-select: none;
  background-color: transparent;
  cursor: pointer;
}

.VueCarousel-navigation-button:focus {
  outline: none;
}

.VueCarousel-navigation-next {
  height: 40px;
  width: 40px;
  margin-left: 20px;
}

.VueCarousel-navigation-prev {
  height: 40px;
  width: 40px;
  margin-right: 20px;
}

.VueCarousel-center-arrows {
  position: absolute;
  transform: translate(-50%, 0);
  box-sizing: border-box;
  user-select: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.VueCarousel-center-arrows:focus {
  outline: none;
}

.VueCarousel-navigation-center-next {
  right: -25px;
  height: 40px;
  width: 40px;
  transform: translateY(-50%) translateX(100%);
  font-family: "system";
}

.VueCarousel-navigation-center-prev {
  left: -25px;
  height: 40px;
  width: 40px;
  transform: translateY(-50%) translateX(-100%);
  font-family: "system";
}

.VueCarousel-thumbs-container {
  width: 100%;
  margin-top: 20px;
  text-align: left;
}

.VueCarousel-image {
  cursor: pointer;
  max-width: 80px;
  margin: 0 10px;
}

</style>
