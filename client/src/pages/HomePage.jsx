import { useEffect, useState } from "react";
import RefuelList from "../components/RefuelList";
import { fetchRefuels } from "../api/refuels";

const HomePage = () => {
  const [refuels, setRefuels] = useState([]);
  const [errormsg, setErrormsg] = useState("");

  useEffect(() => {
    fetchRefuels()
      .then((res) => {
        //console.log(res.data);
        setRefuels(res.data.entries);
        setErrormsg("");
      })
      .catch((err) => {
        console.log(err);
        setErrormsg(`${err.name} - ${err.message} `);
      });
  }, []);

  return (
    <>
      {/* <RefuelList refuels={refuels} /> */}

      {errormsg == "" ? (
        <RefuelList refuels={refuels} />
      ) : (
        <h2 className="text-2xl text-red-400 font-bold"> {errormsg} </h2>
      )}

      {/* {errormsg && (
        <h2 className="text-2xl text-red-400 font-bold"> {errormsg} </h2>
      )} */}
    </>
  );
};

export default HomePage;
