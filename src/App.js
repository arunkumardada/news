import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, createContext, useContext } from "react";

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#af4e19",
    borderRadius: "20px",
    padding: "20px",
    width: "700px",
    margin: "20px",
    wordWrap: "break-word",
    height: "700px",
    cursor: "pointer",
  },
};

function NewsCardComponent({ title, content, urlToImage, url, author }) {
  const contextData = useContext(MyContext);
  console.log("contextData", contextData);
  function onClickCard() {
    window.open(url);
  }
  return (
    contextData &&
    contextData.articles.map((article) => {
      return (
        <div style={styles.card} onClick={onClickCard}>
          <img src={article.urlToImage} style={{ width: "100%" }} />
          <h4 style={{ color: "black", fontFamily: "fantasy" }}>
            {article.title}
          </h4>
          <p style={{ fontStyle: "italic" }}>
            {article.content?.split(" ").slice(0, 20)}
          </p>
          <p style={{ color: "#45ff00" }}>Author: {article.author}</p>
        </div>
      );
    })
  );
}
const MyContext = createContext(null);
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://newsapi.org/v2/everything?q=tesla&from=2024-02-18&sortBy=publishedAt&apiKey=c162f7d901cb4f85a151e46765d6d58a"
      );
      if (!response.ok) {
        console.log("Error fetching data");
        return;
      }
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h2>News Data</h2>
        {/* <p>{JSON.stringify(data)}</p> */}
        {/* <div style={styles.container}>
          {data &&
            data.articles.map((article) => {
              return (
                <MyContext.Provider value={data}>
                  <NewsCardComponent
                    title={article.title}
                    content={article.description}
                    urlToImage={article?.urlToImage}
                    url={article?.url}
                    author={article?.author}
                  />
                </MyContext.Provider>
              );
            })}
        </div> */}
        <MyContext.Provider value={data}>
          <NewsCardComponent />
        </MyContext.Provider>
      </header>
    </div>
  );
}

export default App;
