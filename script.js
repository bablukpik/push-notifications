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

const registerSW = async () => {
    try {
        checkPermissions();
        await askForNotificationPermission();
        const registration = await navigator.serviceWorker.register('sw.js');
        console.log("Service Worker registered successfully!", registration);
        return registration;
    } catch (error) {
        console.error("Error:", error.message);
    }
};
