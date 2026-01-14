import { useState } from "react";

const About = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 - 메인과 동일한 네비게이션 */}
      <header className="bg-white shadow-sm sticky top-0 z-50 py-[10px]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* 로고 */}
            <div className="flex items-center gap-3">
              <img 
                src="/images/main_logo.png" 
                alt="눈동이패스포트 로고" 
                className="h-[60px] w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
  if (nextElement) nextElement.style.display = 'flex';
                }}
              />
              <div className="leading-[1.2]" style={{display: 'none'}}>
                <h1 className="text-[28px] font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent logo-font">눈동이 패스포트 2.0</h1>
                <p className="text-[15px] text-gray-500">평창 동계올림픽 유산 프로그램</p>
              </div>
            </div>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:flex items-center space-x-10">
              <a href="/#/about" className="text-blue-600 font-medium text-center leading-[1.1]">
                <div className="text-[18px] font-[700]">눈동이 패스포트 2.0</div>
                <div className="text-[15px] font-thin text-blue-500 mt-1">ABOUT</div>
              </a>
              <a href="/#/programs" className="text-gray-500 hover:text-blue-600 font-medium text-center leading-[1.1]">
                <div className="text-[18px] font-[700]">세부 프로그램</div>
                <div className="text-[15px] font-thin text-gray-500 mt-1">PROGRAM</div>
              </a>
              <a href="/#/application" className="text-gray-500 hover:text-blue-600 font-medium text-center leading-[1.1]">
                <div className="text-[18px] font-[700]">참가신청</div>
                <div className="text-[15px] font-thin text-gray-500 mt-1">APPLICATION</div>
              </a>
              <a href="/#/main#board" className="text-gray-500 hover:text-blue-600 font-medium text-center leading-[1.1]">
                <div className="text-[18px] font-[700]">게시판</div>
                <div className="text-[15px] font-thin text-gray-500 mt-1">BOARD</div>
              </a>
              <a href="/#/admin" className="text-red-600 hover:text-red-700 font-medium text-center leading-[1.1]">
                <div className="text-[16px] font-[700]">🔒 관리자</div>
              </a>
            </nav>

            {/* 모바일 메뉴 버튼 */}
            <button
              className="md:hidden p-4 w-14 h-14 flex items-center justify-center text-3xl text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className={`transform transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : 'rotate-0'}`}>
                +
              </div>
            </button>
          </div>

          {/* 모바일 메뉴 */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-3">
                <a href="/#/about" className="text-blue-600 font-medium text-left py-2">
                  <div className="text-[16px] font-[700]">눈동이 패스포트 2.0 <span className="text-[13px] font-thin text-blue-400 ml-2">ABOUT</span></div>
                </a>
                <a href="/#/programs" className="text-gray-500 hover:text-blue-600 font-medium text-left py-2">
                  <div className="text-[16px] font-[700]">세부 프로그램 <span className="text-[13px] font-thin text-gray-400 ml-2">PROGRAM</span></div>
                </a>
                <a href="/#/application" className="text-gray-500 hover:text-blue-600 font-medium text-left py-2">
                  <div className="text-[16px] font-[700]">참가신청 <span className="text-[13px] font-thin text-gray-400 ml-2">APPLICATION</span></div>
                </a>
                <a href="/#/main#board" className="text-gray-500 hover:text-blue-600 font-medium text-left py-2">
                  <div className="text-[16px] font-[700]">게시판 <span className="text-[13px] font-thin text-gray-400 ml-2">BOARD</span></div>
                </a>
                <a href="/#/admin" className="text-red-600 hover:text-red-700 font-medium text-left py-2">
                  <div className="text-[16px] font-[700]">🔒 관리자</div>
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        {/* 히어로 섹션 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            눈동이 패스포트 2.0
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            평창 동계올림픽 유산을 활용한 청소년 스노우스포츠 체험 프로그램
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* 프로그램 소개 */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">프로그램 소개</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                눈동이 패스포트 2.0은 2018 평창 동계올림픽의 소중한 유산을 활용하여 
                청소년들에게 스노우스포츠의 즐거움을 전달하는 특별한 프로그램입니다.
              </p>
              <p>
                평창의 세계적 수준의 스키장과 시설을 배경으로, 전문 강사진과 함께 
                안전하고 체계적인 스노우스포츠 교육을 제공합니다.
              </p>
              <p>
                단순한 스키 체험을 넘어서, 청소년들의 도전정신과 성취감을 기르고, 
                겨울스포츠에 대한 관심과 이해를 높이는 것이 목표입니다.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">프로그램 특징</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">전문 강사진</h4>
                  <p className="text-gray-600 text-sm">자격증을 보유한 전문 스키 강사들의 체계적인 지도</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">안전한 환경</h4>
                  <p className="text-gray-600 text-sm">철저한 안전 관리와 응급처치 시스템 완비</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">맞춤형 교육</h4>
                  <p className="text-gray-600 text-sm">개인 수준에 맞는 단계별 맞춤 교육 프로그램</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">올림픽 유산</h4>
                  <p className="text-gray-600 text-sm">평창 동계올림픽 경기장에서의 특별한 경험</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 프로그램 목표 */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">프로그램 목표</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎿</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">스노우스포츠 보급</h3>
              <p className="text-gray-600">
                청소년들에게 스키, 스노보드 등 겨울스포츠의 즐거움을 알리고 
                생활체육으로 정착시키는 것을 목표로 합니다.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">올림픽 정신 계승</h3>
              <p className="text-gray-600">
                평창 동계올림픽의 성공적 개최 경험과 올림픽 정신을 
                차세대에게 전달하고 계승합니다.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">인재 양성</h3>
              <p className="text-gray-600">
                도전정신과 협동심을 기르고, 미래 스노우스포츠 
                꿈나무들을 발굴하고 육성합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 주최/주관 정보 */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">주최 · 주관</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">주최</h3>
                <p className="text-gray-700">강원도, 평창군</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">주관</h3>
                <p className="text-gray-700">평창군청소년수련관</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">후원</h3>
                <p className="text-gray-700">문화체육관광부, 강원도교육청</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">연락처</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">📞</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">전화번호</p>
                  <p className="text-gray-600">033-330-2000</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">✉️</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">이메일</p>
                  <p className="text-gray-600">snowpass@pyeongchang.go.kr</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">📍</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">주소</p>
                  <p className="text-gray-600">강원도 평창군 평창읍 올림픽로 35</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">지금 바로 참가신청하세요!</h2>
          <p className="text-xl mb-8 opacity-90">
            평창의 설원에서 펼쳐지는 특별한 겨울 모험이 여러분을 기다립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/#/programs" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              프로그램 자세히 보기
            </a>
            <a 
              href="/#/application" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              참가신청하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;