import type { NextPage } from 'next'


const Webcam: NextPage = () => {

    return (

        <div>

                <video id="video-preview" muted></video>

                <button id="button-start">🔴 START RECORDING</button
                ><br /><br />
                <button id="button-stop">🚫 STOP RECORDING</button>

                <video id="video-playback" controls></video>

                <script src="webcam-recorder-previewer.js"></script>
            
        </div>

    );

};



export default Webcam;