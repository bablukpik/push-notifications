# Push Notifications

This is a push notification application with modern browser APIs like [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API), [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API), and [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).

## How to run the App

- To run the application, use a live server extension to run the html file.
- To make the service worker api available, first navigate to the server folder by using this command `cd server`, and then run `npm install` to install the dependencies.
- Generate Application Server Keys or Vapid Keys using `npm run g-vapid-keys` and then use these keys in the `.env` file, there is an example file (.env.example) at the root.
- Use the public key for the client as well, hence in `sw.js` file, you'll get `applicationServerKey` prop and replace the existing one with the new key.
- Finally to run the app `node index.js` or `npm run dev`.
- Now the server should listen on `http://localhost:8000`
- Now open the `index.html` file using live server, now you should see `Enable Notification` button, click on it and accept the request.
- Now from the different tab of the browser or postman call this api `http://localhost:8000/api/send-notification` and then you should get a notification that is sent from the server.

## Some Useful Links

- https://web.dev/explore/notifications
- https://github.com/web-push-libs/
