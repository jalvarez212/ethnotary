"use strict";var KTAppShop=function(){var e,t,n,i,o,a=function(){n.addEventListener("click",(function(n){n.preventDefault(),KTUtil.removeClass(t,"d-none"),KTUtil.addClass(i,"d-none"),e.scrollTop=0,KTUtil.css(t,"animationDuration","0.3s"),KTUtil.animateClass(t,"animate__animated animate__slideInRight")})),o.addEventListener("click",(function(n){n.preventDefault(),KTUtil.removeClass(i,"d-none"),KTUtil.addClass(t,"d-none"),e.scrollTop=0,KTUtil.css(i,"animationDuration","0.3s"),KTUtil.animateClass(i,"animate__animated animate__slideInLeft")}))};return{init:function(){var r;e=document.querySelector("#kt_sidebar"),t=document.querySelector("#kt_sidebar_shop_new_form"),n=document.querySelector("#kt_sidebar_shop_new_form_btn"),i=document.querySelector("#kt_sidebar_shop_filter_form"),o=document.querySelector("#kt_sidebar_shop_filter_form_btn"),void 0!==(r=document.querySelector("#kt_price_slider"))&&r&&noUiSlider.create(r,{start:[20,60],connect:!0,range:{min:0,max:100}}),a()}}}();KTUtil.onDOMContentLoaded((function(){KTAppShop.init()}));