import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@ui/resizable";
import { Button } from "@ui/button";
import { useState, useEffect } from "react";
import { getBalance, putBalanceCharge } from "@/api";
import useLoginStateStore from "../store/useLoginStateStore";
import useModalStore from "../store/useModalStore";
import usePopupStore from "../store/usePopupStore";

const ChargePopup = () => {
  const { userId } = useLoginStateStore();
  const { openModal } = useModalStore();
  const { closePopup } = usePopupStore();

  const [amount, setAmount] = useState(0); // 현재 잔액
  const [chargeAmount, setChargeAmount] = useState(50000);
  const [totalAmount, setTotalAmount] = useState(50000);

  // 팝업이 열리면, 사용자의 현재 잔액을 조회
  useEffect(() => {
    getBalance(userId)
      .then(({ response }) => {
        const res = response?.[0] || {};
        console.log("희연 res.amount", res);
        setAmount(res.amount || 0);
        setTotalAmount(res.amount + 50000 || 50000);
      })
      .catch((error) => {
        console.error(error);
        openModal({ title: "오류", subTitle: "잔액 조회에 실패했습니다." });
      });
  }, []);

  const handleIncrement = () => {
    if (chargeAmount >= 1000000) return;
    setChargeAmount((prevAmount) => prevAmount + 50000);
    setTotalAmount((prev) => prev + 50000);
  };
  const handleDecrement = () => {
    if (chargeAmount <= 50000) return;
    setChargeAmount((prevAmount) => prevAmount - 50000);
    setTotalAmount((prev) => prev - 50000);
  };

  const onClickChargeBtn = () => {
    putBalanceCharge(userId, chargeAmount)
      .then(() => {
        openModal({
          title: "알림",
          subTitle: "잔액 충전에 성공했습니다.",
          onAfterClose: closePopup(),
        });
      })
      .catch(() => {
        openModal({ title: "오류", subTitle: "잔액 충전에 실패했습니다." });
      });
  };

  return (
    <div className="charge-content flex justify-center">
      <ResizablePanelGroup
        direction="vertical"
        className="min-h-[300px] max-w-md md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full p-4 font-semibold text-lg items-center justify-between">
            <span>현재 잔액</span>
            <span className="text-right">{amount.toLocaleString()}원</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={35}>
          <div className="flex h-full items-center justify-center p-5">
            <div className="flex space-x-4 items-center">
              <Button variant="outline" onClick={handleDecrement}>
                -
              </Button>
              <div className="text-2xl font-semibold">
                {chargeAmount.toLocaleString()}원
              </div>
              <Button variant="outline" onClick={handleIncrement}>
                +
              </Button>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40}>
          <div className="flex flex-col h-full p-4 font-semibold text-base items-center justify-between">
            <div className="flex justify-between items-center w-full mb-4">
              <span className="text-blue-600">충전 후 예상 총 카드 잔액</span>
              <span className="text-right text-2xl">
                {totalAmount.toLocaleString()}원
              </span>
            </div>
            <Button
              className="w-1/2 text-white py-3 mt-3 rounded-full font-medium bg-blue-600 hover:bg-blue-700"
              onClick={onClickChargeBtn}
            >
              충전하기
            </Button>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ChargePopup;
