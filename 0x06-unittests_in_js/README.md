# 0x06-unittests_in_js
Certainly! Testing is a crucial part of software development, ensuring that your code behaves as expected and remains maintainable. **Mocha** is a popular JavaScript test framework running on Node.js, making it a great choice for writing both unit and integration tests. In this guide, we'll cover:

1. **Setting Up Mocha**
2. **Writing Test Suites with Mocha**
3. **Using Assertion Libraries (Node's `assert` and Chai)**
4. **Organizing Long Test Suites**
5. **Using Spies**
6. **Using Stubs**
7. **Understanding Hooks**
8. **Unit Testing with Async Functions**
9. **Writing Integration Tests with a Small Node Server**

Let's dive into each topic step-by-step.

---

## 1. Setting Up Mocha

### Installation

First, you need to install Mocha as a development dependency in your project:

```bash
npm install --save-dev mocha
```

### Project Structure

A typical project structure might look like this:

```
project/
├── src/
│   └── yourCode.js
├── test/
│   └── yourCode.test.js
├── package.json
└── .gitignore
```

### Configuring `package.json`

Add a test script to your `package.json`:

```json
{
  "scripts": {
    "test": "mocha"
  }
}
```

Now, you can run your tests using:

```bash
npm test
```

---

## 2. Writing Test Suites with Mocha

Mocha uses **describe** and **it** blocks to organize tests.

### Example

```javascript
// test/math.test.js
const assert = require('assert');
const { add, subtract } = require('../src/math');

describe('Math Functions', function() {
  describe('#add()', function() {
    it('should return 5 when adding 2 and 3', function() {
      assert.strictEqual(add(2, 3), 5);
    });

    it('should return -1 when adding -2 and 1', function() {
      assert.strictEqual(add(-2, 1), -1);
    });
  });

  describe('#subtract()', function() {
    it('should return 1 when subtracting 3 from 4', function() {
      assert.strictEqual(subtract(4, 3), 1);
    });

    it('should return -5 when subtracting 5 from 0', function() {
      assert.strictEqual(subtract(0, 5), -5);
    });
  });
});
```

### Running the Test

```bash
npm test
```

**Output:**

```
  Math Functions
    #add()
      ✓ should return 5 when adding 2 and 3
      ✓ should return -1 when adding -2 and 1
    #subtract()
      ✓ should return 1 when subtracting 3 from 4
      ✓ should return -5 when subtracting 5 from 0

  4 passing (10ms)
```

---

## 3. Using Assertion Libraries (Node's `assert` and Chai)

### Node's Built-in `assert` Module

Node.js comes with a built-in `assert` module, which provides a set of assertion functions.

#### Example

```javascript
const assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.strictEqual([1, 2, 3].indexOf(4), -1);
    });
  });
});
```

### Chai Assertion Library

**Chai** is a popular assertion library that offers more expressive and readable assertions. It supports three styles: **assert**, **expect**, and **should**.

#### Installation

```bash
npm install --save-dev chai
```

#### Using Chai's `expect` Style

```javascript
const { expect } = require('chai');

describe('String', function() {
  describe('#length', function() {
    it('should return 5 for "Hello"', function() {
      expect('Hello').to.have.lengthOf(5);
    });
  });
});
```

#### Using Chai's `should` Style

```javascript
const chai = require('chai');
const should = chai.should();

describe('Number', function() {
  it('should be above 10', function() {
    const num = 15;
    num.should.be.above(10);
  });
});
```

### Advantages of Using Chai

- **Readability**: More human-readable assertions.
- **Flexibility**: Multiple assertion styles.
- **Extensibility**: Plugins and additional features.

---

## 4. Organizing Long Test Suites

As your project grows, your test suites might become lengthy and complex. Organizing them effectively is essential for maintainability.

### Strategies

1. **Modularize Tests**: Break down tests into smaller, focused files.
2. **Use Nested `describe` Blocks**: Group related tests within nested `describe` blocks.
3. **Consistent Naming**: Use descriptive and consistent naming for test files and test cases.
4. **Setup and Teardown**: Use hooks to manage shared resources.

### Example Structure

```
test/
├── auth/
│   ├── signup.test.js
│   └── login.test.js
├── models/
│   └── user.test.js
└── utils/
    └── helper.test.js
```

### Example of Nested `describe` Blocks

```javascript
// test/auth/signup.test.js
const { expect } = require('chai');
const { signup } = require('../../src/auth');

describe('Auth', function() {
  describe('#signup()', function() {
    it('should create a new user', function() {
      // Test implementation
    });

    it('should not allow duplicate usernames', function() {
      // Test implementation
    });
  });
});
```

---

## 5. Using Spies

**Spies** are used to monitor functions to see if they were called, how many times, and with what arguments. They do not alter the behavior of the function.

### When to Use Spies

- **Verifying Function Calls**: Ensure a function was called as expected.
- **Testing Call Counts**: Verify the number of times a function was invoked.
- **Inspecting Arguments**: Check what arguments were passed to a function.

### Using Sinon for Spies

**Sinon** is a popular library for creating spies, stubs, and mocks.

#### Installation

```bash
npm install --save-dev sinon
```

#### Example

```javascript
const sinon = require('sinon');
const { expect } = require('chai');

function greet(callback) {
  callback('Hello, World!');
}

describe('Greet Function', function() {
  it('should call the callback once with "Hello, World!"', function() {
    const spy = sinon.spy();
    greet(spy);

    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith('Hello, World!')).to.be.true;
  });
});
```

---

## 6. Using Stubs

**Stubs** are similar to spies but also allow you to control the behavior of functions, such as returning specific values or throwing errors.

### When to Use Stubs

- **Controlling Function Output**: Make a function return a specific value.
- **Simulating Errors**: Make a function throw an error.
- **Isolating Tests**: Replace dependencies with controlled behavior.

### Example with Sinon

```javascript
const sinon = require('sinon');
const { expect } = require('chai');
const database = require('../../src/database');
const { getUser } = require('../../src/user');

describe('User Module', function() {
  it('should return user data when getUser is called', async function() {
    const stub = sinon.stub(database, 'findUser').resolves({ id: 1, name: 'Alice' });

    const user = await getUser(1);
    expect(user).to.deep.equal({ id: 1, name: 'Alice' });
    expect(stub.calledOnceWith(1)).to.be.true;

    stub.restore(); // Restore the original function
  });
});
```

---

## 7. Understanding Hooks

**Hooks** are functions that run before or after tests, helping manage setup and teardown tasks.

### Types of Hooks

- **`before`**: Runs once before all tests in a `describe` block.
- **`beforeEach`**: Runs before each test in a `describe` block.
- **`after`**: Runs once after all tests in a `describe` block.
- **`afterEach`**: Runs after each test in a `describe` block.

### When to Use Hooks

- **Setup and Teardown**: Initialize or clean up resources before or after tests.
- **Shared State**: Prepare a shared environment for multiple tests.
- **Mocking and Stubbing**: Set up spies, stubs, or mocks before tests and restore them afterward.

### Example

```javascript
const { expect } = require('chai');

describe('Array', function() {
  let arr;

  before(function() {
    // Runs once before all tests
    console.log('Starting Array tests');
  });

  beforeEach(function() {
    // Runs before each test
    arr = [1, 2, 3];
  });

  afterEach(function() {
    // Runs after each test
    arr = [];
  });

  after(function() {
    // Runs once after all tests
    console.log('Completed Array tests');
  });

  it('should have length 3', function() {
    expect(arr).to.have.lengthOf(3);
  });

  it('should include 2', function() {
    expect(arr).to.include(2);
  });
});
```

---

## 8. Unit Testing with Async Functions

Testing asynchronous code requires handling promises or using async/await syntax to ensure tests wait for asynchronous operations to complete.

### Example with Promises

```javascript
const { expect } = require('chai');

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('data');
    }, 100);
  });
}

describe('Async Function', function() {
  it('should return "data" after 100ms', function() {
    return fetchData().then(result => {
      expect(result).to.equal('data');
    });
  });
});
```

### Example with Async/Await

```javascript
const { expect } = require('chai');

describe('Async Function', function() {
  it('should return "data" after 100ms', async function() {
    const result = await fetchData();
    expect(result).to.equal('data');
  });
});
```

### Handling Rejections

Ensure you handle promise rejections to prevent unhandled promise rejections in your tests.

```javascript
describe('Async Function', function() {
  it('should throw an error', async function() {
    try {
      await fetchDataWithError();
      throw new Error('Expected fetchDataWithError to throw');
    } catch (error) {
      expect(error.message).to.equal('Fetch failed');
    }
  });
});
```

---

## 9. Writing Integration Tests with a Small Node Server

Integration tests verify that different parts of your application work together as expected. Here's how you can set up integration tests for a Node.js server using Mocha, Chai, and **Supertest**.

### Installation

```bash
npm install --save-dev supertest
```

### Example Server (`app.js`)

```javascript
// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const { addUser, findUser } = require('./models/user');

const app = express();
app.use(bodyParser.json());

app.post('/auth/signup', async (req, res) => {
  const { name, email, phone, username, password, address } = req.body;
  try {
    await addUser(name, email, phone, username, password, address);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error.message === 'User already exists') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

module.exports = app;
```

### Starting the Server (`server.js`)

```javascript
// src/server.js
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Writing Integration Tests

```javascript
// test/integration/signup.test.js
const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');
const pool = require('../../src/config/db'); // Assuming this is your db connection

describe('POST /auth/signup', function() {
  // Clean up the user_data table before each test
  beforeEach(async function() {
    await pool.query('DELETE FROM user_data');
  });

  it('should create a new user and return 201', async function() {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      username: 'johndoe',
      password: 'password123',
      address: '123 Main St',
    };

    const res = await request(app)
      .post('/auth/signup')
      .send(newUser)
      .expect(201);

    expect(res.body).to.have.property('message', 'User created successfully');

    // Verify the user is in the database
    const user = await pool.query('SELECT * FROM user_data WHERE username=$1', ['johndoe']);
    expect(user.rows).to.have.lengthOf(1);
    expect(user.rows[0]).to.include({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      username: 'johndoe',
      address: '123 Main St',
    });
    // Password is hashed, so you can verify it's not plain text
    expect(user.rows[0].password).to.not.equal('password123');
  });

  it('should return 400 if user already exists', async function() {
    const existingUser = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '0987654321',
      username: 'janedoe',
      password: 'password456',
      address: '456 Elm St',
    };

    // Add the user first
    await request(app)
      .post('/auth/signup')
      .send(existingUser)
      .expect(201);

    // Attempt to add the same user again
    const res = await request(app)
      .post('/auth/signup')
      .send(existingUser)
      .expect(400);

    expect(res.body).to.have.property('error', 'User already exists');
  });

  it('should return 500 on server error', async function() {
    // Stub the addUser function to throw an error
    const sinon = require('sinon');
    const userModel = require('../../src/models/user');
    const stub = sinon.stub(userModel, 'addUser').throws(new Error('Database error'));

    const newUser = {
      name: 'Error User',
      email: 'error@example.com',
      phone: '1111111111',
      username: 'erroruser',
      password: 'errorpass',
      address: '789 Oak St',
    };

    const res = await request(app)
      .post('/auth/signup')
      .send(newUser)
      .expect(500);

    expect(res.body).to.have.property('error', 'Internal Server Error');

    stub.restore();
  });
});
```

### Running the Integration Tests

Ensure your test script in `package.json` is set up correctly. If you have multiple test directories, you might need to specify them or use a testing tool like `mocha` with appropriate options.

```bash
npm test
```

---

## Additional Tips

### 1. **Using Environment Variables**

Use environment variables to manage configurations like database credentials. Libraries like `dotenv` can help load these variables.

```bash
npm install dotenv --save
```

```javascript
// src/config/db.js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
```

### 2. **Mocking External Dependencies**

When writing unit tests, you might want to mock external dependencies to isolate the code being tested. Libraries like **Sinon** or **Proxyquire** can help with this.

### 3. **Continuous Integration (CI)**

Integrate your tests with CI tools like **GitHub Actions**, **Travis CI**, or **Jenkins** to automate testing on every commit or pull request.

### 4. **Coverage Reports**

Use tools like **nyc** (Istanbul) to generate code coverage reports, ensuring that your tests cover a significant portion of your codebase.

```bash
npm install --save-dev nyc
```

```json
// package.json
{
  "scripts": {
    "test": "nyc mocha"
  }
}
```

Run tests with coverage:

```bash
npm test
```

---

## Summary

Testing is essential for ensuring the reliability and maintainability of your code. **Mocha** combined with assertion libraries like **Chai** and utilities like **Sinon** provides a powerful toolkit for writing comprehensive tests. By organizing your tests effectively, handling asynchronous code correctly, and using spies and stubs appropriately, you can create robust test suites that cover both unit and integration aspects of your application.

### Key Takeaways:

- **Mocha** is a flexible test framework suitable for both unit and integration tests.
- **Chai** enhances assertions with readable and expressive syntax.
- **Sinon** provides tools for spying, stubbing, and mocking functions.
- **Hooks** (`before`, `beforeEach`, `after`, `afterEach`) help manage setup and teardown processes.
- **Supertest** is excellent for testing HTTP endpoints in integration tests.
- Organize your tests into modules and use consistent naming conventions for maintainability.
- Utilize environment variables and mocking to isolate tests and manage configurations effectively.

Feel free to ask if you have any specific questions or need further clarification on any of these topics!

# Different between mocha in commonjs and esm and how to deal with during test

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


بالطبع، دعنا نوضح الفرق بين **اختبارات الوحدة (Unit Tests)** و**اختبارات التكامل (Integration Tests)** باللغة العربية:

## **اختبارات الوحدة (Unit Tests)**

### **التعريف:**
اختبارات الوحدة هي اختبارات تركز على التحقق من صحة وحدة صغيرة من الكود البرمجي، عادةً ما تكون دالة أو طريقة فردية داخل وحدة أكبر مثل فئة أو وحدة نمطية.

### **الهدف:**
- **التحقق من وظيفة محددة:** التأكد من أن الوحدة البرمجية تعمل كما هو متوقع في جميع الحالات الممكنة.
- **عزل الوحدات:** يتم اختبار الوحدة بشكل مستقل دون الاعتماد على وحدات أخرى أو موارد خارجية مثل قواعد البيانات أو خدمات الشبكة.

### **الخصائص:**
- **سرعة التنفيذ:** عادة ما تكون سريعة لأنها تختبر أجزاء صغيرة من الكود.
- **سهولة الصيانة:** بفضل عزل الوحدات، يمكن تعديل الكود بسهولة دون التأثير على الاختبارات الأخرى.
- **استخدام الأدوات:** غالبًا ما تُستخدم أدوات مثل **Mocha** و**Chai** في بيئات JavaScript لإجراء اختبارات الوحدة.

### **مثال:**
إذا كان لديك دالة تقوم بعملية جمع رقمين بعد تقريبهما، فإن اختبار الوحدة سيتحقق من أن هذه الدالة تعيد النتيجة الصحيحة لكل زوج من الأرقام المدخلة.

```javascript
// calculate.js
function calculateSum(a, b) {
    return Math.round(a) + Math.round(b);
}

