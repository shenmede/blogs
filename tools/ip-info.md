# IP地址信息查询

<div class="mb-3">
	<label for="ipinput" class="form-label">IP地址</label>
	<input id="ipinput" class="form-control" placeholder="请输入IP地址"></input>
</div>

<label for="ipoutput" class="form-label">查找结果</label>
<table id="ipoutput" class="table table-striped">
	<tbody>
		<tr>
			<th>大洲</th>
			<td id="continent"></td>
		</tr>
		<tr>
			<th>国家</th>
			<td id="country"></td>
		</tr>
		<tr>
			<th>行政区划</th>
			<td id="subdivisions"></td>
		</tr>
		<tr>
			<th>城市</th>
			<td id="city"></td>
		</tr>
		<tr>
			<th>经纬度/时区</th>
			<td id="location"></td>
		</tr>
		<tr>
			<th>运营商</th>
			<td id="organization"></td>
		</tr>
		<tr>
			<th>用时</th>
			<td id="time"></td>
		</tr>
	</tbody>
</table>

```script
// 配置IP地址匹配器，某些网站不允许上传mmdb文件
api.MaxMindMatcher.defaultDatabasePath =
	window.customizedReferences && window.customizedReferences.maxmindDefaultDatabasePath
	"resource/tools/GeoLite2-City_v6.mmdb";
api.MaxMindMatcher.asnDatabasePath =
	window.customizedReferences && window.customizedReferences.maxmindAsnDatabasePath
	"resource/tools/GeoLite2-ASN_v6.mmdb";
api.MaxMindMatcher.debug = true;
const IPMatcher =
	window.customizedReferences && window.customizedReferences.useMaxMindMatcher ?
		api.MaxMindMatcher :
		api.IpArtMatcher;

// 初始化IP地址匹配器
const cityDatabase = IPMatcher.defaultDatabase();
const asnDatabase = IPMatcher.asnDatabase();
const matcherPrototype = new IPMatcher({
	maxmind : cityDatabase.maxmind || cityDatabase,
	trie : cityDatabase.trie,
	asnMaxmind : asnDatabase.maxmind || asnDatabase,
	asnTrie : asnDatabase.trie,
	debug : api.MaxMindMatcher.debug
});

/**
 * 获取名称
 * @param {Object} data 数据
 * @param {Object.<string, string>} data.names 名称词典
 * @param {string[]} languages 语言列表
 * @returns {string} 名称
 */
function getName(data) {
	return api.MaxMindMatcher.VueComponent.methods.getName(data, [
		"zh-CN",
		"en"
	]);
}

// 结果字段处理器
const handlers = {
	continent : getName,
	country : getName,
	subdivisions : function(data) {
		return data && data.length ? getName(data[0]) : undefined
	},
	city : getName,
	location : function(data) {
		if (data)
			return "(" + data.longitude + ", " + data.latitude + ") " + data.time_zone;
	},
	organization : function(data) {
		if (data)
			return data.autonomous_system_organization + " (" + data.autonomous_system_number + ")";
	}
};

// 监听IP地址输入框变化
document.getElementById("ipinput").oninput = function(event) {
	let matcher = matcherPrototype.clone();
	let startTime = new Date().getTime();
	let value = event.target.value;
	matcher.lookup(value).then(function(result) {
		if (event.target.value !== value)
			return;
		let endTime = new Date().getTime();
		Object.keys(handlers).forEach(function(key) {
			let value = handlers[key](result[key]);
			let element = document.getElementById(key);
			element.textContent = value || "";
		});
		document.getElementById("time").textContent = (endTime - startTime) + " ms";
	});
};
```

Powered by [MaxMind GeoLite2 Databases](https://www.maxmind.com/en/geoip-databases).
