import { act } from 'react';
import { renderHook, waitFor } from '@/testing/test-utils';
import { userService } from './userService';
import {
  useCreateUser,
  useCurrentUser,
  useDeleteUser,
  useUpdateUser,
  useUser,
  useUsers,
} from './useUser';

// Mock userService
jest.mock('./userService', () => ({
  userService: {
    getMe: jest.fn(),
    getById: jest.fn(),
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('useUser hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCurrentUser', () => {
    it('should fetch current user', async () => {
      const mockUser = { id: '1', name: 'Test' };
      (userService.getMe as jest.Mock).mockResolvedValue({ data: mockUser, status: 200 });

      const { result } = renderHook(() => useCurrentUser());

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data?.data).toEqual(mockUser);
      expect(userService.getMe).toHaveBeenCalled();
    });
  });

  describe('useUser', () => {
    it('should fetch user by id', async () => {
      const mockUser = { id: '123', name: 'User 123' };
      (userService.getById as jest.Mock).mockResolvedValue({ data: mockUser, status: 200 });

      const { result } = renderHook(() => useUser('123'));

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data?.data).toEqual(mockUser);
      expect(userService.getById).toHaveBeenCalledWith('123');
    });

    it('should not fetch if id is missing', () => {
      const { result } = renderHook(() => useUser(''));
      expect(result.current.isLoading).toBe(false);
      expect(userService.getById).not.toHaveBeenCalled();
    });
  });

  describe('useUsers', () => {
    it('should fetch users list', async () => {
      const mockData = { data: [], meta: { total: 0 } };
      (userService.list as jest.Mock).mockResolvedValue({ data: mockData, status: 200 });

      const { result } = renderHook(() => useUsers({ page: 1 }));

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data?.data).toEqual(mockData);
      expect(userService.list).toHaveBeenCalledWith({ page: 1 });
    });
  });

  describe('useCreateUser', () => {
    it('should create a user', async () => {
      const mockUser = { id: 'new', name: 'New' };
      (userService.create as jest.Mock).mockResolvedValue({ data: mockUser, status: 201 });

      const { result } = renderHook(() => useCreateUser());

      await act(async () => {
        result.current.mutate({ name: 'New', email: 'n@e.com', password: 'p' });
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data?.data).toEqual(mockUser);
      expect(userService.create).toHaveBeenCalled();
    });
  });

  describe('useUpdateUser', () => {
    it('should update a user', async () => {
      const mockUser = { id: '123', name: 'Updated' };
      (userService.update as jest.Mock).mockResolvedValue({ data: mockUser, status: 200 });

      const { result } = renderHook(() => useUpdateUser('123'));

      await act(async () => {
        result.current.mutate({ name: 'Updated' });
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data?.data).toEqual(mockUser);
      expect(userService.update).toHaveBeenCalledWith('123', { name: 'Updated' });
    });
  });

  describe('useDeleteUser', () => {
    it('should delete a user', async () => {
      (userService.delete as jest.Mock).mockResolvedValue({ data: undefined, status: 204 });

      const { result } = renderHook(() => useDeleteUser());

      await act(async () => {
        result.current.mutate('123');
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(userService.delete).toHaveBeenCalledWith('123', expect.anything());
    });
  });
});
