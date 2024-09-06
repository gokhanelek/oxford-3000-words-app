"use client";
interface Word {
  tr: string;
  en: string;
}

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
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

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };
  useEffect(() => {
    fetch("/oxford_3000_words.json")
      .then((response) => response.json())
      .then((data: Word[]) => {
        setWords(data);
        const randomIndex = Math.floor(Math.random() * data.length);
        setCurrentWordIndex(randomIndex);
        setHistory([data[randomIndex]]);
      });
  }, []);

  const currentWord = words[currentWordIndex];

  if (words.length === 0) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.wordCard}>
          <h2>{currentWord?.en}</h2>
          <p>{currentWord?.tr}</p>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.btn}
            onClick={goBack}
            disabled={history.length <= 1}
          >
            Geri
          </button>
          <button className={styles.btn} onClick={getRandomWord}>
            İleri
          </button>
        </div>
        <div className={styles.speakButtonContainer}>
          <button
            onClick={() => speak(currentWord.en)}
            className={styles.speakButton}
          >
            Telaffuz Et
          </button>
        </div>
      </div>
    </div>
  );
}
