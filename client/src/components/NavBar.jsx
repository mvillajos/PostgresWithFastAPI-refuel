import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="flex justify-between items-center my-7">
      <Link to="/">
        <h1 className="text-3xl font-bold">Refuel App</h1>
      </Link>

      <Link
        to="/refuelop"
        className="bg-zinc-950 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded"
      >
        Create Refuel
      </Link>
    </header>
  );
};

export default NavBar;
