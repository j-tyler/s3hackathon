var ipc = require('electron').ipcRenderer;

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

const holder = document.getElementById('holder');

holder.ondragover = function() {
  return false;
}
holder.ondragleave = function() {
  return false;
}
holder.ondragend = function() {
  return false;
}

holder.ondrop = function(e) {
  e.preventDefault()
  for (let f of e.dataTransfer.files) {
    console.log('File(s) you dragged here: ', f.path);

  }
  return false;
}




// var storeBuckets = {};


createBucket.addEventListener('click', function(){
    ipc.once('addBucketReceive', function(response){
      console.log("what is this")
      console.log(response)
    })

    var name = createField.value;

    console.log(name);

    ipc.send('addBucketSend', name);
});

listBuckets.addEventListener('click', function() {
  ipc.once('listBucketReceive', function(res) {
    console.log("received list buckets")
    console.log(res)
  })

  console.log("getting list");

  ipc.send('listBucketSend', 'hi')
})

/////ahahahahaha/////
destroyBucket.addEventListener('click', function(){
    ipc.once('destroyBucketReceive', function(response){
	console.log("oh shit")
	console.log(response)
    })

    var name = destroyField.value;

    console.log("Bucket deleted")

    ipc.send('destroyBucketSend', name)
})
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
