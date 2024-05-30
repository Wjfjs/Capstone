function handleResult(result) {
    // 결과의 첫 번째 행에서 열 이름을 추출하여 columns 배열에 저장합니다.
    let columns = [];
    // 각 열의 데이터를 저장할 2차원 배열을 생성합니다.
    let columnData = [];
    if (Array.isArray(result)) {
        console.log('쿼리 결과:');
        for (let column in result[0]) {
            columns.push(column);
        }
        console.log('열 이름:', columns);
      
        // 각 행에서 각 열의 데이터를 추출하여 columnData 배열에 저장합니다.
        result.forEach(row => {
            columns.forEach(column => {
                columnData.push(row[column]);
            });
        });
    //   console.log('열 데이터:', columnData);

      return columnData;
    } else {
      console.log('쿼리 결과:', result);
    }
}
// 쿼리 실행
// db.Query(query, handleResult);

module.exports = {
    //columnData: columnData
    handleResult: handleResult
};