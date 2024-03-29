// 使用 workbox 官方的webpack workbox-webpack-plugin插件来实现离线缓存
// 属性配置说明: https://developer.chrome.com/docs/workbox/reference/workbox-webpack-plugin/#property

// 当前缓存版本的唯一标识符，用当前时间代替
const cacheKey = new Date().toISOString()

// 当前缓存白名单，在新脚本的 install 事件里将使用白名单里的 key
const cacheWhitelist = [cacheKey]
// var cacheFileList = global.serviceWorkerOption.assets

// 需要被缓存的文件的 URL 列表
const cacheFileList = ['/index.html', 'app.js', 'app.css']

// 监听 install 事件
self.addEventListener('install', function(event) {
	// 等待所有资源缓存完成时，才可以进行下一步
	console.log('install')
	event.waitUntil(
		caches.open(cacheKey).then(function(cache) {
			// 要缓存的文件 URL 列表
			return cache.addAll(cacheFileList)
		}),
	)
})

// 拦截网络请求
self.addEventListener('fetch', function(event) {
	console.log('fetch')
	event.respondWith(
		// 去缓存中查询对应的请求
		caches.match(event.request).then(function(response) {
			// 如果命中本地缓存，就直接返回本地的资源
			if (response) {
				return response
			}
			// 否则就去用 fetch 下载资源
			return fetch(event.request)
		}),
	)
})

// 新 Service Workers 线程取得控制权后，将会触发其 activate 事件
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					// 不在白名单的缓存全部清理掉
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						// 删除缓存
						return caches.delete(cacheName)
					}
				}),
			)
		}),
	)
})
