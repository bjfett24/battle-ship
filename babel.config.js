// babel.config.js (Corrected - ES Module syntax)
export default { // Use export default instead of module.exports
    presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  };