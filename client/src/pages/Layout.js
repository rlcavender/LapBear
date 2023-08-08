import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../LapBear_6_Transparent.png";

function Layout() {
  return (
    <>
      <nav>
        <header>
          <div className="logo-title">
            <Link to="/"><img src={logo} alt="LapBear Logo" width="100" height="100"/></Link>
            <span>LapBear</span>
          </div>
          <nav>
            <ul>
              <li><Link to="/LiveStreamRaceData">Live Stream Race Data</Link></li>
              <li><Link to="/UploadRaceData">Upload Race Data</Link></li>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Login">Login</Link></li>
              <li><Link to="/SignUp">Sign Up</Link></li>
            </ul>
          </nav>
        </header>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;