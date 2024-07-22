import React from 'react';
import { sheetNames } from './js/sheetNames'; 

function App( {data, pageIndex, updatePageIndex} ) {

    // console.log( data[pageIndex] );

    const handleMenuClick = (index) => {
        // 클릭된 항목이 현재 선택된 항목과 다를 때만 작업 수행
        if (index !== pageIndex + 1) {
            // 업데이트를 위한 페이지 인덱스 설정
            updatePageIndex(index - 1); // 인덱스는 0부터 시작하므로 1을 빼줍니다.

            // #wrap 요소에서 'menuon' 클래스 제거
            document.querySelector('#wrap').classList.remove('menuon');

            // 선택된 항목에 'selected' 클래스 추가
            const menuItems = document.querySelectorAll('.nav-menu__item');
            menuItems.forEach(item => {
                item.classList.remove('selected');
            });
            document.querySelector(`.nav-menu__item[data-sheet-num="${index}"]`).classList.add('selected');
        }
    };

  // 데이터가 배열인지 확인합니다.
  if (!Array.isArray(data) || data.length === 0) {
    return <div>Loading...</div>;
}

  return (
    <>
        <h1 className="title">{sheetNames[pageIndex].sheetShowName}</h1>
        <div id="menu" className="nav">
            <div className="nav__button" onClick={() => document.getElementById('wrap').classList.toggle('menuon')}>
                <div className="nav__button__inner"></div>
            </div>
            <ul className="nav-menu">
                {data.map((item, index) => (
                    <li
                        key={index}
                        className={`nav-menu__item ${index === pageIndex ? 'selected' : ''}`} // index와 pageIndex를 비교
                        data-sheet-num={index + 1}
                        onClick={() => handleMenuClick(index + 1)} // data-sheet-num은 1부터 시작
                    >
                    {sheetNames[index].sheetShowName}
                    </li>
                ))}
            </ul>
        </div>
    </>
  );
}

export default App;