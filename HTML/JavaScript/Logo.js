
// Logo 요소 가져오기
var logo = document.getElementById('Logo');

// Icon 요소 가져오기
var icon = document.getElementById('hvr-icon-forward');

var icon2 = document.getElementById('hvr-icon');

// Logo에 마우스가 진입했을 때
logo.addEventListener('mouseenter', function() {
    logo.style.transitionDelay= '0s';
    logo.style.opacity = '0';

    icon.style.transitionDelay= '0.3s';
    icon.style.opacity = '1';
    
    icon2.style.transition = '0.3s';
    icon2.style.transitionDelay= '0.6s';
    icon2.style.transform = 'translate(30%, 0%)';
});

// Logo에서 마우스가 빠져나갔을 때
logo.addEventListener('mouseleave', function() {
    logo.style.transitionDelay= '0.3s';
    logo.style.opacity = '1';

    icon.style.transitionDelay= '0s';
    icon.style.opacity = '0';

    icon2.style.transition = '0s';
    icon2.style.transitionDelay= '0.4s';
    icon2.style.transform = 'translate(0%, 0%)';
});