import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, selectError, selectLoading, selectUser } from "./features/userSlice";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    const handleSignUp = () => {
        dispatch(signUpUser(email, password, () => {
            navigate("/")
        }));
    };

    useEffect(() => {
        if(user) {
            navigate("/")
        }
    }, [user, navigate])

    return (
        <div>
            <h1>Sign Up</h1>
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
                <button onClick={handleSignUp} disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </button>
            </>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default SignUp;
