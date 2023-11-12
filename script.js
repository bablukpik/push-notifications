const checkPermissions = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error("No support for the Service Worker API!");
    }

    if (!('Notification' in window)) {
        throw new Error("No support for the Notification API");
    }

    if (!('PushManager' in window)) {
        throw new Error("No support for the Push API");
    }
};

const askForNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        throw new Error("Notification permission not granted")
    }

    return permission;
}

const registerServiceWorker = async () => {
    try {
        checkPermissions();
        await askForNotificationPermission();
        const registration = await navigator.serviceWorker.register('sw.js', {
            scope: "/",
        });

        if (registration.installing) {
            console.log("Service worker installing");
        } else if (registration.waiting) {
            console.log("Service worker installed");
        } else if (registration.active) {
            console.log("Service worker active");
        }

        console.log("Service Worker registered successfully!", registration);

        // registration.showNotification('Hello world'); // show notification
        // return registration;
    } catch (error) {
        console.error("Error:", error.toString());
    }
};
