// useModalStore.js
import create from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  title: "",
  subTitle: "",
  desc: "",
  onAfterClose: () => null, // 기본 값 설정
  openModal: ({ title, subTitle, desc, onAfterClose }) =>
    set({
      isOpen: true,
      title,
      subTitle,
      desc,
      onAfterClose: onAfterClose || (() => null),
    }),
  closeModal: () =>
    set((state) => {
      state.onAfterClose(); // 모달이 닫힐 때 onAfterClose 호출
      return {
        isOpen: false,
        title: "",
        subTitle: "",
        desc: "",
        onAfterClose: () => null,
      };
    }),
}));

export default useModalStore;
