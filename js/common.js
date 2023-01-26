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
    Findow this year
********** ********** ********** ********** */
const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear()