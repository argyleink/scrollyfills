function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function t(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var o=0;return function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}if("undefined"!=typeof window&&!("onscrollend"in window)){var n=function(e,t,n){var r=e[t];e[t]=function(){var e=Array.prototype.slice.apply(arguments,[0]);r.apply(this,e),e.unshift(r),n.apply(this,e)}},r=function(e,t,n,r){if("scroll"==t||"scrollend"==t){var o=this,s=l.get(o);if(void 0===s){var c=0;s={scrollListener:function(e){clearTimeout(c),c=setTimeout(function(){a.size?setTimeout(s.scrollListener,100):(o&&o.dispatchEvent(i),c=0)},100)},listeners:0},e.apply(o,["scroll",s.scrollListener]),l.set(o,s)}s.listeners++}},o=function(e,t,n){if("scroll"==t||"scrollend"==t){var r=this,o=l.get(r);void 0!==o&&(o[t]--,--o.listeners>0||(e.apply(r,["scroll",o.scrollListener]),l.delete(r)))}},i=new Event("scrollend"),a=new Set;document.addEventListener("touchstart",function(e){for(var n,r=t(e.changedTouches);!(n=r()).done;)a.add(n.value.identifier)},{passive:!0}),document.addEventListener("touchend",function(e){for(var n,r=t(e.changedTouches);!(n=r()).done;)a.delete(n.value.identifier)},{passive:!0}),document.addEventListener("touchcancel",function(e){for(var n,r=t(e.changedTouches);!(n=r()).done;)a.delete(n.value.identifier)},{passive:!0});var l=new WeakMap;n(Element.prototype,"addEventListener",r),n(window,"addEventListener",r),n(document,"addEventListener",r),n(Element.prototype,"removeEventListener",o),n(window,"removeEventListener",o),n(document,"removeEventListener",o)}var s={__proto__:null};export{s as scrollend};
//# sourceMappingURL=scrollyfills.module.js.map
