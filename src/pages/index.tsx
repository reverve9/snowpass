const Index = () => {
  return (
    <>
      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          5% { opacity: 0.6; }
          95% { opacity: 0.6; }
          100% { transform: translateY(calc(100vh + 200px)) rotate(180deg); opacity: 0; }
        }
        .snow-animation { animation: snowfall linear infinite; }
      `}</style>
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* 떨어지는 눈 결정 */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-blue-300/60 select-none snow-animation"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${-100 - Math.random() * 100}px`,
                animationDuration: `${15 + Math.random() * 20}s`,
                animationDelay: `${Math.random() * 15}s`,
                fontSize: `${24 + Math.random() * 20}px`,
              }}
            >
              ❄
            </div>
          ))}
        </div>

        {/* 메인 콘텐츠 */}
        <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
          <div className="max-w-4xl w-full">
            
            {/* 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              
              {/* 눈동이 패스포트 2026 카드 - 보라 배경 */}
              <div className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 overflow-hidden aspect-square bg-white rounded-lg shadow-lg">
                <div className="relative h-full">
                  {/* 배경 이미지 */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('/images/intro_2026.jpg')` }}
                  ></div>
                  {/* 오버레이 - 보라 계열 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/85 via-purple-600/75 to-purple-400/60"></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white p-6">
                    {/* 타이틀 텍스트 - 한줄로, 흰색, 눈동이패스포트 opacity 85% */}
                    <h2 className="mb-8 title-font leading-tight">
                      <span className="text-white text-3xl md:text-[30px] font-bold">2026 </span>
                      <span className="text-white text-3xl md:text-[30px] font-bold">평창 눈동이 패스포트  </span>
                      
                    </h2>
                    
                    <p className="text-lg md:text-xl mb-6 opacity-90 leading-loose font-medium">
                      평창군 어린이만 참여할 수 있는<br />
                      유일한 눈동이 패스포트
                    </p>
                    
                    <p className="text-base md:text-lg mb-8 opacity-80 leading-relaxed">
                      올해로 4번째 이어지는 우리동네 특별 프로그램
                    </p>
                    
                    <a 
                      href="/#/programs2026"
                      className="bg-white/90 backdrop-blur-sm text-purple-600 hover:bg-white hover:text-purple-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 px-8 py-2 rounded-full border border-white/20 flex items-center gap-2"
                    >
                      바로가기
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* 눈동이 패스포트 ver. 2.0 카드 - 블루 배경 */}
              <div className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:-rotate-1 overflow-hidden aspect-square bg-white rounded-lg shadow-lg">
                <div className="relative h-full">
                  {/* 배경 이미지 */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('/images/intro_ver.jpg')` }}
                  ></div>
                  {/* 오버레이 - 블루 계열 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-blue-600/75 to-blue-400/60"></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-6">
                    {/* 타이틀 텍스트 - 한줄로, 진한 옐로우, 눈동이패스포트 opacity 85% */}
                    <h2 className="mb-8 title-font leading-tight">
                      <span className="text-yellow-300 text-3xl md:text-[30px] font-bold">평창 눈동이 패스포트  </span>
                      <span className="text-yellow-300 text-3xl md:text-[30px] font-bold">ver. 2.0</span>
                    </h2>
                    
                    <p className="text-lg md:text-xl mb-6 opacity-100 leading-loose font-medium text-amber-100">
                      전국 방방곡곡으로 찾아가고,<br />
                      평창에서 함께하는 눈동이 패스포트
                    </p>
                    
                    <p className="text-base md:text-lg mb-8 opacity-90 leading-relaxed text-amber-100">
                      올해 처음 시작하는 전국 어린이 대상 프로그램
                    </p>
                    
                    <a 
                      href="/#/main"
                      className="bg-white/90 backdrop-blur-sm text-blue-600 hover:bg-white hover:text-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 px-8 py-2 rounded-full border border-white/20 flex items-center gap-2 cursor-pointer"
                    >
                      바로가기
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 후원 로고 섹션 */}
            <div className="flex justify-center">
              <div className="flex items-center gap-3">
  <span className="text-gray-500 text-base font-bold">주관</span>
  <span className="text-gray-500 text-base font-bold">I</span>
  <img src="/images/index_logo_c1.png" alt="후원사" className="h-[30px]" />
  
  <span className="text-gray-500 text-base font-bold ml-[60px]">후원</span>
  <span className="text-gray-500 text-base font-bold">I</span>
  <img src="/images/index_logo_c.png" alt="후원사" className="h-[30px]" />
</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;