// const canvas = document.querySelector('#canvas');
// const context = canvas.getContext('2d');
// const videoStream = document.querySelector('.video-stream');
// const takePhotoBtn = document.querySelector('button');

// const getMediaDevices = async () => {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: false,
//       video: true,
//     });

//     videoStream.srcObject = stream;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const takeSnapshot = () => {
//   canvas.width = videoStream.videoWidth;
//   canvas.height = videoStream.videoHeight;
//   context.drawImage(videoStream, 0, 0, canvas.width, canvas.height);
// };

// getMediaDevices();
// takePhotoBtn.addEventListener('click', takeSnapshot);
