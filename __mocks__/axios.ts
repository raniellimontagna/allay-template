const mockAxiosInstance = {
  get: jest.fn().mockResolvedValue({ data: {}, status: 200 }),
  post: jest.fn().mockResolvedValue({ data: {}, status: 201 }),
  put: jest.fn().mockResolvedValue({ data: {}, status: 200 }),
  patch: jest.fn().mockResolvedValue({ data: {}, status: 200 }),
  delete: jest.fn().mockResolvedValue({ data: {}, status: 204 }),
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() },
  },
};

const axios = {
  create: jest.fn(() => mockAxiosInstance),
  __mockInstance: mockAxiosInstance,
};

export default axios;
export { mockAxiosInstance };
