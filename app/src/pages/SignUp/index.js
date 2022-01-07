import './index.scss';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function SignUp(props) {
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

    const registerUser = (e) => {
        e.preventDefault()

        setErrors("")

        fetch(`http://localhost:3080/api/users`, {
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
                    navigate("/signin")
                }
            })
            .catch(err => {
                setErrors(err.error)
            })

    }

    return (
        <section className="signup">
            <h1>Signup</h1>
            <form onSubmit={registerUser}>
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

            <Link to={"/signin"}>SignIn</Link>

        </section>
    );
}

export default SignUp;