module.exports = calculateSum;
```

```javascript
// calculate.test.js
const { expect } = require('chai');
const calculateSum = require('./calculate');

describe('calculateSum', function() {
    it('should return the sum of two rounded numbers', function() {
        const result = calculateSum(1.4, 4.5);
        expect(result).to.equal(6);
    });
});
```

## **اختبارات التكامل (Integration Tests)**

### **التعريف:**
اختبارات التكامل تركز على التحقق من التفاعل بين وحدات متعددة من الكود البرمجي لضمان أنها تعمل معًا بشكل صحيح.

### **الهدف:**
- **التحقق من التفاعل بين الوحدات:** التأكد من أن الوحدات المختلفة تتكامل بشكل سلس وتؤدي الوظائف المتوقعة عند العمل معًا.
- **كشف الأخطاء الناتجة عن التفاعل:** مثل مشاكل التوافق بين وحدات مختلفة أو أخطاء في واجهات البرمجة بين الوحدات.

### **الخصائص:**
- **أبطأ من اختبارات الوحدة:** لأنها تختبر تفاعلات بين عدة وحدات وقد تشمل عمليات مثل الوصول إلى قواعد البيانات أو التعامل مع خدمات خارجية.
- **أكثر تعقيدًا:** بسبب الحاجة إلى إعداد بيئة اختبار متكاملة تشمل عدة مكونات.
- **استخدام الأدوات:** يمكن استخدام نفس أدوات اختبار الوحدة مثل **Mocha** و**Chai**، بالإضافة إلى أدوات إضافية لإعداد بيئة الاختبار مثل **Sinon** للمحاكاة.

### **مثال:**
إذا كان لديك نظام يتكون من دوال متعددة تتفاعل مع قاعدة بيانات، فإن اختبار التكامل سيتحقق من أن هذه الدوال تعمل معًا بشكل صحيح وتقوم بالعمليات المطلوبة على قاعدة البيانات.

```javascript
// userService.js
const db = require('./db');

