export const RegexMatcher = {
  IDENTIFIER: /[\w\\\@_-]+/g,
  WHITE_SPACE: /\s*/g,
  NUMBER: /^[0-9]+/,
  SCROLL_START: /scroll-start\s*:([^;}]+)/,
  SCROLL_START_TARGET: /scroll-start-target\s*:([^;}]+)/,
};

const WHOLE_MATCH_INDEX = 0;

export class StyleParser {
  constructor() {
    this.cssRulesWithScrollStart = [];
  }

  // Inspired by
  // https://drafts.csswg.org/css-syntax/#parser-diagrams
  // https://github.com/flackr/scroll-timeline/blob/master/src/scroll-timeline-css-parser.js
  transpileStyleSheet(sheetSrc, firstPass, srcUrl) {
    // AdhocParser
    const p = {
      sheetSrc: sheetSrc,
      index: 0,
      name: srcUrl,
    };

    while (p.index < p.sheetSrc.length) {
      this.eatWhitespace(p);
      if (p.index >= p.sheetSrc.length) break;
      if (this.lookAhead("/*", p)) {
        while (this.lookAhead("/*", p)) {
          this.eatComment(p);
          this.eatWhitespace(p);
        }
        continue;
      }

      if (this.lookAhead("scroll-start", p)) {
        console.log('scroll-start found')
        // const { scrollTimeline, startIndex, endIndex } = this.parseScrollTimeline(p);
        // if (firstPass) this.scrollTimelineOptions.set(scrollTimeline.name, scrollTimeline);
      } else {
        console.log('no scroll-start found')
        // const rule = this.parseQualifiedRule(p);
        // if (!rule) continue;
        // if (firstPass) {
        //   this.extractAndSaveKeyframeName(rule.selector);
        // } else {
        //   this.handleScrollTimelineProps(rule, p);
        // }
      }
    }

    return p.sheetSrc;
  }

  getScrollStart(scrollStart, target) {
    // Rules are pushed to cssRulesWithScrollStart list in the same order as they appear in style sheet.
    // We are traversing backwards to take the last sample of a rule in a style sheet.
    // TODO: Rule specificity should be taken into account, i.e. don't just take the last
    // rule that matches, instead take the one with the most specifity among those that match
    for (let i = this.cssRulesWithScrollStart.length - 1; i >= 0; i--) {
      const current = this.cssRulesWithScrollStart[i];
      if (target.matches(current.selector)) {
        console.log('match', current)
        // if (!current['animation-name'] || current['animation-name'] == animationName) {
        //   return current['animation-timeline'];
        // }
      }
    }

    return null;
  }

  // parseScrollTimeline(p) {
  //   const startIndex = p.index;
  //   this.assertString(p, "@scroll-timeline");
  //   this.eatWhitespace(p);
  //   let name = this.parseIdentifier(p);
  //   this.eatWhitespace(p);
  //   this.assertString(p, "{"); // eats {
  //   this.eatWhitespace(p);

  //   let scrollTimeline = {
  //     name: name,
  //     source: "auto",
  //     orientation: undefined,
  //     'scroll-offsets': undefined
  //   };

  //   while (this.peek(p) !== "}") {
  //     const property = this.parseIdentifier(p);
  //     this.eatWhitespace(p);
  //     this.assertString(p, ":");
  //     this.eatWhitespace(p);
  //     scrollTimeline[property] = this.removeEnclosingDoubleQuotes(this.eatUntil(";", p));
  //     this.assertString(p, ";");
  //     this.eatWhitespace(p);
  //   }

  //   this.assertString(p, "}");
  //   const endIndex = p.index;
  //   this.eatWhitespace(p);
  //   return {
  //     scrollTimeline,
  //     startIndex,
  //     endIndex,
  //   };
  // }

