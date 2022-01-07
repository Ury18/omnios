import './index.scss';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function CreateFile(props) {
    const navigate = useNavigate()
    const [state, setState] = useState({ title: "", author: "", topics: "" });
    const [errors, setErrors] = useState("")
    const token = Cookie.get("authToken")

    useEffect(() => {
        if (!token) navigate("/signin")
    }, [])

    const handleSetState = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const createFile = (e) => {
        e.preventDefault()

        setErrors("")

        fetch(`http://localhost:3080/api/files`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`

            },
            body: JSON.stringify(state)
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setErrors(res.error)
                } else {
                    navigate("/")
                }
            })
            .catch(err => {
                setErrors(err.error)
            })

    }

    return (
        <section className="createfile">
            <h1>CreateFile</h1>
            <form onSubmit={createFile}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label>Title</label>
                    <input onChange={handleSetState} type="text" name="title" required />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label>Author</label>
                    <input onChange={handleSetState} type="text" name="author" required />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label>Topics</label>
                    <input onChange={handleSetState} type="text" name="topics" required />
                </div>
                {errors && <p className="errors">{errors}</p>}

                <button type="submit">Submit</button>
            </form>

            <Link to={"/signin"}>SignIn</Link>

        </section>
    );
}

export default CreateFile;
