import { useState, useEffect } from "react";
// import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchRefuel,
  createRefuel,
  updateRefuel,
  deleteRefuel,
} from "../api/refuels";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RefuelForm = () => {
  // const [fecha, setFecha] = useState(new Date().toLocaleDateString("en-CA"));
  const [refuelseq, setRefuelseq] = useState(1);
  const [importe, setImporte] = useState(0);
  const [preciolitro, setPreciolitro] = useState(0);
  const [litros, setLitros] = useState(0);
  const [totkm, setTotkm] = useState(0);

  const [fecha, setFecha] = useState(new Date());
  // const [startDate, setStartDate] = useState(new Date());

  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dtfecha = fecha.toISOString().split("T")[0];
    // console.log(dtfecha);
    if (!params.id) {
      const res = await createRefuel({
        fecha: dtfecha,
        refuelseq,
        importe,
        preciolitro,
        litros,
        totkm,
      });
      console.log(res);
    } else {
      const res = await updateRefuel(params.id, {
        fecha: dtfecha,
        refuelseq,
        importe,
        preciolitro,
        litros,
        totkm,
      });
      console.log(res);
    }

    e.target.reset();
    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      fetchRefuel(params.id)
        .then((res) => {
          // console.log(res.data.entries);

          setFecha(new Date(res.data.entries.fecha));
          setRefuelseq(res.data.entries.refuelseq);
          setImporte(res.data.entries.importe);
          setPreciolitro(res.data.entries.preciolitro);
          setLitros(res.data.entries.litros);
          setTotkm(res.data.entries.totkm);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-[calc(100%-2rem)]">
      <div>
        <form className="bg-zinc-950 py-4 px-16" onSubmit={handleSubmit}>
          <h4 className="text-2xl font-bold my-2">
            {params.id ? "Update" : "Create"}
          </h4>
          <label>
            Fecha
            {/* <input
              // type="date"
              type="date"
              placeholder="fecha"
              className="block py-2 px-3 mb-4 w-full text-black"
              onChange={(e) => setFecha(e.target.value)}
              value={fecha}
              autoFocus
            /> */}
            <div>
              <DatePicker
                dateFormat="yyyy-MM-dd"
                // selected={startDate}
                // onChange={(date) => setStartDate(date)}
                selected={fecha}
                onChange={(date) => setFecha(date)}
                // value={fecha}
                className="block py-2 px-3 mb-4 w-full text-black"
              />
            </div>
          </label>

          <label>
            Seqnum
            <input
              type="number"
              placeholder="seqnum"
              className="block py-2 px-3 mb-4 w-full text-black"
              onChange={(e) => setRefuelseq(e.target.value)}
              value={refuelseq}
              autoFocus
            />
          </label>

          <label>
            Importe
            <input
              type="number"
              placeholder="importe"
              className="block py-2 px-3 mb-4 w-full text-black"
              onChange={(e) => setImporte(e.target.value)}
              value={importe}
              autoFocus
            />
          </label>

          <label>
            Precio x litro
            <input
              type="number"
              placeholder="precio x litro"
              className="block py-2 px-3 mb-4 w-full text-black"
              onChange={(e) => setPreciolitro(e.target.value)}
              value={preciolitro}
              step="0.001"
              autoFocus
            />
          </label>

          <label>
            Litros
            <input
              type="number"
              placeholder="litros"
              className="block py-2 px-3 mb-4 w-full text-black"
              onChange={(e) => setLitros(e.target.value)}
              value={litros}
              autoFocus
            />
          </label>

          <label>
            Total km
            <input
              type="number"
              placeholder="total km"
              className="block py-2 px-3 mb-4 w-full text-black"
              onChange={(e) => setTotkm(e.target.value)}
              value={totkm}
              autoFocus
            />
          </label>

          <button className="bg-white hover:bg-slate-800 hover:text-white text-slate-800 py-2 px-4 rounded">
            {params.id ? "Update" : "Create"}
          </button>

          {params.id && (
            <button
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 rounded mt-5 px-4 ml-4"
              onClick={async () => {
                try {
                  const res = await deleteRefuel(params.id);
                  console.log(res);
                  navigate("/");
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Delete
            </button>
          )}

          <button
            className="bg-green-700 hover:bg-green-400 hover:text-gray-500 text-white py-2 px-4 ml-4"
            onClick={async () => {
              navigate("/");
            }}
          >
            Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default RefuelForm;
