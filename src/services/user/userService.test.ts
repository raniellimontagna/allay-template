import { api } from '@/services/api';
import type { CreateUserDTO, UpdateUserDTO } from './userService';
import { userService } from './userService';

// Mock the api module
jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMe', () => {
    it('should call api.get with /users/me', async () => {
      const mockUser = { id: '1', name: 'Test', email: 'test@test.com', createdAt: '2024-01-01' };
      (api.get as jest.Mock).mockResolvedValue({ data: mockUser, status: 200 });

      await userService.getMe();

      expect(api.get).toHaveBeenCalledWith('/users/me');
    });
  });

  describe('getById', () => {
    it('should call api.get with user id', async () => {
      const userId = 'user-123';
      (api.get as jest.Mock).mockResolvedValue({ data: {}, status: 200 });

      await userService.getById(userId);

      expect(api.get).toHaveBeenCalledWith(`/users/${userId}`);
    });
  });

  describe('list', () => {
    it('should call api.get without params', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: { data: [], meta: {} }, status: 200 });

      await userService.list();

      expect(api.get).toHaveBeenCalledWith('/users');
    });

    it('should call api.get with pagination params', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: { data: [], meta: {} }, status: 200 });

      await userService.list({ page: 2, limit: 10 });

      expect(api.get).toHaveBeenCalledWith('/users?page=2&limit=10');
    });

    it('should call api.get with only page param', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: { data: [], meta: {} }, status: 200 });

      await userService.list({ page: 3 });

      expect(api.get).toHaveBeenCalledWith('/users?page=3');
    });
  });

  describe('create', () => {
    it('should call api.post with user data', async () => {
      const createData: CreateUserDTO = {
        name: 'New User',
        email: 'new@test.com',
        password: 'password123',
      };
      (api.post as jest.Mock).mockResolvedValue({ data: {}, status: 201 });

      await userService.create(createData);

      expect(api.post).toHaveBeenCalledWith('/users', createData);
    });
  });

  describe('update', () => {
    it('should call api.patch with user id and data', async () => {
      const userId = 'user-123';
      const updateData: UpdateUserDTO = { name: 'Updated Name' };
      (api.patch as jest.Mock).mockResolvedValue({ data: {}, status: 200 });

      await userService.update(userId, updateData);

      expect(api.patch).toHaveBeenCalledWith(`/users/${userId}`, updateData);
    });
  });

  describe('delete', () => {
    it('should call api.delete with user id', async () => {
      const userId = 'user-123';
      (api.delete as jest.Mock).mockResolvedValue({ data: null, status: 204 });

      await userService.delete(userId);

      expect(api.delete).toHaveBeenCalledWith(`/users/${userId}`);
    });
  });
});
