// Mock implementation of faker for testing
export const faker = {
  string: {
    uuid: () => '550e8400-e29b-41d4-a716-446655440000',
  },
  internet: {
    email: () => 'test@example.com',
  },
  person: {
    firstName: () => 'John',
    lastName: () => 'Doe',
  },
  company: {
    name: () => 'Test Company',
  },
  lorem: {
    sentence: () => 'This is a test sentence.',
  },
};

export default faker;
