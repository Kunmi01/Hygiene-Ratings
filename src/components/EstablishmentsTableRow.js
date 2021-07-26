import React from "react";
import PropTypes from "prop-types";

export const EstablishmentsTableRow = ({ establishment }) => {
  return (
    <tr>
      <td>{establishment.BusinessName}</td>
      <td>{establishment.RatingValue}</td>
    </tr>
  );
};

EstablishmentsTableRow.propTypes = {
  establishment: PropTypes.object,
};
