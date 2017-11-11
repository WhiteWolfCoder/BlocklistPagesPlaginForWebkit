var BL = (function () {
    var bl = {};
	bl.url = function (url) {return /^\w+:\/\/.*?(\w+\.\w+)(\/|$)/.exec(url)[0];}
	bl.set = function (url) {localStorage.setItem(bl.url(url),1);}	
	bl.filter = function (request) {
		var url = bl.url(request.url);
		if(localStorage.getItem(url)){
			return (bl.act == 'page')?{redirectUrl: chrome.extension.getURL("block.html#" + url)}:{redirectUrl: chrome.extension.getURL("block.html#close")}
		}
	}		
	bl.del = function (url) {localStorage.removeItem(url);}	 	
	bl.opt = function () {chrome.storage.sync.get({option: 'page'}, function(item) {bl.act = item.option;});}	 	
	bl.act = bl.opt();
    return bl;
}());

chrome.webRequest.onBeforeRequest.addListener(BL.filter, {urls: ["*://*/*"]}, ["blocking"]);
