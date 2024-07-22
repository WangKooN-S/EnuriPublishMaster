export async function fetchAllSheetData(onUpdateProgress) {
    const sheetNames = [
        '1_enuri-PC',
        '2_enuri-Mobile',
        '3_global',
        '4_knowcom',
        '5_auto',
        '6_promotion',
        '7_summerce',
        '8_etc',
        '9_smartfinder',
        '10_pc'
    ];
    const totalSheets = sheetNames.length;
    const results = [];

    for (let i = 0; i < totalSheets; i++) {
        const sheetName = sheetNames[i];
        const url = `https://sheets.googleapis.com/v4/spreadsheets/1lXdQ9Ey_MUwkls8qGii8vxlpoUN1PW9xrFWDcu_eD7Q/values/${sheetName}?alt=json&key=AIzaSyCf0MH3bCW9TXmm0XLZcrP8lP4CCKqX8Fg`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            results.push(data);

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