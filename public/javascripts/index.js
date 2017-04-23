$(function () {
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        effect: 'coverflow',
        mousewheelControl: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        coverflow: {
            rotate: 30,
            stretch: 10,
            depth: 60,
            modifier: 2,
            slideShadows: true
        },
        onInit: function (swiper) {
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function (swiper) {
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }
    });

    var subSwiper = screen.width <= 600 ? new Swiper('.sub-swiper-container', {
        effect: 'flip',
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
        flip: {
            slideShadows: true,
            limitRotation: true,
        }
    }) : new Swiper('.sub-swiper-container', {
        effect: 'coverflow',
        slidesPerView: 3,
        loop: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
        coverflow: {
            rotate: 30,
            stretch: 10,
            depth: 60,
            modifier: 2,
            slideShadows: true
        },
    });
});