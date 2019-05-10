(function() {
    function MyPhoto(el, dott, wriper, btnl, btnr, worksShow) {
        this.el = el;
        this.dott = dott;
        this.wriper = wriper;
        this.worksShow = worksShow;
        this.btnl = btnl;
        this.btnr = btnr;
        this.timer = null;
        this.timer2 = null;
        this.count = 0;
        this.imgs = ['banner.png', 'banner.png', 'banner.png'];
        this.imgShow = ['pic2.4.png', 'pic2.3.png', 'pic2.6.png', 'pic2.7.png', 'pic2.6.png', 'pic2.7.png', 'pic2.9.png', 'pic3.0.png'];
        this.init();
        this.liW = this.el.children[0].offsetWidth;

    }
    MyPhoto.prototype = {
        init: function() {
            this.initPic();
            this.initDotts();
            this.animation();
            this.autoPlay();
            this.mouseStop();
            this.dottsClick();
            this.goNext();
            this.initWorksShow();
        },
        initPic: function() {
            var str = '';
            for (var i = 0; i < this.imgs.length; i++) {
                str += `  <li class = "sildes"><img src="img/${this.imgs[i]}" alt=""></li>`;
            }
            this.el.innerHTML = str;
        },
        initWorksShow: function() {
            var str = '';
            for (var i = 0; i < this.imgShow.length; i++) {
                str += `  <li class = "sildes"><div class="works-border"><span>Xiao Ru & Grady</span><p>2019.3.31</p></div><img src="img/${this.imgShow[i]}" alt=""></li>`;
            }
            this.worksShow.innerHTML = str;
        },
        initDotts: function() {
            var str = '';
            for (var i = 0; i < this.imgs.length - 1; i++) {
                var cActive = i == 0 ? 'class = "active"' : '';
                str += `<li ${cActive}><a href="javascript:;"></a></li>`;
            }
            this.dott.innerHTML = str;
        },
        animation: function(target) {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                var leader = this.el.offsetLeft;
                var step = (target - leader) / 10;
                if (Math.abs(step) < 1) {
                    step = step > 0 ? 1 : -1;
                }
                leader += step;
                this.el.style.left = leader + 'px';
                if (target == leader) {
                    clearInterval(this.timer);
                }
            }, 17);
        },
        autoPlay: function() {
            this.timer2 = setInterval(() => {
                this.count++;
                if (this.count == this.imgs.length) {
                    this.count = 1;
                    this.el.style.left = 0;
                }
                var target = -1 * this.count * this.liW;
                this.animation(target);
                this.changeDotts(this.count);
            }, 3000);
        },
        changeDotts: function(count) {
            var dots = this.dott.children;
            for (var i = 0; i < dots.length; i++) {
                dots[i].classList.remove('active');
            }
            if (count == dots.length) {
                count = 0;

            }
            dots[count].classList.add('active');

        },
        mouseStop: function() {
            this.wriper.onmouseenter = () => {
                clearInterval(this.timer2);
            }
            this.wriper.onmouseleave = () => {
                this.autoPlay();
            }
        },
        dottsClick: function() {
            var dots = this.dott.children;
            for (var i = 0; i < dots.length; i++) {
                dots[i].onclick = ((a) => {
                    return () => {
                        for (var j = 0; j < dots.length; j++) {
                            dots[j].classList.remove('active');
                            dots[a].classList.add('active');
                        }
                        this.count = a;
                        var target = -1 * this.count * this.liW;
                        this.animation(target);
                    }
                })(i);
            }
        },
        goNext: function(btnl, btnr) {
            this.btnl.onclick = () => {
                this.count--;
                if (this.count < 0) {
                    this.count = this.imgs.length - 1;
                    this.el.style.left = -1 * this.imgs.length * this.liW + 'px';
                }
                var target = -1 * this.count * this.liW;
                this.animation(target);
                this.changeDotts(this.count);
            }
            this.btnr.onclick = () => {
                this.count++;
                if (this.count == this.imgs.length) {
                    this.count = 1;
                    this.el.style.left = 0;
                }
                var target = -1 * this.count * this.liW;
                this.animation(target);
                this.changeDotts(this.count);
            }

        }
    }
    window.MyPhoto = MyPhoto;

})()