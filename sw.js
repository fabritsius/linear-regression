const APP_NAME = 'linear-regression';
const CACHE_NAME = `${APP_NAME}-v1`;
const urlsToCache = [
  `/${APP_NAME}/`,
  `/${APP_NAME}/index.html`,
  `/${APP_NAME}/sketch.js`,
  `/${APP_NAME}/line.js`,
  `/${APP_NAME}/libraries/p5.js`,
  `/${APP_NAME}/style.css`,
  `/${APP_NAME}/imgs/github.png`,
  `/${APP_NAME}/imgs/favicon.ico`
];

// Perform install steps
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});


// Respond with cached resources
self.addEventListener('fetch', function (event) {
  console.log(`fetch request: ${event.request.url}`)
  event.respondWith(
    caches.match(event.request).then(function (request) {
      return request || fetch(event.request)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      let cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_NAME)
      })
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME);

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log(`deleting cache: ${keyList[i]}`)
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})