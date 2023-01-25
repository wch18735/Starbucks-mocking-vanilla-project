/* ********** ********** ********** **********
    focus function on search button 
********** ********** ********** ********** */
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
    // add event listener
    searchInputEl.focus();
})

searchInputEl.addEventListener('focus', function () {
    searchEl.classList.add('focused');                    // html region
    searchInputEl.setAttribute('placeholder', '통합검색');  // css region
});

searchInputEl.addEventListener('blur', function () {
    searchEl.classList.remove('focused');
    searchInputEl.setAttribute('placeholder', '');
});

/* ********** ********** ********** **********
    badges visibility controll with scrollY
********** ********** ********** ********** */

const badgeEl = document.querySelector('header .badges');
window.addEventListener('scroll', _.throttle(function () {
    // _.throttle(function, time): 0.3s 마다 확인하여 부하를 줄임
    console.log(window.scrollY);
    if (window.scrollY > 500) {
        // gsap: javascript animation control library
        // hide badge
        gsap.to(badgeEl, .6, {
            opacity: 0,
            display: 'none'
        })
    } else {
        // show badge
        gsap.to(badgeEl, .6, {
            opacity: 1,
            display: 'block'
        })
    }
}, 300));

const toTopEl = document.querySelector('#to-top')
toTopEl.addEventListener('click', function () {
    // 상단으로 스크롤 버튼을 클릭하면,
    // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동
    gsap.to(window, .7, {
        scrollTo: 0
    })
})

/* ********** ********** ********** **********
    visual section picture fade-in control
********** ********** ********** ********** */

const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * .7,
        opacity: 1
    });
});

/* ********** ********** ********** **********
    swiper: new Swiper(selector, option)
********** ********** ********** ********** */

// notice-line
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay: true,
    loop: true
});

// promotion
new Swiper('.promotion .swiper-container', {
    direction: 'horizontal',
    slidesPerView: 3,            // 한 번에 보여주는 슬라이드 개수
    spaceBetween: 10,           // 슬라이드 사이 여백 (px)
    centeredSlides: true,        // 1번 슬라이드 가운데 보이기
    loop: true,
    autoplay: {
        delay: 5000
    },
    pagination: {
        el: '.promotion .swiper-pagination', // 페이지 요소
        clickable: true, // 사용자의 페이지 번호 요소 제어 가능 여부
    },
    navigation: {
        prevEl: '.promotion .swiper-prev',
        nextEl: '.promotion .swiper-next'
    }
});

// awards
new Swiper('.awards .swiper-container', {
    // direction: 'horizontal', // 수평 슬라이드
    autoplay: true, // 자동 재생 여부
    loop: true, // 반복 재생 여부
    spaceBetween: 30, // 슬라이드 사이 여백
    slidesPerView: 5, // 한 번에 보여줄 슬라이드 개수
    // slidesPerGroup: 5, // 한 번에 슬라이드 할 개수(전체 개수로 나뉘어야 함)
    navigation: { // 슬라이드 이전/다음 버튼 사용 여부
        prevEl: '.awards .swiper-prev', // 이전 버튼 선택자
        nextEl: '.awards .swiper-next' // 다음 버튼 선택자
    }
})

/* ********** ********** ********** **********
    toggle promotion
********** ********** ********** ********** */

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function () {
    isHidePromotion = !isHidePromotion;
    if (isHidePromotion) {
        promotionEl.classList.add('hide');
    } else {
        promotionEl.classList.remove('hide');
    }
})

/* ********** ********** ********** **********
    Floating elements
********** ********** ********** ********** */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 '문자 데이터'를,
    // `parseFloat()`을 통해 소수점을 가지는 '숫자 데이터'로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
// 부유하는(떠 다니는) 요소를 만드는 함수
function floatingObject(selector, delay, size) {
    gsap.to(
        selector, // 선택자
        random(1.5, 2.5), // 애니메이션 동작 시간
        {
            delay: random(0, delay), // 얼마나 늦게 애니메이션을 시작할 것인지 지연 시간을 설정.
            y: size, // `transform: translateY(수치);`와 같음. 수직으로 얼마나 움직일지 설정.
            repeat: -1, // 몇 번 반복하는지를 설정, `-1`은 무한 반복.
            yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생.
            ease: Power1.easeInOut // Easing 함수 적용.
        }
    )
}
floatingObject('.floating1', 1, 15)
floatingObject('.floating2', .5, 15)
floatingObject('.floating3', 1.5, 20)

/* ********** ********** ********** **********
    ScrollMagic
********** ********** ********** ********** */
const spyEls = document.querySelectorAll('section.scroll-spy')  // 관리할 요소들 검색!

spyEls.forEach(function (spyEl) {           // 요소들 반복 처리!
    new ScrollMagic
        .Scene({                                // 감시할 장면(Scene)을 추가
            triggerElement: spyEl,                // 보여짐 여부를 감시할 요소를 지정
            triggerHook: .8                       // viewport 기준 80% 지점에서 보여짐 여부 감시
        })
        .setClassToggle(spyEl, 'show')          // 요소가 화면에 보이면 show 클래스 추가
        .addTo(new ScrollMagic.Controller())    // 컨트롤러에 장면을 할당(필수!)
})

/* ********** ********** ********** **********
    Findow this year
********** ********** ********** ********** */
const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear()