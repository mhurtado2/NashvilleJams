import { useState, useEffect } from "react";
import { searchAllJams } from "../modules/jamManager";
import JamSearchResults from "./JamSearchResults";

const JamSearch = () => {
    const [searchedJams, setSearchedJams] = useState([]);
    const [queryString, setQueryString] = useState([]);
    const [sortDescBool, setSortDescBool] = useState(false);

    useEffect(() => {
        if (queryString === "") {
            setSearchedJams([]);
        }
    }, [queryString]) //watch the queryString, if it is empty don't set searchJams, if it is written in setSearcj Jams


    return <article>
        <section>
            <input 
            type = "text"
            placeholder="Enter Search Terms"
            onChange={(changeEvent) => {
                setQueryString(changeEvent.target.value)
            }}
            style={{width : "80%", margin : "16px 175px 16px 175px", textAlign : "center"}} 
            />
        <label>
            Sort by Descending
            <input 
            type = "checkbox"
            placeholder="Enter Search Terms"
            onChange={(changeEvent) => {
                if (changeEvent.target.checked){
                    setSortDescBool(true)
                }
                else {
                    setSortDescBool(false)
                }
            }}
            />
        </label>
        <button
            onClick={() => {
                searchAllJams(queryString, sortDescBool)
                .then(response => {
                    setSearchedJams(response)
                })
            }}>
            Search
        </button>
        </section>

        <section>
            <div className= "d-flex flex-wrap justify-content-between shadow">
                {searchedJams.map((jam) => (
                <JamSearchResults key={jam.id}
                 jam={jam}
                />
                 ))}
            </div>
        </section>

    </article>
}

export default JamSearch;