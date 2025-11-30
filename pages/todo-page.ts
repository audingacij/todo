import { Locator, Page } from '@playwright/test';

export class TodoPage {
    protected page: Page;
    readonly url = 'https://todo-app.tallinn-learning.ee/';
    readonly input: Locator;
    readonly items: Locator;
    readonly todoToggles: Locator;
    readonly todoDeleteButtons: Locator;
    readonly filterAll: Locator;
    readonly filterActive: Locator;
    readonly filterCompleted: Locator;
    readonly clearCompletedButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.input = page.getByTestId('text-input');
        this.items = page.getByTestId('todo-item-label');
        this.todoToggles = page.getByTestId('todo-item-toggle');
        this.todoDeleteButtons = page.getByTestId('todo-item-button');
        this.filterAll = page.getByRole('link', { name: 'All' });
        this.filterActive = page.getByRole('link', { name: 'Active' });
        this.filterCompleted = page.getByRole('link', { name: 'Completed' });
        this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
    }

    async open() {
        await this.page.goto(this.url);
    }

    async addTodo(text: string) {
        await this.input.fill(text);
        await this.input.press('Enter');
    }

    async toggleTodo(index: number = 0) {
        await this.todoToggles.nth(index).click();
    }

    async deleteTodoByText(text: string) {
        const item = this.items.filter({ hasText: text });
        await item.hover();
        await this.page.getByRole('button', { name: '×' }).click();
    }

    async filterAllTodos() {
        await this.filterAll.click();
    }

    async filterActiveTodos() {
        await this.filterActive.click();
    }

    async filterCompletedTodos() {
        await this.filterCompleted.click();
    }

    async clearCompleted() {
        await this.clearCompletedButton.click();
    }
}
