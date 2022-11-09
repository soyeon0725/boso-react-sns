//firebase.js
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';

const firebaseConfig = {
    // firebase 설정과 관련된 개인 정보
    apiKey: "AIzaSyBBNzfCEdwiu7mI0_XpdFLw9YVLUrffUGQ",
    authDomain: "bs-react-sns.firebaseapp.com",
    projectId: "bs-react-sns",
    storageBucket: "bs-react-sns.appspot.com",
    messagingSenderId: "599177713008",
    appId: "1:599177713008:web:5a054389ca52428d0a6bb5",
    measurementId: "G-BJ105SH2SJ"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };
