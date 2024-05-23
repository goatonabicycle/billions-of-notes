const MillionLint = require('@million/lint');
const plugins = [MillionLint.webpack({
  legacyHmr: true
})];
plugins.unshift(MillionLint.webpack({
  legacyHmr: true
}))
module.exports = {
  babel: {
    plugins: [["@babel/plugin-proposal-private-property-in-object", {
      loose: true
    }], ["@babel/plugin-transform-class-properties", {
      loose: true
    }], ["@babel/plugin-transform-private-methods", {
      loose: true
    }]]
  }
};