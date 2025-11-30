import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todo-page';

test.describe('Todo app tests', () => {
    let todo: TodoPage;

    test.beforeEach(async ({ page }) => {
        todo = new TodoPage(page);
        await todo.open();
    });

    test('verify to do creation', async () => {
        await todo.addTodo('buy bread');
        await expect(todo.items.first()).toBeVisible();
    });

    test('verify two items creation', async () => {
        await todo.addTodo('buy bread');
        await todo.addTodo('buy something');
        await expect(todo.items).toHaveCount(2);
    });

    test('verify completed filter', async () => {
        await todo.addTodo('buy bread');
        await todo.addTodo('buy something');
        await todo.filterCompletedTodos();
        await expect(todo.items).toHaveCount(0);
    });

    test('verify active filter', async () => {
        await todo.addTodo('buy bread');
        await todo.addTodo('buy something');
        await todo.filterActiveTodos();
        await expect(todo.items).toHaveCount(2);
    });

    test('verify All filter', async () => {
        await todo.addTodo('buy bread');
        await todo.addTodo('buy something');
        await todo.filterAllTodos();
        await expect(todo.items).toHaveCount(2);
    });

    test('verify active and completed filters for completed task', async () => {
        await todo.addTodo('buy bread');
        await todo.filterAllTodos();
        await todo.toggleTodo();
        await todo.filterActiveTodos();
        await expect(todo.items).toHaveCount(0);
        await todo.filterCompletedTodos();
        await expect(todo.items).toHaveCount(1);
    });

    test('verify clear completed', async () => {
        await todo.addTodo('buy eggs');
        await expect(todo.items).toHaveCount(1);
        await todo.toggleTodo();
        await todo.clearCompleted();
        await expect(todo.items).toHaveCount(0);
    });

    test('verify item can be deleted', async () => {
        await todo.addTodo('buy eggs');
        await todo.deleteTodoByText('buy eggs');
        await expect(todo.items).toHaveCount(0);
    });

    test('verify after item deletion only one item is visible', async () => {
        await todo.addTodo('buy bread');
        await todo.addTodo('buy something');
        await todo.deleteTodoByText('buy bread');
        await expect(todo.items).toHaveCount(1);
    });
});
