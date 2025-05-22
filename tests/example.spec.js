// @ts-check
import { test } from '@playwright/test';
import templateBody from './payloads/template.json';
import { processTemplate } from './utils/template-processor.js';

test('process template', async ({ }) => {
  processTemplate(templateBody)
});

test('request to mock server', async ({ request }) => {
    const response = await request.get('/hello');
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody, null, 2));
});