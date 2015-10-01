'use strict';

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) == str;
    };
}

var system = require('system'),
    hasTestFailures = false,
    page = require('webpage').create(),
    errorRegEx = /^not ok/,
    finishRegEx = "# NOTE: disabled specs are usually a result of xdescribe.";

if (system.args.length < 2 ) {
    console.log('Usage: run-jasmine.js URL');
    phantom.exit(1);
}


page.onConsoleMessage = function(msg) {
    if (!(msg.startsWith("#") || msg.startsWith("ok ") || msg.startsWith("not ok"))) {
        return;
    }
    console.log(msg);
    if(msg.match(errorRegEx) !== null) {
        hasTestFailures = true;
    }
    if(msg === finishRegEx) {
      phantom.exit(hasTestFailures ? 1 : 0);
    }
};

page.open(system.args[1], function(status) {
    if (status !== "success") {
      console.log("Couldn't load the page");
    }
    system.stdout.writeLine("");
});
