const e="onscrollend"in window,n=new Event("scrollend"),t=t=>{e?t.addEventListener("scrollend",()=>{t.dispatchEvent(n)}):t.addEventListener("scroll",()=>{clearTimeout(t.scrollEndTimer),t.scrollEndTimer=setTimeout(()=>{t.dispatchEvent(n)},100)})};export{t as scrollend};
//# sourceMappingURL=scrollyfills.modern.js.map
