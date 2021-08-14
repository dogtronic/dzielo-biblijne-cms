import React, { useState } from "react";
import { prefixFileUrlWithBackendUrl } from "strapi-helper-plugin";
import { AsyncPaginate } from "react-select-async-paginate";
import qs from "qs";
import { IoCloseOutline } from "react-icons/io5";

const BibleDictionaryLink = ({ isOpen, onChange, toggle }) => {
  const [value, setValue] = useState(null);

  async function loadOptions(search, _, { page }) {
    const query = qs.stringify({
      _where: { term_contains: search },
      _start: page * 10,
      _limit: 10,
      _sort: "term:ASC",
    });

    const response = await fetch(
      prefixFileUrlWithBackendUrl(
        `/bible-dictionaries/?_start=${page * 10}&_limit=10&_sort=term:ASC` +
          (search ? `&_where[0][term_contains]=${search}` : "")
      )
    );

    const responseJSON = await response.json();

    return {
      options: responseJSON.map((v) => ({
        value: v.id,
        label: v.term,
      })),
      hasMore: false,
      additional: {
        page: page + 1,
      },
    };
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="term-link-container">
      <p className="term-link-header-container">
        <b>Dodaj łącze do Słownika Biblijnego</b>
        <span onClick={toggle} className="close-button">
          <IoCloseOutline size={25} color="gray" />
        </span>
      </p>

      <AsyncPaginate
        value={value}
        loadOptions={loadOptions}
        onChange={setValue}
        additional={{
          page: 0,
        }}
        placeholder="termin..."
      />

      <div
        className="term-button"
        style={{
          backgroundColor: value ? "#6DBB1A" : "#E9EAEB",
          color: value ? "white" : "#B4B6BA",
        }}
        onClick={() => {
          onChange(value);
        }}
      >
        Dodaj link
      </div>
    </div>
  );
};

export default BibleDictionaryLink;

