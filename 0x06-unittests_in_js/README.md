# 0x06-unittests_in_js

Different between mocha in commonjs and esm and how to deal with during test

The error you're encountering:

```
SyntaxError: Unexpected token 'export'
```

indicates that Node.js is trying to interpret your ES Module (`export`) syntax as CommonJS, which doesn't recognize the `export` keyword. This typically happens when using ES Modules (ESM) in a project configured for CommonJS or when the test runner (Mocha) isn't properly set up to handle ESM.

To resolve this issue, you have two primary options:

1. **Convert Your Code to CommonJS Syntax**
2. **Configure Mocha to Support ES Modules**

I'll guide you through both approaches so you can choose the one that best fits your project's needs.

---

## **Option 1: Convert Your Code to CommonJS Syntax**

If you prefer to stick with CommonJS (the default module system in Node.js), you can adjust your source and test files accordingly.

### **1. Update Your Source File (`0-calcul.js`)**

**Before (ESM Syntax):**
```javascript
// 0-calcul.js
export default function calculateNumber(a, b) {
  // Your implementation
}
```

**After (CommonJS Syntax):**
```javascript
// 0-calcul.js
function calculateNumber(a, b) {
  // Your implementation
}

module.exports = calculateNumber;
```

### **2. Update Your Test File (`0-calcul.test.js`)**

**Before (Using ESM with `import`):**
```javascript
// 0-calcul.test.js
import calculateNumber from './0-calcul.js';
import { expect } from 'chai';

describe('calculateNumber', () => {
  it('should correctly add two numbers', () => {
    expect(calculateNumber(2, 3)).to.equal(5);
  });
});
```

**After (Using CommonJS with `require`):**
```javascript
// 0-calcul.test.js
const calculateNumber = require('./0-calcul');
const { expect } = require('chai');

describe('calculateNumber', () => {
  it('should correctly add two numbers', () => {
    expect(calculateNumber(2, 3)).to.equal(5);
  });
});
```

### **3. Ensure Mocha is Using CommonJS**

By default, Mocha uses CommonJS, so no additional configuration is needed. Run your tests with:

```bash
npm test
```

---

## **Option 2: Configure Mocha to Support ES Modules**

If you prefer to use ES Modules (which offer more modern syntax and features), you'll need to configure your project and Mocha to handle ESM properly.

### **1. Update `package.json` to Use ESM**

Add the `"type": "module"` field to your `package.json` to tell Node.js to interpret `.js` files as ES Modules.

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "description": "",
  "type": "module", // Add this line
  "scripts": {
    "test": "mocha"
  },
  "dependencies": {
    // Your dependencies
  },
  "devDependencies": {
    "mocha": "^10.0.0", // Ensure you have a recent version
    "chai": "^4.3.0"
  },
  "author": "",
  "license": "ISC"
}
```

**Note:** Ensure you're using a version of Mocha that supports ESM (version 8.0.0 and above, preferably the latest).

### **2. Update Your Source File (`0-calcul.js`)**

Keep your ESM syntax as is.

```javascript
// 0-calcul.js
export default function calculateNumber(a, b) {
  // Your implementation
}
```

### **3. Update Your Test File (`0-calcul.test.js`)**

Use ESM `import` statements.

```javascript
// 0-calcul.test.js
import calculateNumber from './0-calcul.js';
import { expect } from 'chai';

