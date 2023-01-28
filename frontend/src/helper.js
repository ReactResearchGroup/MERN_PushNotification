import axios from 'axios';

async function regSw() {
    if ('serviceWorker' in navigator) {
        let url = process.env.PUBLIC_URL + '/sw.js';
        const reg = await navigator.serviceWorker.register(url, {scope: '/'});
        console.log('service config is', {reg});
        return reg;
    }
    throw Error('serviceworker not supported');
}

async function subscribe(serviceWorkerReg) {
    let subscription = await serviceWorkerReg.pushManager.getSubscription();
    console.log({subscription});
    if (subscription === null) {
        subscription = await serviceWorkerReg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BDiFOmfGPj4BVRpOFYJko6OkU2oUwXv3WdsZhaocvWkpNuK2JCQce3hpQF0v0QFUGsq8pSPDT7J7TbVKunQOme0',
        });
        axios.post('http://localhost:9000/subscribe', subscription);        
    }
    
}

export { regSw, subscribe};