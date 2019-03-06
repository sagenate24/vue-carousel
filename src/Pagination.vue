<template>
  <div
    class="VueCarousel-pagination"
    v-bind:class="{ [`VueCarousel-pagination--${paginationPositionModifierName}`]: paginationPositionModifierName }"
    :style="`margin-top: ${carousel.paginationPadding * 2}px; margin: ${!carousel.showThumbs && '0 auto'}; `"
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
      :style="{
      'opacity': carousel.carouselLoading ? 0 : 1,
      'top': carousel.paginationEnabled ? 'calc(50% - 35px)' : '50%',
      'margin-top': !carousel.verticallyCenterNavArrows ? `${carousel.paginationPadding * 2}px` : '0'
      }">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41">
        <circle
          cx="20.5"
          cy="20.5"
          r="20"
          :fill="carousel.darkMode ? '#ccc' : '#fff'"
          :stroke="carousel.darkMode ? '#ccc' : '#888'"
        ></circle>
        <path
          d="M22.22 28.54a1 1 0 0 1-.79-.36l-6.6-7.68 6.6-7.67a1.04 1.04 0 1 1 1.58 1.35l-5.43 6.33 5.43 6.32a1 1 0 0 1-.79 1.72z"
          :fill="carousel.darkMode ? '#fff' : '#888'"
        ></path>
      </svg>
    </div>

    <!-- Pagination dots -->
    <div v-if="carousel.paginationEnabled || carousel.browserWidth < 768 && !carousel.showThumbs " class="VueCarousel-dot-container" role="tablist">
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
      v-if="carousel.showThumbs"
      class="VueCarousel-thumbs-container"
      :style="carousel.thumbContainerStyles">
      <img
        v-for="(image, index) in thumbNails"
        :key="index"
        v-on:click="goToPage(index)"
        class="VueCarousel-thumb-image"
        :class="{ inactive: index !== carousel.currentPage}"
        :style="carousel.thumbImageStyles"
        :src="image.src"
        :alt="image.alt"
      >
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
      :style="{ 'top': carousel.paginationEnabled ? 'calc(50% - 35px)' : '50%' }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41">
        <circle
          cx="20.5"
          cy="20.5"
          r="20"
          :fill="carousel.darkMode ? '#ccc' : '#fff'"
          :stroke="carousel.darkMode ? '#ccc' : '#888'"
        ></circle>
        <path
          d="M18.77 12.45a1 1 0 0 1 .79.37l6.6 7.68-6.6 7.68a1.04 1.04 0 1 1-1.58-1.35l5.43-6.32-5.43-6.33a1.05 1.05 0 0 1 .11-1.47 1.1 1.1 0 0 1 .68-.26z"
          :fill="carousel.darkMode ? '#fff' : '#888'"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>

export default {
  name: "pagination",
  inject: ["carousel"],
  data() {
    return {
      thumbNails: []
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
      let perPage = this.carousel.currentPerPage

      if (this.carousel.browserWidth < 768) {
        return this.carousel.slideCount
      }

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
    this.thumbNails = this.carousel.$children.filter((item) => {
      if (item.$el.classList.contains('VueCarousel-slide')) {
        return true
      }
      return false
    }).map((item) => item.$el.childNodes[0]);

    // this.handleInactiveSlideStyles()
  },
  methods: {
    /**
     * Change page by index
     * @param {number} index
     * return {void}
     */
    goToPage(index) {
      if (index !== this.carousel.currentPage) {
        if (this.carousel.showThumbs) {
          document.querySelector('.VueCarousel-wrapper').classList.add('fade-out-slide')

          setTimeout(() => {
            this.$emit("paginationclick", index);
          }, 250)

          setTimeout(() => {
            document.querySelector('.VueCarousel-wrapper').classList.remove('fade-out-slide');
          }, 500);

        } else {
          this.$emit("paginationclick", index);
        }
      }
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
  display: inline-block;
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
  vertical-align: top;
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
}

.VueCarousel-thumbs-container {
  width: 100%;
  padding: 0;
  margin-left: 0;
  margin-top: 20px;
}

@media only screen and (max-width: 767px) {
  .VueCarousel-center-arrows {
    display: none;
  }

  .VueCarousel-navigation-button {
    display: none;
  }
}

.VueCarousel-thumb-image {
  cursor: default;
  margin: 0 10px;
  transition: opacity 200ms linear;
  transition-delay: 200ms;

}

.inactive {
  opacity: 0.5;
  cursor: pointer;
}
</style>
