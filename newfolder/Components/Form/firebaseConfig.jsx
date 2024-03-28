// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: 'AIzaSyCYWuU0edhmz4PdQmFyJdyipp5vLd9bkhM',
    authDomain: 'ecom-c0089.firebaseapp.com',
    projectId: 'ecom-c0089',
    storageBucket: 'ecom-c0089.appspot.com',
    messagingSenderId: '436728699962',
    appId: '1:436728699962:web:6040a3b9975f91a97d2903',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
