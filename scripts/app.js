// import env from '../build/env.conf.js';
let swRegistration = null;
const applicationServerPublicKey='BO_R6m8osilNmdOhEHk-KF0o1u-EPruOL1bDaISHwDwSLacPsh35Hg41nZpS00XeCLG-KbGEqx35x6PKsdZNVCk';
(() => {
    let env = 'dev';
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        let url = env === 'prod' ? 'prod-service-worker.js' : 'service-worker.js';
      
        navigator.serviceWorker.register(url).then(function(swReg) {
            swRegistration = swReg;
        }).catch(function(error) {
            console.error('Service Worker Error', error);
        });
    } else {
        console.warn('Push messaging is not supported');
        pushButton.textContent = 'Push Not Supported';
    }
})();

export default {
    btnClick: (isSubscribe) => {
        if (isSubscribe) {
            unsubscribe();
        } else {
            console.log('11');
            subscribeUser();
        }
    },
    fresh: (img) =>  {
        var imgFresh = setInterval(function () {
            let testimg = document.createElement('img');
            testimg.src="https://lorempixel.com/400/200/";
            // 如果有网的话在刷新
            testimg.onload = () => {
                img.src = 'https://lorempixel.com/400/200/';
            }
            testimg.onerror = () => {
                clearInterval(imgFresh);
                setTimeout(fresh, 180000);
            };
        }, 30000);
    }
}
function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
function subscribeUser() {
    console.log(22);
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    }).then((subscription) => {
        console.log('user is subscribed:', subscription);
        return Promise.resolve(true);
    }).catch((err) => {
        console.log('failed to subscribe', err);
    });
}

function updateSubscriptionOnServer(subscription) {
    // TODO: Send subscription to application server
    console.log(33);
}

function unsubscribeUser() {
    swRegistration.pushManager.getSubscription().then((subscription) => {
        if(subscription) {
            return subscription.unsubscribe();
        }
    }).catch((err) => {
        console.log('err unsubscribe', err);
    }).then(() => {
        console.log('user is unsubscribed');
        return Promise.resolve(false);
    })
}