//Firebase configuration
// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
  apiKey: "AIzaSyBmgtwduBCHIg8RNXB2Wv978QPZQCVan4I",
  authDomain: "dungeon-protocols.firebaseapp.com",
  databaseURL: "https://dungeon-protocols.firebaseio.com",
  projectId: "dungeon-protocols",
  storageBucket: "dungeon-protocols.appspot.com",
  messagingSenderId: "701545727450",
  appId: "1:701545727450:web:269a08f0258a5e74e9ece3"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
