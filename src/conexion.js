// ============================================================
//  conexion.js — Cliente de Firebase Firestore (singleton)
// ============================================================

//import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
//import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

//const firebaseConfig = {
//  apiKey:            'AIzaSyAxTyDOPzOPkWHgLu7iy4lcCxbRyxG_Akk',
//  authDomain:        'golden-julian.firebaseapp.com',
//  projectId:         'golden-julian',
//  storageBucket:     'golden-julian.firebasestorage.app',
//  messagingSenderId: '599121397465',
//  appId:             '1:599121397465:web:d7f3022883cf58e560a0c8',
//};

//const app = getApps().length === 0
//  ? initializeApp(firebaseConfig)
//  : getApp();
//
//export const db = getFirestore(app);


import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { CONFIG } from './config.js';

const app = getApps().length === 0
  ? initializeApp(CONFIG.FIREBASE_CONFIG)
  : getApp();

export const db = getFirestore(app);