const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

const saveSubscription = async (subscription) => {
  const response = await fetch('http://localhost:8000/api/save-subscription', {
    method: 'post',
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify(subscription)
  })

  return response.json()
}

self.addEventListener("activate", async (e) => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: "BANBteLufa0tEzsgxpyMFOamDP_n093GRE-AvxktVkv0HzL_Sqi1k4lkOt6ByataMePCkk41ZdbClCFskLY55KE"
  });

  console.log(subscription)

  const response = await saveSubscription(subscription)
  console.log(response)
})

self.addEventListener("push", e => {
  self.registration.showNotification("Wohoo!!", { body: e.data.text() })
})

// console.log("Hey I'm from the service worker");

// Public Key:
// BD2egyaCZBrPp_oF6deT2P_OUTOwNmyCRI4X8zb6fHh1d2OTPPfjG_zTHW2q15-jbmeGbm7IMexKPKVKV1GTLNY

// Private Key:
// B1ZN5YwGopOa6ZAAfaMd9Hi8yzwYt6sGDd7POFre5P4

console.log(self)
