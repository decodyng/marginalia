// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';



chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    if (key == 'num_keys_found') {
      chrome.extension.getBackgroundPage().console.log("NumKeysFound listener triggered");
      var storageChange = changes[key];
      var newKeyValue = storageChange.newValue;
      chrome.browserAction.setBadgeText({'text': `${newKeyValue}`})
    }
  }
  //chrome.browserAction.setBadgeText({text: `${numKeysFound}`})
})
