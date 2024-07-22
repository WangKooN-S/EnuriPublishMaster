import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './css/common.css';
import './css/style.css';
import Loader from './loader';
import App from './App';
import { fetchAllSheetData } from './js/dataFetcher';
import reportWebVitals from './reportWebVitals';

const Root = () => {
    const [originalData, setOriginalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isComplete, setIsComplete] = useState(false);
    const [loadingRate, updateLoadingRate] = useState(0);

    const updateProgress = (rate) => {
        console.log(`Update progress function called with rate: ${rate}%`);
        updateLoadingRate(rate);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchAllSheetData(updateProgress);
                setOriginalData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                // 데이터 로딩 후 1초 후에 로더를 숨깁니다.
                setIsComplete(true);
                setTimeout(() => setLoading(false), 1000);
            }
        };

        loadData();
    }, []);

    return (
        <>
            <Loader loadingRate={loadingRate} isComplete={isComplete} />
            {!loading && <App data={originalData} />}
        </>
    );
};

const wrap = ReactDOM.createRoot(document.getElementById('wrap'));
wrap.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
