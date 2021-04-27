import firebase from 'firebase';

export const serviceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(() => {
      // Service Worker Registration Succesful
      console.log('[Service Worker] Registration : Successful');

      navigator.geolocation.getCurrentPosition((showPosition) => {
        const { latitude, longitude } = showPosition.coords;
        // console.log(latitude , longitude)
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then((res) => res.json())
            .then((data) => {
              const loc = data.localityInfo.administrative.slice(-1)[0].name.split(' ')[0];
              localStorage.setItem('userLocation', JSON.stringify(loc));
            })
            .catch((err) => console.log('[Location] : Permission not granted'));
      });
    })
        .catch((err) => {
          console.log('[Service Worker] Registration : Failed');
        });
  }
  if ('Notification' in window) {
    Notification.requestPermission((result) => {
      if (result === 'granted') {
        configurePushSubscription();
      }
    });
  }
};

export default serviceWorker;

const confirmationNotification = () => {
  if (!('serviceWorker' in navigator)) {
    return;
  }
  navigator.serviceWorker.ready.then((activeSW) => {
    const NotificationOptions = {
      body: 'We will notify you with the new posts in your city !!',
    };
    activeSW.showNotification(
        'Thanks for enabling notifications!',
        NotificationOptions,
    );
  });
};

const configurePushSubscription = () => {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  let sw;
  navigator
      .serviceWorker
      .ready
      .then((currentRegisteredSW) => {
        sw = currentRegisteredSW;
        return sw.pushManager.getSubscription();
      })
      .then((currentSubscription) => {
        if (currentSubscription === null) {
          const VAPID_PUBLIC = 'BIAZwmMudXY985BJKrg-UYrc98W8meJM0yF23a3FA-zO65P5n0bo-d2GGJQkjjMrOyhv_8epYWqB1u2iqXiNXus';
          const convertedVapidKey = urlBase64ToUint8Array(VAPID_PUBLIC);

          return sw.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,

          });
        } else {
        // already there
        }
      })
      .then((newSubscription) => {
        const db = firebase.firestore();
        return db.collection('subscriptions').add(JSON.parse(JSON.stringify(newSubscription)));
      })
      .then((resposneFromFirebase) => {
        console.log(resposneFromFirebase);
        if (resposneFromFirebase) {
          confirmationNotification();
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('An error occured');
      });
};

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
