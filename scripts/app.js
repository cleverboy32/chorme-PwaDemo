(() => {
    'use strict';
    
    let swRegistration = null;
    
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        // console.log('Service Worker and Push is supported');
      
        navigator.serviceWorker.register('../service-worker.js').then(function(swReg) {
            // console.log('Service Worker is registered', swReg);
        
            swRegistration = swReg;
        }).catch(function(error) {
            console.error('Service Worker Error', error);
        });
    } else {
        console.warn('Push messaging is not supported');
        pushButton.textContent = 'Push Not Supported';
    }

    let img = document.querySelector('img');

    function fresh () {
        var imgFresh = setInterval(function () {
            let testimg = document.createElement('img');
            testimg.src="http://localhost:8090/api/400/200/";
            // 如果有网的话在刷新
            testimg.onload = () => {
                img.src = 'http://localhost:8090/api/400/200/';
            }
            testimg.onerror = () => {
                clearInterval(imgFresh);
                setTimeout(fresh, 180000);
            };
        }, 30000);
    }
    fresh ();


})();
