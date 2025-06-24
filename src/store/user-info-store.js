import { create } from "zustand"

const useUserInfoStore = create(set => ({
    userInfo: null,
    setUserInfo: userInfo => set({ userInfo }),
    clearUserInfo: () => set({ userInfo: null })
}))

export default useUserInfoStore
