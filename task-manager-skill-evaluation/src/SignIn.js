import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectError, selectLoading, selectUser } from "./features/userSlice";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const user = useSelector(selectUser);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        dispatch(loginUser(email, password, () => {
            navigate("/")
        }));
    };

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])

    return (
        <div>
            <h1>Sign In</h1>
            <>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin} disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </button>
            </>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default SignIn;
