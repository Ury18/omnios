import './index.scss';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookie from "js-cookie"
import { Link } from "react-router-dom";

function FilesList(props) {
    const navigate = useNavigate()
    const [state, setState] = useState({ filter: "", files : [], activeFiles: [] });


    useEffect(() => {
        const token = Cookie.get("authToken")
        if (!token) navigate("/signin")

        getFiles(token)
    }, [])

    const handleSetState = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

        if(name == "filter") {
            filterFiles()
        }
    }

    const filterFiles = () => {
        console.log(state.filter)
    }

    const getFiles = (token) => {
        fetch(`http://localhost:3080/api/files`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setState(prevState => ({
                    ...prevState,
                    files: res,
                    activeFiles : res
                }));
            })
            .catch(err => {
                setState(prevState => ({
                    ...prevState,
                    files: [],
                    activeFiles: []
                }));
            })

    }

    return (
        <section className="files-list">
            <h1>Files</h1>
            <form>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label>Filter</label>
                    <input onChange={handleSetState} type="text" name="filter" required />
                </div>
            </form>
            <Link to={"/createfile"}>SignUp</Link>
        </section>
    );
}

export default FilesList;
