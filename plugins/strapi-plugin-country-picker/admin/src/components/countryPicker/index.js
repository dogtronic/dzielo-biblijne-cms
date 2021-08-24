import React, { useState} from 'react';
import Select from 'react-select';
import {countries} from '../../utils/countries';
import {polishCountriesTranslations} from '../../utils/polishCountries';



const CountryPicker = (props) => {
  const options = countries.map(v => ({
    value: v.alpha2,
    label: polishCountriesTranslations[v.alpha2]?.name_pl,
  })).sort((v,w) => v.label > w.label ? 1 : -1)
 
  return (
    <div>
      <label>{props.label}</label>
      <Select
        options={options}
        value={options.find(v => v.value === props.value)}
        onChange={(v) => {
          props.onChange({
            target: {
              value: v.value,
              name: props.name,
              type: props.type
            }
          });
        }}
        menuPortalTarget={document.body} 
        styles={{ 
          menuPortal: base => ({ ...base, zIndex: 9999 }),
          control: base => ({...base,  border: '1px solid #E3E9F3', height: '3.4rem' })
        }}
        placeholder="Wybierz..."
      />
    </div>
  );
};

export default CountryPicker;
  