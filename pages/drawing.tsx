import React, { useRef } from "react";
import ReactSignatureCanvas from "react-signature-canvas";

function Drawing(): JSX.Element {
  const signCanvas = useRef() as React.MutableRefObject<any>;

  const clear = () => {
    signCanvas.current.clear();
  };

  const save = () => {
    const image = signCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "sample.png";
    link.click();
  };

  return (
    <div>
      <div className="flex flex-col justify-center h-screen items-center">
        <div className="canvas border-2 border-color: rgb(161 161 170) rounded-lg ring-2 ring-blue-100/50 shadow-2xl shadow-indigo-500/40 justify-center bg-gradient-to-r from-cyan-100 to-blue-100">
          <ReactSignatureCanvas
            ref={signCanvas}
            canvasProps={{
              width: 1000,
              height: 400,
              className: "sigCanvas canvasStyle",
            }}
            penColor="green"
          />
        </div>
        <div className="py-10">
          <button
            onClick={clear}
            className="rounded-3xl h-20 px-20 m-2 text-5xl bg-blue-100 hover:bg-blue-100 text-white font-bold py-2 bg-gradient-to-r from-green-200 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-center"
          >
            clear
          </button>
          <button
            onClick={save}
            className="rounded-3xl h-20 px-20 m-2 text-5xl bg-blue-100 hover:bg-blue-100 text-white font-bold py-2 bg-gradient-to-r from-green-200 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-center"
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawing;
