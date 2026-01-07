/**
 * Mock for @solar-icons/react-native
 *
 * Returns null for all icon components to avoid rendering issues in tests.
 * Jest automatically uses mocks from __mocks__ directory.
 */
const createIconMock = () => null;

module.exports = new Proxy(
  {},
  {
    get: () => createIconMock,
  }
);
