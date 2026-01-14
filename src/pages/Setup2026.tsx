const Setup2026 = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(to bottom right, #696ff1, #a391d4)'
      }}
    >
      {/* 센터 이미지 */}
      <div className="text-center">
        <img 
          src="/images/setup2026.png" 
          alt="평창 눈동이 패스포트 2026" 
          className="max-h-screen object-contain"
          style={{ maxWidth: '800px' }}
        />
        <p className="mt-2 text-yellow-300 text-[27px] font-medium" style={{ fontFamily: 'esamanru, sans-serif' }}>
          2026년 1월 5일(월) 오전 10:00 공식 오픈!!!
        </p>
        
      </div>
    </div>
  );
};
export default Setup2026;