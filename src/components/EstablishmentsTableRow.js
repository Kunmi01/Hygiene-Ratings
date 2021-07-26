import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const EstablishmentsTableRow = ({ establishment }) => (
  <tr>
    <td>
      <Link style={{color: "#fff"}}
        to={{
          pathname: "/details",
          state: { id: establishment.FHRSID },
        }}
      >
        {establishment.BusinessName}
      </Link>
    </td>
    <td>{establishment.RatingValue}</td>
  </tr>
);

EstablishmentsTableRow.propTypes = {
  establishment: PropTypes.object,
};
