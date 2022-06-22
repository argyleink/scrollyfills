import {StyleParser} from './style-parser.js'
const parser = new StyleParser()

const crawlForUsage = () => {
  const sheetObserver = new MutationObserver((entries) => {
    for (const entry of entries) {
      for (const addedNode of entry.addedNodes) {
        if (addedNode instanceof HTMLStyleElement) {
          handleStyleTag(addedNode);
        }
      }
    }

    // TODO: Proxy element.style similar to how we proxy element.animate.
    // We accomplish this by swapping out Element.prototype.style.
  });

  sheetObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  /**
   * @param {HtmlStyleElement} el style tag to be parsed
   */
  function handleStyleTag(el) {
    // Don’t touch empty style tags.
    if (el.innerHTML.trim().length === 0) {
      return;
    }
    // TODO: Do with one pass for better performance
    let newSrc = parser.transpileStyleSheet(el.innerHTML, true);
    newSrc = parser.transpileStyleSheet(newSrc, false);
    el.innerHTML = newSrc;
  }

  document.querySelectorAll("style").forEach((tag) => handleStyleTag(tag));
}

export const scrollstart = () => {
  crawlForUsage()

  document
    .querySelectorAll('[scroll-start-target]')
    .forEach(setElementAsScrollStart)
}

export const setElementAsScrollStart = element => {
  element.scrollIntoView({
    behavior: 'auto',
  })
}