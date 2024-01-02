import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateRefuel } from "../api/refuels";
import RefuelCardLine from "./RefuelCardLine";

const RefuelCard = ({ refuel }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-zinc-950 p-4 hover:cursor-pointer hover:bg-gray-950 mb-5"
      onClick={async () => {
        navigate(`/refuelop/${refuel.id}`);
      }}
    >
      {/* <div className="flex justify-start">
        <h2 className="font-bold text-xl">Fecha (Seq)</h2>
        <h2 className="font-bold text-xl ml-10">
          {refuel.fecha} ({refuel.refuelseq})
        </h2>
      </div> */}

      <RefuelCardLine
        texto_label={"Fecha"}
        texto_info={`${refuel.fecha}`}
        es_titulo={true}
      />
      <RefuelCardLine
        texto_label={"SeqNum"}
        texto_info={`${refuel.refuelseq}`}
      />

      <RefuelCardLine
        texto_label={"Importe"}
        texto_info={`${refuel.importe}`}
      />

      <RefuelCardLine
        texto_label={"Precio x litro"}
        texto_info={`${refuel.preciolitro}`}
      />

      <RefuelCardLine texto_label={"Litros"} texto_info={`${refuel.litros}`} />

      <RefuelCardLine texto_label={"Total km"} texto_info={`${refuel.totkm}`} />
    </div>
  );
};

export default RefuelCard;
