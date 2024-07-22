import { sheetNames } from './sheetNames'; 

export async function fetchAllSheetData(onUpdateProgress) {
    
    const totalSheets = sheetNames.length;
    const results = [];

    for (let i = 0; i < totalSheets; i++) {
        const sheetName = sheetNames[i].sheetTabName;
        const url = `https://sheets.googleapis.com/v4/spreadsheets/1lXdQ9Ey_MUwkls8qGii8vxlpoUN1PW9xrFWDcu_eD7Q/values/${sheetName}?alt=json&key=AIzaSyCf0MH3bCW9TXmm0XLZcrP8lP4CCKqX8Fg`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const entry = data.values;

            // 첫 번째 행을 헤더로 설정
            const headers = entry[0];

            // 데이터 가공
            const processedData = entry.slice(1).map(row => {
                const obj = {};
                row.forEach((value, i) => {
                    // 헤더와 데이터 값으로 객체 생성
                    obj[headers[i]] = value === '' ? null : value;
                });

                // null 값 속성 제거
                Object.keys(obj).forEach(key => {
                    if (obj[key] == null) delete obj[key];
                });

                return obj;
            });

            results.push(processedData);

            // 진행률 콜백 호출
            if (typeof onUpdateProgress === 'function') {
                const progress = Math.round(((i + 1) / totalSheets) * 100);
                onUpdateProgress(progress);  // progress를 콜백 함수에 전달
            }
        } catch (error) {
            console.error(`Error fetching data for sheet: ${sheetName}`, error);
        }
    }

    return results;
}