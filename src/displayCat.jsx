import React, { useState, useEffect, useRef } from "react";
import Collapse from "@devlazarevic/react-collapse";

export default function RandomCat() {
  // todo: useContext to style component using props

  // details and loading as state
  // todo: useReducer to handle mutiple state
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [catDetails, setCatDetails] = useState("");
  const mounted = useRef(true);

  // Completed: Application is reading data from any of the public open APIs, which are available on the
  // internet.
  // Completed: Data loaded from the API in asynchronous way is displayed in a table
  const fetchCatDetails = async () => {
    //  completed: Error handling is implemented. In case of an error (example: HTTP 404) a specific message is
    // displayed.
    setHasError(false);
    try {
      const response = await fetch("https://api.thecatapi.com/v1/breeds");
      const data = await response.json();
      setCatDetails(data);
    } catch {
      setHasError(true);
    }
  };

  // create side effect upon api call and include clean up if it unmounted
  useEffect(() => {
    // let mounted = current;
    if (mounted.current && !catDetails) {
      fetchCatDetails();
    }
    if (catDetails) setLoading(true);
    return () => {
      mounted.current = false;
      console.log("cleaning");
    };
  }, [catDetails]);

  return (
    <>
      {/* Completed: During the data loading, a visual feedback is shown to the user (example: a "loading..." text,
loading bar, spinning wheel). */}

      {hasError && <p>Something went wrong.</p>}

      {!isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        !hasError && (
          <table className="table">
            <thead>
              <tr>
                <th>Cat Breed</th>
                <th>Weight in Kg</th>
              </tr>
            </thead>
            {/* Completed: When the user clicks on a single row (a movie, a song, a book etc.) the application performs an
action */}
            <tbody>
              {catDetails
                ? catDetails.map((el, i) => (
                    <Collapse as={null} key={el.id}>
                      <Collapse.Summary as="tr" className="summary__row">
                        <td>{el.name}</td>
                        <td>{el.weight.metric}</td>
                      </Collapse.Summary>
                      <Collapse.Details as="tr" colspan="4">
                        <div className="row__panel">
                          <p>{el.description}</p>
                        </div>
                      </Collapse.Details>
                    </Collapse>
                  ))
                : null}
            </tbody>
          </table>
        )
      )}
    </>
  );
}
