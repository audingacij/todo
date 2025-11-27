import { test, expect } from '@playwright/test';

test('verify to do creation', async ({ page }) => {
  await page.goto('https://todo-app.tallinn-learning.ee/');
  await page.getByTestId('text-input').fill('buy bread')
  await page.getByTestId('text-input').press('Enter');
  await expect(page.getByTestId('todo-item-label')).toBeVisible();
});

test('verify two items creation', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    await page.getByTestId('text-input').fill('buy bread')
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('buy something')
    await page.getByTestId('text-input').press('Enter');
    await expect(page.getByTestId('todo-item-label')).toHaveCount(2);
});

test('verify completed filter', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    await page.getByTestId('text-input').fill('buy bread')
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('buy something')
    await page.getByTestId('text-input').press('Enter');
    await page.getByRole('link', { name: 'Completed' }).click
    await expect(page.getByTestId('todo-item-label')).toHaveCount(0);
});

test('verify active filter', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    await page.getByTestId('text-input').fill('buy bread')
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('buy something')
    await page.getByTestId('text-input').press('Enter');
    await page.getByRole('link', { name: 'Active' }).click
    await expect(page.getByTestId('todo-item-label')).toHaveCount(2);
});

test('verify All filter', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    await page.getByTestId('text-input').fill('buy bread')
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('buy something')
    await page.getByTestId('text-input').press('Enter');
    await page.getByRole('link', { name: 'All' }).click
    await expect(page.getByTestId('todo-item-label')).toHaveCount(2);
});

test('verify active and completed filters for completed task', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    await page.getByTestId('text-input').fill('buy bread')
    await page.getByTestId('text-input').press('Enter');
    await page.getByRole('link', { name: 'All' }).click
    await page.getByTestId('todo-item-toggle').click()
    await page.getByRole('link', { name: 'Active' }).click()
    await expect(page.getByTestId('todo-item-label')).toHaveCount(0);
    await page.getByRole('link', { name: 'Completed' }).click()
    await expect(page.getByTestId('todo-item-label')).toHaveCount(1);
});

test('verify clear completed', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    await page.getByTestId('text-input').fill('buy eggs');
    await page.getByTestId('text-input').press('Enter');
    await expect(page.getByTestId('todo-item-label')).toHaveCount(1);
    await page.getByTestId('todo-item-toggle').click();
    await page.getByRole('button', { name: 'Clear completed' }).click();
    await expect(page.getByTestId('todo-item-label')).toHaveCount(0);
});

test('verify item can be deleted', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    await page.getByTestId('text-input').fill('buy eggs');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('todo-item-label').hover();
    await page.getByTestId('todo-item-button').click();
});

test.only('verify after item deletion only one item is visible', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    await page.getByTestId('text-input').fill('buy bread')
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('buy something')
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('todo-item-label').filter({ hasText: 'buy bread' }).hover()
    await page.getByRole('button', { name: '×' }).click()
    await expect(page.getByTestId('todo-item-label')).toHaveCount(1);
});


