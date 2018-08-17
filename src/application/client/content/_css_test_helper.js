const quixote = require("./vendor/quixote-0.14.0.js");
const assert = require("_assert");

exports.White = "rgb(255, 255, 255)";
exports.OffWhite = "rgb(43, 43, 43)";
exports.OffBlack = "rgb(253, 253, 253)";
exports.Gold = "rgb(205, 173, 0)";
exports.LightGrey = "rgb(167, 167, 167)";

exports.backgroundColor = exports.White;
exports.contactMailColor = exports.Gold;
exports.catchyTextColor = exports.LightGrey;
exports.headerTextColor = exports.OffBlack;
exports.pageBackgroundColor = exports.OffWhite;

exports.IOS_BROWSER_WIDTH = 980;
exports.IPAD_LANDSCAPE_HEIGHT_WITH_BROWSER_TABS = 641;
exports.smallestDeviceWidth = 320;
exports.mediumDeviceWidth = 640;

exports.createFrame = function createFrame(options, callback) {
  return quixote.createFrame(options, callback);
};

exports.getBackgroundColor = function backgroundColor(element) {
  return normalizeColorString(element.getRawStyle("background-color"));
};

exports.fontFamily = function fontFamily(element) {
  let family = element.getRawStyle("font-family");
  family = family.replace(/"/g, "");

  const fonts = family.split(",");
  for (let i = 0; i < fonts.length; i++) {
    fonts[i] = trim(fonts[i]);
  }

  return fonts.join(", ");
};

exports.textAlign = function textAlign(element) {
  return element.getRawStyle("text-align");
};

exports.fontWeight = function fontWeight(element) {
  let weight = element.getRawStyle("font-weight");
  if (weight === "normal") weight = "400";
  return weight.toString();
};

exports.fontSize = function fontSize(element) {
  forceBrowserReflow(element.toDomElement());
  return element.getRawStyle("font-size");
};

exports.fontSizeByDecimalPlaces = function fontSizeByDecimalPlaces(
  element,
  decimalPlaces
) {
  const fontSize = exports.fontSize(element);
  const fontSizeValue = exports.pixelsFloatValue(fontSize);
  return fontSizeValue.toFixed(decimalPlaces) + "px";
};

exports.pixelsFloatValue = function pixelsFloatValue(pixels) {
  const pixelsLessPx = pixels.replace("px", "");
  return Number.parseFloat(pixelsLessPx);
};

exports.textColor = function textColor(element) {
  return normalizeColorString(element.getRawStyle("color"));
};

exports.roundedCorners = function roundedCorners(element) {
  return getCompoundStyle(
    element,
    "border-top-left-radius",
    "border-top-right-radius",
    "border-bottom-left-radius",
    "border-bottom-right-radius"
  );
};

exports.margin = function margin(element) {
  return getCompoundStyle(
    element,
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left"
  );
};

exports.padding = function padding(element) {
  return getCompoundStyle(
    element,
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left"
  );
};

exports.getPaddingWidthValue = function getPaddingWidthValue(body) {
  const leftPadding = body.getRawStyle("padding-left");
  const leftPaddingValue = exports.pixelsFloatValue(leftPadding);
  const rightPadding = body.getRawStyle("padding-right");
  const rightPaddingValue = exports.pixelsFloatValue(rightPadding);
  const paddingWidth = leftPaddingValue + rightPaddingValue;
  return paddingWidth;
};

exports.getPaddingHeightValue = function getPaddingHeightValue(body) {
  const topPadding = body.getRawStyle("padding-top");
  const topPaddingValue = exports.pixelsFloatValue(topPadding);
  const bottomPadding = body.getRawStyle("padding-bottom");
  const bottomPaddingValue = exports.pixelsFloatValue(bottomPadding);
  const paddingHeight = topPaddingValue + bottomPaddingValue;
  return paddingHeight;
};

exports.under = function under(element, relativeToElement) {
  const elementZ = getZIndex(element);
  const relativeZ = getZIndex(relativeToElement);

  if (elementZ === relativeZ) {
    return !isElementAfterElementInDomTree();
  } else {
    return elementZ < relativeZ;
  }

  function getZIndex(element) {
    let z = element.getRawStyle("z-index");
    if (z === "auto") z = 0;
    return z;
  }

  function isElementAfterElementInDomTree() {
    const elementNode = element.toDomElement();
    const relativeNode = relativeToElement.toDomElement();

    let foundRelative = false;
    let elementAfterRelative = false;
    for (
      let child = elementNode.parentNode.firstChild;
      child !== null;
      child = child.nextSibling
    ) {
      if (child === elementNode) {
        if (foundRelative) elementAfterRelative = true;
      }
      if (child === relativeNode) foundRelative = true;
    }
    if (!foundRelative) {
      throw new Error(
        "Can't yet compare elements that have same z-index " +
          "and are not siblings"
      );
    }
    return elementAfterRelative;
  }
};

exports.backgroundImage = function backgroundImage(element) {
  const url = element.getRawStyle("background-image");

  const parsedUrl = stripOffDomain(url);
  if (parsedUrl === null) throw new Error("could not parse URL: " + url);

  return parsedUrl[2];

  function stripOffDomain(url) {
    const parsedUrl = url.match(/^url\("?http:\/\/(.+?)(\/.*?)"?\)$/);
    return parsedUrl;
  }
};

exports.backgroundPosition = function backgroundImage(element) {
  const position = element.getRawStyle("background-position");

  if (position === "" || position === "50%" || position === "50% 50%") {
    return "center";
  } else {
    return position;
  }
};

exports.hasBorder = function hasBorder(element) {
  const top = element.getRawStyle("border-top-style");
  const right = element.getRawStyle("border-right-style");
  const bottom = element.getRawStyle("border-bottom-style");
  const left = element.getRawStyle("border-left-style");
  return !(
    top === "none" &&
    right === "none" &&
    bottom === "none" &&
    left === "none"
  );
};

exports.isTextVerticallyCentered = function isTextVerticallyCentered(element) {
  const elementHeight = Math.round(element.getRawPosition().height);
  return elementHeight + "px" === exports.lineHeight(element);
};

exports.containerIsHorizontallyCentered = function containerIsHorizontallyCentered(
  element
) {
  const left = element.getRawStyle("left");
  const right = element.getRawStyle("right");
  return (
    (left === "auto" && right === "auto") || (left === "0px" && right === "0px")
  );
};

exports.lineHeight = function lineHeight(element) {
  return element.getRawStyle("line-height");
};

exports.dropShadow = function dropShadow(element) {
  const shadow = element.getRawStyle("box-shadow");

  // When there is no drop shadow, most browsers say 'none', but IE 9 gives a
  // color and nothing else. We handle that case here.
  if (shadow === "white") return "none";
  if (isHexString(shadow)) return "none";

  // The standard value seems to be "rgb(r, g, b) Wpx Xpx Ypx Zpx",
  // but IE 9 gives us "Wpx Xpx Ypx Zpx #rrggbb". We need to normalize it.
  // BTW, we don't support multiple shadows yet

  // get everything before the '#' and the r, g, b
  const groups = shadow.match(/^([^#]+) (#......)/);
  if (groups === null) {
    // There was no '#', so we assume we're not on IE 9 and everything's fine
    return shadow;
  }

  return normalizeColorString(groups[2]) + " " + groups[1];

  function isHexString(shadow) {
    shadow.match(/^#[0-9a-f]{6}$/);
  }
};

exports.textIsUnderlined = function textIsUnderlined(element) {
  const style = element.getRawStyle("text-decoration");
  return style.indexOf("none") !== 0;
};

exports.textIsUppercase = function textIsUppercase(element) {
  return element.getRawStyle("text-transform") === "uppercase";
};

exports.opacity = function opacity(element) {
  return element.getRawStyle("opacity");
};

exports.assertHoverStyle = function assertHoverStyle(
  button,
  expectedColor,
  description
) {
  applyClass(button, "_hover_", function() {
    assert.equal(
      exports.backgroundColor(button),
      expectedColor,
      description + " hover state background color"
    );
  });
};

exports.assertActivateDepresses = function assertActivateDepresses(
  button,
  expectedDescriptor,
  description
) {
  applyClass(button, "_active_", function() {
    button.assert(
      {
        top: expectedDescriptor
      },
      description
    );
    assert.equal(exports.dropShadow(button), "none", description);
  });
};

function applyClass(element, className, fn) {
  const domElement = element.toDomElement();
  const oldClassName = domElement.className;
  try {
    domElement.className += " " + className;
    forceReflow(domElement);

    fn();
  } finally {
    domElement.className = oldClassName;
    forceReflow(domElement);
  }
}

function forceReflow(domElement) {
  return domElement.offsetHeight;
}

function getCompoundStyle(element, subStyle1, subStyle2, subStyle3, subStyle4) {
  // We can't look at compound properties directly because they return "" on
  // Firefox and IE 9
  const one = element.getRawStyle(subStyle1);
  const two = element.getRawStyle(subStyle2);
  const three = element.getRawStyle(subStyle3);
  const four = element.getRawStyle(subStyle4);

  let result;
  if (one === two && one === three && one === four) {
    result = one;
  } else {
    result = one + " " + two + " " + four + " " + three;
  }
  return result;
}

// Based on MDN code at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
function trim(str) {
  const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  return str.replace(rtrim, "");
}

function normalizeColorString(color) {
  if (color === "white") return "rgb(255, 255, 255)";
  if (color === "transparent") return "rgba(0, 0, 0, 0)";

  // look for presence of #rrggbb string
  const colorGroups = color.match(/^#(..)(..)(..)/);
  // if doesn't match, assume we have rgb() string
  if (colorGroups === null) return color;

  const r = parseInt(colorGroups[1], 16);
  const g = parseInt(colorGroups[2], 16);
  const b = parseInt(colorGroups[3], 16);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function forceBrowserReflow(element) {
  element.offsetHeight;
}
