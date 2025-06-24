import { create } from "zustand";
import api from "@/api/client";

const useFilesStore = create((set, get) => ({
    filesByPage: {},
    loading: false,
    sharingLoading : false,
    statsLoading: false,
    error: null,
    pagination: {},
    stats: {},
    uploadFile: async (formData) => {
        set({ loading: true, error: null });

        try {
            const response = await api.post("/user/files/upload", formData);

            const result = response?.data;

            if (result?.success) {
                set({ loading: false });
                return response
            } else {
                set({ loading: false, error: result?.message || "Upload failed" });
            }
        } catch (error) {
            set({ loading: false, error: error.message || "Upload failed" });
        }
    },

    getFiles: async (page = 1, limit = 5) => {
        const state = get();

        if (state.filesByPage[page]) return;

        set({ loading: true, error: null });

        try {
            const response = await api.get(`/user/files?page=${page}&limit=${limit}`);
            const result = response?.data;

            if (result?.success) {
                const { data, pagination } = result;

                set({
                    filesByPage: {
                        ...state.filesByPage,
                        [page]: data,
                    },
                    pagination,
                    loading: false,
                });
            } else {
                set({ loading: false, error: result?.message || "Failed to fetch files" });
            }
        } catch (error) {
            set({ loading: false, error: error.message || "Error fetching files" });
        }
    },

    deleteFile: async (fileId, page) => {
        set({ loading: true, error: null });

        try {
            const response = await api.delete(`/user/files/${fileId}`);
            const result = response?.data;

            if (result?.success) {
                const state = get();
                const currentFiles = state.filesByPage[page] || [];
                const updatedFiles = currentFiles.filter((file) => file._id !== fileId);

                set({
                    filesByPage: {
                        ...state.filesByPage,
                        [page]: updatedFiles,
                    },
                    pagination: {
                        ...state.pagination,
                        total: state.pagination.total - 1,
                    },
                    loading: false,
                });
            } else {
                set({ loading: false, error: result?.message || "Failed to delete file" });
            }

            return response;
        } catch (error) {
            set({ loading: false, error: error.message || "Error deleting file" });
        }
    },

    toggleSharing: async (fileId, sharing) => {
        set({ sharingLoading: true, error: null });

        const state = get();

        try {
            const response = await api.patch(`/user/files/${fileId}/sharing`, { sharing });
            const result = response?.data;
            const state = get();

            console.log("result", result)

            if (result?.success) {
                const updatedPages = { ...state.filesByPage };

                for (const page in updatedPages) {
                    updatedPages[page] = updatedPages[page].map((file) =>
                        file._id === fileId ? { ...file, sharing } : file
                    );
                }

                set({ filesByPage: updatedPages })
                set({ sharingLoading: false, error: null });
                return response
            } else {
                set({ sharingLoading: false, error: result?.message || "Failed to update sharing" });
            }
        } catch (error) {
            set({ sharingLoading: false, error: error.message || "Error toggling sharing" });
        }
    },

    fetchStats: async () => {
        const state = get();

        if (Object.keys(state.stats).length != 0) return

        set({ statsLoading: true, error: null });

        try {
            const response = await api.get("/user/files/stats");
            const result = response?.data;

            if (result?.success) {
                set({ stats: result, statsLoading: false });
            } else {
                set({ statsLoading: false, error: "Failed to fetch stats" });
            }
        } catch (error) {
            set({ statsLoading: false, error: error.message || "Error fetching stats" });
        }
    },
    getFileById: (fileId) => {
        const state = get();
        for (const page in state.filesByPage) {
            const file = state.filesByPage[page].find((f) => f._id === fileId);
            if (file) return file;
        }
        return null;
    },

}));

export default useFilesStore;
