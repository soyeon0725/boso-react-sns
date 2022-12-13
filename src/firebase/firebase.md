- Firebase 홈페이지 : Authentication > Sign-in method > 새 제공업체 추가 > [기본 제공 업체] 이메일/비밀번호
    - https://console.firebase.google.com/u/0/project/bs-react-sns/authentication/providers

- Firebase 공식 홈페이지 : 웹 사이트에서 Firebase 인증 시작하기
    - https://firebase.google.com/docs/auth/web/start?hl=ko&authuser=0
- 1. 인증 SDK 추가 및 초기화 => Firebase.js
- 2. 신규 사용자 가입 => Todo simpleJoin 생성하기
- 3. 기존 사용자 로그인 => Login.jsx
4. 인증 상태 관찰자 설정 및 사용자 데이터 가져오기
   1. App.js 에서 useEffect(() => ,[]) 내 onAuthStateChanged 함수 호출
   2. useSelector isLoggedIn 로 로그인 여부 판단 처리 
   3. onAuthStateChanged 함수가 가지고 있는 사용자 정보 dispatch 
5. 사용자를 로그아웃하려면 signOut 을 호출
   1. Header.jsx 
   2. Logout Icon onClick 이벤트 처리 완료

- firebase : 1번 작업
- Login : Firebase 에서 제공해주는 이메일/비밀번호로 회원가입 및 로그인 연동 2~5 테스트 작업
