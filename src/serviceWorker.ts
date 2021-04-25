export const serviceWorker = ()=>{
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(() => {
      // Service Worker Registration Succesful
      console.log('[Service Worker] Registration : Successful');
    })
        .catch((err)=>{
          console.log('[Service Worker] Registration : Failed');
        });
  }
};

export default serviceWorker;
