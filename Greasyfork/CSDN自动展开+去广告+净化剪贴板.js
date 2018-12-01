// ==UserScript==
// @name         CSDN自动展开+去广告+净化剪贴板
// @namespace    http://tampermonkey.net/
// @version      1.2.4
// @description  自动展开阅读，可以将剪贴板的推广信息去除，去除大多数广告。
// @author       gorgias
// @match        *://blog.csdn.net/*/article/details/*
// @match        *://bbs.csdn.net/topics/*
// @grant        none
// @icon         https://csdnimg.cn/public/favicon.ico
// @run-at       document-end
// ==/UserScript==

// 根据网速自己设置时间间隔
var interval = 3000;
var sideInterval = 4000;
var bbsInterval = 3000; // 在ADBlock之后运行
(function () {
    'use strict';
    var currentURL = window.location.href;
    var blog = /article/;
    var bbs = /topics/;
    //若为CSDN论坛,则：
    if(bbs.test(currentURL)){
        setTimeout(function () {
            $(".js_show_topic").click();
            document.getElementsByClassName("pulllog-box")[0].remove(); // 底部广告
            console.log("removed");
        }, bbsInterval);
    }else if (blog.test(currentURL)){
        if (document.getElementById("btn-readmore")){document.getElementById("btn-readmore").click();} //自动展开
        csdn.copyright.init("", "", ""); //去除剪贴板劫持
        setTimeout(function () {
            document.getElementsByClassName("csdn-tracking-statistics mb8 box-shadow")[0].remove(); //左上广告
            document.getElementById("asideFooter").remove();
            document.getElementById("adContent").remove();
            document.getElementsByClassName("p4course_target")[0].remove();
            document.getElementsByClassName("bdsharebuttonbox")[0].remove();
            document.getElementsByClassName("vip-caise")[0].remove();
        }, interval);
        setTimeout(function () {
            $("div[id^='dmp_ad']")[0].remove();
            document.getElementsByClassName("fourth_column")[0].remove();
        }, sideInterval);
        setTimeout(function () {
            document.getElementsByClassName("pulllog-box")[0].remove(); // 底部广告
            var recommendObj = document.getElementsByClassName("recommend-fixed-box")[0].getElementsByClassName("right-item");
            for (var h = (recommendObj.length - 1); h>=0; h--) {
                if (recommendObj[h].tagName == "DIV") {
                    recommendObj[h].remove();
                }
            }
            document.getElementsByClassName("p4course_target")[0].remove();
        }, sideInterval);
        setTimeout(function () {
            var hot = document.getElementsByClassName("type_hot_word");
            var recommend = document.getElementsByClassName("recommend-ad-box");
            for (var i = (hot.length - 1); i >= 0; i--) {
                hot[i].remove();
            }
            for (var j = (recommend.length - 1); j >= 0; j--) {
                recommend[j].remove();
            }
        }, sideInterval);
    }
})();