describe('calculateNumber', () => {
  it('should correctly add two numbers', () => {
    expect(calculateNumber(2, 3)).to.equal(5);
  });
});
```

**Important:** Ensure that your test files use the `.js` extension and not `.mjs`. With `"type": "module"` in `package.json`, `.js` files are treated as ESM.

### **4. Update Mocha Configuration (if needed)**

Mocha should automatically detect the module type based on `package.json`. However, to ensure compatibility, you can specify the file extensions and use the `--loader` flag if necessary.

**Basic Setup:**

Simply running `mocha` should work after setting `"type": "module"`.

```bash
npm test
```

**Advanced Configuration:**

If you encounter further issues, consider creating a Mocha configuration file (`mocha.config.mjs`):

```javascript
// mocha.config.mjs
export default {
  spec: 'test/**/*.test.js',
  extension: ['js'],
  require: ['@babel/register'], // If using Babel for transpiling
};
```

And run Mocha with:

```bash
mocha --config mocha.config.mjs
```

### **5. Ensure All Imports Are Correct**

Double-check that all your imports in both source and test files are using the correct paths and extensions.

**Example:**

```javascript
import calculateNumber from './0-calcul.js'; // Note the .js extension
```

---

## **Additional Tips and Best Practices**

### **A. Ensure Consistent Module Syntax**

Mixing CommonJS (`require`, `module.exports`) and ESM (`import`, `export`) can lead to issues. Choose one module system and stick with it throughout your project.

### **B. Using Babel for Advanced ESM Features**

If you need to use advanced ESM features or want better compatibility, consider integrating Babel into your project.

1. **Install Babel and Presets:**
   ```bash
   npm install --save-dev @babel/core @babel/preset-env @babel/register
   ```

2. **Create a Babel Configuration (`.babelrc`):**
   ```json
   {
     "presets": ["@babel/preset-env"]
   }
   ```

3. **Update Mocha to Use Babel:**
   Update your test script in `package.json`:
   ```json
   "scripts": {
     "test": "mocha --require @babel/register"
   }
   ```

### **C. Check Mocha Version**

Ensure you’re using a compatible version of Mocha that supports ESM. Run:

```bash
mocha --version
```

Update Mocha if necessary:

```bash
npm install --save-dev mocha@latest
```

### **D. Debugging Steps**

1. **Log the Imported Function:**
   In your test file, log the imported `calculateNumber` to ensure it’s being imported correctly.
   ```javascript
   console.log(calculateNumber);
   ```

2. **Manual Import Test:**
   Create a simple script to import and use the function to ensure there are no syntax issues.

   ```javascript
   // testImport.js
   import calculateNumber from './0-calcul.js';
   console.log(calculateNumber(2, 3));
   ```

   Run it with Node:
   ```bash
   node testImport.js
   ```

3. **Check File Extensions:**
   Ensure all module files have the correct extensions and paths.

---

## **Example: Complete Setup for ESM with Mocha**

### **1. `package.json`**
```json
{
  "name": "0x06-unittests_in_js",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "scripts": {
    "test": "mocha"
  },
  "devDependencies": {
    "mocha": "^10.0.0",
    "chai": "^4.3.0"
  },
  "author": "",
  "license": "ISC"
}
```

### **2. Source File (`0-calcul.js`)**
```javascript
// 0-calcul.js
export default function calculateNumber(a, b) {
  return a + b; // Simple implementation for demonstration
}
```

### **3. Test File (`0-calcul.test.js`)**
```javascript
// 0-calcul.test.js
import { expect } from 'chai';
import calculateNumber from './0-calcul.js';

describe('calculateNumber', () => {
  it('should return 5 when adding 2 and 3', () => {
    expect(calculateNumber(2, 3)).to.equal(5);
  });

  it('should return 0 when adding -2 and 2', () => {
    expect(calculateNumber(-2, 2)).to.equal(0);
  });

  it('should handle floating point numbers', () => {
    expect(calculateNumber(2.5, 3.5)).to.equal(6);
  });
});
```

### **4. Running the Tests**
```bash
npm test
```

**Expected Output:**
```
  calculateNumber
    ✓ should return 5 when adding 2 and 3
    ✓ should return 0 when adding -2 and 2
    ✓ should handle floating point numbers

  3 passing (XXms)
```

---

## **Summary**

The error you encountered is due to Node.js interpreting your ES Module syntax (`export`) as CommonJS. You can resolve this by either:

1. **Converting your code to CommonJS syntax**: Change `export` to `module.exports` and `import` to `require`.
2. **Configuring Mocha to support ES Modules**: Update `package.json` with `"type": "module"`, ensure Mocha is up-to-date, and use `import` statements in your test files.

Choose the approach that best fits your project's architecture and your preference for module systems. If you continue to face issues, ensure that all your files are correctly named, paths are accurate, and dependencies are properly installed.

Feel free to share more details or specific code snippets if you need further assistance!
