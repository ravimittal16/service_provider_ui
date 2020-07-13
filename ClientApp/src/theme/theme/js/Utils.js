'use strict';

// import storage from './config.dark-mode';

var storage = {
  isDark: false
}
/*-----------------------------------------------
|   Utilities
-----------------------------------------------*/
const utils = (($) => {

  const grays = () => {
    let colors = {
      'white': '#fff',
      '100': '#f9fafd',
      '200': '#edf2f9',
      '300': '#d8e2ef',
      '400': '#b6c1d2',
      '500': '#9da9bb',
      '600': '#748194',
      '700': '#5e6e82',
      '800': '#4d5969',
      '900': '#344050',
      '1000': '#232e3c',
      '1100': '#0b1727',
      'black': '#000',
    };
    if (storage.isDark) {
      colors = {
        'white': '#0e1c2f',
        '100': '#132238',
        '200': '#061325',
        '300': '#344050',
        '400': '#4d5969',
        '500': '#5e6e82',
        '600': '#748194',
        '700': '#9da9bb',
        '800': '#b6c1d2',
        '900': '#d8e2ef',
        '1000': '#edf2f9',
        '1100': '#f9fafd',
        'black': '#fff',
      }
    }
    return colors;
  }

  const themeColors = () => {
    let colors = {
      primary: '#2c7be5',
      secondary: '#748194',
      success: '#00d27a',
      info: '#27bcfd',
      warning: '#f5803e',
      danger: '#e63757',
      light: '#f9fafd',
      dark: '#0b1727'
    }
    if (storage.isDark) {

      colors.light = grays()['100'];
      colors.dark = grays()['1100'];
    }

    return colors;
  }

  const pluginSettings = () => {
    let settings = {
      tinymce: {
        theme: 'oxide',
      },
      chart: {
        borderColor: 'rgba(255, 255, 255, 0.8)',
      }
    };

    if (storage.isDark) {
      settings.tinymce.theme = 'oxide-dark';
      settings.chart.borderColor = themeColors().primary
    }
    return settings;
  }


  const Utils = {
    $window: $(window),
    $document: $(document),
    $html: $('html'),
    $body: $('body'),
    $main: $('main'),
    isRTL() {
      return this.$html.attr('dir') === 'rtl';
    },
    location: window.location,
    nua: navigator.userAgent,
    breakpoints: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
    colors: themeColors(),

    grays: grays(),
    offset(element) {
      const rect = element.getBoundingClientRect();
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
      };
    },
    isScrolledIntoViewJS(element) {
      const windowHeight = window.innerHeight;
      const elemTop = this.offset(element).top;
      const elemHeight = element.offsetHeight;
      const windowScrollTop = window.scrollY;

      return elemTop <= (windowScrollTop + windowHeight) &&
        windowScrollTop <= (elemTop + elemHeight);
    },

    isScrolledIntoView(el) {
      const $el = $(el);
      const windowHeight = this.$window.height();
      const elemTop = $el.offset().top;
      const elemHeight = $el.height();

      const windowScrollTop = this.$window.scrollTop();


      return elemTop <= (windowScrollTop + windowHeight) &&
        windowScrollTop <= (elemTop + elemHeight);
    },
    getCurrentScreanBreakpoint() {
      let currentScrean = '';
      const windowWidth = this.$window.width();
      $.each(this.breakpoints, (index, value) => {
        if (windowWidth >= value) {
          currentScrean = index;
        } else if (windowWidth >= this.breakpoints.xl) {
          currentScrean = 'xl';
        }
      });

      return {
        currentScrean,
        currentBreakpoint: this.breakpoints[currentScrean]
      };
    },
    hexToRgb(hexValue) {
      let hex;
      hexValue.indexOf('#') === 0 ? (hex = hexValue.substring(1)) : (hex = hexValue);
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
        .exec(hex.replace(shorthandRegex, (m, r, g, b) => (r + r + g + g + b + b)));
      return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ] : null;
    },
    rgbColor(color = '#fff') {
      return `rgb(${this.hexToRgb(color)})`;
    },
    rgbaColor(color = '#fff', alpha = 0.5) {
      return `rgba(${this.hexToRgb(color)}, ${alpha})`;
    },
    rgbColors() {
      return Object.keys(this.colors).map(color => this.rgbColor(this.colors[color]));
    },
    rgbaColors() {
      return Object.keys(this.colors).map(color => this.rgbaColor(this.colors[color]));
    },
    settings: pluginSettings(this),
    isIterableArray(array) {
      return Array.isArray(array) && !!array.length;
    },
    setCookie(name, value, expire) {
      const expires = new Date();
      expires.setTime(expires.getTime() + expire);
      document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
    },
    getCookie(name) {
      var keyValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return keyValue ? keyValue[2] : keyValue;
    }
  };
  return Utils;

})(jQuery);


window.utils = utils;
