import { create } from "zustand";
import api from "@/api/client";

const useUserStatsStore = create((set, get) => ({
    stats: null,
    loading: false,
    error: null,
    getStats: async () => {
        
        if (get().stats) {
            return;
        }

        set({ loading: true, error: null });
        try {
            const response = await api.get("/admin/users/stats");

            if (response?.data?.success && response?.data?.count) {
                set({ stats: response?.data?.count, loading: false });
            } else {
                set({ loading: false, error: "Failed to fetch stats" });
            }
        } catch (error) {
            set({ loading: false, error: error.message });
        }
    },

    resetStats: () => set({ stats: null, loading: false, error: null }),
}));

export default useUserStatsStore;
