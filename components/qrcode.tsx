import React from "react";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCode = ({ data } : any) => {
  const [url, setUrl] = useState("https://dev.soomin.world/account?='12323'&nme?='adfdfs'");

  const downloadQRCode = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setUrl("");
  };

  const qrCodeEncoder = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUrl(e.target.value);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      bgColor={"white"}
      level={"H"}
    />
  );
  return (
    <div className="flex justify-center bg-slate-300">
      <div>{qrcode}</div>
      <div className="">
        <form onSubmit={downloadQRCode}>
          {/* <label>Enter URL</label> */}
          {/* <input
            type="text"
            value={url}
            onChange={qrCodeEncoder}
            placeholder="https://hackernoon.com"
          /> */}
          {/* <button type="submit" disabled={!url}>
            Download QR code
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default QRCode;
