import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [searchBook, setSearchBook] = useState("");
  const [bookResult, setBookResult] = useState([]);

  const getDataBook = async () => {
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchBook}`
    );
    console.log(result);
    setBookResult(result.data.items);
  };

  useEffect(() => {
    getDataBook();
  }, [searchBook]);

  const handelBook = (event) => {
    setSearchBook(event.target.value);
  };

  return (
    <div className="App">
      <h2>Find a Book</h2>
      <div>
        <label>
          <input
            id="message-text"
            name="message-text"
            type="text"
            placeholder="search"
            value={searchBook}
            onChange={handelBook}
          />
        </label>
      </div>
      <div>
        {bookResult.map((item, index) => {
          return (
            <div className="book-result" key={index}>
              <li>{item.volumeInfo.title}</li>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
