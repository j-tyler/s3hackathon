'use strict';
const electron = require('electron');
const AWS = require('aws-sdk');
const app = electron.app;
const ipc = require('electron').ipcMain;

ipc.on('invokeAction', function(event, data){
    // data == name
    var setData = {
      Bucket: data,
      Key: data
    }

    createBucket(setData);

    console.log("hello i am on server");

    event.sender.send('actionReply', 'created!!');
});


// ipcMain.on('synchronous-message', (event, arg) => {
//  console.log(arg);
//  event.returnValue = 'pong';
// })


// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

var configs = {
  accessKeyId: 'accessKey1',
  secretAccessKey: 'verySecretKey1'
};

AWS.config.update(configs);

// var ep = new AWS.Endpoint('localhost:8000');
const s3 = new AWS.S3({
  endpoint: 'http://localhost:8000',
  s3ForcePathStyle: true
});


function onClosed() {
  // dereference the window
  // for multiple windows store them in an array
  mainWindow = null;
}

function createMainWindow() {
  const win = new electron.BrowserWindow({
    width: 600,
    height: 600
  });

  win.loadURL(`file://${__dirname}/index.html`);
  win.on('closed', onClosed);

  return win;
}

// Bucket Options //

/*
  bInfo = {
    Bucket: bucketName,
    Key: keyField,
    Body: bodyField
  }
*/

//DEBUG!: Existing buckets will clash
function createBucket(bInfo) {
  // NOTE: Can edit below to take just bInfo obj
  s3.createBucket({Bucket: bInfo['Bucket']}, function(err, data) {
    if (err) {
      console.log("Error in createBucket");
      console.log(err, err.stack);
    } else {
      console.log(data);
      console.log("Success!?");
      // Send back to DOM
    }
  });
}


function deleteBucket(bInfo) {
  // NOTE: Can edit below to take just binfo obj
  s3.deleteBucket({Bucket: bInfo['Bucket']}, function(err, data) {
    if (err) {
      console.log("Error in deleteBucket");
      console.log(err, err.stack);
    } else {
      console.log(data);
      console.log("Success!?");
      // send back to DOM
    }
  })
}


///////////////////////

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', () => {
  mainWindow = createMainWindow();


  // var myNewBucket = {
  //  Bucket: 'hello1',
  //  Key: 'somekey1',
  //  Body: 'Is this gonna work??'
  // };
  // createBucket(myNewBucket);
});


// s3.createBucket({Bucket: 'philsbucket'}, function() {
//  var params = {Bucket: 'philsbucket', Key: 'mykey', Body: 'Hi please work'};

//  s3.putObject(params, function(err, data) {
//    if (err) {
//      console.log(err);
//    } else {
//      console.log("Successfully uploaded data to philsBucket/myKey");
//    }
//  });
//  s3.getBucketLocation({Bucket: 'philsbucket'}, function(err, data) {
//    if (err) {
//      console.log(err);
//    } else {
//      console.log("Got bucket location!!");
//      console.log(data);
//      console.log("END OF bucket location!!");
//    }
//  });
// });



/*
putObject(params = {}, callback)  // add an object to bucket
putBucketNotificationConfiguration(params = {}, callback)  // enables notifications of specified events for a bucket
listObjectsV2(params = {}, callback) // return some or all (up to 1000) of the objects in a bucket. You can use request params as selection criteria to return a subset of the objects in a bucket.
listObjects(params = {}, callback)  // return (up to 1000) objects in a bucket. Use request params as selection criteria to return subset of the objects in a bucket
listBuckets(params = {}, callback)  // returns list of all buckets owned by the authenticated sender of the request
headObject(params = {}, callback) // HEAD operation retrieves metadata from an object without returning the object itself.
getObject(params = {}, callback) // Retrieve objects from S3
deleteObjects(params = {}, callback) // enables you to delete multiple objects from a bucket. You may specify up to 1000 keys
deleteBucket(params = {}, callback) // deletes bucket. All objects in bucket must be deleted before bucket itself can be deleted



////////
createBucket(params, callback) //create new bucket





*/
