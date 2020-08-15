import app from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCoyAtwJ5xdtA5M-LgjsWxzB0MaC-k81Wo',
  authDomain: 'react-firebase-crud-rifandani.firebaseapp.com',
  databaseURL: 'https://react-firebase-crud-rifandani.firebaseio.com',
  projectId: 'react-firebase-crud-rifandani',
  storageBucket: 'react-firebase-crud-rifandani.appspot.com',
  messagingSenderId: '398940643695',
  appId: '1:398940643695:web:5eff3f6181933dcc27489a',
};

app.initializeApp(firebaseConfig);

const storage = app.storage();

export { storage, app as default };
