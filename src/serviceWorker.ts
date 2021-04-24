export const service_worker = ()=>{
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js").then(() => {
          //Service Worker Registration Succesful
          
        });
      }
}

export default service_worker