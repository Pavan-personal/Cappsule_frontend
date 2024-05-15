import React, { useState, useEffect } from "react";

function SaltCard(props) {
  const salt = props.info;
  const forms = Object.keys(salt.salt_forms_json);

  const [selectedForm, setSelectedForm] = useState(forms[0]);
  const [selectedStrength, setSelectedStrength] = useState(
    Object.keys(salt.salt_forms_json[selectedForm])[0]
  );
  const [selectedPacking, setSelectedPacking] = useState(null);
  const [lowestPrice, setLowestPrice] = useState(null);

  const [showMoreForms, setShowMoreForms] = useState(false);
  const [showMoreStrengths, setShowMoreStrengths] = useState(false);
  const [showMorePackings, setShowMorePackings] = useState(false);

  useEffect(() => {
    setSelectedStrength(Object.keys(salt.salt_forms_json[selectedForm])[0]);
  }, [selectedForm]);

  useEffect(() => {
    // Set the default selected packing to the first packing when the component mounts or when the selected strength changes
    setSelectedPacking(
      Object.keys(salt.salt_forms_json[selectedForm][selectedStrength])[0]
    );
  }, [selectedForm, selectedStrength, salt]);

  useEffect(() => {
    if (selectedPacking !== null) {
      const prices =
        salt.salt_forms_json[selectedForm][selectedStrength][selectedPacking];
      if (!prices || Object.values(prices).every((price) => price === null)) {
        setLowestPrice(null);
      } else {
        const validPrices = Object.values(prices).filter(
          (price) => price !== null
        );
        const flatValidPrices = [].concat(...validPrices);
        const lowestPriceValue = Math.min(
          ...flatValidPrices.map((price) => price.selling_price)
        );
        setLowestPrice(lowestPriceValue);
      }
    }
  }, [selectedPacking, salt, selectedForm, selectedStrength]);

  const handleChangeForm = (form) => {
    setSelectedForm(form);
    setSelectedStrength(Object.keys(salt.salt_forms_json[form])[0]); // Reset selected strength when form changes
    setSelectedPacking(null); // Reset selected packing when form changes
  };

  const handleChangeStrength = (strength) => {
    setSelectedStrength(strength);
    setSelectedPacking(null); // Reset selected packing when strength changes
  };

  const handleClickPacking = (packing) => {
    setSelectedPacking(packing);
  };

  const isDottedForm = (factor) => {
    for (const i in Object.values(factor)) {
      for (const j in Object.values(Object.values(factor)[i])) {
        for (const k in Object.values(Object.values(factor)[i])[j]) {
          if (Object.values(Object.values(factor)[i])[j][k] !== null) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const isDottedStrength = (arr) => {
    const checkedArrays = Object.values(arr);
    for (const prices of checkedArrays) {
      for (const price of Object.values(prices)) {
        if (price !== null) {
          return false;
        }
      }
    }
    return true;
  };

  const isDotted = (factor) => {
    // console.log(factor);
    for (const price of Object.values(factor)) {
      if (price !== null) {
        return false;
      }
    }
    return true;
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(275.41deg, #D5E7E6 -27.33%, #FFFFFF 46.85%)",
        boxShadow: "0px 0px 30px 0px rgba(0, 0, 0, 0.1)",
      }}
      className="border duration-700 w-[62.938rem] rounded-xl px-6 py-8 shadow-md grid grid-cols-2"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-start">
          <h3 className="text-[15px] w-[5.2rem] text-left font-semibold text-slate-500">
            Forms:
          </h3>
          <div className="flex flex-col items-end">
            <div className="grid grid-cols-2 w-fit gap-2">
              {forms
                .slice(0, showMoreForms ? forms.length : 4)
                .map((form, index) => (
                  <button
                    key={index}
                    onClick={() => handleChangeForm(form)}
                    className={`block px-[10px] py-[5px] rounded-[8px] border-[2px] text-[13px] ${
                      selectedForm === form
                        ? `font-bold border-[rgba(17,45,49,1)] ${
                            isDottedForm(salt.salt_forms_json[form])
                              ? ""
                              : "btn-shadow"
                          }`
                        : "font-semibold border-[rgba(200,200,200,1)] text-[rgba(85,85,85,1)]"
                    } ${
                      isDottedForm(salt.salt_forms_json[form])
                        ? "border-dashed"
                        : "border-solid"
                    }`}
                  >
                    {form}
                  </button>
                ))}
            </div>
            {forms.length > 4 && (
              <button
                onClick={() => setShowMoreForms(!showMoreForms)}
                className="text-[14px] pl-2 cursor-pointer font-bold text-[rgba(32,71,114,1)]"
              >
                {showMoreForms ? "hide.." : "more.."}
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <h3 className="text-[15px] w-[5.2rem] text-left font-semibold text-slate-500">
            Strengths:
          </h3>
          <div className="flex flex-col items-end">
            <div className="grid grid-cols-2 w-fit gap-2">
              {Object.keys(salt.salt_forms_json[selectedForm])
                .slice(
                  0,
                  showMoreStrengths
                    ? Object.keys(salt.salt_forms_json[selectedForm]).length
                    : 4
                )
                .map((strength, index) => (
                  <button
                    key={index}
                    onClick={() => handleChangeStrength(strength)}
                    className={`block px-[10px] w-fit py-[5px] rounded-[8px] border-[2px] text-[13px] ${
                      selectedStrength === strength
                        ? `font-bold border-[rgba(17,45,49,1)] ${
                            isDottedStrength(
                              salt.salt_forms_json[selectedForm][strength]
                            )
                              ? ""
                              : "btn-shadow"
                          } `
                        : "font-semibold text-[rgba(85,85,85,1)] border-[rgba(200,200,200,1)]"
                    } ${
                      isDottedStrength(
                        salt.salt_forms_json[selectedForm][strength]
                      )
                        ? "border-dashed"
                        : "border-solid"
                    }`}
                  >
                    {strength
                      .slice(0, 10)
                      .concat(strength.length > 11 ? ".." : "")}
                  </button>
                ))}
            </div>
            {Object.keys(salt.salt_forms_json[selectedForm]).length > 4 && (
              <button
                onClick={() => setShowMoreStrengths(!showMoreStrengths)}
                className="text-[14px] pl-2 cursor-pointer font-bold text-[rgba(32,71,114,1)]"
              >
                {showMoreStrengths ? "hide.." : "more.."}
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <h3 className="text-[15px] w-[5.2rem] text-left font-semibold text-slate-500">
            Packaging:
          </h3>{" "}
          <div className="flex flex-col items-end">
            <div className="grid grid-cols-2 w-fit gap-2">
              {Object.entries(
                salt.salt_forms_json[selectedForm][selectedStrength]
              )
                .slice(
                  0,
                  showMorePackings
                    ? Object.entries(
                        salt.salt_forms_json[selectedForm][selectedStrength]
                      ).length
                    : 2
                )
                .map(([packing, prices], index) => (
                  <button
                    key={index}
                    onClick={() => handleClickPacking(packing)}
                    className={`block px-[10px] border-[2px] py-[5px] rounded-[8px] text-[13px] ${
                      selectedPacking === packing
                        ? `border-[rgba(17,45,49,1)] font-bold ${
                            isDotted(
                              salt.salt_forms_json[selectedForm][
                                selectedStrength
                              ][packing]
                            )
                              ? ""
                              : "btn-shadow"
                          } `
                        : "font-semibold border-[rgba(200,200,200,1)] text-[rgba(85,85,85,1)]"
                    } ${
                      isDotted(
                        salt.salt_forms_json[selectedForm][selectedStrength][
                          packing
                        ]
                      )
                        ? "border-dashed"
                        : "border-solid"
                    }`}
                  >
                    {packing}
                  </button>
                ))}
            </div>

            {Object.entries(
              salt.salt_forms_json[selectedForm][selectedStrength]
            ).length > 2 && (
              <button
                onClick={() => setShowMorePackings(!showMorePackings)}
                className="text-[14px] pl-2 cursor-pointer font-bold text-[rgba(32,71,114,1)]"
              >
                {showMorePackings ? "hide.." : "more.."}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="absolute justify-self-center self-center flex flex-col gap-1">
        <div className="font-bold cursor-pointer" title={salt.salt}>
          {salt.salt.slice(0, 35)}
        </div>
        <div className="flex justify-center font-semibold text-[rgba(42,82,122,1)] items-center ">
          <div className="text-xs">{selectedForm}</div>
          <div className="mx-1">|</div>
          <div className="text-xs">{selectedStrength}</div>
          <div className="mx-1">|</div>
          <div className="text-xs">{selectedPacking}</div>
        </div>
      </div>
      <div className="flex items-center justify-end pr-12">
        {lowestPrice === null ? (
          <div
            style={{ border: "1px solid rgba(167, 214, 212, 1)" }}
            className="flex flex-col rounded-[5px] font-medium justify-center items-center px-5 py-3 bg-white h-fit"
          >
            <span>No stores selling this</span>
            <span>product near you</span>
          </div>
        ) : (
          <div
            className="font-bold text-[28px] flex justify-center items-center text-[rgba(17,45,49,1)]
          "
          >
            From ₹{lowestPrice}
          </div>
        )}
      </div>
    </div>
  );
}

export default SaltCard;
