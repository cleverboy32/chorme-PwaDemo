// import env from '../build/env.conf.js';
let swRegistration = null;
let isSubscribe = false;
const applicationServerPublicKey='BO_R6m8osilNmdOhEHk-KF0o1u-EPruOL1bDaISHwDwSLacPsh35Hg41nZpS00XeCLG-KbGEqx35x6PKsdZNVCk';
(() => {
    let env = 'prod';
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        // let url = env === 'prod' ? 'prod-service-worker.js' : 'service-worker.js';
        url = 'prod-service-worker.js';     
        navigator.serviceWorker.register(url).then(function(swReg) {
            swRegistration = swReg;
            
            btn.addEventListener('click', btnClick, true);
        }).catch(function(error) {
            console.error('Service Worker Error', error);
        });
    } else {
        console.warn('Push messaging is not supported');
        pushButton.textContent = 'Push Not Supported';
    }
})();


let p = document.querySelector('p');
let btn = document.querySelector('button');

function btnClick() {
    if (isSubscribe) {
        unsubscribeUser();
    } else {
        subscribeUser();
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
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    }).then((subscription) => {
        console.log('user is subscribed:', subscription);
        isSubscribe = true;
        updateBtn();
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
        isSubscribe = false;
        updateBtn();
    })
}

function updateBtn() {
    if(isSubscribe) {
        btn.innerText = '订阅成功';
        p.innerText = 'ok, we will message you at every time picture change. and thanks for your subscribe,you like is our chase.'
    } else {
        btn.innerText = '订阅图片';
        p.innerText = 'you can subscribe, then we will message you picture change. dont you want see new picture?its beatiful.'
    }
}