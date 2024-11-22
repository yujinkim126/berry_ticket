import { postUserId } from "@/api";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { useState } from "react";
import useModalStore from "../store/useModalStore";
import usePopupStore from "../store/usePopupStore";
import useLoginStateStore from "../store/useLoginStateStore";

const LoginPopup = () => {
  const [inputId, setInputId] = useState("");
  const { openModal } = useModalStore();
  const { closePopup } = usePopupStore();
  const { login } = useLoginStateStore();

  const regexIdTest = (id) => {
    const regexId = /^[a-zA-Z][a-zA-Z0-9]{3,11}$/;
    return regexId.test(id);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!inputId || !regexIdTest(inputId)) {
      return openModal({
        // title: "알림",
        title: "아이디를 다시 확인해주세요",
        desc: "아이디는 알파벳 대소문자로 시작하며, 알파벳 대소문자와 숫자로 이루어진 4자에서 10자 사이의 문자열이어야 합니다.",
      });
    }
    // 로그인 요청
    postUserId(inputId).then(() => {
      // 로그인 성공
      openModal({
        title: "로그인 성공",
        subTitle: `${inputId}님, 환영합니다.`,
        onAfterClose: () => {
          login(inputId);
          closePopup();
        },
      });
    });
  };
  return (
    <div className="login-content text-center px-4 sm:px-6 md:px-8">
      <h2 className="text-base sm:text-lg md:text-2xl font-semibold mb-4 md:mb-6">
        아이디를 입력해주세요
      </h2>
      <form onSubmit={handleOnSubmit} className="flex flex-col items-center">
        <Input
          type="id"
          placeholder="ID"
          className="w-full sm:w-3/4 md:w-2/3 my-3 sm:my-4 mx-auto px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <Button
          type="submit"
          className="w-full sm:w-1/2 md:w-1/3 lg:w-2/3 mt-3 sm:mt-4 py-5 lg:py-6 rounded-full font-semibold text-sm lg:text-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          로그인
        </Button>
      </form>
    </div>
  );
};
export default LoginPopup;
