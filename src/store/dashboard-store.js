import { create } from "zustand";
import api from "@/api/client";

const useDashboardStore = create((set, get) => ({
  byPage: {
    files: {},
    charts: {},
    users: {}
  },
  pagination: {
    files: {},
    charts: {},
    users: {}
  },
  loading: {
    upload: false,
    fileDelete: false,
    chartDelete: false,
    files: false,
    charts: false,
    fileSharing: false,
    userFilesStats: false,
    userStats: false,
    chartSave: false,
    deleteUser: false,
    users: false
  },
  error: null,
  response: null,
  userFilesStats: {},
  userStats: {},
  setLoading: (key, value) => {
    const state = get();
    set({ loading: { ...state.loading, [key]: value } });
  },

  setError: (message) => set({ error: message }),

  uploadFile: async (formData) => {
    get().setLoading("upload", true);
    set({ error: null });

    try {
      const response = await api.post("/user/files/upload", formData);
      const result = response?.data;

      if (result?.success) return response;
      get().setError(result?.message || "Upload failed");
    } catch (error) {
      get().setError(error.message || "Upload failed");
    } finally {
      get().setLoading("upload", false);
    }
  },

  getFiles: async (page = 1, limit = 5, refresh = false) => {
    const state = get();
    if (!refresh && state.byPage.files[page]) return;

    get().setLoading("files", true);
    set({ error: null });

    try {
      const response = await api.get(`/user/files?page=${page}&limit=${limit}`);
      const result = response?.data;

      if (result?.success) {
        set({
          byPage: {
            ...state.byPage,
            files: { ...state.byPage.files, [page]: result.data },
            charts: state.byPage.charts,
          },
          pagination: {
            ...state.pagination,
            files: result.pagination,
          },
        });
      } else {
        get().setError(result?.message || "Failed to fetch files");
      }
    } catch (error) {
      get().setError(error.message || "Error fetching files");
    } finally {
      get().setLoading("files", false);
    }
  },

  deleteFile: async (fileId, page) => {
    get().setLoading("fileDelete", true);
    set({ error: null });

    try {
      const response = await api.delete(`/user/files/${fileId}`);
      const result = response?.data;

      if (result?.success) {
        const state = get();
        const updatedFiles = (state.byPage.files[page] || []).filter(f => f._id !== fileId);

        set({
          byPage: {
            ...state.byPage,
            files: {
              ...state.byPage.files,
              [page]: updatedFiles,
            },
          },
          pagination: {
            ...state.pagination,
            files: {
              ...state.pagination.files,
              total: (state.pagination.files?.total || 1) - 1,
            },
          },
        });

        return response;
      } else {
        get().setError(result?.message || "Failed to delete file");
      }
    } catch (error) {
      get().setError(error.message || "Error deleting file");
    } finally {
      get().setLoading("fileDelete", false);
    }
  },

  deleteChart: async (chartId, page) => {
    get().setLoading("chartDelete", true);
    set({ error: null });

    try {
      const response = await api.delete(`/user/charts/${chartId}`);
      const result = response?.data;

      if (result?.success) {
        const state = get();
        const updatedCharts = (state.byPage.charts[page] || []).filter(c => c._id !== chartId);

        set({
          byPage: {
            ...state.byPage,
            charts: {
              ...state.byPage.charts,
              [page]: updatedCharts,
            },
          },
          pagination: {
            ...state.pagination,
            charts: {
              ...state.pagination.charts,
              total: (state.pagination.charts?.total || 1) - 1,
            },
          },
        });

        return response;
      } else {
        get().setError(result?.message || "Failed to delete chart");
      }
    } catch (error) {
      get().setError(error.message || "Error deleting chart");
    } finally {
      get().setLoading("chartDelete", false);
    }
  },

  toggleSharing: async (fileId, sharing) => {
    get().setLoading("fileSharing", true);
    set({ error: null });

    try {
      const response = await api.patch(`/user/files/${fileId}/sharing`, { sharing });
      const result = response?.data;

      if (result?.success) {
        const state = get();
        const updatedPages = { ...state.byPage.files };

        for (const page in updatedPages) {
          updatedPages[page] = updatedPages[page].map(file =>
            file._id === fileId ? { ...file, sharing } : file
          );
        }

        set({
          byPage: {
            ...state.byPage,
            files: updatedPages,
          },
        });

        return response;
      } else {
        get().setError(result?.message || "Failed to update sharing");
      }
    } catch (error) {
      get().setError(error.message || "Error toggling sharing");
    } finally {
      get().setLoading("fileSharing", false);
    }
  },

  getUserStats: async () => {
    const state = get();

    if (Object.keys(state.userStats || {}).length !== 0) {
      return;
    }

    get().setLoading("userStats", true);
    set({ error: null });

    try {
      const response = await api.get("/admin/users/stats");
      const result = response?.data;

      if (result?.success && result?.count) {
        set({ userStats: result.count });
      } else {
        get().setError("Failed to fetch stats");
      }
    } catch (error) {
      get().setError(error.message || "Error fetching stats");
    } finally {
      get().setLoading("userStats", false);
    }
  },

  resetUserStats: () => {
    set({ userStats: {}, error: null });
    get().setLoading("userStats", false);
  },

  getUserFilesStats: async (refresh = false) => {
    const state = get();
    if (!refresh && Object.keys(state.userFilesStats).length !== 0) return;

    get().setLoading("userFilesStats", true);
    set({ error: null });

    try {
      const response = await api.get("/user/files/stats");
      const result = response?.data;

      if (result?.success) {
        set({ userFilesStats: result });
      } else {
        get().setError("Failed to fetch stats");
      }
    } catch (error) {
      get().setError(error.message || "Error fetching stats");
    } finally {
      get().setLoading("userFilesStats", false);
    }
  },

  getFileById: (fileId) => {
    const state = get();
    for (const page in state.byPage.files) {
      const file = state.byPage.files[page].find((f) => f._id === fileId);
      if (file) return file;
    }
    return null;
  },

  saveChart: async (fileId, chartType, chartSubType, chartName, data, config, xAxisDataKey, yAxisDataKey) => {
    get().setLoading("chartSave", true);
    set({ error: null });

    try {
      const response = await api.post(`/user/files/${fileId}/charts`, {
        chart: { config, data, type: chartType, subType: chartSubType, name: chartName },
        dataKey: {
          xAxis: xAxisDataKey,
          yAxis: yAxisDataKey,
        },
      });

      const result = response?.data;

      if (result?.success) {
        return response;
      } else {
        get().setError(result?.message || "Failed to save chart");
      }
    } catch (error) {
      get().setError(error.message || "Error saving chart");
    } finally {
      get().setLoading("chartSave", false);
    }
  },

  getCharts: async (page = 1, limit = 5, refresh = false, fileId = null) => {
    const state = get();
    if (!refresh && state.byPage.charts[page]) return;

    get().setLoading("charts", true);
    set({ error: null });
    let response;
    try {
      if (fileId) {
        response = await api.get(`/user/files/${fileId}/charts?page=${page}&limit=${limit}`);
      }
      else {
        response = await api.get(`/user/charts?page=${page}&limit=${limit}`);
      }

      const result = response?.data;

      if (result?.success) {
        set({
          byPage: {
            ...state.byPage,
            charts: {
              ...state.byPage.charts,
              [page]: result.data,
            },
          },
          pagination: {
            ...state.pagination,
            charts: result.pagination,
          },
          response: result
        });

      } else {
        get().setError(result?.message || "Failed to fetch charts");
      }
    } catch (error) {
      get().setError(error.message || "Error fetching charts");
    } finally {
      get().setLoading("charts", false);
    }
  },

  deleteUser: async (userId, page) => {
    const state = get();
    get().setLoading("users", true);
    set({ error: null });

    try {
      const response = await api.delete(`/admin/users/${userId}`);
      const result = response?.data;

      if (result?.success) {
        const currentPageUsers = state.byPage.users?.[page] || [];
        const updatedUsers = currentPageUsers.filter(user => user._id !== userId);

        set({
          byPage: {
            ...state.byPage,
            users: {
              ...state.byPage.users,
              [page]: updatedUsers,
            },
          },
          pagination: {
            ...state.pagination,
            users: {
              ...state.pagination.users,
              total: state.pagination.users.total - 1,
            },
          },
        });
      } else {
        get().setError(`Failed to delete user ${userId}`);
      }

      return response;
    } catch (error) {
      get().setError(error.message || "An error occurred while deleting user");
    } finally {
      get().setLoading("users", false);
    }
  },

  getUsers: async (page = 1, limit = 5) => {
    const state = get();

    if (state.byPage.users?.[page]) return;

    get().setLoading("users", true);
    set({ error: null });

    try {
      const response = await api.get(`/admin/users?page=${page}&limit=${limit}`);
      const result = response?.data;

      if (result?.success) {
        set({
          byPage: {
            ...state.byPage,
            users: {
              ...state.byPage.users,
              [page]: result.data,
            },
          },
          pagination: {
            ...state.pagination,
            users: result.pagination,
          },
        });

        return response;
      } else {
        get().setError("Failed to fetch users");
      }
    } catch (error) {
      get().setError(error.message || "An error occurred while fetching users");
    } finally {
      get().setLoading("users", false);
    }
  },



}));

export default useDashboardStore;
