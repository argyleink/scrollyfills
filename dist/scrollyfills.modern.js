const e=new Event("scrollend"),t=t=>{t.addEventListener("scroll",()=>{clearTimeout(t.scrollEndTimer),t.scrollEndTimer=setTimeout(()=>{t.dispatchEvent(e)},100)})};export{t as scrollend};
//# sourceMappingURL=scrollyfills.modern.js.map
