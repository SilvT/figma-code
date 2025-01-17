const StyleDictionary = require('style-dictionary');

// Custom transform to flatten and process unconventional keys
StyleDictionary.registerTransform({
  name: 'name/cti/kebab',
  type: 'name',
  matcher: () => true,  // Apply to all tokens
  transformer: (token) => {
    // Flatten the token path by joining them with a hyphen and converting to kebab-case
    // Adjust to handle your specific structure (e.g., 1.Core/Mode 1)
    return token.path
      .map(segment => segment.toString().replace(/[^a-zA-Z0-9]/g, '-').toLowerCase())  // Replace non-alphanumeric chars with '-'
      .join('-');  // Join with a hyphen
  }
});

module.exports = {
  source: ["path/to/your/json/file.json"],  // Path to your JSON
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "build/css/",
      transforms: ["name/cti/kebab", "attribute/cti", "value/attribute"],
      files: [
        {
          destination: "variables.css",
          format: "css/variables"
        }
      ]
    }
  }
};
