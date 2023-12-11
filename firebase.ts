import { FirebaseApp, initializeApp } from 'firebase/app'
const firebaseConfig = {
	apiKey: 'AIzaSyDAxnTJbrgat0bkmEjOfqFKsZ4Qs1WjGyc',
	authDomain: 'casino-app-54eb7.firebaseapp.com',
	projectId: 'casino-app-54eb7',
	storageBucket: 'casino-app-54eb7.appspot.com',
	messagingSenderId: '929159969882',
	appId: '1:929159969882:web:0aeee907d90aae5759ac63',
}

let firebaseApp: FirebaseApp

export const initializeFirebase = () => {
	if (!firebaseApp) {
		firebaseApp = initializeApp(firebaseConfig)
	}

	return firebaseApp
}
