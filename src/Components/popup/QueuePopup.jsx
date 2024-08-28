import { Button } from "@ui/button";
import usePopupStore from "../store/usePopupStore";

const QueuePopup = ({ estimatedTime = 60, queueNumber = 2000 }) => {
  // 원형 그래프 관련 값들
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const { closePopup } = usePopupStore();

  return (
    <div className="queue-content text-center">
      <h2 className="text-lg font-bold mb-2">서비스 접속 대기중</h2>
      <p className="text-sm text-gray-600 mb-4">
        예상대기시간 : {estimatedTime}초
      </p>

      {/* 원형 그래프 */}
      <div className="relative flex items-center justify-center mb-4">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <defs>
            <linearGradient
              id="graphGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#4caf50", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#2196f3", stopOpacity: 1 }}
              />
            </linearGradient>
            <style>
              {`
                @keyframes spin {
                  0% {
                    stroke-dashoffset: 0;
                  }
                  100% {
                    stroke-dashoffset: ${circumference};
                  }
                }
                .spin {
                  animation: spin 1.5s linear infinite;
                }
              `}
            </style>
          </defs>
          {/* 원형 그래프의 배경 */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#e6e6e6"
            strokeWidth="10"
          />
          {/* 원형 그래프의 진행 표시 */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="url(#graphGradient)"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={0}
            strokeLinecap="round"
            className="spin" // 애니메이션을 적용할 클래스
            transform="rotate(-90 70 70)" // 원형 그래프를 위쪽에서 시작하도록 회전
          />
          <text
            x="50%"
            y="35%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="14"
            fontWeight="base"
            fill="#333"
          >
            대기순번
          </text>
          <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="24"
            fontWeight="bold"
            fill="#333"
          >
            {queueNumber}
          </text>
        </svg>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        잠시만 기다리시면 서비스로 자동 접속됩니다.
      </p>

      <Button
        onClick={closePopup}
        className="w-full text-white py-2 rounded-full font-medium bg-blue-600 hover:bg-blue-700"
      >
        다음에 접속하기
      </Button>
    </div>
  );
};

export default QueuePopup;
