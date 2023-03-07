import { Outlet, Link } from "react-router-dom";
import logo from "../LapBear_6_Transparent.png";

const Layout = () => {
  return (
    <>
      <nav>
      <body>
        <header>
          <div class="logo-title">
            <Link to="/"><img src={logo} alt="LapBear Logo" width="100" height="100"/></Link>
            <h1>LapBear ʕ •ᴥ•ʔ</h1>
          </div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Login">Login</Link></li>
              <li><Link to="/SignUp">Sign Up</Link></li>
            </ul>
          </nav>
        </header>
      </body>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;