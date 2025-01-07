import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logoutUser } from "./features/userSlice";

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
            {!user && <nav>
                <Link to="/signup">Sign Up</Link>
                <Link to="/signin">Sign In</Link>
            </nav>}
            {user && <nav>
                <Link to="/">Home</Link>
                <Link onClick={handleLogout}>Log out</Link>
            </nav>}
        </>
    );
}

export default NavBar;