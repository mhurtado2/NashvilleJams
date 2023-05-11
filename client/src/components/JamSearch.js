import { useState, useEffect } from "react";
import { Button } from "reactstrap";
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
  }, [queryString]); //watch the queryString, if it is empty don't set searchJams, if it is written in setSearcj Jams

  return (
    <article>
      <section>
        <div>
          <input
            type="text"
            placeholder="Enter Search Terms"
            onChange={(changeEvent) => {
              setQueryString(changeEvent.target.value);
            }}
            style={{
              width: "50%",
              margin: "16px 175px 16px 175px",
              textAlign: "center",
              borderRadius: "10px",
            }}
          />
        </div>
        <div className="justify-content-between">
          <label>
            Sort by Descending
            <input
              type="checkbox"
              placeholder="Enter Search Terms"
              onChange={(changeEvent) => {
                if (changeEvent.target.checked) {
                  setSortDescBool(true);
                } else {
                  setSortDescBool(false);
                  //added this so page would go back once user unselects checkbox
                  setSearchedJams([]);
                }
              }}
            />
          </label>
          <Button
            style={{ marginLeft: "20px" }}
            onClick={() => {
              searchAllJams(queryString, sortDescBool).then((response) => {
                setSearchedJams(response);
              });
            }}
          >
            Search
          </Button>
        </div>
      </section>

      <section>
        <div className="d-flex flex-wrap justify-content-between shadow">
          {searchedJams.map((jam) => (
            <JamSearchResults key={jam.id} jam={jam} />
          ))}
        </div>
      </section>
    </article>
  );
};

export default JamSearch;
