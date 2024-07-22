import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './css/common.css';
import './css/style.css';
import Loader from './loader';
import App from './App';
import { fetchAllSheetData } from './js/dataFetcher';
import reportWebVitals from './reportWebVitals';

const Root = () => {
    const [originalData, setOriginalData] = useState(null);
    const [isComplete, setIsComplete] = useState(false); // 완료 여부
    const [loadingRate, updateLoadingRate] = useState(0); //로딩 진행률
    const [pageIndex, updatePageIndex] = useState(() => parseInt(localStorage.getItem('dataFetchIdx')) || 0);

    const rootRef = useRef(null);
    
    useEffect(() => {
        localStorage.setItem('dataFetchIdx', pageIndex);
    }, [pageIndex]);

    useEffect(() => {
        // React 렌더링 완료 후 #wrap에 클래스를 추가합니다.
        if (rootRef.current) {
            rootRef.current.classList.add('wrap');
        }
    }, []);

    const updateProgress = (rate) => {
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
                setIsComplete(true);
            }
        };

        loadData();
    }, []);

    return (
        <>
            <Loader loadingRate={loadingRate} isComplete={isComplete} pageIndex={pageIndex} />
            {isComplete && <App data={originalData} pageIndex={pageIndex} updatePageIndex={updatePageIndex}/>}
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
