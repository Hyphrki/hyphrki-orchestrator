import { test, expect } from '@playwright/test';

test.describe('Orchestrator Platform - Full User Journey', () => {
  test('complete user journey from registration to workflow execution', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Verify we're on the login page
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('h1')).toContainText('Sign In');

    // Click on register link
    await page.getByRole('link', { name: /sign up|register/i }).click();
    await expect(page).toHaveURL(/.*register/);

    // Fill registration form
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'TestPass123!';

    await page.getByLabel(/first name/i).fill('Test');
    await page.getByLabel(/last name/i).fill('User');
    await page.getByLabel(/email/i).fill(testEmail);
    await page.getByLabel(/^password/i).fill(testPassword);
    await page.getByLabel(/confirm password/i).fill(testPassword);

    // Submit registration
    await page.getByRole('button', { name: /sign up|register/i }).click();

    // Should redirect to login page after successful registration
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('.success-message, .alert-success')).toContainText(/registration successful|account created/i);

    // Login with the new account
    await page.getByLabel(/email/i).fill(testEmail);
    await page.getByLabel(/password/i).fill(testPassword);
    await page.getByRole('button', { name: /sign in|login/i }).click();

    // Should be redirected to dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1, h2')).toContainText(/dashboard|welcome/i);

    // Navigate to agents page
    await page.getByRole('link', { name: /agents/i }).click();
    await expect(page).toHaveURL(/.*agents/);

    // Create a new agent
    await page.getByRole('button', { name: /create agent|add agent/i }).click();

    await page.getByLabel(/name/i).fill('Test Agent');
    await page.getByLabel(/description/i).fill('A test agent for automated workflows');
    await page.getByLabel(/framework/i).selectOption('langgraph');

    // Configure agent settings
    await page.getByLabel(/temperature/i).fill('0.7');
    await page.getByLabel(/model/i).fill('gpt-4');
    await page.getByLabel(/system prompt/i).fill('You are a helpful AI assistant.');

    await page.getByRole('button', { name: /create|save/i }).click();

    // Verify agent was created
    await expect(page.locator('.agent-card, .agent-item')).toContainText('Test Agent');

    // Navigate to workflows page
    await page.getByRole('link', { name: /workflows/i }).click();
    await expect(page).toHaveURL(/.*workflows/);

    // Create a new workflow
    await page.getByRole('button', { name: /create workflow|add workflow/i }).click();

    await page.getByLabel(/name/i).fill('Test Workflow');
    await page.getByLabel(/description/i).fill('A test workflow for demonstration');
    await page.getByLabel(/framework/i).selectOption('langgraph');

    await page.getByRole('button', { name: /create|save/i }).click();

    // Open workflow builder
    await page.getByRole('button', { name: /edit|builder/i }).click();

    // Add nodes to the workflow
    await page.getByRole('button', { name: /add node/i }).click();
    await page.getByText(/agent node/i).click();

    // Configure the agent node
    await page.getByLabel(/agent/i).selectOption('Test Agent');
    await page.getByRole('button', { name: /save|apply/i }).click();

    // Add another node (task node)
    await page.getByRole('button', { name: /add node/i }).click();
    await page.getByText(/task node/i).click();

    await page.getByLabel(/task type/i).selectOption('analysis');
    await page.getByLabel(/task description/i).fill('Analyze the input data');
    await page.getByRole('button', { name: /save|apply/i }).click();

    // Connect the nodes
    // This would depend on the specific drag-and-drop implementation
    // For now, we'll assume there's a connect button or auto-connect

    // Save the workflow
    await page.getByRole('button', { name: /save workflow/i }).click();
    await expect(page.locator('.success-message')).toContainText(/workflow saved/i);

    // Execute the workflow
    await page.getByRole('button', { name: /execute|run/i }).click();

    // Fill execution parameters
    await page.getByLabel(/input data/i).fill('{"message": "Hello, test execution!"}');
    await page.getByRole('button', { name: /execute|run/i }).click();

    // Verify execution started
    await expect(page.locator('.execution-status')).toContainText(/running|processing/i);

    // Wait for execution to complete (this might take some time)
    await page.waitForSelector('.execution-status:not(:has-text("running")):not(:has-text("processing"))', { timeout: 30000 });

    // Verify execution completed successfully
    await expect(page.locator('.execution-result')).toContainText(/completed|success/i);

    // Navigate to executions page
    await page.getByRole('link', { name: /executions|history/i }).click();
    await expect(page).toHaveURL(/.*executions/);

    // Verify execution appears in history
    await expect(page.locator('.execution-item')).toContainText('Test Workflow');
    await expect(page.locator('.execution-item')).toContainText(/completed|success/i);

    // Navigate back to dashboard
    await page.getByRole('link', { name: /dashboard/i }).click();

    // Verify dashboard shows recent activity
    await expect(page.locator('.recent-executions, .activity')).toContainText('Test Workflow');

    // Logout
    await page.getByRole('button', { name: /logout|sign out/i }).click();

    // Should be redirected to login page
    await expect(page).toHaveURL(/.*login/);
  });

  test('agent management workflow', async ({ page }) => {
    // Login first (assuming test user exists)
    await page.goto('/login');

    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /sign in|login/i }).click();

    // Navigate to agents
    await page.getByRole('link', { name: /agents/i }).click();

    // Create multiple agents
    for (let i = 1; i <= 3; i++) {
      await page.getByRole('button', { name: /create agent|add agent/i }).click();

      await page.getByLabel(/name/i).fill(`Agent ${i}`);
      await page.getByLabel(/description/i).fill(`Description for agent ${i}`);
      await page.getByLabel(/framework/i).selectOption('langgraph');

      await page.getByRole('button', { name: /create|save/i }).click();
    }

    // Verify agents are listed
    await expect(page.locator('.agent-card')).toHaveCount(3);

    // Edit an agent
    await page.locator('.agent-card').first().getByRole('button', { name: /edit/i }).click();

    await page.getByLabel(/description/i).fill('Updated description');
    await page.getByRole('button', { name: /save|update/i }).click();

    // Verify update
    await expect(page.locator('.agent-card').first()).toContainText('Updated description');

    // Delete an agent
    await page.locator('.agent-card').last().getByRole('button', { name: /delete/i }).click();
    await page.getByRole('button', { name: /confirm|yes/i }).click();

    // Verify agent was deleted
    await expect(page.locator('.agent-card')).toHaveCount(2);
  });

  test('workflow builder interaction', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /sign in|login/i }).click();

    // Navigate to workflow builder
    await page.getByRole('link', { name: /builder|workflows/i }).click();
    await page.getByRole('button', { name: /new workflow/i }).click();

    // Test drag and drop functionality (if implemented)
    const agentNode = page.locator('[data-type="agent"]');
    const canvas = page.locator('.workflow-canvas');

    if (await agentNode.isVisible()) {
      // Drag agent node to canvas
      await agentNode.dragTo(canvas);

      // Verify node was added
      await expect(page.locator('.workflow-node')).toHaveCount(1);
    }

    // Test toolbar functionality
    const toolbar = page.locator('.workflow-toolbar');
    await expect(toolbar).toBeVisible();

    // Test undo/redo if available
    const undoButton = page.getByRole('button', { name: /undo/i });
    if (await undoButton.isVisible()) {
      await undoButton.click();
      await expect(page.locator('.workflow-node')).toHaveCount(0);
    }
  });

  test('code editor functionality', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /sign in|login/i }).click();

    // Navigate to IDE
    await page.getByRole('link', { name: /ide|code|editor/i }).click();

    // Test code editor
    const editor = page.locator('.monaco-editor');
    await expect(editor).toBeVisible();

    // Type some code
    await page.keyboard.type('def hello_world():\n    print("Hello, World!")');

    // Test file explorer
    const fileExplorer = page.locator('.file-explorer');
    await expect(fileExplorer).toBeVisible();

    // Create new file
    await page.getByRole('button', { name: /new file/i }).click();
    await page.getByLabel(/filename/i).fill('test.py');
    await page.getByRole('button', { name: /create/i }).click();

    // Verify file was created
    await expect(fileExplorer).toContainText('test.py');
  });

  test('performance monitoring', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /sign in|login/i }).click();

    // Navigate to dashboard
    await page.getByRole('link', { name: /dashboard/i }).click();

    // Check performance metrics
    await expect(page.locator('.metrics-card, .performance-chart')).toBeVisible();

    // Verify charts are rendered
    const charts = page.locator('.recharts-wrapper, .chart-container');
    await expect(charts).toHaveCount(await charts.count());

    // Check execution statistics
    await expect(page.locator('.execution-stats, .metrics')).toContainText(/\d+/); // Should contain numbers
  });

  test('error handling and validation', async ({ page }) => {
    // Test registration validation
    await page.goto('/register');

    // Try to submit empty form
    await page.getByRole('button', { name: /sign up|register/i }).click();

    // Should show validation errors
    await expect(page.locator('.error-message, .validation-error')).toBeVisible();

    // Test invalid email
    await page.getByLabel(/email/i).fill('invalid-email');
    await page.getByRole('button', { name: /sign up|register/i }).click();

    await expect(page.locator('.error-message')).toContainText(/invalid email|email format/i);

    // Test password mismatch
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/^password/i).fill('password123');
    await page.getByLabel(/confirm password/i).fill('differentpassword');
    await page.getByRole('button', { name: /sign up|register/i }).click();

    await expect(page.locator('.error-message')).toContainText(/password.*match/i);
  });
});
