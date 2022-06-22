var n="onscrollend"in window,e=new Event("scrollend"),o=function(o){n||o.addEventListener("scroll",function(){clearTimeout(o.scrollEndTimer),o.scrollEndTimer=setTimeout(function(){o.dispatchEvent(e)},100)})};export{o as scrollend};
//# sourceMappingURL=scrollyfills.module.js.map
