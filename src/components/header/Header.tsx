import { Link } from "react-router-dom";

import logo from "../../assets/argentBankLogo.png";
import HeaderRightNav from "./HeaderRightNav";

export default function Header(): React.ReactElement {
  return (
    <header>
      <nav className="header-nav">
        <Link className="header-nav__link header-nav__logo" to="/">
          <img src={logo} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <HeaderRightNav />
      </nav>
    </header>
  );
}
