import myFunction from './script.js';

describe('its', () => {
  it('working', () => {
    expect(myFunction('hello')).toBe('hello');
  });
});