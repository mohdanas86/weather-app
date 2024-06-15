import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const CitesCards = ({ cites, setCity, setCites }) => {
  const removeCites = (id) => {
    let removeCity = cites.filter((i) => {
      return i.id !== id;
    });
    setCites(removeCity);
    localStorage.setItem("cites", JSON.stringify(removeCity)); // Corrected line
  };

  return (
    <div className="grid grid-cols-1 gap-3 mt-4 m-auto w-full md:w-[80%] text-white py-4 px-4 md:px-0">
      {cites &&
        cites.map((v, i) => (
          <div
            key={i}
            className="box flex justify-between items-center overflow-hidden py-3 px-4"
            onClick={() => setCity(v.city)}
          >
            <p className="text-white capitalize">{v.city}</p>
            <button
              className="cursor-pointer text-white rounded-lg md:text-2xl text-xl"
              onClick={(e) => {
                e.stopPropagation();
                removeCites(v.id);
              }}
            >
              <AiOutlineDelete />
            </button>
          </div>
        ))}
    </div>
  );
};

export default CitesCards;
