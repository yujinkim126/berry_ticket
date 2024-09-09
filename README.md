
# ✔️ 콘서트 예약 사이트

## 📍 참여자 및 역할 분담

| 참여자 | 구현 기능 | github | 
| --- | --- | --- |
| 박희연 | 헤더, 콘서트 리스트, 콘서트 상세, 잔액 충전, 팝업 |  [Park-Heeyeon](https://github.com/Park-Heeyeon) 
| 김유진 | 예약 현황, 일정/좌석 선택 화면, 결제하기 |  [yujinkim126](https://github.com/yujinkim126)


## 📍 주요 기능
- Tailwind css 및 ShadCn/ui를 활용한 스타일 구성
- MSW(mocking)을 통한 공연 정보 조회 및 상세 화면 구현 
- React-Query를 이용한 전역 데이터 상태값 관리 및 스켈레톤 화면 구성
- zustand를 이용한 공통 팝업 처리 및 상태값 관리
- react-router-dom v6를 이용한 로그인 여부에 따른 화면 분기 처리
- polling 처리를 이용한 대기열 구현


## 📍 구현 내용
- 유저 잔액 충전 및 관리 
- 공연 리스트 및 상세 화면 구현
- 대기열 관리
- 일정 및 좌석 선택, 좌석 선점 화면
- 예약 현황 조회 및 결제 화면 구현
- 실제 API 연동 후 에러 처리 (예정)

## 📍 사용 기술
### 코어 기술
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white" />

### 스타일링
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
<img src="https://img.shields.io/badge/Shadcn/Ui-000000?style=for-the-badge&logo=Shadcn&logoColor=white">

### 상태 관리 및 데이터 처리
<img src="https://img.shields.io/badge/Zustand-cccccc?style=for-the-badge&logo=Zustand&logoColor=white">
<img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white">

### 개발 및 테스트 도구
<img src="https://img.shields.io/badge/MSW-ff6933?style=for-the-badge&logo=MSW&logoColor=white">
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=Jest&logoColor=white">


## 📍 프로젝트 구조
```
📦 
├─ .env.development
├─ README.md
├─ src
│  ├─ App.jsx
│  ├─ Components
│  │  ├─ Header.jsx
│  │  ├─ Home.jsx
│  │  ├─ common
│  │  │  ├─ GlobalModal.jsx
│  │  │  └─ GlobalPopup.jsx
│  │  ├─ concertList
│  │  │  ├─ ConcertCard.jsx
│  │  │  ├─ ConcertList.jsx
│  │  │  └─ ConcertDetail.jsx
│  │  │  └─ ConcertListSkeleton.jsx
│  │  ├─ popup
│  │  │  ├─ ChargePopup.jsx
│  │  │  ├─ LoginPopup.jsx
│  │  │  └─ QueuePopup.jsx
│  │  ├─ reservation
│  │  │  ├─ ConcertDate.jsx
│  │  │  ├─ CurrentConcertCard.jsx
│  │  │  ├─ CurrentReservationPage.jsx
│  │  │  ├─ ReservationPage.jsx
│  │  │  ├─ Seat.jsx
│  │  │  └─ SeatGrid.jsx
│  │  ├─ store
│  │  │  ├─ useLoginStateStore.js
│  │  │  ├─ useModalStore.js
│  │  │  └─ usePopupStore.js
│  │  └─ ui
│  │     ├─ button.jsx
│  │     ├─ dialog.jsx
│  │     └─ input.jsx
│  │     ├─ calendar.jsx
│  │     └─ resizable.jsx
│  ├─ api
│  │  ├─ index.js
│  │  └─ server.js
│  ├─ hooks
│  │  └─ useConcertQuery.js
│  ├─ index.css
│  ├─ lib
│  │  └─ utils.js
│  ├─ main.jsx
│  ├─ mocks
│  │  ├─ browser.js
│  │  ├─ handlers.js
│  │  └─ mockData.json
│  └─ route
│     └─ ProtectedRoute.jsx
├─ tailwind.config.js
└─ vite.config.js
```


## 📍 구현 화면
🖥 메인 화면 및 공연 리스트
<img src="https://github.com/user-attachments/assets/6d2d3f5d-4de3-4b18-bf84-3e0f2adf03d0" />

🖥 공연 상세 화면
<img src="https://github.com/user-attachments/assets/5a37421e-2c0c-4f62-8fa7-92758ea0743b" />


- 예매하기 > 미로그인
<img src="https://github.com/user-attachments/assets/c7b15183-a9ed-42db-9126-c2307ab8ef0c"/>



- 예매하기 > 대기열 있는 경우
<img src="https://github.com/user-attachments/assets/17259af7-85a3-4449-b782-15a36f1db2a6" />



- 예매하기 > 대기열 없는 경우
<img src="https://github.com/user-attachments/assets/e9259ba9-05fa-497b-9168-a8fe3b016377" />

🖥 예매하기 팝업
- 일정 선택
<img src="https://github.com/user-attachments/assets/e9259ba9-05fa-497b-9168-a8fe3b016377" />

- 좌석 선택 및 결제 시나리오
<img src="https://github.com/user-attachments/assets/c4489c6d-f1ed-4bab-b88c-504e9ab7fae6" />


## 📍 To Do List
- 실제 백엔드 API와 연동 (백엔드 개발 진행 중)
- 소셜 로그인 (카카오,네이버) 연동
- 잔액 충전 기능에 카카오페이 연동

</br>


