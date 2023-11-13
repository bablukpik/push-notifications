const saveSubscription = async (subscription) => {
  const response = await fetch('http://localhost:8000/api/save-subscription', {
    method: 'post',
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify(subscription)
  })

  return response.json()
}

// on activate, subscribe to the push service and save the user subscription to DB
self.addEventListener("activate", async (e) => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: "BANBteLufa0tEzsgxpyMFOamDP_n093GRE-AvxktVkv0HzL_Sqi1k4lkOt6ByataMePCkk41ZdbClCFskLY55KE"
  });

  const response = await saveSubscription(subscription)
  console.log(response)
});

// on push or on push api call, show notification
self.addEventListener("push", (event) => {
  const payload = event.data.json();

  console.log(payload)

  const options = {
    body: payload.body,
    icon: payload.icon || 'path/to/default-icon.png',
    badge: payload.badge || 'path/to/default-badge.png',
    vibrate: payload.vibrate || [200, 100, 200],
    data: payload.data || {},
    actions: payload.actions || [],
  };

  self.registration.showNotification(payload.title || 'New Notification', options);

  // Sample customize the notification based on the payload
  // const notification = new Notification(payload.title || 'New Notification', options);
  // notification.addEventListener('click', () => {
  //   self.clients.openWindow('/path/to/destination');
  //   notification.close();
  // });

  // setTimeout(() => {
  //   notification.close();
  // }, 5000);
});

// console.log("Hey I'm from the service worker");
