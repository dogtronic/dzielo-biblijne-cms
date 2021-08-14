import React, { useEffect, useState } from "react";
import { prefixFileUrlWithBackendUrl } from "strapi-helper-plugin";
import Select from "react-select";
import { IoCloseOutline } from "react-icons/io5";

const BibleLink = ({ isOpen, onChange, toggle }) => {
  const [books, setBooks] = useState([]);
  const [showBooks, setShowBooks] = useState([]);
  const [showChapters, setShowChapters] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [parts, setParts] = useState("");

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch(
        prefixFileUrlWithBackendUrl(`/bible-books/?_limit=1000`)
      );
      const responseJSON = await response.json();
      setBooks(responseJSON);
    };

    getBooks();
  }, []);

  const getChapters = async (bookId) => {
    const response = await fetch(
      prefixFileUrlWithBackendUrl(`/chapters/?bible_book.id=${bookId}`)
    );
    const responseJSON = await response.json();
    setShowChapters(responseJSON);
  };

  if (!isOpen) {
    return null;
  }

  const options = [
    { value: 1, label: "Stary testament" },
    { value: 2, label: "Nowy testament" },
  ];

  return (
    <div className="term-link-container">
      <p className="term-link-header-container">
        <b>Dodaj łącze do fragmentu Biblii</b>
        <span onClick={toggle} className="close-button">
          <IoCloseOutline size={25} color="gray" />
        </span>
      </p>

      <div>
        <label>Testament</label>

        <Select
          options={options}
          placeholder=""
          onChange={(v) => {
            setSelectedType(v);
            setShowBooks(
              books.filter((w) =>
                v.value === 1 ? w.testament === "Stary" : w.Testament === "Nowy"
              )
            );
          }}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <label>Księga</label>
        <Select
          options={showBooks.map((v) => ({
            value: v.id,
            label: v.name,
            siglum: v.siglum,
          }))}
          placeholder=""
          isDisabled={selectedType === null}
          onChange={(v) => {
            setSelectedBook(v);
            getChapters(v.value);
          }}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <label>Rozdział</label>
        <Select
          options={showChapters.map((v) => ({
            value: v.id,
            label: v.number,
          }))}
          placeholder=""
          isDisabled={selectedBook === null}
          onChange={(v) => {
            setSelectedChapter(v);
          }}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <label>Wersety</label>
        <input
          className="term-input"
          style={{
            backgroundColor: selectedChapter === null ? "#eee" : "white",
          }}
          onChange={(e) => {
            setParts(e.target.value);
          }}
          disabled={selectedChapter === null}
        />
      </div>

      <div
        className="term-button"
        style={{
          backgroundColor: parts ? "#6DBB1A" : "#E9EAEB",
          color: parts ? "white" : "#B4B6BA",
        }}
        onClick={() => {
          onChange({ book: selectedBook, chapter: selectedChapter, parts });
          setShowBooks([]);
          setShowChapters([]);
          setSelectedType(null);
          setSelectedBook(null);
          setSelectedChapter(null);
          setParts('');
        }}
      >
        Dodaj link
      </div>
    </div>
  );
};

export default BibleLink;

