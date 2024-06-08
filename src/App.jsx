import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooksData();
  }, [searchInput]);

  const getBooksData = async () => {
    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      );
      console.log(result);
      setBooks(result.data.items);
    } catch (error) {
      ("Fetching Error");
    }
  };

  const handleInput = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="App">
      <header>
        <label htmlFor="searchInput">
          <h2>Books Search</h2>
        </label>
      </header>
      <input
        id="search"
        type="text"
        placeholder="Enter here"
        value={searchInput}
        onChange={handleInput}
      />

      <div className="search-result">
        {books.map((book, index) => {
          return (
            <div key={index} className="show-result">
              <li>{book.volumeInfo.title}</li>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
