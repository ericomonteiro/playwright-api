# playwright-apis<img src="static/playwright-logo.svg" alt="drawing" width="32"/>

## Overview
This project is a collection of Playwright tests designed to validate the functionality of various APIs. It includes a set of reusable functions and utilities to facilitate the testing process.

## Functionalities

### Template Processor

This project includes a template processor that allows you to generate dynamic payloads for tests by replacing special commands with random or list-based values.

#### How it works

The template processor reads a JSON object and replaces values that start with `$` with dynamically generated data, such as random strings, numbers, UUIDs, or values from lists.

##### Supported functions

- `randomString(n)`: Generates a random string with `n` characters.
- `randomNumber(n)`: Generates a random number with `n` digits.
- `oneOfList('file.js')`: Randomly selects an item from a list in the specified file (the file must be in folder `./tests/lists`).
- `generateUUID()`: Generates a UUID v4.

#### Usage example

1. Create a JS template, for example in `tests/payloads/template.js`:

    ```js
   import {randomUUID} from "node:crypto";
   import {oneOfList, randomNumber, randomString} from "../utils/template-processor";
   
   const sampleTemplate = {
       id: randomUUID(),
       name: oneOfList("names.js"),
       phone: oneOfList('phones.js'),
       address: oneOfList('addresses.js'),
       node: {
           value: randomString(10),
           name: randomString(20),
           int: randomNumber(4)
       },
       otherNode: {
           fixValue: "abc",
           randomString: randomString(40)
       }
   };
   
   export default sampleTemplate;
    ```

2. In your test, import the template and the processor:

    ```javascript
    import sampleTemplate from "./payloads/template";
   
    test('process template', async () => {
      console.log(JSON.stringify(sampleTemplate, null, 2));
    });
    ```

3. The result will be an object with all dynamic fields filled in.

   ```json
   {
     "id": "770b8e79-1b54-47b0-b603-03a01de48f83",
     "name": "Gabriel Martins",
     "phone": "(55) 99390-1234",
     "address": {
       "street": "Praça da Liberdade, 789",
       "city": "Belo Horizonte",
       "state": "MG",
       "zip": "30123-456"
     },
     "node": {
       "value": "JXbYNe2JKj",
       "name": "uSCTn8i4gCWctPYK7AXL",
       "int": 3988
     },
     "otherNode": {
       "fixValue": "abc",
       "randomString": "Apm5asVzXDOBtVMt0itSzdzLdHACZp6xuvsqV9Cs"
     }
   }
    ```

#### How to Add a New Function to the Template Processor

To create and use a new dynamic function in the template processor, follow these steps:

1. **Implement the function**</br>Include your new function in the mapFunctions object:
   In `tests/utils/template-processor.js`, create a new function that receives the necessary parameters.  
   Example:
   ```javascript
   function randomEmail() {
     // Your logic to generate a random email
     return `user${Math.floor(Math.random() * 1000)}@example.com`;
   }
   
   module.exports = { ..., randomEmail };
   ```
   
2. **Use the function in your template**
   ```js
   import {randomEmail} from "../utils/template-processor";
   
   {
     email: randomEmail()
   }
   ```
3. **Process the template as usual**</br>The value will be replaced by the result of your function during template processing.

### Profiles

The project supports multiple configuration profiles to make it easy to run tests in different environments (e.g., local, staging, production).

Profile configurations are stored in the `tests/configs/` folder:

- The `config.json` file defines the active profile using the `active_profile` key.
- Each profile has its own file, such as `local_mock.json`, containing specific settings (e.g., `baseUrl`).

#### How it works

When tests start, the active profile is automatically loaded and its settings are used by Playwright, such as the base URL for tests.

#### Example

Content of `tests/configs/config.json`:
   ```js
   {
      activeProfile: "local_mock"
   }
   ```

Content of `tests/configs/local_mock.json`:
   ```js
   {
      baseUrl: "http://localhost:3000"
   }
   ```
Note: `http://localhost:3000` is the default URL for the mock server.

To run mockserver (needs docker installed):
```bash
docker-compose up -d
```

## Notes

- Lists must be in the `tests/lists/` folder.
- The processor can be used in any test to quickly generate dynamic data.

## Running

### Install dependencies
```bash
npm install
```

### Start mock server
```bash
docker-compose up -d
```

### Running all tests
```bash
npx playwright test
```
