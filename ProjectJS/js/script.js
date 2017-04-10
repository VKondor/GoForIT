function scrollToId(id) {
    var elemScrollTop = document.getElementById(id).getBoundingClientRect().top;

    if (elemScrollTop == 0) {
        return;
    }

    var scrollStep = 50;
    var lastScroll = false;
    var scrollValue = (elemScrollTop > 0) ? scrollStep: -scrollStep;

    if (Math.abs(elemScrollTop) <= scrollStep) {
        scrollValue = elemScrollTop;
        lastScroll = true;
    }

    window.scrollBy(0, scrollValue);

    if (!lastScroll) {
        setTimeout(scrollToId, 10, id);
    }
    return;
}

function navLinksClickHandler(event) {
    var link = event.target.closest("a");

    if (link === null) {
        return;
    }

    var href = link.getAttribute('href');

    if (href === null) {
        return;
    }

    if (href.search(/#/) !== 0) {
        return;
    }
    event.preventDefault();

    var anchorId = href.split('#')[1];

    scrollToId(anchorId);

    if (link.matches('.wrapper_menu ul li a')) {
        var navlinks = document.querySelectorAll('.wrapper_menu a');

        for (var i = 0; i < navlinks.length; i++) {
            if (navlinks[i].classList.contains('menu_active')) {
                navlinks[i].classList.remove('menu_active');
            }
        }
        link.classList.add('menu_active');
    }
}


function sliderNormalizeWidth(ul) {
    var slides = ul.querySelectorAll('li');

    ul.style.width = slides.length * 100 + '%';

    for(var i = 0; i < slides.length; i++) {
        slides[i].style.width = (100 / slides.length) + '%';
    }
}

function shiftSlide(ul, shiftWidth, direction, tempSlide, finalLeft) {
    var shiftStep = 20;
    var lastShift = false;
    var shiftVal;

    if (shiftWidth < shiftStep) {
        shiftVal = shiftWidth;
        lastShift = true;
    }
    else {
        shiftVal = shiftStep;
    }

    if(direction == 'right') {
        shiftVal = -shiftVal;
    }
    ul.style.left = (parseInt(ul.style.left) + shiftVal) + 'px';

    if (lastShift) {
        if (tempSlide) {
            tempSlide.remove();
            sliderNormalizeWidth(ul);
        }
        if (finalLeft) {
            ul.style.left = finalLeft;
        }
        document.querySelector('#home .slider').addEventListener('click', homeSliderClickHandler);
    }
    else {
        setTimeout(shiftSlide, 20, ul, shiftWidth - shiftStep, direction, tempSlide, finalLeft);
    }
}

function homeSliderChange(ul, direction) {
    var slideWidth = ul.querySelector("li").clientWidth;

    if (ul.style.left === '') {
        ul.style.left = '0px';
    }

    var slides = ul.querySelectorAll('li');
    var currSlideIndex = -Math.round(parseInt(ul.style.left) / slideWidth);

    if (direction == 'right' && slides[currSlideIndex].nextElementSibling === null) {
        var tempSlide = ul.appendChild(ul.firstElementChild.cloneNode(true));

        sliderNormalizeWidth(ul);
        shiftSlide(ul, slideWidth, direction, tempSlide, '0px');
        return;
    }

    if(direction == 'left' && slides[currSlideIndex].previousElementSibling === null) {
        var tempSlide = ul.insertBefore(ul.lastElementChild.cloneNode(true), ul.firstElementChild);

        sliderNormalizeWidth(ul);
        ul.style.left = -slideWidth + 'px';

        var finalLeftOffset = -(slides.length - 1) * slideWidth + 'px';

        shiftSlide(ul, slideWidth, direction, tempSlide, finalLeftOffset);
        return;
    }
    shiftSlide(ul, slideWidth, direction);
}

function homeBgChange(direction) {
    var arrImages = ['url("img/bg1.jpg")', 'url("img/bg2.jpg")', 'url("img/bg3.jpg")'];
    var homeBg = document.querySelector('.header_bg');
    var currBg = homeBg.style.backgroundImage;

    if (currBg === '') {
        currBg = arrImages[0];
    }

    var currIndex = arrImages.indexOf(currBg);

    if(currIndex == -1) {
        alert('Error!');
    }

    var nextIndex = 0;

    if (direction == 'next') {
        if (currIndex != arrImages.length - 1) {
            nextIndex = currIndex + 1;
        }
    }

    if (direction == 'prev') {
        nextIndex = currIndex - 1;
        if (nextIndex == -1) {
            nextIndex = arrImages.length - 1;
        }
    }
    homeBg.style.backgroundImage = arrImages[nextIndex];
}

function homeSliderClickHandler(event) {
    var ul = document.querySelector(".slider .slider_content ul");

    if (event.target.classList.contains('slider_btn_prev') || event.target.classList.contains('slider_btn_next')) {
        clearInterval(window.homeSliderAutoTimer);
        clearTimeout(window.homeSliderBusyTimer);
        homeSliderAutoOn();
    }
    document.querySelector('#home .slider').removeEventListener('click', homeSliderClickHandler);

    if (event.target.classList.contains('slider_btn_prev')) {
        homeSliderChange(ul, 'left');
        homeBgChange('prev');
    }

    if (event.target.classList.contains('slider_btn_next')) {
        homeSliderChange(ul, 'right');
        homeBgChange('next');
    }
}

function homeSliderAutoChange() {
    window.homeSliderAutoTimer = setInterval(function() {
        var ul = document.querySelector(".slider .slider_content ul");

        document.querySelector('#home .slider').removeEventListener('click', homeSliderClickHandler);
        homeSliderChange(ul, 'right');
        homeBgChange('next');
    }, 3000);
}

function homeSliderAutoOn() {
    window.homeSliderBusyTimer = setTimeout(function() {
        homeSliderAutoChange();
    }, 5000);
}


function iconZoomIn(elem) {
    var zoomStep = 1;

    if (elem.style.padding === '') {
        currPadding = 30;
    }
    else {
        var currPadding = parseInt(elem.style.padding);
    }

    if (currPadding <= 28) {
        return;
    }
    elem.style.padding = (currPadding - zoomStep) + '%';
    setTimeout(iconZoomIn, 100, elem);
}

function iconZoomOut(elem) {
    var zoomStep = 1;
    var currPadding = parseInt(elem.style.padding);

    if (currPadding >= 30) {
        return;
    }
    elem.style.padding = (currPadding + zoomStep) + '%';
    setTimeout(iconZoomOut, 150, elem);
}

function iconMouseOverHandler(event) {
    var target = event.target;

    if (target.dataset.zoom != 'true') {
        return;
    }
    iconZoomIn(target.parentNode);
}

function iconMouseOutHandler(event) {
    var target = event.target;
    if (target.dataset.zoom != 'true') {
        return;
    }
    iconZoomOut(target.parentNode);
}

function clientsSliderNext() {
    var ul = document.querySelector('.clients_slider ul');

    ul.appendChild(ul.firstElementChild.cloneNode(true));
    ul.style.transition = '1s';
    ul.style.marginLeft = '-' + window.getComputedStyle(ul.firstElementChild).width;

    setTimeout(function() {
        var ul = document.querySelector('.clients_slider ul');
        ul.firstElementChild.remove();
        ul.style.transition = '';
        ul.style.marginLeft = '0px';
    }, 1000);
}

function clientsReviewSliderHandler(event) {
    var target = event.target;

    if (target.tagName != 'LI') {
        return;
    }

    if (target.classList.contains('marker_active')) {
        return;
    }

    var markerUl = target.parentNode;
    var markers = markerUl.querySelectorAll('li');
    var markerSelIndex = [].indexOf.call(markers, target);
    var sliderUl = document.querySelector(".review_slider ul");
    var slideWidth = parseInt(window.getComputedStyle(sliderUl.firstElementChild).width);

    sliderUl.style.marginLeft = -slideWidth * markerSelIndex + 'px';

    for (var i = 0; i < markers.length; i++) {
        if (markers[i].classList.contains('marker_active')) {
            markers[i].classList.remove('marker_active');
        }
    }
    markers[markerSelIndex].classList.add('marker_active');
}

function checkInput(name, reg, textError) {
    var currInput = document.getElementsByName(name)[0];

    if (reg.test(currInput.value) === false) {
        if (currInput.previousElementSibling === null) {
            currInput.parentNode.insertBefore(textError, currInput);
        }
    }
    else {
        if (currInput.previousElementSibling !== null) {
            if (currInput.previousElementSibling.className == 'text-error') {
                currInput.previousElementSibling.remove();
            }
        }
    }
}

function contactFormValidateHandler(event) {
    var target = event.target;
    var textError = document.createElement('span');
    textError.innerHTML = "Invalid text!";
    textError.style.color = 'red';
    textError.style.dislpay = 'inline-block';
    textError.style.textAlign = 'left';
    textError.style.fontWeight = '300';
    textError.style.position = 'absolute';
    textError.style.left = '25px';
    textError.style.top = '-25px';
    textError.className = 'text_error';

    if (target.name == 'name') {
        checkInput(target.name, /^[a-zA-Z]*?$/, textError);
    }

    if (target.name == 'email') {
        checkInput(target.name, /^[a-zA-Z0-9@_]*?$/, textError);
    }

    if (target.name == 'subject') {
        checkInput(target.name, /^[a-zA-Z0-9]*?$/, textError);
    }
}


function portfolioAchievementCountHandler(event) {
    if (document.querySelector('#works .achievement').getBoundingClientRect().top - document.documentElement.clientHeight < 0) {

        if(window.portfolioAchievementCountTimerId !== undefined) {
            return;
        }

        window.portfolioAchievementCountTimerId = setInterval(function () {
            var elems = document.querySelectorAll('.achievement_value');
            var stepCount = 40;

            for (var i = 0; i < elems.length; i++) {
                var currentVal = +elems[i].innerHTML;
                if (currentVal < +elems[i].dataset.value) {
                    elems[i].innerHTML = currentVal + Math.floor(+elems[i].dataset.value / stepCount);
                }
            }
            document.removeEventListener('scroll', portfolioAchievementCountHandler);
        }, 75);

        setTimeout(function() {
            clearInterval(window.portfolioAchievementCountTimerId);

            var elems = document.querySelectorAll('.achievement_value');

            for (var i = 0; i < elems.length; i++) {
                elems[i].innerHTML = +elems[i].dataset.value;
            }
        }, 3000);
        document.removeEventListener('scroll', portfolioAchievementCountHandler);
    }
}


function portfolioImagesFilterHandler(event) {
    var target = event.target;

    if (target.tagName != 'A') {
        return;
    }

    var imagesBlocks = document.querySelectorAll('.portfolio_img > ul > li');
    var filterCategory = target.innerHTML;

    for (var i = 0; i < imagesBlocks.length; i++) {
        if (filterCategory == 'All') {
            imagesBlocks[i].style.display = 'inline-block';
        }
        else {
            if(imagesBlocks[i].dataset.category == filterCategory)
                imagesBlocks[i].style.display = 'inline-block';
            else
                imagesBlocks[i].style.display = 'none';
        }
    }

    var navlinks = document.querySelectorAll('.portfolio_menu a');

    for (var i = 0; i < navlinks.length; i++) {
        if (navlinks[i].classList.contains('menu_active')) {
            navlinks[i].classList.remove('menu_active');
        }
    }
    target.classList.add('menu_active');
}

function teamDescriptionLaunchHandler(event) {
    var link = event.target.closest("a");

    if (link === null) {
        return;
    }

    var linkIndex = [].indexOf.call(document.querySelectorAll('.team_people'), link);

    document.querySelector('.description_people').style.display = 'block';

    var membersDescriptions = document.querySelectorAll('.description_people ul li');

    for (var i = 0; i < membersDescriptions.length; i++) {
        membersDescriptions[i].style.display = 'none';
    }
    membersDescriptions[linkIndex].style.display = 'block';

    var linkBlockCoords = link.getBoundingClientRect();
    var linkBlockCenter = (linkBlockCoords.right + linkBlockCoords.left) * 0.5;
    var arrow = document.querySelector('.people_point');
    arrow.style.left = linkBlockCenter - parseInt(window.getComputedStyle(arrow).width) * 0.5 + 'px';
}

function circleDiagramDraw(canvas, percents) {
    var degrees = 360 * percents * 0.01;
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 6;
    ctx.arc(width/2, height/2, 70, 0, Math.PI*2, false);
    ctx.stroke();

    var radians = degrees * Math.PI / 180;
    ctx.beginPath();
    ctx.strokeStyle = "#ffe600";
    ctx.lineWidth = 6;
    ctx.arc(width/2, height/2, 70, 0 + 90*Math.PI/180, radians + 90*Math.PI/180, false);
    ctx.stroke();

    ctx.fillStyle = "#ffe600";
    ctx.font = "lighter 40px Oswald";
    var text = Math.floor(degrees/360*100) + "%";
    var text_width = ctx.measureText(text).width;
    ctx.fillText(text, width/2 - text_width/2, width/2 + 15);
}


function drawCircleDiagram(elem, currVal) {
    if(currVal < +elem.dataset.percents) {
        circleDiagramDraw(elem.querySelector('canvas'), currVal + 1);
        setTimeout(drawCircleDiagram, 3000 / +elem.dataset.percents, elem, currVal + 1);
    }
}

function aboutSkillCircleDiagramHandler(event) {
    if (document.querySelector('.people_skill').getBoundingClientRect().top - document.documentElement.clientHeight < 0) {
        var skillDiagrams = document.querySelectorAll('.people_skill');

        for (var i = 0; i < skillDiagrams.length; i++) {
            drawCircleDiagram(skillDiagrams[i], 0);
        }
        document.removeEventListener('scroll', aboutSkillCircleDiagramHandler);
    }
}


window.onload = function () {
    homeSliderAutoChange();

    var clientSliderTimerId = setInterval(clientsSliderNext, 3000);

    document.addEventListener('click', navLinksClickHandler);
    document.querySelector('#home .slider').addEventListener('click', homeSliderClickHandler);
    document.querySelector('#services').addEventListener('mouseover', iconMouseOverHandler);
    document.querySelector('#services').addEventListener('mouseout', iconMouseOutHandler);
    document.querySelector('#about').addEventListener('mouseover', iconMouseOverHandler);
    document.querySelector('#about').addEventListener('mouseout', iconMouseOutHandler);
    document.querySelector('#clients .review_marker').addEventListener('click', clientsReviewSliderHandler);
    document.querySelector('#contacts .black_block form').addEventListener('keyup', contactFormValidateHandler);
    document.addEventListener('scroll', portfolioAchievementCountHandler);
    document.querySelector("#works .portfolio_menu").addEventListener('click', portfolioImagesFilterHandler);
    document.querySelector("#about .team").addEventListener('click', teamDescriptionLaunchHandler);
    document.querySelector(".description_people").addEventListener('click', function(event) {
        if (event.target.classList.contains('description_close'))
            document.querySelector('.description_people').style.display = 'none';
    });
    
    var canvasArr = document.querySelectorAll(".people_skill canvas");

    for (var i = 0; i < canvasArr.length; i++)
        circleDiagramDraw(canvasArr[i], 0);

    document.addEventListener('scroll', aboutSkillCircleDiagramHandler);
};



