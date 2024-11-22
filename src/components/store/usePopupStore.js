import create from "zustand";

const usePopupStore = create((set) => ({
  isOpen: false,
  content: null,
  openPopup: (content) => set({ isOpen: true, content }),
  closePopup: () => set({ isOpen: false, content: null }),
}));

export default usePopupStore;
