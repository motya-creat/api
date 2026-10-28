import { test, expect } from '@playwright/test';

test('должен отобразить список статей при успешном ответе API', async ({ page }) => {

  await page.route('**http.hexlet.app/api/articles**', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          title: 'Основы HTTP',
          body: 'HTTP — это протокол передачи гипертекста, используемый для обмена данными в сети.'
        },
        {
          id: 2,
          title: 'Методы запросов',
          body: 'GET, POST, PUT, DELETE — основные методы, которые нужно знать каждому разработчику.'
        },
        {
          id: 3,
          title: 'Заголовки и статусы',
          body: 'Статусы ответов (200, 404, 500) и заголовки помогают понять результат запроса.'
        }
      ])
    });
  });

  await page.goto('/');

  await expect(page.locator('h2')).toHaveText('📰 Лента статей (Hexlet API)');

  await expect(page.locator('text=Основы HTTP')).toBeVisible();

  await expect(page.locator('text=Методы запросов')).toBeVisible();
});

test('должен показать сообщение об ошибке 403 и покрасить текст в красный', async ({ page }) => {

  await page.route('**http.hexlet.app/api/articles**', (route) => {
    route.fulfill({
      status: 403,
      contentType: 'text/plain',
      body: 'Forbidden'
    });
  });

  await page.goto('/');

  await expect(page.locator('#status')).toHaveText('Доступ запрещён (403). У вас нет прав на просмотр.');
  
  const color = await page.locator('#status').evaluate(el => window.getComputedStyle(el).color);
  expect(color).toBe('rgb(255, 0, 0)');
});
