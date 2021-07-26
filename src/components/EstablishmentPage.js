import React, { useState, useEffect } from "react";
import { getEstablishmentDetails } from "../api/ratingsAPI";
import { useHistory, useLocation } from 'react-router-dom';

const pageStyle = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white"
};

const EstablishmentPage = () => {
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const { id }= location.state;

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    getEstablishmentDetails(id).then((result) => {
      const {
        BusinessName,
        AddressLine1,
        AddressLine2,
        AddressLine3,
        AddressLine4,
        RatingValue,
        RatingDate,
      } = result;
      const timestamp = new Date(RatingDate).getTime();
      const date = new Date(timestamp);
      const formattedDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}/`;

      setBusinessName(BusinessName);
      setAddress(
        `${AddressLine1}, ${AddressLine2}, ${AddressLine3}, ${AddressLine4}`
      );
      setRating(RatingValue);
      setInspectionDate(formattedDate);
    }),
      (error) => {
        setError(error);
      };
  };

  const handleBackButtonClicked = () => {
      history.goBack();
  };

  return (
    <div style={pageStyle}>
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <div>
            <button type="button" onClick={handleBackButtonClicked}>
              Go back
            </button>
          </div>
          <div>
            <p>
              Business Name: <span>{businessName}</span>
            </p>
            <p>
              Address: <span>{address}</span>
            </p>
            <p>
              Rating: <span>{rating}</span>
            </p>
            <p>
              Inspection Date: <span>{inspectionDate}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default EstablishmentPage;
