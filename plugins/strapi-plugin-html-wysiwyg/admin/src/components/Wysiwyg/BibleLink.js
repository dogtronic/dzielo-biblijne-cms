import React, { useEffect, useState } from 'react'
import { useStrapi, prefixFileUrlWithBackendUrl } from 'strapi-helper-plugin'
import PropTypes from 'prop-types'
import { AsyncPaginate } from 'react-select-async-paginate';
import qs from 'qs';
import Select from 'react-select';

const TermLink = ({ isOpen, onChange, onToggle, model }) => {
  const [books, setBooks] = useState([]);
  const [showBooks, setShowBooks] = useState([]);
  const [showChapters, setShowChapters] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter , setSelectedChapter] = useState(null);
  const [parts, setParts] = useState('');

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch(prefixFileUrlWithBackendUrl(`/bible-books/?_limit=1000`));
      const responseJSON = await response.json();
      setBooks(responseJSON)

      // if (isOpen && typeof model.url === 'string') {
      
      // }
      // setValue(model.url ? {value: parseInt(model.url.substring(6)), label: 'Wybrany termin'} : null)
    }

    getBooks();
  }, [])
  
  const onRemove = e => {
    e.preventDefault()
    onChange(null)
  }

  if(!isOpen) {
    return null;
  }  

  const options = [
    { value: 1, label: 'Stary testament' },
    { value: 2, label: 'Nowy testament' },
  ]

  return (
    <div style={{padding: 20, backgroundColor: '#fafafa', zIndex: 10}}>
      <p><b>Dodaj łącze do fragmentu Biblii</b></p>
      <div>
        <label>Testament</label>
      <Select
        options={options}
        placeholder=""
        onChange={(v) => {
          setSelectedType(v);
          setShowBooks(books.filter((w) => v.value === 1 ? w.testament === 'Stary' : w.Testament === 'Nowy'))
        }}
        
      />
      </div>
      <div style={{marginTop: 10,}}>
        <label>Księga</label>
      <Select
        options={showBooks.map(v => ({
          value: v.id,
          label: v.name
        }))}
        placeholder=""
        isDisabled={selectedType === null}
        onChange={(v) => {
          setSelectedBook(v);
          const book = books.find((w) => w.id === v.value)
          setShowChapters(book.chapters)
        }}
      />
</div>
      <div style={{marginTop: 10,}}>
        <label>Rozdział</label>
      <Select
        options={showChapters.map(v => ({
          value: v.id,
          label: v.number
        }))}
        placeholder=""
        isDisabled={selectedBook === null}
        onChange={(v) => {
          setSelectedChapter(v);
        }}
      />
      </div>

      <div style={{marginTop: 10,}}>
        <label>Wersety</label>
        <input style={{
          width: '100%',
          height: '3.4rem',
          padding: '0 1rem',
          fontWeight: '400',
          fontSize: '1.3rem',
          cursor: 'text',
          outline: 0,
          border: '1px solid #E3E9F3',
          borderRadius: 2,
          color: '#333740',
          backgroundColor: selectedChapter === null ? '#eee' :'white',
        }}
          onChange={(e) => {
            setParts(e.target.value);
          }}
          disabled={selectedChapter === null}
        />
      </div>

      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{padding: '6px 30px', backgroundColor: parts ? '#6DBB1A' : '#E9EAEB', color: parts ? 'white' : '#B4B6BA', borderRadius: 2, display: 'flex', justifyContent: 'center', width: 130, marginTop: 20}} onClick={() => {
          onChange(`bible/${selectedBook.value}/${selectedChapter.value}/${parts}`)
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
