import "reactjs-popup/dist/index.css";

import Popup from "reactjs-popup";

import FormPosts from "../formposts/FormPosts";

function ModalPostagem() {
  return (
    <>
      <Popup
        trigger={
          <button className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800">
            Nova Postagem
          </button>
        }
        modal
        contentStyle={{
          borderRadius: "1rem",
          paddingBottom: "2rem",
        }}
      >
        <FormPosts />
      </Popup>
    </>
  );
}

export default ModalPostagem;
