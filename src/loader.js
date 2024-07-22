import React, { useState, useEffect } from 'react';
import './css/loader.css';

function Loader({ isComplete, loadingRate  }) {
    const [dispValue, setDisplay] = useState('block');
    const [pageName, setPageName] = useState('에누리 가격비교 PC');

    useEffect(() => {
        if (isComplete) {
            // 데이터 로딩 완료 후 1초 후에 로더를 숨깁니다.
            const timeoutId = setTimeout(() => {
                setDisplay('none');
            }, 1000); // 1초 대기

            // 컴포넌트 언마운트 시 타이머를 클리어합니다.
            return () => clearTimeout(timeoutId);
        }
    }, [isComplete]); 
    
    return (
        <div className="loader" style={{ display: dispValue }}>
            <span className="loader__motion">
                <span className="loader__motion__inner"></span>
            </span>
            <span className="loader-text">
                <span className="loader-text__status">
                    <em>{pageName}</em> 리스트를<br />가져오는 중입니다.
                </span>
                <span className="loader-text__per-num">{loadingRate.toFixed(0)}</span>
            </span>
        </div>
    );
}

export default Loader;