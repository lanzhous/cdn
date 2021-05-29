let onDebug = function () {
    window.location.href = 'https://www.dongmanmiao.cn/';
    document.write('<b style="color:red;">检测到非法调试！请停止调试后刷新本页面！</b>');
};
setInterval(function () {
    let st, et;
    st = new Date().getTime();
    debugger;
    et = new Date().getTime();
    if ((et - st) > 1000) {
        onDebug();
    }
}, 1000);
document.onkeydown = document.onkeyup = document.onkeypress = function (event) {
    const e = event || window.event || arguments.callee.caller.arguments[0];

    if (e && e.keyCode == 123) {
        onDebug();
    }
};
let div = document.createElement('div');
Object.defineProperty(div, "id", {
    get: () => {
        clearInterval(loop);
        onDebug();
    }
});
let loop = setInterval(() => {
    console.log(div);
    console.clear();
});
$(function () {
    var isMobile = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
    var webdata = {
        set: function (key, val) {
            window.sessionStorage.setItem(key, val)
        },
        get: function (key) {
            return window.sessionStorage.getItem(key)
        },
        del: function (key) {
            window.sessionStorage.removeItem(key)
        },
        clear: function (key) {
            window.sessionStorage.clear()
        }
    };
    let cAT = '0105',
        AT = 'fav',
        aAT = 'now.com',
        bAT = '!',
        val = vToken;
    let cookieTime = webdata.get(cookies);
    if (!cookieTime || cookieTime == undefined) {
        cookieTime = 0;
    }
    let video = authCrypt.decode(val, AT + aAT + bAT + cAT);
    let dp = new DPlayer({
        container: document.getElementById('dplayer'),
        screenshot: true,
        autoplay: true,
        //theme: '#FF6F00',
        video: {
            url: video,
            pic: poster,
            type: 'auto',
        },
        contextmenu: [
            {
                text: '动漫喵',
                click: (player) => {
                    dp.notice('花3秒记住我们网址：www.dongmanmiao.cn', 6000);
                }
            }, {
                text: '画中画',
                click: (player) => {
                    player.video.requestPictureInPicture();
                }
            }
        ]
    });
    dp.on('loadeddata',function() {
        if (cookieTime > 0) {
           dp.seek(cookieTime); 
        }
    });
    dp.on('canplay', function () {
        let status = dp.video.paused;
        let pause_msg = status ? '【动漫喵】点击播放器，开启播放' : '花3秒记住我们网址：www.dongmanmiao.cn';
        if(status){// 只有暂停时才会显示
            dp.notice(pause_msg, 3000);
        }
    });
    dp.on('ended', function () {
        webdata.del(cookies);
        dp.notice('视频播放已结束，如果喜欢本站请分享给朋友！', 8000);
        if(jump != ''){
            top.location.href = jump;
        }
    });
    dp.on('timeupdate', function () {
        webdata.set(cookies, dp.video.currentTime);
    });
    // dp.on('error', function () {
    //     dp.notice('视频出了点小问题，请【1分钟】后刷新重试！', -1);
    // });
    if (isMobile) {
        //全屏事件
        dp.on('fullscreen', function () {
            screen.orientation.lock("landscape");// 默认横屏
        });
        //退出全屏事件
        dp.on('fullscreen_cancel', function () {
            screen.orientation.unlock();
        });

        //左右滑动快进、后退
        let touchPointX = 0;
        let touchPointY = 0;
        let currentTime = 0;
        let isSeeked = false;
        document.addEventListener('touchstart', e => {
            let touch = e.touches[0];
            touchPointX = touch.clientX; // 获取触摸的初始位置
            touchPointY = touch.clientY;
            currentTime = dp.video.currentTime; // 获得当前播放时间
        });
        document.addEventListener('touchmove', e => {
            let touch = e.touches[0];
            let diffX = touch.clientX - touchPointX; // 通过当前位置与初始位置之差计算改变的距离
            let diffY = touch.clientY - touchPointY;
            let totalTime = dp.video.duration;
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 5) {
                let seekTime = parseInt(currentTime + diffX); // 计算出快进时间
                if (seekTime < 0) {
                    seekTime = 0;
                }
                if (seekTime > totalTime) {
                    seekTime = totalTime;
                }
                dp.seek(seekTime);
                isSeeked = true;
            }
            let notice = document.getElementsByClassName("dplayer-notice");
            if (notice.length > 0) {
                notice[0].style.display = "none";
            }
        });
        document.addEventListener('touchend', e => {
            if (isSeeked) {
                let touch = e.changedTouches[0];
                let diffX = touch.clientX - touchPointX;
                let notice = document.getElementsByClassName("dplayer-notice");
                if (notice.length > 0) {
                    notice[0].style.display = "block";
                }
                dp.notice((diffX > 0 ? "快进" : "快退") + parseInt(Math.abs(diffX)) + "秒", 2000);
            }
            isSeeked = false;
        });
    }
    document.getElementsByClassName("dplayer-full-in-icon")[0].remove(); //暂时移除页面全屏
    let settingIcon = document.getElementsByClassName("dplayer-setting-icon")[0];
    settingIcon.innerHTML = "倍速";
    settingIcon.style.outline = "none";
    settingIcon.style.color = "white";
    settingIcon.style.size = "16px";
    settingIcon.style.padding = "0 5px";
    // var speedIcon = document.getElementsByClassName("dplayer-setting-speed")[0];
    // settingIcon.onclick = function () {
    //     speedIcon.click();
    //     //速度选择框为横向显示
    //     document.getElementsByClassName("dplayer-setting-box-speed")[0].style.width = "300px";
    //     var speendItems = document.getElementsByClassName("dplayer-setting-speed-item");
    //     for (let i = 0; i < speendItems.length; i++) {
    //         speendItems[i].style.display = "inline";
    //     }
    // };
})