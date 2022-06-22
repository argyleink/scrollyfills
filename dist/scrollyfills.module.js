var e=new Event("scrollend"),n=function(n){n.addEventListener("scroll",function(){clearTimeout(n.scrollEndTimer),n.scrollEndTimer=setTimeout(function(){n.dispatchEvent(e)},100)})};export{n as scrollend};
//# sourceMappingURL=scrollyfills.module.js.map
