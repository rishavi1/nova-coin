// NOVACOIN shared demo data. Requires Firebase Anonymous Authentication enabled.
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { getDatabase, ref, get, set, onValue } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDyK_O6VgYzNqymI_l4KpM9FUun0TdlHcY",
  authDomain: "novacoin-176e4.firebaseapp.com",
  databaseURL: "https://novacoin-176e4-default-rtdb.firebaseio.com",
  projectId: "novacoin-176e4",
  storageBucket: "novacoin-176e4.firebasestorage.app",
  messagingSenderId: "55449119148",
  appId: "1:55449119148:web:63d64991ba1555010fb209",
  measurementId: "G-MQTZC1LKRL"
};

const FOLDER_SCOPE = location.pathname.slice(0, location.pathname.lastIndexOf('/') + 1) || '/';
const ACCOUNT_KEY = 'novacoin-account-v1:' + FOLDER_SCOPE;
const TX_KEY = 'novacoin-wallet-transactions:' + FOLDER_SCOPE;
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const accountRef = ref(db, 'sharedDemo/account');
const txRef = ref(db, 'sharedDemo/transactions');
let applyingRemote = false;
let lastAccountSignature = '';
let lastTxSignature = '';
let lastWriteAt = 0;
let pendingAccount = null;
let accountTimer = null;

function safeJSON(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key) || 'null'); return v == null ? fallback : v; }
  catch (_) { return fallback; }
}
function accountPayload(raw) {
  const s = raw || {};
  return {
    balance: Number.isFinite(Number(s.balance)) ? Number(s.balance) : 0,
    positions: Array.isArray(s.positions) ? s.positions : [],
    closed: Array.isArray(s.closed) ? s.closed : [],
    nextId: Number.isFinite(Number(s.nextId)) ? Number(s.nextId) : 1,
    accountLocked: s.accountLocked === true
  };
}
function signature(v) { return JSON.stringify(v); }
function dispatchAccount(s) {
  applyingRemote = true;
  try {
    const old = safeJSON(ACCOUNT_KEY, {});
    const local = { ...old, ...s };
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(local));
    window.dispatchEvent(new CustomEvent('novacoin-remote-state', { detail: local }));
  } finally { applyingRemote = false; }
}
function dispatchTransactions(list) {
  const safe = Array.isArray(list) ? list : [];
  applyingRemote = true;
  try {
    localStorage.setItem(TX_KEY, JSON.stringify(safe));
    window.dispatchEvent(new CustomEvent('novacoin-remote-transactions', { detail: safe }));
  } finally { applyingRemote = false; }
}

const ready = (async () => {
  await signInAnonymously(auth);
  const [aSnap, tSnap] = await Promise.all([get(accountRef), get(txRef)]);
  if (!aSnap.exists()) {
    const local = safeJSON(ACCOUNT_KEY, { balance: 0, positions: [], closed: [], nextId: 1, accountLocked: true });
    const seed = accountPayload(local);
    await set(accountRef, seed);
    lastAccountSignature = signature(seed);
    dispatchAccount(seed);
  } else {
    const a = accountPayload(aSnap.val());
    lastAccountSignature = signature(a);
    dispatchAccount(a);
  }
  if (!tSnap.exists()) {
    const tx = safeJSON(TX_KEY, []);
    await set(txRef, Array.isArray(tx) ? tx : []);
    lastTxSignature = signature(Array.isArray(tx) ? tx : []);
    dispatchTransactions(Array.isArray(tx) ? tx : []);
  } else {
    const tx = tSnap.val();
    const list = Array.isArray(tx) ? tx : Object.values(tx || {});
    lastTxSignature = signature(list);
    dispatchTransactions(list);
  }
  onValue(accountRef, snap => {
    if (!snap.exists()) return;
    const next = accountPayload(snap.val());
    const sig = signature(next);
    if (sig !== lastAccountSignature) {
      lastAccountSignature = sig;
      dispatchAccount(next);
    }
  });
  onValue(txRef, snap => {
    const v = snap.val();
    const list = Array.isArray(v) ? v : Object.values(v || {});
    const sig = signature(list);
    if (sig !== lastTxSignature) {
      lastTxSignature = sig;
      dispatchTransactions(list);
    }
  });
})();

window.NOVACOIN_FIREBASE_READY = ready;
window.NOVACOIN_FIREBASE = {
  async saveAccountState(raw) {
    await ready;
    if (applyingRemote) return;
    const payload = accountPayload(raw);
    const sig = signature(payload);
    if (sig === lastAccountSignature) return;
    pendingAccount = payload;
    clearTimeout(accountTimer);
    accountTimer = setTimeout(async () => {
      const toWrite = pendingAccount;
      if (!toWrite || applyingRemote) return;
      try {
        await set(accountRef, toWrite);
        lastAccountSignature = signature(toWrite);
      } catch (err) { console.error('NOVACOIN shared account save failed:', err); }
    }, 350);
  },
  async saveTransactions(list) {
    await ready;
    if (applyingRemote) return;
    const safe = Array.isArray(list) ? list : [];
    const sig = signature(safe);
    if (sig === lastTxSignature) return;
    try { await set(txRef, safe); lastTxSignature = sig; }
    catch (err) { console.error('NOVACOIN transaction sync failed:', err); }
  },
  async getAccount() { await ready; return accountPayload(safeJSON(ACCOUNT_KEY, {})); },
  async getTransactions() { await ready; return safeJSON(TX_KEY, []); }
};
