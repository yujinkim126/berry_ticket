import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import useModalStore from "../../store/useModalStore";

const GlobalModal = () => {
  const { isOpen, title, subTitle, desc, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={closeModal}
      onCloseAfter={closeModal}
      type={"modal"}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p>{desc}</p>
        </div>
        <DialogFooter>
          <DialogClose className="btn" onClick={closeModal}>
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalModal;
