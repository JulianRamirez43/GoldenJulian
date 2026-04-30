// ============================================================
//  conexion.js — Cliente de Firebase Firestore (singleton)
// ============================================================

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { CONFIG } from './config.js';

const app = getApps().length === 0
  ? initializeApp(CONFIG.FIREBASE_CONFIG)
  : getApp();

export const db = getFirestore(app);
