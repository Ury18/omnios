import './index.scss';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookie from "js-cookie"
import { Link } from "react-router-dom";

function SignIn(props) {
    const navigate = useNavigate()
    const [state, setState] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState("")

    const handleSetState = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const authenticateUser = (e) => {
        e.preventDefault()

        setErrors("")

        fetch(`http://localhost:3080/api/users/authenticate`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(state)
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setErrors(res.error)
                } else {
                    Cookie.set("authToken", res.token, { expires: 1 })
                    navigate("/")
                }
            })
            .catch(err => {
                setErrors(err.error)
            })

    }

    return (
        <section className="signin">
            <h1>SingIn</h1>
            <form onSubmit={authenticateUser}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label>Email</label>
                    <input onChange={handleSetState} type="email" name="email" required />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label>Password</label>
                    <input onChange={handleSetState} type="password" name="password" required />
                </div>

                {errors && <p className="errors">{errors}</p>}

                <button type="submit">Submit</button>
            </form>

            <Link to={"/signup"}>SignUp</Link>

        </section>
    );
}

export default SignIn;
