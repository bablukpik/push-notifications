
const checkPermissions = () => {
    return new Promise((resolve, reject) => {
        if (!('serviceWorker' in navigator)) {
            reject(new Error("No support for the Service Worker API!"));
        }

        if (!('Notification' in window)) {
            reject(new Error("No support for the Notification API"));
        }

        if (!('PushManager' in window)) {
            reject(new Error("No support for the Push API"));
        }

        resolve();
    });
};

const askForNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        throw new Error("Notification permission not granted")
    }

    return permission;
}

const registerServiceWorker = async () => {

    const registration = await navigator.serviceWorker.register('sw.js');

    if (registration.installing) {
        console.log("Service worker installing");
    } else if (registration.waiting) {
        console.log("Service worker installed");
    } else if (registration.active) {
        console.log("Service worker active");
    }

    console.log("Service Worker registered successfully!");

    // registration.showNotification('Hello world'); // show notification
    return registration;
};

const main = async () => {
    try {
        await checkPermissions()
        await askForNotificationPermission()
        await registerServiceWorker()
    } catch (error) {
        console.error("Error:", error.toString());
    }
}
