import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="container mx-auto my-6 mb-8 flex justify-center items-center gap-4">
      <NavLink className="font-semibold hover:text-sky-400  [&.active]:text-sky-400" to="/" aria-label="Home">
        Home
      </NavLink>
      <NavLink className="font-semibold hover:text-sky-400 [&.active]:text-sky-400" to="/niveis" aria-label="Niveis">
        Niveis
      </NavLink>
      <NavLink className="font-semibold hover:text-sky-400 [&.active]:text-sky-400" to="/desenvolvedores" aria-label="Desenvolvedores">
        Desenvolvedores
      </NavLink>
    </div>
  );
};

export default Header;
