import { useEffect, useState } from "react";
import RefuelList from "../components/RefuelList";
import { fetchRefuels } from "../api/refuels";

const HomePage = () => {
  const [refuels, setRefuels] = useState([]);
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(
    "Por favor espere, cargando registros"
  );

  useEffect(() => {
    fetchRefuels()
      .then((res) => {
        //console.log(res.data);
        setRefuels(res.data.entries);
        setLoading(false);
        // setErrormsg("");
      })
      .catch((err) => {
        console.log(err);
        setErrormsg(`${err.name} - ${err.message} `);
      });
  }, []);

  return (
    <RefuelsView loading={loading} refueldata={refuels} error={errormsg} />
  );

  // return (
  //   <>
  //     {/* <RefuelList refuels={refuels} /> */}

  //     {errormsg == "" ? (
  //       <RefuelList refuels={refuels} />
  //     ) : (
  //       <h2 className="text-2xl text-red-400 font-bold"> {errormsg} </h2>
  //     )}

  //     {/* {errormsg && (
  //       <h2 className="text-2xl text-red-400 font-bold"> {errormsg} </h2>
  //     )} */}
  //   </>
  // );
};

function RefuelsView({ loading, refueldata, error }) {
  if (loading) {
    return <div>{loading}</div>;
  }
  if (error !== "") {
    return (
      <div>
        <h2 className="text-2xl text-red-400 font-bold"> {error} </h2>
      </div>
    );
  }

  return <RefuelList refuels={refueldata} />;
}

export default HomePage;
