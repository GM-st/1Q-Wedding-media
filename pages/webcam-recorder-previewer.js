// define the media track constraints object
// NB https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints
(function () {
    const constraintObj = {
      audio: true,
      video: true,
      // video: {
      //   facingMode: "user",
      //   width: { min: 640, ideal: 1280, max: 1920 },
      //   height: { min: 480, ideal: 720, max: 1080 }
      // }
  
      // Other useful props:
      // width: 1280, height: 720  -- preference only
      // facingMode: {exact: "user"} // forcing to be user camera
      // facingMode: "environment"
    };
  
    // handle older browsers that might implement getUserMedia in some way
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
      navigator.mediaDevices.getUserMedia = function (constraintObj) {
        const getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
          return Promise.reject(
            new Error("getUserMedia is not implemented in this browser")
          );
        }
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraintObj, resolve, reject);
        });
      };
    } else {
      // this logs all Audio/Video IO connections:
      navigator.mediaDevices
        .enumerateDevices()
        .then(devices => {
          devices.forEach(device => {
            console.log(device.kind.toUpperCase(), device.label);
            //, device.deviceId
          });
        })
        .catch(err => {
          console.log(err.name, err.message);
        });
    }
  
    // Use WebRTC getUserMedia method() and provide constraintObj
    navigator.mediaDevices
      .getUserMedia(constraintObj) // getUserMedia returns a promise
      .then(function (mediaStreamObj) {
        // on fullfillment you get a stream object
        // connect the stream object to the first video element
        const video = document.querySelector("#video-preview");
        if ("srcObject" in video) {
          video.srcObject = mediaStreamObj;
        } else {
          // legacy version
          video.src = window.URL.createObjectURL(mediaStreamObj);
        }
  
        // PREVIEW THE CURRENT WEBCAM STREAM
        video.onloadedmetadata = () => video.play();
  
        // RECORDING PART
        const start = document.getElementById("button-start");
        const stop = document.getElementById("button-stop");
        const videoPlayback = document.getElementById("video-playback");
  
        // MediaStream Recorind API (you pass in the stream object as parameter)
        const mediaRecorder = new MediaRecorder(mediaStreamObj);
        let dataChunks = [];
  
        // add listeners for start/stop clicks
        start.addEventListener("click", () => {
          mediaRecorder.start();
          console.log(mediaRecorder.state);
        });
        stop.addEventListener("click", () => {
          mediaRecorder.stop();
          console.log(mediaRecorder.state);
        });
  
        // store data chunks while recording
        mediaRecorder.ondataavailable = function (ev) {
          dataChunks.push(ev.data);
        };
  
        // After pressing stop the onstop event fires
        // Create a blob
        mediaRecorder.onstop = () => {
          let blob = new Blob(dataChunks, { type: "video/mp4;" });
          // if there is another recording it is good to reset the data chunks, otherwise this gets appended
          dataChunks = [];
          // convert blob into objectURL
          let videoURL = window.URL.createObjectURL(blob);
          videoPlayback.src = videoURL;
        };
      })
      .catch(err => {
        console.log(err.name, err.message);
        // If getUserMedia rejects the Promise one of the following errors may occur:
        // AbortError - generic unknown cause
        // NotAllowedError (SecurityError) - user rejected permissions
        // NotFoundError - missing media track
        // NotReadableError - user permissions given but hardware/OS error
        // OverconstrainedError - constraint video settings preventing
        // TypeError - audio: false, video: false
      });
  })();