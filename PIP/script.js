const videoElement = document.getElementById('video');
const boton = document.getElementById('boton');


// le indica al usuario elegir un media stream, lo pasa al video element y lo ejecuta

async function selectMediaStream(){
    try {
        const mediaStrem = await navigator.mediaDevices.getDisplayMedia();    
        videoElement.srcObject = mediaStrem;
        videoElement.onloadedmetadata = ()=> {
            videoElement.play();
        }

    } catch (error) {
        window.alert('esto salio mal: '+ error);
    }
}

boton.addEventListener('click', async () => {
    selectMediaStream();
    videoElement.hidden = false;
    boton.disabled = true;

    await videoElement.requestPictureInPicture();
    boton.disabled = false;
});

//selectMediaStream();