  saveRelationInList(rule, timelineNames, animationNames) {
    if (animationNames.length == 0) {
      for (let i = 0; i < timelineNames.length; i++) {
        this.cssRulesWithScrollStart.push({
          selector: rule.selector,
          'animation-name': undefined,
          'animation-timeline': timelineNames[i]
        });
      }
    } else {
      for (let i = 0; i < Math.max(timelineNames.length, animationNames.length); i++) {
        this.cssRulesWithScrollStart.push({
          selector: rule.selector,
          'animation-name': animationNames[i % animationNames.length],
          'animation-timeline': timelineNames[i % timelineNames.length]
        });
      }
    }

  }

  findMatchingEntryInContainer(shorthand, container) {
    const matches = shorthand.split(" ").filter(part => container.has(part))
    return matches ? matches[0] : null;
  }


  parseIdentifier(p) {
    RegexMatcher.IDENTIFIER.lastIndex = p.index;
    const match = RegexMatcher.IDENTIFIER.exec(p.sheetSrc);
    if (!match) {
      throw this.parseError(p, "Expected an identifier");
    }
    p.index += match[WHOLE_MATCH_INDEX].length;
    return match[WHOLE_MATCH_INDEX];
  }

  parseQualifiedRule(p) {
    const startIndex = p.index;
    const selector = this.parseSelector(p).trim();
    if (!selector) return;
    const block = this.eatBlock(p);
    const endIndex = p.index;
    return {
      selector,
      block,
      startIndex,
      endIndex,
    };
  }

  removeEnclosingDoubleQuotes(s) {
    let startIndex = s[0] == '"' ? 1 : 0;
    let endIndex = s[s.length - 1] == '"' ? s.length - 1 : s.length;
    return s.substring(startIndex, endIndex);
  }

  assertString(p, s) {
    if (p.sheetSrc.substr(p.index, s.length) != s) {
      throw this.parseError(p, `Did not find expected sequence ${s}`);
    }
    p.index += s.length;
  }

  replacePart(start, end, replacement, p) {
    p.sheetSrc = p.sheetSrc.slice(0, start) + replacement + p.sheetSrc.slice(end);
    // If we are pointing past the end of the affected section, we need to
    // recalculate the string pointer. Pointing to something inside the section
    // that’s being replaced is undefined behavior. Sue me.
    if (p.index >= end) {
      const delta = p.index - end;
      p.index = start + replacement.length + delta;
    }
  }

  eatComment(p) {
    this.assertString(p, "/*");
    this.eatUntil("*/", p);
    this.assertString(p, "*/");
  }

  eatBlock(p) {
    const startIndex = p.index;
    this.assertString(p, "{");
    let level = 1;
    while (level != 0) {
      if (p.sheetSrc[p.index] === "{") {
        level++;
      } else if (p.sheetSrc[p.index] === "}") {
        level--;
      }
      this.advance(p);
    }
    const endIndex = p.index;
    const contents = p.sheetSrc.slice(startIndex, endIndex);

    return { startIndex, endIndex, contents };
  }

  advance(p) {
    p.index++;
    if (p.index > p.sheetSrc.length) {
      throw this.parseError(p, "Advanced beyond the end");
    }
  }

  eatUntil(s, p) {
    const startIndex = p.index;
    while (!this.lookAhead(s, p)) {
      this.advance(p);
    }
    return p.sheetSrc.slice(startIndex, p.index);
  }

  parseSelector(p) {
    let startIndex = p.index;
    this.eatUntil("{", p);
    if (startIndex === p.index) {
      throw Error("Empty selector");
    }

    return p.sheetSrc.slice(startIndex, p.index);
  }

  eatWhitespace(p) {
    // Start matching at the current position in the sheet src
    RegexMatcher.WHITE_SPACE.lastIndex = p.index;
    const match = RegexMatcher.WHITE_SPACE.exec(p.sheetSrc);
    if (match) {
      p.index += match[WHOLE_MATCH_INDEX].length;
    }
  }

  lookAhead(s, p) {
    return p.sheetSrc.substr(p.index, s.length) == s;
  }

  peek(p) {
    return p.sheetSrc[p.index];
  }

  extractMatches(contents, matcher) {
    return matcher.exec(contents)[VALUES_CAPTURE_INDEX].trim().split(",").map(item => item.trim());
  }
}