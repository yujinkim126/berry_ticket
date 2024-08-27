import create from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  title: "",
  desc: "",
  openModal: (title, subTitle, desc) =>
    set({ isOpen: true, title, subTitle, desc }),
  closeModal: () => set({ isOpen: false, title: "", subTitle: "", desc: "" }),
}));

export default useModalStore;
