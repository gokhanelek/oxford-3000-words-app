import React from "react";
import { useEffect, useState } from "react";

interface Word {
  tr: string;
  en: string;
}

function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [history, setHistory] = useState<Word[]>([]);

  const getRandomWord = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * words.length);
    } while (newIndex === currentWordIndex);
    setCurrentWordIndex(newIndex);
    setHistory((prevHistory) => [...prevHistory, words[newIndex]]);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentWordIndex(
        words.findIndex((word) => word === newHistory[newHistory.length - 1])
      );
    }
  };

  if (words.length === 0) return <div>Loading...</div>;

  const currentWord = words[currentWordIndex];

  useEffect(() => {
    fetch("/oxford_3000_words.json")
      .then((response) => response.json())
      .then((data: Word[]) => {
        console.log("data", data);
      });
  }, []);

  return (
    <div className="App">
      <h1>Oxford 3000 Kelime Öğrenme</h1>
      <div className="word-card">
        <h2>{currentWord?.en}</h2>
        <p>{currentWord?.tr}</p>
      </div>
      <div className="button-container">
        <button onClick={goBack} disabled={history.length <= 1}>
          Geri
        </button>
        <button onClick={getRandomWord}>İleri</button>
      </div>
    </div>
  );
}

export default Home;
