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
        title: "아이디를 다시 확인해주세요",
        subTitle:
          "아이디는 알파벳 대소문자로 시작하며, 알파벳 대소문자와 숫자로 이루어진 4자에서 10자 사이의 문자열이어야 합니다.",
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
    <div className="login-content text-center">
      <h2 className="text-lg font-base mb-2">아이디를 입력해주세요</h2>
      <form onSubmit={handleOnSubmit}>
        <Input
          type="id"
          placeholder="ID"
          className="w-1/2 my-5 mx-auto"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <Button
          type="submit"
          className="w-1/3 text-white py-2 rounded-full font-medium bg-blue-600 hover:bg-blue-700"
        >
          로그인
        </Button>
      </form>
    </div>
  );
};
export default LoginPopup;
