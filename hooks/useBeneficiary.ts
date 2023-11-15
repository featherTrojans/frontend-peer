import React, { useEffect, useState } from "react";
import axiosCustom from "../httpRequests/axiosCustom";

function useBeneficiary(BENEFICIARY_TYPE, property) {
  const [beneficiaries, setbeneficiaries] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axiosCustom
      .get(`/beneficiary/get/${BENEFICIARY_TYPE}`)
      .then((res) => {
        setLoading(true);
        handleDuplicateandSave(res.data.data?.beneficiaries);
        // setbeneficiaries(res.data.data?.beneficiaries);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDuplicateandSave = (beneficiary) => {
    const duplicate = [];
    const uniquearr = [];

    for (let i = beneficiary.length - 1; i >= 0; i--) {
      let dataobject = {};
      const item = beneficiary[i];
      if (item?.data) {
        dataobject = JSON.parse(item?.data);
      }
      const prevarr = uniquearr.find(
        (el) => el[property] == dataobject[property]
      );

      if (prevarr) {
        duplicate.push(item.id);
      } else {
        uniquearr.push(dataobject);
      }
    }

    // set as beneficiary
    setbeneficiaries(uniquearr);
  };
  return { beneficiaries, loading };
}

export default useBeneficiary;
