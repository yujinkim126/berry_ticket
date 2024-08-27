import usePopupStore from "../../store/usePopupStore";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const GlobalPopup = () => {
  const { isOpen, content, closePopup } = usePopupStore();

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={closePopup}>
      <DialogContent className="max-w-4xl">
        <div className="p-6">
          {content && content} {/*  컴포넌트를 직접 전달 */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalPopup;
