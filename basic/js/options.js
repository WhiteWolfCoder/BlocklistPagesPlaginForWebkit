function save() {
  var tab = document.getElementById('tab').value;
  chrome.storage.sync.set({option: tab}, function() {msg('НАСТРОЙКИ СОХРАНЕНЫ');});
  chrome.extension.getBackgroundPage().BL.opt();
}

function restore() {chrome.storage.sync.get({option: 'page'}, function(item) {document.getElementById('tab').value = item.option;});}

function data() {
	var act = document.getElementById('data').value;
	if(act == 'exp'){
		var data = localStorage;
		var file = document.getElementById('load');
		file.setAttribute("href", 'data:text/csv;charset=utf-8,' + JSON.stringify(data));
		file.click();
		msg('ЭКСПОРТИРОВАНО САЙТОВ: '+data.length)
	}
	if(act == 'imp'){document.getElementById('file').click();}
	document.getElementById('data').value = 'no'
}

function read(data) {
	var file = data.target.files[0]; 
	if (file) {
		var i = 0;
		var read = new FileReader();
		read.onload = function(txt) { 
			for (var url in JSON.parse(txt.target.result)) {
				i++;
				localStorage.setItem(url,1);
			}	
			if(i>0){msg('ИМПОРТИРОВАНО САЙТОВ: '+i);}
 
		}
		read.readAsText(file);
	} 
}

function msg(txt) {
    var status = document.getElementById('status');
    status.textContent = txt;
    setTimeout(function() {status.textContent = '';}, 2000);
}

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('tab').addEventListener('change', save, false);
document.getElementById('data').addEventListener('change', data, false);
document.getElementById('file').addEventListener('change', read, false);
