// import './App.css';

function Loader() {
  return (
    <div className="loader" style={{ display: 'none' }}>
      <span className="loader__motion">
        <span className="loader__motion__inner"></span>
      </span>
      <span className="loader-text">
        <span className="loader-text__status">
          <em>에누리 가격비교 PC</em> 리스트를<br />가져오는 중입니다.
        </span>
        <span className="loader-text__per-num">100</span>
      </span>
    </div>
  );
}

export default Loader;