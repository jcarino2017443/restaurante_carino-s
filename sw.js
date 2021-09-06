const cache_name = "facilito1-v1"
const cache_urls = [
                    "index.haml",
                    "desconectado/style.css",
                    "desconectado/map.png",
                    ]

self.addEventListener('install', function(event) {
    console.log("SW installed");
        caches.open(cache_name)
            .then(function(cache) {
            console.log('Opened cache');
                return cache.addAll(cache_urls);
        });
    });

    self.addEventListener('activate', function(ev) {
        ev.waitUntil(
            caches.keys().then(function (cache_Name) {
                return Promise.all(
                    cache_Name.map(function (caches_names) {
                        if(cache_name !== caches_names) 
                        return caches.delete(caches_names)
                    })
                )
            })
        )
        var cacheWhitelist = [cache_name];
    })

self.addEventListener("fetch",function(ev) {
    
    ev.respondWith(
        caches.match(ev.request)
        .then(function (response) {
            if(response){
                console.log("Te ahorre codigo")
                return response
                
            }
            
                return fetch(ev.request)
        }).catch(function (err) {
            if(ev.request.mode == "navigate"){
                return caches.match("desconectado/desconectado.html")
            }
        })
    )
    
    
})