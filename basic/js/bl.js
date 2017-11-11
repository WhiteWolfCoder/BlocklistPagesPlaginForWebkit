document.getElementById('add').onclick = function(){
	chrome.tabs.getSelected(null,function(tab) {
		chrome.extension.getBackgroundPage().BL.set(tab.url);
		if(chrome.extension.getBackgroundPage().BL.act == 'page'){
			chrome.tabs.update(tab.id, { url: chrome.extension.getURL("block.html#" + chrome.extension.getBackgroundPage().BL.url(tab.url))});
		}else{
			chrome.tabs.remove(tab.id, function() {});
		}		
		window.close();
	});
}

document.getElementById('del').onclick = function(){
	chrome.tabs.getSelected(null,function(tab) {
		var url = tab.url.split('#')[1]; 
		chrome.extension.getBackgroundPage().BL.del(url);
		chrome.tabs.update(tab.id, { url: url });
		window.close();
	});	
}

chrome.tabs.getSelected(null,function(tab) {
	if(localStorage.getItem(tab.url.split('#')[1])==1){
		document.getElementById('del').style.display = 'block';
	}else{
		document.getElementById('add').style.display = 'block';
	}
});
