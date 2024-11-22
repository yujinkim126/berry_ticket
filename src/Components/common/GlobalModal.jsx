// GlobalModal.js
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/Components/ui/dialog";
import useModalStore from "../store/useModalStore";

const GlobalModal = () => {
  const { isOpen, title, subTitle, desc, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal} type="modal">
      <DialogContent className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-4 sm:p-6 md:p-8 rounded-lg shadow-lg bg-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-center">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base md:text-lg text-gray-600 mt-2">
            {subTitle}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 text-base text-center md:text-2xl text-gray-700">
          <p>{desc}</p>
        </div>
        <DialogFooter className="flex justify-center mt-6 mx-auto">
          <DialogClose
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base md:text-lg rounded-md"
            onClick={closeModal}
          >
            확인
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalModal;
