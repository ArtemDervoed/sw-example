import Dexie from 'dexie';
const db = new Dexie('MyDatabase');

db.version(1).stores({
  data: '++id, time, text'
});

const addInDB = (e) => {
  db.data.put({
		time: e.data.time,
		text: e.data.text,
	}).then(() => {
    e.ports[0].postMessage("success");
  }).catch(() => {
    e.ports[0].postMessage("failerule");
  });
}

self.addEventListener('install', (event) => {
  console.log('Установлен');
});

self.addEventListener('activate', (event) => {
  self.clients.claim()
});

self.addEventListener('message', (event) => {
  addInDB(event);
});