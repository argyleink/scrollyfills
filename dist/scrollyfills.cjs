var e=new Event("scrollend");exports.scrollend=function(n){n.addEventListener("scroll",function(){clearTimeout(n.scrollEndTimer),n.scrollEndTimer=setTimeout(function(){n.dispatchEvent(e)},100)})};
//# sourceMappingURL=scrollyfills.cjs.map
