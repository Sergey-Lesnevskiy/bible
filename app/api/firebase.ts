import { FirebaseApp, initializeApp, getApps } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCM28sxew7H5FpUA6OVfbLwM-GjbVIyMvI',
  authDomain: 'bible-40a75.firebaseapp.com',
  projectId: 'bible-40a75',
  storageBucket: 'bible-40a75.firebasestorage.app',
  messagingSenderId: '464383950456',
  appId: '1:464383950456:ios:d57de166c8bfbbb4e7b78d',
  measurementId: 'G-9Q84190HN2',
};

// Инициализация Firebase App с проверкой на дублирование
let app: FirebaseApp | null = null;
if (getApps().length === 0) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (error) {
    console.error('Ошибка инициализации Firebase:', error);
  }
} else {
  app = getApps()[0];
}

if (!app) {
  throw new Error('Firebase app не инициализирован');
}

// Инициализация сервисов
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);
const storage: FirebaseStorage = getStorage(app);

// Analytics не нужен для iOS
const analytics = null;

export { app, db, auth, storage, analytics };