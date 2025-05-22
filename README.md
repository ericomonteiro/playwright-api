# playwright-apis ![playwright-logo.svg](static/playwright-logo.svg)
## Profiles

The project supports multiple configuration profiles to make it easy to run tests in different environments (e.g., local, staging, production).

Profile configurations are stored in the `tests/configs/` folder:

- The `config.json` file defines the active profile using the `active_profile` key.
- Each profile has its own file, such as `local_mock.json`, containing specific settings (e.g., `baseUrl`).

### How it works

When tests start, the active profile is automatically loaded and its settings are used by Playwright, such as the base URL for tests.

### Example

Content of `tests/configs/config.json`:
   ```json
   {
      "active_profile": "local_mock"
   }
   ```

## Template Processor

This project includes a template processor that allows you to generate dynamic payloads for tests by replacing special commands with random or list-based values.

### How it works

The template processor reads a JSON object and replaces values that start with `$` with dynamically generated data, such as random strings, numbers, UUIDs, or values from lists.

#### Supported functions

- `$randomString(n)`: Generates a random string with `n` characters.
- `$randomNumber(n)`: Generates a random number with `n` digits.
- `$oneOfList('file.json')`: Randomly selects an item from a list in the specified file (the file must be in folder `./tests/lists`).
- `$generateUUID()`: Generates a UUID v4.

### Usage example

1. Create a JSON template, for example in `tests/payloads/template.json`:

    ```json
    {
      "id": "$generateUUID()",
      "name": "$oneOfList('names.json')",
      "phone": "$oneOfList('phones.json')",
      "node": {
        "value": "$randomString(10)",
        "name": "$randomString(20)",
        "int": "$randomNumber(4)"
      }
    }
    ```

2. In your test, import the template and the processor:

    ```javascript
    import templateBody from './payloads/template.json';
    import { processTemplate } from './utils/template-processor.js';

    test('process template', async () => {
      processTemplate(templateBody);
    });
    ```

3. The result will be an object with all dynamic fields filled in.

   ```json
   {
       "id": "11544dfa-528a-4077-9870-febdc8cb56c5",
       "name": "Priscila Pinto",
       "phone": "(110) 99245-6789",
       "node": {
          "value": "hpzm0Vzc8u",
          "name": "0LltkoLhImmkgDCT5p9l",
          "int": 8578
       },
       "otherNode": {
          "fixValue": "abc",
          "randomString": "Ga2LlcRJpkjRkUujBO3IkXt9CA2pFOqMmR3isDDQ"
       }
   }
    ```

## Notes

- Lists must be in the `tests/lists/` folder.
- The processor can be used in any test to quickly generate dynamic data.

