import React from "react";
import loading from "./logo.gif";

const Loading: React.FC = () => {

  return (
    <div className="w-full h-full fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-10">
      <img
        src={loading.src} // Use a logo sorteada
        alt="Loading"
        className="w-28 h-28 object-cover mb-4"
      />
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Estamos fazendo a mágica, aguarde...
      </p>
    </div>
  );
};

export default Loading;
