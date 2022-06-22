var n="onscrollend"in window,e=new Event("scrollend");exports.scrollend=function(o){n||o.addEventListener("scroll",function(){clearTimeout(o.scrollEndTimer),o.scrollEndTimer=setTimeout(function(){o.dispatchEvent(e)},100)})};
//# sourceMappingURL=scrollyfills.cjs.map
