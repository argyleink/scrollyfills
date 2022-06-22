var n="onscrollend"in window,e=new Event("scrollend"),t=function(t){n?t.addEventListener("scrollend",function(){t.dispatchEvent(e)}):t.addEventListener("scroll",function(){clearTimeout(t.scrollEndTimer),t.scrollEndTimer=setTimeout(function(){t.dispatchEvent(e)},100)})};export{t as scrollend};
//# sourceMappingURL=scrollyfills.module.js.map
