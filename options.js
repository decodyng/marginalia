// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.




function addExplanations(explanationDict) {
  console.log(`Adding: ${explanationDict} to div`)
  var topDiv = document.getElementById('explanationsDiv');
  topDiv.classList.add("nonsense")

  for (var key in explanationDict) {
    
    var newTitleElement = document.createElement('h3')
    var newTitleText = document.createTextNode(key)
    newTitleElement.appendChild(newTitleText)

    var newTextElement = document.createElement('p')
    var newText = document.createTextNode(explanationDict[key])
    newTextElement.appendChild(newText)

    topDiv.appendChild(newTitleElement)
    topDiv.appendChild(newTextElement)
  }
}

//var defaultValue = {"- - -": "- - -"}
chrome.storage.sync.get("keysAndExplanations", function(data) {
  console.log(data.keysAndExplanations);
  if (data.keysAndExplanations !== null) {
    addExplanations(data.keysAndExplanations);
  }
  
  
})
// chrome.storage.onChanged.addListener(function(changes, namespace) {
//   for (var key in changes) {
//     if (key == 'keysAndExplanations') {
//       console.log("keysAndExplanations listener triggered");
//       var storageChange = changes[key];
//       var newKeyValue = storageChange.newValue;
//       addExplanations(newKeyValue)
//     }
//   }
// } )



