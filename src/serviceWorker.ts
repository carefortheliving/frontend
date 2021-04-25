export const service_worker = ()=>{
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js").then(() => {
          //Service Worker Registration Succesful
          console.log('[Service Worker] Registration : Successful');

            navigator.geolocation.getCurrentPosition(showPosition=>{
              const {latitude , longitude} = showPosition.coords 
              console.log(latitude , longitude)
              fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
              .then(res => res.json() )
              .then(data =>{
                const loc = data.localityInfo.administrative.slice(-1)[0].name.split(' ')[0]
                localStorage.setItem("userLocation" , JSON.stringify(loc))
              })
              .catch(err => console.log("[Location] : Permission not granted"))
            });
        
        })
        .catch(err=>{
          console.log('[Service Worker] Registration : Failed');
        })
      }
}

export default service_worker

