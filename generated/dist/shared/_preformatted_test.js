const assert = require("_assert");
const preformatted = require("./preformatted.js");

describe("SHARED: TEMPLATE STRING", function() {
  const animal = "dog";
  const sound = "woof";

  it("handles a single line, don't know why you'd use it", function() {
    const string = preformatted`The ${animal} goes ${sound}`;
    assert.equal(string, "The dog goes woof");
  });

  it("cleanly formatted multi lines", function() {
    const string = preformatted`
      The ${animal}
      goes
      ${sound}
    `;
    assert.equal(string, "The dog\ngoes\nwoof");
  });

  it("poorly formatted multi lines", function() {
    const stringBadIndent = preformatted`
      The ${animal}
goes
      ${sound}
    `;
    assert.equal(stringBadIndent, "The dog\ngoes\nwoof");
  });

  it("multi lines but text is on same line as delmiter", function() {
    const string2 = preformatted`The ${animal}
      goes
      ${sound}
    `;
    assert.equal(string2, "The dog\ngoes\nwoof");
  });

  it("cleanly formatted lines with nested indentation", function() {
    const greeting = "Hello";
    let html = preformatted`
      <div>
        <h1>${greeting}</h1>
      </div>
    `;
    assert.equal(html, "<div>\n  <h1>Hello</h1>\n</div>");
  });
});
