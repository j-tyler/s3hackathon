var ipc = require('electron').ipcRenderer;

var appWrapper = document.getElementById("appWrapper")
var flashWrapper = document.getElementById("flashloadWrapper")
var loadWrapper = document.getElementById("loadWrapper")
var loadButton = document.getElementById("loadButton")
var openApp = document.getElementById("openAppButton")

flashWrapper.style.display = "none";
appWrapper.style.display = "none";


var welcomeScreen = document.getElementById("welcomeScreen")
var installScreen = document.getElementById("installScreen")
var mainScreen = document.getElementById("mainScreen")
var installButton = document.getElementById("installButton")
var createBucket = document.getElementById("createBucket")
var destroyBucket = document.getElementById("destroyBucket")
var createField = document.getElementById("createField")
var destroyField = document.getElementById("destroyField")
var addButton = document.getElementById("addButton")
var removeButton = document.getElementById("removeButton")


var createBucket = document.getElementById("createBucket");
var listBuckets = document.getElementById("listBucketButton");

// installButton.addEventListener("click", INSTALLFUNCTION);
//
// destroyBucket.addEventListener("click", DESTROYBUCKET);
// addButton.addEventListener("click", ADDFILE);
// removeButton.addEventListener("click", REMOVEFILE);


//// Drag and Drop ////

//const holder = document.getElementById('holder');

//holder.ondragover = function() {
//  return false;
//}
//holder.ondragleave = function() {
//  return false;
//}
//holder.ondragend = function() {
//  return false;
//}

//holder.ondrop = function(e) {
//  e.preventDefault()
//  for (let f of e.dataTransfer.files) {
//    console.log('File(s) you dragged here: ', f.path);
//    // pickup radio button for bucket
//    uploadFile(f.path);
//  }
//
//  return false;
//}


function uploadFile(path) {
  // get name/key
  ipc.once('addObjectReceive', function(res) {
    console.log("i think i uploaded the file")
    console.log(res)
  })

  console.log(path)

  var data = {
    Bucket: 'cat',
    Key: 'cat',
    Body: path
  }

var storage = {
  'bucket1': ['examplefile', 'example2'],
  'bucket2': [],
  'bucket3': ['somefile', 'someotherfile']
}


// Store for bucket list
 var storeBuckets = new function() {
  this.el = document.getElementById('buckets');

  // Aggregate buckets and add them as TD elements in HTML
  this.fetchAll = function() {
    var data = '';

    if (Object.keys(storage).length > 0) {
      for (i = 0; i < Object.keys(storage).length; i++) {
        data += '<tr>';
        data += '<td>' + Object.keys(storage)[i];
        data += '<div id="xbox" onclick="storeBuckets.Delete(' + i + ')>delete</div>' + '</td>';
        data += '</tr>';
      }
    }
    return this.el.innerHTML = data;
  }

  // Add Buckets
  this.Add = function() {
    var bucketName = createField.value;

    if (bucketName) {
      // Add name
      storage[bucketName] = [];
      // Reset value
      bucketName = '';
      // Display New List
      this.fetchAll();
      }
    }

    // Delete Buckets
    this.Delete = function(item) {
      // Delete the current row
     storage.splice(item, 1);
      // Display the new list
     this.fetchAll();

     ipc.once('destroyBucketReceive', function(response) {
       console.log("Deletion confirmed");
       console.log(response);
       storeBuckets.Delete();
      })

      var bucket = storage[item];

      console.log("Bucket deleted");

      ipc.send('destroyBucketSend', bucket);
    }
}
  // ipc.send('addObjectSend', data);

storeBuckets.fetchAll();


createBucket.addEventListener('click', function() {
    ipc.once('addBucketReceive', function(response) {
      console.log("What is this?")
      console.log(response)
      storeBuckets.Add();
    })

    var name = createField.value;

    console.log(name);

    ipc.send('addBucketSend', name);
});

listBuckets.addEventListener('click', function() {
  ipc.once('listBucketReceive', function(res) {
    console.log("Received list buckets")
    console.log(res)
  })

  console.log("getting list");

  ipc.send('listBucketSend', 'hi')
});


////
// Mouseenter and Mouseleave activate and remove the information dialog
////

createBucket.addEventListener("mouseenter", function() {
	this.style.color = "purple";
});
createBucket.addEventListener("mouseleave", function() {
	this.style.color = "black";
});

destroyBucket.addEventListener("mouseenter", function() {
        this.style.color = "purple";
});
destroyBucket.addEventListener("mouseleave", function() {
        this.style.color = "black";
});

//addButton.addEventListener("mouseenter", function() {
//        this.style.color = "purple";
//});
//addButton.addEventListener("mouseleave", function() {
//        this.style.color = "black";
//});
//
//removeBucket.addEventListener("mouseenter", function() {
//        this.style.color = "purple";
//});
//removeBucket.addEventListener("mouseleave", function() {
//        this.style.color = "black";
//});










loadButton.addEventListener('click', function() {
	flashWrapper.style.display = "initial";
	loadWrapper.style.display = "none";
});

openApp.addEventListener('click', function() {
	flashWrapper.style.display = "none";
	appWrapper.style.display = "initial";
});
