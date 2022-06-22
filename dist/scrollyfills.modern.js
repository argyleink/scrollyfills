const e="onscrollend"in window,n=new Event("scrollend"),l=l=>{e||l.addEventListener("scroll",()=>{clearTimeout(l.scrollEndTimer),l.scrollEndTimer=setTimeout(()=>{l.dispatchEvent(n)},100)})};export{l as scrollend};
//# sourceMappingURL=scrollyfills.modern.js.map
