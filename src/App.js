// src/App.js
import React, { useState, useEffect } from 'react';
import DataFetchingComponent from './components/DataFetchingComponent';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(1); // Початковий ID поста

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Не вдалося завантажити пости:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
      <div className="App">
        <h1>Список постів</h1>
        <ul>
          {posts.map(post => (
              <li key={post.id}>
                <h3 onClick={() => setSelectedPostId(post.id)}>{post.title}</h3>
              </li>
          ))}
        </ul>
        <DataFetchingComponent id={selectedPostId} />
      </div>
  );
}

export default App;
