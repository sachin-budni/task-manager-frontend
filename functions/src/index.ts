import * as functions from 'firebase-functions';
import * as firebase from 'firebase';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

firebase.initializeApp({
    apiKey: "AIzaSyAAPX8_g0OsM2mNVgpugeIlMxyTnfZW0tg",
    authDomain: "sample-e35af.firebaseapp.com",
    databaseURL: "https://sample-e35af.firebaseio.com",
    projectId: "sample-e35af",
    storageBucket: "sample-e35af.appspot.com",
    messagingSenderId: "668473991003",
    appId: "1:668473991003:web:2025357b410eccbe79847e",
    measurementId: "G-FZVGGFSGQT"
})

export const upload = functions.https.onRequest((request: any, response: any) => {
    response.header("Access-Control-Allow-Origin","*");
    response.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(request.method === "OPTIONS"){
        response.header("Access-Control-Allow-Methods",'PUT, POST, PATCH, DELETE, GET')
        return response.status(200).json({})
    }
    const files = request.body;
    // console.log(firebase);
    // const storageRef = firebase.storage().ref();

    // const mountainImagesRef = storageRef.child(files.filename);
    
    // mountainImagesRef.put(files.text).then((snapshot) => {
    //     console.log("snapshot")
    //     console.log(snapshot)
    // }).catch((err) => {
    //     console.log(err);
    // })

    response.send(files);
    // firebase.database().ref().child('list').on('value', snap =>{
    //     response.send(snap.val())
    // })
});
