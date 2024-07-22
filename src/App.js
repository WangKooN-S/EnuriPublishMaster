import React, { useState, useEffect, useRef } from 'react';
import { sheetNames } from './js/sheetNames'; 

function App( {data, pageIndex, updatePageIndex} ) {
    const [content, setContent] = useState(null);
    const iframeRef = useRef(null);

    // Define the toggleOpen function
    const toggleOpen = (element) => {
        const parentItem = element.closest('.tb-item');
        if (parentItem && !parentItem.classList.contains('nochild')) {
            parentItem.classList.toggle('open');
        }
        return false;
    };

    useEffect(() => {
        window.toggleOpen = toggleOpen;

        // 페이지 인덱스가 변경될 때마다 content를 업데이트
        if (data && data.length > pageIndex) {
            const pageData = data[pageIndex];
            updateContent(pageData);
        }
    }, [data, pageIndex]);

    const updateContent = (pageData) => {
        if (!pageData) return;

        let root = document.createElement('div');
        root.className = 'tb_tree on';
        root.setAttribute('data-sheet-num', pageIndex + 1);

        // Track current level
        let levelElements = {}; // Store elements by level

        pageData.forEach((item, idx) => {
            const level = parseInt(Object.keys(item)[0].replace(/d/, ""), 10);
            const parentLevel = level - 1;

            // Create the item element
            let itemDiv = document.createElement('div');
            itemDiv.className = `tb-item d${level}`;
            itemDiv.setAttribute('data-record-index', idx);

            // Create inner content for <a> tag
            let linkContent = [];
            let additionalContent = [];
            Object.entries(item).forEach(([key, value]) => {
                console.log( key )
                if (key.startsWith('d')) {
                    // For keys starting with 'd', add value to <a> tag
                    linkContent.push(value);
                } else if (key !== 'disabled') {
                    // For other keys, wrap in span and add to additionalContent
                    if ( key === 'txuri'){
                        additionalContent.push(`<span class="tx_uri" onclick="event.stopPropagation();window.open('${value}');">${value}</span>`)
                    }else{
                        additionalContent.push(`<span class="${key.replace('tx', 'tx_')}">${value}</span>`);
                    }
                }
            });

            // Set the content of itemDiv
            itemDiv.innerHTML = `
                <a href="#" onclick="toggleOpen(this);">
                    <span class="tx_tit">${linkContent.join('')}</span>
                    ${additionalContent.join('')}
                </a>
            `;

            // Add item to the correct parent
            if (level === 1) {
                // If it's the top level, append directly to the root
                root.appendChild(itemDiv);
                levelElements[level] = itemDiv; // Store item for future use
            } else {
                // Otherwise, find the parent at the previous level and append
                let parent = levelElements[parentLevel];
                if (parent) {
                    parent.appendChild(itemDiv);
                    levelElements[level] = itemDiv; // Store item for future use
                }
            }
        });

        // Set content state
        setContent(root.outerHTML);

        // Wait for the next event loop iteration to ensure DOM is updated
        setTimeout(() => {
            // Check for nochild class
            pageData.forEach((_, idx) => {
                const level = parseInt(Object.keys(pageData[idx])[0].replace(/d/, ""), 10);
                const itemDiv = document.querySelector(`.tb-item[data-record-index='${idx}']`);
                if (itemDiv) {
                    const hasChild = itemDiv.querySelector('.tb-item');
                    if (!hasChild) {
                        itemDiv.classList.add('nochild');
                    }
                }
            });

            // Attach event listener for `tx-uri` after content is set
            // document.querySelectorAll('.tx_uri').forEach(uriElement => {
            //     uriElement.addEventListener('click', (e) => {
            //         e.preventDefault();
            //         const url = uriElement.textContent || uriElement.innerText;
            //         window.open(url, '_blank');
            //         console.log(e);
            //     });
            //     console.log(this)
            // });
        }, 0);
    };

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

    const toggleMenu = () => {
        document.getElementById('wrap').classList.toggle('menuon');
    };

  // 데이터가 배열인지 확인합니다.
  if (!Array.isArray(data) || data.length === 0) {
    return <div>Loading...</div>;
}

  return (
    <>
        <h1 className="title">{sheetNames[pageIndex].sheetShowName}</h1>
        <div id="menu" className="nav">
        <div className="nav__button" onClick={toggleMenu}>
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
        <div id="viewer" className="viewer">
            <button
                className="viewer__button-close"
                onClick={() => document.querySelector('.wrapper').classList.remove('mode-m')}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    width="40px"
                    height="40px"
                    viewBox="0 0 121.31 122.876"
                    enableBackground="new 255 255 255 255"
                    xmlSpace="preserve"
                >
                    <g>
                        <path
                            fill="white"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M90.914,5.296c6.927-7.034,18.188-7.065,25.154-0.068 c6.961,6.995,6.991,18.369,0.068,25.397L85.743,61.452l30.425,30.855c6.866,6.978,6.773,18.28-0.208,25.247 c-6.983,6.964-18.21,6.946-25.074-0.031L60.669,86.881L30.395,117.58c-6.927,7.034-18.188,7.065-25.154,0.068 c-6.961-6.995-6.992-18.369-0.068-25.397l30.393-30.827L5.142,30.568c-6.867-6.978-6.773-18.28,0.208-25.247 c6.983-6.963,18.21-6.946,25.074,0.031l30.217,30.643L90.914,5.296L90.914,5.296z"
                        ></path>
                    </g>
                </svg>
            </button>
            <div className="viewer__inner">
                <div className="viewer__head">
                    <span className="viewer__text-url">about:blank</span>
                </div>
                <iframe id="mFrame" name="mFrame" src="about:blank" frameBorder="0"></iframe>
            </div>
        </div>
        <div id="content" className="contents" dangerouslySetInnerHTML={{ __html: content }}></div>
    </>
  );
}

export default App;