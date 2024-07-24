import React, { useState, useEffect } from 'react';
import { sheetNames } from './js/sheetNames'; 

function App( {data, pageIndex, updatePageIndex} ) {
    const [content, setContent] = useState(null);
    const [baseUri, setBaseUri] = useState(null);

    const toggleOpen = (element) => {
        const parentItem = element.closest('.tb-item');
        if (parentItem && !parentItem.classList.contains('nochild')) {
            parentItem.classList.toggle('open');
            if (!parentItem.classList.contains('open')) {
                const openChildren = parentItem.querySelectorAll('.tb-item.open');
                openChildren.forEach(child => child.classList.remove('open'));
            }
        }
        return false;
    };

    useEffect(() => {
        window.toggleOpen = toggleOpen;

        // 현재 페이지의 호스트를 가져옵니다
        const currentHost = window.location.hostname;
    
        // localhost인 경우와 그렇지 않은 경우에 따라 baseUri를 설정합니다
        if (currentHost === 'localhost') {
          setBaseUri('http://localhost');
        } else {
          setBaseUri('https://stage1.enuri.com');
        }

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

        let levelElements = {};

        pageData.forEach((item, idx) => {
            // console.log( item, idx)
            const level = parseInt(Object.keys(item)[0].replace(/d/, ""), 10);
            const parentLevel = level - 1;

            let itemDiv = document.createElement('div');
            itemDiv.className = `tb-item d${level} ${item.disabled ? 'disabled' : ''}`;
            itemDiv.setAttribute('data-record-index', idx);

            let linkContent = [];
            let additionalContent = [];
            Object.entries(item).forEach(([key, value]) => {
                if (key.startsWith('d') && key !== 'disabled' ) {
                    // 대괄호를 카테고리 태그로 치환 로직
                    const updatedValue = value.replace(/\[(.*?)\]/g, '<span class="tag-category">$1</span>');
                    linkContent.push(updatedValue);
                    // linkContent.push(value);
                } else {
                    if ( key === 'txuri'){
                        additionalContent.push(`<a href="${baseUri}${value}" class="tx_uri" target="_blank">${value}</a>`)
                    }else if ( key === 'disabled'){
                        additionalContent.push(`<span class="tag-disabled">사용안함</span>`)
                    }else{
                        additionalContent.push(`<span class="${key.replace('tx', 'tx_')}">${value}</span>`);
                    }
                }
            });

            itemDiv.innerHTML = `
                <div class="tb-item__group">
                    <button type="button" class="tx_tit" onclick="toggleOpen(this);">${linkContent.join('')}</button>
                    ${additionalContent.join('')}
                </div>
            `;

            if (level === 1) {
                root.appendChild(itemDiv);
                levelElements[level] = itemDiv;
            } else {
                let parent = levelElements[parentLevel];
                if (parent) {
                    parent.appendChild(itemDiv);
                    levelElements[level] = itemDiv;
                }
            }
        });

        // Set content state
        setContent(root.outerHTML);

        setTimeout(() => {
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
                        style={{
                            '--var-select-color' : sheetNames[index].sheetSelectColor
                        }}
                    >
                    {sheetNames[index].sheetShowName}
                    {!sheetNames[index].isAvailable && <span className="tag-no-service">종료</span>}
                    </li>
                ))}
            </ul>
        </div>
        <div id="content" className="contents" dangerouslySetInnerHTML={{ __html: content }}></div>
    </>
    );
}

export default App;