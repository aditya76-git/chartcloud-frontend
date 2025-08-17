import { create } from "zustand"

const useUserInfoStore = create(set => ({
    userInfo: null,
    setUserInfo: userInfo => set({ userInfo }),
    clearUserInfo: () => set({ userInfo: null }),
    defaultParsedFile: null,
    setDefaultParsedFile: (file) => {
        set({ defaultParsedFile: file })
    },
    language: localStorage.getItem('language') ?? "en",
    setLanguage: (language) => {
        set({ language: language })
        localStorage.setItem("language", language)
    }
}))

export default useUserInfoStore
