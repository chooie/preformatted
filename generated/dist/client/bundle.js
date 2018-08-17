require=(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({"./main.js":[function(require,module,exports){
const preformatted = require("../../shared/preformatted.js");

module.exports = preformatted;

},{"../../shared/preformatted.js":1}],1:[function(require,module,exports){
module.exports = function preformatted(template, ...expressions) {
  const text = buildStringWithExpressionsFromTemplate(template, expressions);
  const lines = text.split("\n");

  if (!isMultilined(lines)) return text;

  return standardizeIndentationByFirstLine(lines);
};

function buildStringWithExpressionsFromTemplate(template, expressions) {
  return template.reduce(function(accumulator, part, i) {
    return accumulator + expressions[i - 1] + part;
  });
}

function isMultilined(lines) {
  return lines.length > 1;
}

function standardizeIndentationByFirstLine(lines) {
  const firstLine = lines[1];
  const firstLineIndentLevel = getIndexOfFirstNonWhiteSpaceCharacter(firstLine);
  const linesLessExcessIndent = removeExcessIndent(lines, firstLineIndentLevel);
  return combineLinesByNewLineAndTrim(linesLessExcessIndent);
}

function removeExcessIndent(lines, firstLineIndentLevel) {
  return lines.map(function(line) {
    let firstCharIndex = getIndexOfFirstNonWhiteSpaceCharacter(line);
    let lineIndentLevel = firstLineIndentLevel;

    if (firstCharIndex < firstLineIndentLevel) {
      lineIndentLevel = firstCharIndex;
    }

    return line.slice(lineIndentLevel);
  });
}

function combineLinesByNewLineAndTrim(linesLessExcessIndent) {
  return linesLessExcessIndent
    .reduce(function(accumulator, line) {
      let newText = accumulator + line + "\n";
      return newText;
    }, "")
    .trim();
}

function getIndexOfFirstNonWhiteSpaceCharacter(text) {
  let indexOfFirstNonWhiteSpaceCharacter;

  for (let i = 0; i < text.length; i += 1) {
    if (!isWhiteSpaceCharacter(text[i])) {
      indexOfFirstNonWhiteSpaceCharacter = i;
      break;
    }
  }
  return indexOfFirstNonWhiteSpaceCharacter || 0;

  function isWhiteSpaceCharacter(character) {
    return character === " " || character === "\n";
  }
}

},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwbGljYXRpb24vY2xpZW50L3VpL21haW4uanMiLCJzcmMvYXBwbGljYXRpb24vc2hhcmVkL3ByZWZvcm1hdHRlZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCJjb25zdCBwcmVmb3JtYXR0ZWQgPSByZXF1aXJlKFwiLi4vLi4vc2hhcmVkL3ByZWZvcm1hdHRlZC5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwcmVmb3JtYXR0ZWQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHByZWZvcm1hdHRlZCh0ZW1wbGF0ZSwgLi4uZXhwcmVzc2lvbnMpIHtcbiAgY29uc3QgdGV4dCA9IGJ1aWxkU3RyaW5nV2l0aEV4cHJlc3Npb25zRnJvbVRlbXBsYXRlKHRlbXBsYXRlLCBleHByZXNzaW9ucyk7XG4gIGNvbnN0IGxpbmVzID0gdGV4dC5zcGxpdChcIlxcblwiKTtcblxuICBpZiAoIWlzTXVsdGlsaW5lZChsaW5lcykpIHJldHVybiB0ZXh0O1xuXG4gIHJldHVybiBzdGFuZGFyZGl6ZUluZGVudGF0aW9uQnlGaXJzdExpbmUobGluZXMpO1xufTtcblxuZnVuY3Rpb24gYnVpbGRTdHJpbmdXaXRoRXhwcmVzc2lvbnNGcm9tVGVtcGxhdGUodGVtcGxhdGUsIGV4cHJlc3Npb25zKSB7XG4gIHJldHVybiB0ZW1wbGF0ZS5yZWR1Y2UoZnVuY3Rpb24oYWNjdW11bGF0b3IsIHBhcnQsIGkpIHtcbiAgICByZXR1cm4gYWNjdW11bGF0b3IgKyBleHByZXNzaW9uc1tpIC0gMV0gKyBwYXJ0O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaXNNdWx0aWxpbmVkKGxpbmVzKSB7XG4gIHJldHVybiBsaW5lcy5sZW5ndGggPiAxO1xufVxuXG5mdW5jdGlvbiBzdGFuZGFyZGl6ZUluZGVudGF0aW9uQnlGaXJzdExpbmUobGluZXMpIHtcbiAgY29uc3QgZmlyc3RMaW5lID0gbGluZXNbMV07XG4gIGNvbnN0IGZpcnN0TGluZUluZGVudExldmVsID0gZ2V0SW5kZXhPZkZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihmaXJzdExpbmUpO1xuICBjb25zdCBsaW5lc0xlc3NFeGNlc3NJbmRlbnQgPSByZW1vdmVFeGNlc3NJbmRlbnQobGluZXMsIGZpcnN0TGluZUluZGVudExldmVsKTtcbiAgcmV0dXJuIGNvbWJpbmVMaW5lc0J5TmV3TGluZUFuZFRyaW0obGluZXNMZXNzRXhjZXNzSW5kZW50KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXhjZXNzSW5kZW50KGxpbmVzLCBmaXJzdExpbmVJbmRlbnRMZXZlbCkge1xuICByZXR1cm4gbGluZXMubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICBsZXQgZmlyc3RDaGFySW5kZXggPSBnZXRJbmRleE9mRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGxpbmUpO1xuICAgIGxldCBsaW5lSW5kZW50TGV2ZWwgPSBmaXJzdExpbmVJbmRlbnRMZXZlbDtcblxuICAgIGlmIChmaXJzdENoYXJJbmRleCA8IGZpcnN0TGluZUluZGVudExldmVsKSB7XG4gICAgICBsaW5lSW5kZW50TGV2ZWwgPSBmaXJzdENoYXJJbmRleDtcbiAgICB9XG5cbiAgICByZXR1cm4gbGluZS5zbGljZShsaW5lSW5kZW50TGV2ZWwpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY29tYmluZUxpbmVzQnlOZXdMaW5lQW5kVHJpbShsaW5lc0xlc3NFeGNlc3NJbmRlbnQpIHtcbiAgcmV0dXJuIGxpbmVzTGVzc0V4Y2Vzc0luZGVudFxuICAgIC5yZWR1Y2UoZnVuY3Rpb24oYWNjdW11bGF0b3IsIGxpbmUpIHtcbiAgICAgIGxldCBuZXdUZXh0ID0gYWNjdW11bGF0b3IgKyBsaW5lICsgXCJcXG5cIjtcbiAgICAgIHJldHVybiBuZXdUZXh0O1xuICAgIH0sIFwiXCIpXG4gICAgLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gZ2V0SW5kZXhPZkZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3Rlcih0ZXh0KSB7XG4gIGxldCBpbmRleE9mRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmICghaXNXaGl0ZVNwYWNlQ2hhcmFjdGVyKHRleHRbaV0pKSB7XG4gICAgICBpbmRleE9mRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW5kZXhPZkZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlciB8fCAwO1xuXG4gIGZ1bmN0aW9uIGlzV2hpdGVTcGFjZUNoYXJhY3RlcihjaGFyYWN0ZXIpIHtcbiAgICByZXR1cm4gY2hhcmFjdGVyID09PSBcIiBcIiB8fCBjaGFyYWN0ZXIgPT09IFwiXFxuXCI7XG4gIH1cbn1cbiJdfQ==