async function createUser(name, age) {
    const user = { name, age };
    await db.insert(user);
    return user;
}

module.exports = { createUser };
```

```javascript
// userService.test.js
const { expect } = require('chai');
const sinon = require('sinon');
const db = require('./db');
const userService = require('./userService');

describe('User Service', function() {
    describe('createUser', function() {
        it('should create a user and insert into the database', async function() {
            const insertStub = sinon.stub(db, 'insert').resolves();
            const user = await userService.createUser('John Doe', 30);
            expect(user).to.deep.equal({ name: 'John Doe', age: 30 });
            expect(insertStub.calledOnceWith(user)).to.be.true;
            insertStub.restore();
        });
    });
});
```

## **الفرق الأساسي بين اختبارات الوحدة واختبارات التكامل**

| **الخاصية**                | **اختبارات الوحدة (Unit Tests)**                                  | **اختبارات التكامل (Integration Tests)**                             |
|----------------------------|------------------------------------------------------------------|--------------------------------------------------------------------|
| **النطاق**                 | وحدة صغيرة من الكود (دالة أو طريقة فردية)                         | تفاعل بين وحدات متعددة من الكود                                     |
| **الهدف**                  | التحقق من صحة وظيفة محددة                                           | التأكد من أن الوحدات المختلفة تعمل معًا بشكل صحيح                    |
| **السرعة**                 | سريعة التنفيذ                                                   | أبطأ نسبياً بسبب تعقيد التفاعل بين الوحدات                          |
| **العزل**                  | معزولة تمامًا، دون الاعتماد على وحدات أخرى أو موارد خارجية      | تعتمد على تفاعل عدة وحدات وقد تشمل موارد خارجية مثل قواعد البيانات    |
| **سهولة الصيانة**          | سهلة الصيانة بسبب العزل                                         | أكثر تعقيدًا في الصيانة بسبب التفاعل بين الوحدات                     |
| **الأدوات المستخدمة**      | أدوات مثل Mocha، Chai، Jest                                      | أدوات مثل Mocha، Chai، Sinon بالإضافة إلى أدوات إعداد البيئة        |

## **أهمية الجمع بين النوعين**

لضمان جودة عالية للكود، من الأفضل استخدام كل من اختبارات الوحدة واختبارات التكامل:

- **اختبارات الوحدة** تساعد في التأكد من أن كل جزء من الكود يعمل بشكل صحيح بشكل مستقل.
- **اختبارات التكامل** تضمن أن هذه الأجزاء تتفاعل معًا بشكل سلس وتؤدي الوظائف المطلوبة بشكل صحيح عند تجميعها.

باستخدام كلا النوعين من الاختبارات، يمكنك اكتشاف الأخطاء في مراحل مبكرة وتحسين جودة الكود بشكل عام، مما يسهم في تقليل الأخطاء في البيئات الإنتاجية وتسهيل صيانة الكود على المدى الطويل.
