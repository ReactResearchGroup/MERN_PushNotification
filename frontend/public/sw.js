this.addEventListener('activate', function(event) {
    console.log('service worker activated');
});
this.addEventListener('push', async function(event) {
    debugger
    console.log('notifications will be displayed here');
    const message = await event.data.json();
    let { title, description, image } = message;
    console.log({message});
    await event.waitUntil(
        this.registration.showNotification(title, {
            body: description,
            icon: image,
            vibrate: [300, 100, 400] // Vibrate 300ms, pause 100ms, then vibrate 400ms
        })
    );
});