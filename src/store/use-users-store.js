import { create } from "zustand";
import api from "@/api/client";

const useUsersStore = create((set, get) => ({
    usersByPage: {},
    loading: false,
    error: null,
    pagination: {},

    deleteUser: async (userId, page) => {
        set({ loading: true, error: null });

        try {
            const response = await api.delete(`/admin/users/${userId}`);
            const result = response?.data;

            if (result?.success) {
                const state = get();
                const currentPageUsers = state.usersByPage[page] || [];
                const updatedUsers = currentPageUsers.filter(user => user._id !== userId);

                set({
                    usersByPage: {
                        ...state.usersByPage,
                        [page]: updatedUsers,
                    },
                    pagination: {
                        ...state.pagination,
                        total: state.pagination.total - 1,
                    },
                    loading: false,
                    error: null,
                });
            } else {
                set({ loading: false, error: `Failed to delete user ${userId}` });
            }

            return response;
        } catch (error) {
            set({ loading: false, error: error.message || "An error occurred" });
        }
    },

    getUsers: async (page = 1) => {
        const state = get();

        if (state.usersByPage[page]) {
            return
        };

        set({ loading: true, error: null });

        try {
            const response = await api.get(`/admin/users?page=${page}&limit=5`);
            const result = response?.data;

            if (result?.success) {
                const { pagination, data } = result;

                set((state) => ({
                    usersByPage: {
                        ...state.usersByPage,
                        [page]: data,
                    },
                    pagination,
                    loading: false,
                    error: null,
                }));

                return response
            } else {
                set({ loading: false, error: "Failed to fetch users" });
            }
        } catch (error) {
            set({ loading: false, error: error.message || "An error occurred" });
        }
    },
}));


export default useUsersStore