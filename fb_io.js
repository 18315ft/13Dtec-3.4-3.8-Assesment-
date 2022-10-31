/**************************************************************/
// fb_io.js
// Written by Finn Thompson - Term 1 2022
/**************************************************************/
fb_initialise();
var debug = true;

/**
 * @Function fb_initialise
 * 
 * Initialises the firebase
 */
function fb_initialise() {
  const firebaseConfig = {
    apiKey: "AIzaSyC1ZT9gs1wk-dXGOpxPDQru_reHdutmUVA",
    authDomain: "dtec-2022-finn-thompson.firebaseapp.com",
    databaseURL: "https://dtec-2022-finn-thompson-default-rtdb.firebaseio.com",
    projectId: "dtec-2022-finn-thompson",
    storageBucket: "dtec-2022-finn-thompson.appspot.com",
    messagingSenderId: "724914088521",
    appId: "1:724914088521:web:105015440ac29f661e6d98",
    measurementId: "G-SNDBTRBE8Z"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

/**
 * @Function fb_read
 * @Param {string} _path = the path to read
 * 
 * Reads a specific database record
 */
async function fb_read(_path) {	
  var data;

  await firebase.database().ref(_path).once("value", (_snap) => data = _snap.val(), errMsg);
  
  return(data);

  function errMsg(_err) {
    if (!debug) return;
    if (_err) {
      console.log(_path);
      console.log(_err);
    }
  }
}

/**
 * @Function fb_readOnSetVar
 * @Param {string} _path = the path to read
 * @Param {string} _return = the function to run on return
 * 
 * Runs a function whenever a specific database record
 *  changes and passes it the data
 */
function fb_readOn(_path, _return) {
  firebase.database().ref(_path).on("value", gotRecord, errMsg);

  function gotRecord(snapshot) {
    _return(snapshot.val());
  }

  function errMsg(_err) {
    if (!debug) return;
    if (_err) {
      console.log(_err);
    }
  }
}

/**
 * @Function fb_readOnSetVar
 * @Param {string} _path = the path to read
 * @Param {string} _var = the variable to return data to
 * 
 * Reads a specific database record whenever it changes
 *  and changes a variable
 */
function fb_readOnSetVar(_path, _var) {
  fb_readOn(_path, (_data) => window[_var] = _data);
}

/**
 * @Function fb_stopRead
 * @Param {string} _path = the path to stop reading
 *
 * Stops a fb_readOn function
 */
function fb_stopRead(_path) {	
  firebase.database().ref(_path).off();
}

/**
 * @Function fb_write
 * @Param {string} _path = the path to write to
 * @Param {string} _data = the data to write
 * 
 * Writes to a specific database path
 */
function fb_write(_path, _data) { 
  if (_path != null && _path != undefined) {
    firebase.database().ref(_path).set(_data,
      (_err) => {
        if (!debug) return;
        if (_err) {
          console.log(_err);
          return;
        }
        
        console.log("Write successful");
      });
  }
}

/**
 * @Function fb_push
 * @Param {string} _path = the path to write to
 * @Param {string} _data = the data to write
 * 
 * Uses push to write to a specific database path.
 *   Push means that the key will be the firebase time
 */
function fb_push(_path, _data) { 
  if (_path != null && _path != undefined) {
    firebase.database().ref(_path).push().set(_data,
      (_err) => {
        if (!debug) return;
        if (_err) {
          console.log(_err);
          return;
        }
        
        console.log("Push successful");
      });
  }
}

/**
 * @Function fb_delete
 * @Param {string} _path = the path to delete
 * 
 * Deletes a specific database record
 */
function fb_delete(_path) { 
  if (_path != null && _path != undefined) {
    firebase.database().ref(_path).remove(
      (_err) => {
        if (!debug) return;
        if (_err) {
          console.log(_err);
          return;
        }
        
        console.log("Delete successful");
      });
  }
}




var userDetails = {
  uid: "",
  name: ""
};

ac_autoLogin();


/**
 * @Function ac_autoLogin
 *
 * Automatically logs in the user, or redirects them to log in
 */
function ac_autoLogin() {
  // On auth state change. I assume once the account is signed in
  firebase.auth().onAuthStateChanged(authChange);

  // Called on auth state changed
  async function authChange(_user) {
    if (_user) {
      userDetails.uid = _user.uid;
      userDetails.name = _user.displayName;
      
      return;
    }
    
    console.log("User isn't here");
    
    ac_redirectLogin();
  }
}

/**
 * @Function ac_redirectLogin
 *
 * Redirects to google login
 */
function ac_redirectLogin() {
  console.log("ac_redirectLogin");
  
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}



/**************************************************************/
//    END OF MODULE
/**************************************************************/