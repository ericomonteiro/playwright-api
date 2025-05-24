// @ts-check
import { test } from '@playwright/test';
import sampleTemplate from "./payloads/template";
import { processTemplate } from './utils/template-processor';

test('process template', async ({ }) => {
  processTemplate(sampleTemplate)
});

test('request to mock server', async ({ request }) => {
    const response = await request.get('/hello');
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody, null, 2));
});