try {
	navigator.serviceWorker.register("staticCacheWorker.js");
} catch(error) {
	/** 路径映射 */
	const pathMappings = [
		[/^https:\/\/fonts\.googleapis\.com\/css\?family=Josefin\+Sans:300,400,700$/, "/blogs/resource/fonts.googleapis.com_css_family_Josefin_Sans_300_400_700.css"],
		[/^https:\/\/fonts\.gstatic\.com\/s\/josefinsans\/v20\/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_N_XbMZhKg\.ttf$/, "/blogs/resource/fonts.gstatic.com_s_josefinsans_v20_Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_N_XbMZhKg.ttf"]
	];
	self.addEventListener("install", function(event) {
		event.waitUntil(caches.open("rmd").then(function(cache) {
			cache.addAll([
				"/blogs/resource/fonts.googleapis.com_css_family_Josefin_Sans_300_400_700.css",
				"/blogs/resource/fonts.gstatic.com_s_josefinsans_v20_Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_N_XbMZhKg.ttf"
			]);
		}));
	});
	self.addEventListener("fetch", function(event) {
		let request = event.request;
		let url = request.url;
		let mapping = pathMappings.find(function(mapping) {
			return mapping[0].test(url);
		});
		if (mapping)
			url = url.replace(mapping[0], mapping[1]);
		let index = url.indexOf("?");
		if (index < 0 && (/\/blogs\/(lib\/|resource\/|index\.js)/.test(url) || mapping))
			event.respondWith(
				caches.open('rmd').then(function(cache) {
					return cache.match(url).then(function (response) {
						return response || fetch(request).then(function(response) {
							if (response && response.status == 200)
								cache.put(url, response.clone());
							return response;
						});
					});
				})
			);
		else {
			url = url.substring(0, index);
			event.respondWith(
				fetch(event.request).then(function(response) {
					if (response && response.status == 200) {
						let mResponse = response.clone();
						caches.open("rmd").then(function(cache) {
							cache.put(url, mResponse);
						});
					}
					return response;
				}, function() {
					return caches.open("rmd").then(function(cache) {
						return cache.match(url);
					});
				})
			);
		}
	});
}