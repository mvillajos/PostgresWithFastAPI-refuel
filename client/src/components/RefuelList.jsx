import RefuelCard from "./RefuelCard";

const RefuelList = ({ refuels }) => {
  return (
    <div className="flex-row">
      {refuels.map((refuel) => (
        <RefuelCard refuel={refuel} key={refuel.id} />
      ))}
    </div>
  );
};

export default RefuelList;
