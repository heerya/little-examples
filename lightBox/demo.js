var oLi = document.getElementsByTagName('li');
var shadow = document.getElementsByClassName('shadow')[0];
var show = document.getElementsByClassName('show')[0];
var showPic = document.getElementsByClassName('showPic')[0];
var btnPrev = document.getElementsByClassName('btn-prev')[0];
var btnNext = document.getElementsByClassName('btn-next')[0];
var close = document.getElementsByClassName('btn-close')[0];

var n;
bindEvent();
function bindEvent() {
    // 小图变大图
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].index = i;
        oLi[i].onclick = function () {
            n = this.index;
            showImg(n);
        }
    };
    // 点击btn
    btnPrev.onclick = function () {
        if (n <= 0) {
            n = oLi.length - 1;
        } else {
            n -= 1;
        }
        showImg(n);
    };
    btnNext.onclick = function () {
        if (n >= oLi.length - 1) {
            n = 0;
        } else {
            n += 1;
        }
        showImg(n);
    };
    close.onclick = function () {
        shadow.style.display = 'none';
        show.style.display = 'none';
    }
}
function showImg(index) {
    shadow.style.display = 'block';
    show.style.display = 'block';
    var src = oLi[index].children[0].getAttribute('src');
    showPic.setAttribute('src', src);
}
