// src/DataFetchingComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../DataFetchingComponent.css'; // Імпорт стилів

const DataFetchingComponent = ({ id }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                    signal: controller.signal,
                });
                setData(response.data);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Запит скасовано');
                } else {
                    setError('Не вдалося завантажити дані.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [id]);

    if (loading) return <p>Завантаження даних...</p>;
    if (error) return <p>{error}</p>;

    // Перевірка перед доступом до даних
    if (!data) {
        return <p>Дані не знайдено.</p>;
    }

    return (
        <div>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
        </div>
    );
};

export default DataFetchingComponent;
