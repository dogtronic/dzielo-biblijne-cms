import React, { useEffect, useState } from 'react'
import { useStrapi, prefixFileUrlWithBackendUrl } from 'strapi-helper-plugin'
import PropTypes from 'prop-types'
import { AsyncPaginate } from 'react-select-async-paginate';
import qs from 'qs';

const TermLink = ({ isOpen, onChange, onToggle, model }) => {
  const [value, setValue] = useState(null);
  
  async function loadOptions(search, loadedOptions, { page }) {
    const query = qs.stringify({ _where: { term_contains: search }, _start: page * 10, _limit: 10, _sort: 'term:ASC' });
    console.log(prefixFileUrlWithBackendUrl(`/terms?${query}`));
    
    const response = await fetch(prefixFileUrlWithBackendUrl(`/terms/?_start=${page * 10}&_limit=10&_sort=term:ASC` + (search ? `&_where[0][term_contains]=${search}`: '')));
    const responseJSON = await response.json();

    return {
      options:  responseJSON.map(v => ({
        value: v.id,
        label: v.term
      })),
      hasMore: false,
      additional: {
        page: page + 1,
      },
    };
  }
  
  useEffect(() => {
    if (isOpen && typeof model.url === 'string') {
      setValue(model.url ? {value: parseInt(model.url.substring(6)), label: 'Wybrany termin'} : null)
    }
  }, [isOpen])

  const onRemove = e => {
    e.preventDefault()
    onChange( null)
  }

  if(!isOpen) {
    return null;
  }  

  return (
    <div style={{padding: 20, backgroundColor: '#fafafa', zIndex: 10}}>
      <p><b>Dodaj łącze do terminu</b></p>
      <AsyncPaginate
        value={value}
        loadOptions={loadOptions}
        onChange={setValue}
        additional={{
          page: 0,
        }}
        placeholder="termin..."
      />
      
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{padding: '6px 30px', backgroundColor: value ? '#6DBB1A' : '#E9EAEB', color: value ? 'white' : '#B4B6BA', borderRadius: 2, display: 'flex', justifyContent: 'center', width: 130, marginTop: 20}} onClick={() => {
          onChange(`terms/${value.value}`)
        }}>
          Dodaj link
        </div>

        { model?.url && <div style={{padding: '6px 30px', backgroundColor: '#f64d0a', color:'white', borderRadius: 2, display: 'flex', marginLeft: 10, justifyContent: 'center', width: 130, marginTop: 20}} onClick={onRemove}>
          Usuń link
        </div>}
      </div>
    </div>
   
  )
}


export default TermLink
