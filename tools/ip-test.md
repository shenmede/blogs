# IP地址信息测试

<div class="mb-3">
	<label for="countinput" class="form-label">随机查询数量</label>
	<input id="countinput" type="number" class="form-control" placeholder="请输入随机查询数量" value="1"></input>
</div>

<div class="mb-3">
	<label for="repeatinput" class="form-label">重复次数</label>
	<input id="repeatinput" type="number" class="form-control" placeholder="请输入重复次数" value="1"></input>
</div>

<div class="mb-3">
	<button id="submit" type="submit" class="form-control">开始测试</button>
</div>

<label for="output" class="form-label">日志</label>
<textarea id="output" readonly rows="5" class="form-control"></textarea>

```script
// 配置IP地址匹配器
api.MaxMindMatcher.defaultDatabasePath = "resource/tools/GeoLite2-City_v6.mmdb";
api.MaxMindMatcher.asnDatabasePath = "resource/tools/GeoLite2-ASN_v6.mmdb";
api.MaxMindMatcher.metrics = new api.RemoteMetrics();
api.MaxMindMatcher.debug = false;
const IPMatcher = api.IpArtMatcher;

// 初始化IP地址匹配器
const cityDatabase = IPMatcher.defaultDatabase();
const matcherPrototype = new IPMatcher({
	maxmind : cityDatabase.maxmind || cityDatabase,
	trie : cityDatabase.trie
});

// 监听按钮点击
const countinput = document.getElementById("countinput");
const repeatinput = document.getElementById("repeatinput");
const output = document.getElementById("output");
document.getElementById("submit").onclick = function(event) {
	let count = countinput.value;
	let repeat = repeatinput.value;
	output.textContent = "开始测试，随机查询数量 = " + count + "，重复次数 = " + repeat + "\n";

	// 重置统计信息
	api.MaxMindMatcher.metrics.reset();

	let time = 0;
	let jsonSize = 0;
	let work = function(repeat, resolve) {
		let ips = [ ];
		for (let i = 0; i < count; i++) {
			let ip = Math.floor(Math.random() * 256);
			// while (ip === 10 || ip === 127 || ip === 172 || ip === 192 || ip >= 224)
			//	ip = Math.floor(Math.random() * 256);
			ip += "." + Math.floor(Math.random() * 256);
			ip += "." + Math.floor(Math.random() * 256);
			ip += "." + Math.floor(Math.random() * 256);
			ips.push(ip);
		}
		// 清理缓存
		cityDatabase.mmdb.cache.clearBlocks().then(function() {
			cityDatabase.trieMmdb.cache.clearBlocks().then(function() {
				let promises = [ ];
				time -= new Date().getTime();
				ips.forEach(function(ip) {
					let matcher = matcherPrototype.clone();
					promises.push(matcher.lookup(ip));
				});
				Promise.allSettled(promises).then(function(results) {
					time += new Date().getTime();
					results.forEach(function(result) {
						if (result.value)
							jsonSize += JSON.stringify({
								continent : result.value.continent,
								country : result.value.country,
								registered_country : result.value.registered_country,
								represented_country : result.value.represented_country,
								subdivisions : result.value.subdivisions,
								city : result.value.city,
								location : result.value.location,
								organization : result.value.organization
							}).length;
					});
					if (repeat)
						work(repeat - 1, resolve);
					else
						resolve({
							time : time
						});
				});
			});
		});
	};

	let round2 = function(number) {
		return Math.floor(number * 100 + 0.5) / 100;
	};

	let withAverage = function(number) {
		let byRepeat = round2(number / repeat);
		let byCount = round2(number / repeat / count);
		return byRepeat + " (" + byCount + ")";
	};

	new Promise(function(resolve) {
		work(repeat - 1, resolve);
	}).then(function(result) {
		let metrics = api.MaxMindMatcher.metrics;
		output.textContent +=
			"测试完成，请求数 = " + withAverage(metrics.requestCount) +
			"，传输数据量 = " + withAverage(metrics.requestBytes) +
			"，原始数据量 = " + withAverage(jsonSize) +
			"，查询用时 = " + withAverage(time) + "\n";
		output.textContent +=
			"|" + count +
			"|" + repeat +
			"|" + round2(metrics.requestCount / repeat / count) +
			"|" + round2(metrics.requestBytes / repeat / count) +
			"|" + round2(jsonSize / repeat / count) +
			"|" + round2(metrics.requestBytes / jsonSize) +
			"|" + round2(time / repeat / count) + "|";
	});
};
```

## 测试报告

* 型号：Legion 7000P2021；
* 处理器：11th Gen Intel(R) Core(TM) i7-11800H @ 2.30GHz；
* 内存：32GB；
* 操作系统：Windows 10 22H2；
* Web服务器：Nginx 1.20.1；
* 浏览器：Chrome 124.0.6367.119；
* 数据集：[GeoLite2 City数据库，2023-04-23版本](https://www.maxmind.com/en/accounts/847501/geoip/downloads?show_all_dates=1)。

### 本机查询测试

旨在评估当前方法在随机查询情形下，发起请求数、传输数据量，以及查询用时随查询数量增长的变化情况。

|随机查询数量|重复次数|请求数/查询|传输量/查询|数据量/查询|传输量/数据量|用时/查询|
|-|-|-|-|-|-|-|
|1|1000|7.55|11456.51|749.15|15.29|26.1|
|2|1000|6.14|8745.98|729.74|11.99|18.48|
|5|1000|4.97|7177.93|731.56|9.81|13.06|
|10|100|4.2|6347.78|732.28|8.67|10.33|
|20|100|3.72|5868.8|730.63|8.03|9.21|
|50|100|3.32|5473.18|736.06|7.44|8.49|
|100|10|3.04|5039.62|730.86|6.9|8.03|
|200|10|2.69|4504.58|740.23|6.09|7.84|
|500|10|2.12|3454.16|736.26|4.69|7.35|
|1000|5|1.75|2692.3|731.91|3.68|6.97|
|2000|5|1.44|2112.92|729.91|2.89|6.76|
|5000|5|1.1|1497.48|730.16|2.05|6.54|
|10000|5|0.86|1076.58|731.33|1.47|6.4|
|20000|5|0.63|709.22|715.36|0.99|6.33|
|50000|5|0.4|382.42|730.99|0.52|6.21|

* 当随机查询数量达到10000时，请求数已小于查询数量；
* 当随机查询数量达到20000时，传输数据量已小于结果数据量（以JSON计）。
