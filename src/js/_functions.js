// Подключение свайпера gsap micromodal
import {
  gsap,
  Power2
} from 'gsap';
import Swiper, {
  Navigation,
  Pagination,
  Parallax,
  Mousewheel,
  Controller,
  Scrollbar
} from 'swiper';
import MicroModal from 'micromodal';

Swiper.use([Navigation, Pagination, Parallax, Mousewheel, Controller, Scrollbar]);

const swiperImg = new Swiper('.slider-img', {
  loop: false,
  speed: 2400,
  parallax: true,
  pagination: {
    el: '.slider__pagination-count .total',
    type: 'custom',
    renderCustom: function (swiper, current, total) {
      let totalRes = total >= 10 ? total : `0${total}`
      return totalRes
    }
  },
});

const swiperText = new Swiper('.slider-text', {
  loop: false,
  speed: 2400,
  mousewheel: {
    invert: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next'
  }
});

swiperImg.controller.control = swiperText;
swiperText.controller.control = swiperImg;


let gear = document.querySelector('.slider__gear');

swiperText.on('slideNextTransitionStart', function () {
  gsap.to(gear, 2.8, {
    rotation: '+=40',
    ease: Power2.easeOut
  })
});

swiperText.on('slidePrevTransitionStart', function () {
  gsap.to(gear, 2.8, {
    rotation: '-=40',
    ease: Power2.easeOut
  })
});


// Slide Change

let currentNum = document.querySelector('.slider__pagination-count .current'),
  paginationCurrent = document.querySelector('.slider__pagination-current-num');

swiperText.on('slideChange', function () {
  let index = swiperText.realIndex + 1,
      indexRes = index >= 10 ? index : `0${index}`


  gsap.to(currentNum, 0.2, {
    force3D: true,
    y: -10,
    opacity: 0,
    ease: Power2.easeOut,
    onComplete: function () {
      gsap.to(currentNum, 0.1, {
        force3D: true,
        y: 10
      })
      currentNum.innerHTML = indexRes
      paginationCurrent.innerHTML = indexRes
    }
  })

  gsap.to(currentNum, 0.2, {
    force3D: true,
    y: 0,
    opacity: 1,
    ease: Power2.easeOut,
    delay: 0.3,
  })
});


// Micromodal

MicroModal.init({
  openTrigger: 'data-micromodal-open',
  closeTrigger: 'data-micromodal-close',
  disableFocus: true,
  disableScroll: true,
  awaitOpenAnimation: true,
  awaitCloseAnimation: true,
})
