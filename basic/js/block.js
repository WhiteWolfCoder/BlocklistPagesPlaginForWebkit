var url = document.URL.split('#')[1];
(url == 'close')?close():document.getElementById('url').innerHTML = url;


