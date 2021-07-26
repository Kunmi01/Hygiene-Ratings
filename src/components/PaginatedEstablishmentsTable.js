import React, { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import { getEstablishmentRatings } from "../api/ratingsAPI";

const tableStyle = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white"
};

export const PaginatedEstablishmentsTable = () => {
  const [error, setError] = useState(null);
  const [establishments, setEstablishments] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [pageCount, setPageCount] = useState(100);

  const [isLoading, setLoading] = useState(false);
  const [authorities, setAuthorities] = useState([]);
  const [selectedAuthority, setSelectedAuthority] = useState(undefined);

  useEffect(() => {
    getPageRatings();
  }, [pageNum]);

  const getPageRatings = () => {
    setLoading(true);
    setAuthorities([]);

    getEstablishmentRatings(pageNum).then(
      (result) => {
        console.log(result);
        const { establishments } = result;
        const authoritiesIDs = establishments.map((element) => element.LocalAuthorityBusinessID);

        setEstablishments(establishments);
        setAuthorities(authoritiesIDs);
        setSelectedAuthority(undefined);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );
  };

  function handlePreviousPage() {
    pageNum > 1 && setPageNum(pageNum - 1);
  }

  function handleNextPage() {
    pageNum < pageCount && setPageNum(pageNum + 1);
  }

  function handleOnChangeAuthority(event) {
    setSelectedAuthority(event.target.value);
  }

  function getFilteredEstablishments() {
    return establishments.filter((element) => element.LocalAuthorityBusinessID === selectedAuthority);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div style={tableStyle}>
        <h2>Food Hygiene Ratings</h2>
        {isLoading && <p>Loading...</p>}
        <select name="authority" id="authority" onChange={handleOnChangeAuthority}>
          <option value="" defaultValue>Select an authority...</option>
          {authorities.map((authority) => (
            <option key={authority} value={authority}>{authority}</option>
          ))}
        </select>
        <EstablishmentsTable establishments={selectedAuthority ? getFilteredEstablishments() : establishments} />
        <EstablishmentsTableNavigation
          pageNum={pageNum}
          pageCount={pageCount}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      </div>
    );
  }
};
