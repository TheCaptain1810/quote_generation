// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure this is correctly pointing to your CSS file

const fetchQuotes = async () => {
  const response = await fetch('https://type.fit/api/quotes');
  const data = await response.json();
  return data.map(quote => ({
    text: quote.text,
    author: quote.author ? quote.author.replace(/,\s*type.fit$/i, '') : 'Unknown'
  }));
};

const getRandomQuote = (quotes) => quotes[Math.floor(Math.random() * quotes.length)];

const getRandomColor = () => {
  const colors = [
    { background: '#81b29a', text: '#ffffff', containerText: '#000000' },
    { background: '#f4a261', text: '#ffffff', containerText: '#000000' },
    { background: '#e76f51', text: '#ffffff', containerText: '#000000' },
    { background: '#2a9d8f', text: '#ffffff', containerText: '#000000' },
    { background: '#264653', text: '#ffffff', containerText: '#000000' },
    { background: '#e9c46a', text: '#000000', containerText: '#000000' },
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const App = () => {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [quotes, setQuotes] = useState([]);
  const [theme, setTheme] = useState(getRandomColor());

  useEffect(() => {
    const loadQuotes = async () => {
      const fetchedQuotes = await fetchQuotes();
      setQuotes(fetchedQuotes);
      setQuote(getRandomQuote(fetchedQuotes));
      setTheme(getRandomColor());
    };
    loadQuotes();
  }, []);

  const handleNewQuote = () => {
    setQuote(getRandomQuote(quotes));
    const newTheme = getRandomColor();
    setTheme(newTheme);
    document.body.style.setProperty('--background-color', newTheme.background);
    document.body.style.setProperty('--text-color', newTheme.text);
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.text}" - ${quote.author}`)}`;
    window.open(url, '_blank');
  };

  const shareOnTumblr = () => {
    const url = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeURIComponent(quote.author)}&content=${encodeURIComponent(quote.text)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
    window.open(url, '_blank');
  };

  return (
    <div className="container" style={{ color: theme.containerText }}>
      <div className="quote-box">
        <p className="quote">“{quote.text}”</p>
        <p className="author">- {quote.author}</p>
        <div className="buttons">
          <div className="social-buttons">
            <button className="button" style={{ backgroundColor: theme.background, color: theme.text }} onClick={shareOnTwitter}>
              <i className="fab fa-twitter"></i>
            </button>
            <button className="button" style={{ backgroundColor: theme.background, color: theme.text }} onClick={shareOnTumblr}>
              <i className="fab fa-tumblr"></i>
            </button>
          </div>
          <button className="button new-quote-button" style={{ backgroundColor: theme.background, color: theme.text }} onClick={handleNewQuote}>New quote</button>
        </div>
      </div>
      <p className="credit">by The Captain</p>
    </div>
  );
};

export default App;
