"use strict";(self.webpackChunkfrom_figma_digital_agency=self.webpackChunkfrom_figma_digital_agency||[]).push([[425],{262:function(e,n,t){t.d(n,{Kv:function(){return a},l_:function(){return s},s2:function(){return i}});var a=function(e){return!e.classList.contains("display--none")},s=function(e){document.body.style.overflowY=e?"auto":"hidden"},i=window.matchMedia("(pointer: coarse)").matches},425:function(e,n,t){t.r(n);var a=t(262),s=document.querySelector(".header-container"),i=document.querySelector(".header-container__nav-container"),r=document.querySelectorAll(".header-container__nav-container .link"),o=document.querySelector(".header-container__svg-button"),c=window.matchMedia("(max-width: 700px)"),d=function(){return(0,a.Kv)(i)},l=function(e,n){e.setAttribute("aria-pressed",n),e.setAttribute("aria-expanded",n);var t=n?"Close":"Open";t+=" the navigation list",e.setAttribute("aria-label",t);var a=n?"#icon-exit":"#icon-menu";e.children[0].children[0].setAttribute("href",a)},u=function(){c.matches&&(s.classList.remove("header-container--menu-opened"),i.classList.add("display--none"),window.pageYOffset>50&&s.classList.add("header-container--lesser"),l(o,!1),(0,a.l_)(!0))},f=function(){c.matches&&d()&&u(),c.matches?(o.classList.remove("display--none"),i.classList.add("display--none")):(o.classList.add("display--none"),i.classList.remove("display--none"))};window.addEventListener("resize",f,{passive:!0}),f(),r.forEach((function(e){e.addEventListener("click",u,{passive:!0})})),o.addEventListener("click",(function(){s.classList.toggle("header-container--menu-opened"),i.classList.toggle("display--none"),s.classList.toggle("header-container--lesser",!d()&&window.pageYOffset>50),l(this,d()),(0,a.l_)(!d())}),{passive:!0}),window.addEventListener("scroll",(function(){var e=window.pageYOffset;s.classList.toggle("header-container--normal",e<=50),s.classList.toggle("header-container--lesser",e>50)}),{passive:!0}),window.pageYOffset>50&&s.classList.add("header-container--lesser")}}]);
//# sourceMappingURL=425.55d12b6d116ca00cead2.js.map