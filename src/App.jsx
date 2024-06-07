import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchText, setSearchText] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if(searchText){
      searchFromServer(searchText);
    }
  }, [searchText]);

  const searchFromServer = async (text) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${text}`);
      setBooks(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="App">
      <label htmlFor="search-text">Find a Book</label><br></br>
      <input
        id="search-text"
        type="text"
        value={searchText}
        onChange={handleSearchTextChange}
        placeholder="ค้นหาหนังสือ..."
      />
        {books.map((result, index) => (
          <div key={index} className="completeItems">
            <li className="search-result">{result.volumeInfo.title}</li>
          </div>
        ))}
    </div>
  );
}

export default App;
