import React, { useState } from "react";
import Modal from "../components/Modal.js";

const modalTest = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2>implementaing modal in next js using create portal</h2>
      <button className="bg-blue-500 text-white rounded m-2 px-5" onClick={() => setShowModal(true)}>Modal</button>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        A custom Document can update the html and body tags used to render a
        Page. This file is only rendered on the server, so event handlers like
        onClick cannot be used in _document. To override the default Document,
        create the file pages/_document.js as shown below:
      </Modal>
    </div>
  );
};

export default modalTest;
