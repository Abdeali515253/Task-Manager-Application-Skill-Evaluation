import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logoutUser } from "./features/userSlice";
import "./styles/navbar.css"

const NavBar = () => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser(() => {
            navigate("/signin")
        }));
    };

    return (
        <>
            <nav className="navbar">
                {!user ? (
                    <div className="navbar-links">
                        <Link to="/signup" className="navbar-link">Sign Up</Link>
                        <Link to="/signin" className="navbar-link">Sign In</Link>
                    </div>
                ) : (
                    <div className="navbar-links">
                        <Link to="/" className="navbar-link">Home</Link>
                        <button className="navbar-link logout-button" onClick={handleLogout}>Log out</button>
                    </div>
                )}
            </nav>
        </>
    );
}

export default NavBar;