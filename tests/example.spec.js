// @ts-check
import { test } from '@playwright/test';
import sampleTemplate from "./payloads/template";

test('process template', async ({ }) => {
    console.log(JSON.stringify(sampleTemplate, null, 2));
});

test('request to mock server', async ({ request }) => {
    const response = await request.get('/hello');
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody, null, 2));
});