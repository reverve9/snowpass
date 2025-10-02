import { useState, useEffect } from "react";

const Programs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('overview'); // 'overview', 'ski-camp', 'ojt-workshop', 'snow-camp'

  // URL 파라미터 처리
  useEffect(() => {
    const hash = window.location.hash;
const urlParams = new URLSearchParams(hash.split('?')[1] || '');
    const section = urlParams.get('section');
    if (section && ['overview', 'ski-camp', 'ojt-workshop', 'snow-camp'].includes(section)) {
      setActiveMenu(section);
    }
  }, []);

  // 메뉴 변경 시 URL 업데이트
  const handleMenuChange = (menu: string) => {
    setActiveMenu(menu);
    const newUrl = `${window.location.pathname}?section=${menu}`;
    window.history.pushState({}, '', newUrl);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-50 py-[10px]">
        <div className="max-w-[1280px] mx-auto px-4">
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
              <div className="leading-[1.2]">
                <h1 className="text-[24px] font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent logo-font">SNOW PASSPORT 2.0</h1>
                <p className="text-[17px] font-thin text-gray-700"> 눈동이 패스포트 2.0</p>
              </div>
            </div>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:flex items-center space-x-10">
              <a href="/#/main" className="text-gray-600 hover:text-blue-600 font-medium text-center leading-[1.1]">
                <div className="text-[17px] font-[600]">눈동이 패스포트 2.0</div>
                <div className="text-[14px] font-thin text-gray-500 mt-1">HOME</div>
              </a>
              <a href="/#/programs" className="text-gray-600 hover:text-blue-600 font-medium text-center leading-[1.1]">
                <div className="text-[17px] font-[600]">프로그램</div>
                <div className="text-[14px] font-thin text-gray-500 mt-1">PROGRAM</div>
              </a>
              <a href="/#/application" className="text-gray-600 hover:text-blue-600 font-medium text-center leading-[1.1]">
                <div className="text-[17px] font-[700]">참가 신청</div>
                <div className="text-[14px] font-thin text-gray-500 mt-1">APPLICATION</div>
              </a>
              <a href="/#/board" className="text-gray-600 hover:text-blue-600 font-medium text-center leading-[1.1]">
                <div className="text-[17px] font-[700]">게시판</div>
                <div className="text-[14px] font-thin text-gray-500 mt-1">BOARD</div>
              </a>
            </nav>

            {/* 모바일 메뉴 버튼 */}
            <button
              className="md:hidden p-5 w-16 h-16 flex items-center justify-center text-4xl text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-all duration-300"
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
              <nav className="flex flex-col space-y-2">
                <a href="/#/main" className="text-gray-500 hover:text-blue-600 font-medium text-left py-1">
                  <div className="text-[16px] font-[700]">눈동이 패스포트 2.0 <span className="text-[13px] font-[300] text-gray-400 ml-2">HOME</span></div>
                </a>
                <a href="/#/programs" className="text-blue-600 font-medium text-left py-2">
                  <div className="text-[16px] font-[700]">프로그램 <span className="text-[13px] font-[300] text-blue-400 ml-2">PROGRAM</span></div>
                </a>
                <a href="/#/application" className="text-gray-500 hover:text-blue-600 font-medium text-left py-2">
                  <div className="text-[16px] font-[700]">참가 신청 <span className="text-[13px] font-[300] text-gray-400 ml-2">APPLICATION</span></div>
                </a>
                <a href="/#/board" className="text-gray-500 hover:text-blue-600 font-medium text-left py-2">
                  <div className="text-[16px] font-[700]">게시판 <span className="text-[13px] font-[300] text-gray-400 ml-2">BOARD</span></div>
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        {/* 데스크톱: 사이드바 + 콘텐츠 (3:7) */}
        <div className="hidden md:flex gap-8">
          {/* 좌측 사이드바 (30%) */}
          <div className="w-[30%]">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">프로그램</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => handleMenuChange('overview')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'overview' 
                      ? 'bg-[#223466] text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  프로그램 개요
                </button>
                <button
                  onClick={() => handleMenuChange('ski-camp')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'ski-camp' 
                      ? 'bg-[#223466] text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  찾아가는 스키캠프
                </button>
                <button
                  onClick={() => handleMenuChange('ojt-workshop')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'ojt-workshop' 
                      ? 'bg-[#223466] text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  평창눈동이 OJT 워크숍
                </button>
                <button
                  onClick={() => handleMenuChange('snow-camp')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'snow-camp' 
                      ? 'bg-[#223466] text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  스노우스포츠 체험캠프
                </button>
              </nav>
            </div>
          </div>

          {/* 우측 콘텐츠 (70%) */}
          <div className="w-[70%]">
            {activeMenu === 'overview' && <ProgramOverview />}
            {activeMenu === 'ski-camp' && <SkiCampProgram />}
            {activeMenu === 'ojt-workshop' && <OJTWorkshopProgram />}
            {activeMenu === 'snow-camp' && <SnowCampProgram />}
          </div>
        </div>

        {/* 모바일: 탭 방식 */}
        <div className="md:hidden">
          {/* 모바일 탭 메뉴 */}
          <div className="bg-gray-50 rounded-lg p-2 mb-6">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleMenuChange('overview')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors text-sm ${
                  activeMenu === 'overview' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                개요
              </button>
              <button
                onClick={() => handleMenuChange('ski-camp')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors text-sm ${
                  activeMenu === 'ski-camp' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                스키캠프
              </button>
              <button
                onClick={() => handleMenuChange('ojt-workshop')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors text-sm ${
                  activeMenu === 'ojt-workshop' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                OJT워크숍
              </button>
              <button
                onClick={() => handleMenuChange('snow-camp')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors text-sm ${
                  activeMenu === 'snow-camp' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                체험캠프
              </button>
            </div>
          </div>

          {/* 모바일 콘텐츠 (전체 너비) */}
          <div className="w-full">
            {activeMenu === 'overview' && <ProgramOverview />}
            {activeMenu === 'ski-camp' && <SkiCampProgram />}
            {activeMenu === 'ojt-workshop' && <OJTWorkshopProgram />}
            {activeMenu === 'snow-camp' && <SnowCampProgram />}
          </div>
        </div>
      </div>
    </div>
  );
};

// 프로그램 개요 컴포넌트
const ProgramOverview = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'esamanru, sans-serif'}}>
        프로그램 개요
      </h2>
      
      <div className="space-y-8">
        {/* 소개 */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">눈동이 패스포트 2.0</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            평창 동계올림픽 개최도시인 평창지역 주민을 위한 올림픽 유산 사업으로 2023년 처음 시행되어 
            평창군 관내 초등학생에서 전국 초등학생까지 대상을 확대하였습니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            설상 스포츠 배움의 기회를 제공하여 올림픽 유산 가치를 체험할 수 있도록 운영하며, 
            스포츠 교육과 지역 내 동계 스포츠 산업 활성화를 위한 평창유산재단의 대표 교육 사업입니다.
          </p>
        </div>

        {/* 프로그램 구성 */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">프로그램 구성</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <div className="text-2xl mb-3">🎿</div>
              <h4 className="font-semibold text-gray-900 mb-2">찾아가는 스키캠프</h4>
              <p className="text-sm text-gray-600 mb-2">인구소멸 위기지역 중심</p>
              <p className="text-sm text-gray-700">스노우 스포츠 관심 유도 및 장비 체험</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="text-2xl mb-3">🏔️</div>
              <h4 className="font-semibold text-gray-900 mb-2">평창눈동이 OJT 워크숍</h4>
              <p className="text-sm text-gray-600 mb-2">참가 경험자 대상</p>
              <p className="text-sm text-gray-700">스키 기술 강화 및 지도자 양성</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="text-2xl mb-3">⛷️</div>
              <h4 className="font-semibold text-gray-900 mb-2">스노우스포츠 체험캠프</h4>
              <p className="text-sm text-gray-600 mb-2">전국 초등 고학년</p>
              <p className="text-sm text-gray-700">종합 체험 프로그램</p>
            </div>
          </div>
        </div>

        {/* 참가 안내 */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">참가 안내</h3>
          <div className="space-y-3 text-blue-800">
            <div className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>각 프로그램별 신청 기간과 방법이 다르니 상세 내용을 확인해주세요.</span>
            </div>
            
            <div className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>안전한 프로그램 운영을 위해 보험 가입 및 안전 교육을 실시합니다.</span>
            </div>
          </div>
          
          <div className="mt-6">
            <a 
              href="/#/application" 
              className="bg-[#223466] hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              참가 신청하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// 찾아가는 스키캠프 컴포넌트
const SkiCampProgram = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'esamanru, sans-serif'}}>
        찾아가는 스키캠프
      </h2>
      
      <div className="space-y-8">
        {/* 프로그램 소개 */}
        <div>
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎿</span>
              <div>
                <h3 className="text-xl font-semibold text-orange-900">2025년 운영</h3>
                <p className="text-orange-700">인구소멸지역 청소년 대상</p>
              </div>
            </div>
            <p className="text-orange-800 leading-relaxed">
              인구소멸지역 청소년에게 스노우 스포츠 관심 유도하고 스키장비에 익숙해질 기회를 제공하는 찾아가는 서비스형 프로그램입니다.
            </p>
          </div>
        </div>

        {/* 프로그램 정보 */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 프로그램 정보</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-orange-600 font-medium">대상:</span>
                <span className="text-gray-700">전국 초등학생 (인구소멸 위기지역 중심)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-600 font-medium">장소:</span>
                <span className="text-gray-700">학교 운동장 / 지역체육관 / 공단 등</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-600 font-medium">기간:</span>
                <span className="text-gray-700">2025년 9월 ~ 12월 (중간고사 및 기말고사 기간 제외)</span>
              </div>
              
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 프로그램 특징</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span className="text-gray-700">찾아가는 서비스로 접근성 향상</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span className="text-gray-700">스키 장비 체험 및 기초 기술 습득</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span className="text-gray-700">동계 스포츠에 대한 관심 유도</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span className="text-gray-700">인구소멸지역 청소년 지원</span>
              </div>
            </div>
          </div>
        </div>

        {/* 신청 안내 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 신청 안내</h3>
          <div className="space-y-3 text-gray-700 mb-6">
            <p>• 단체 신청으로 진행되며, 학교 또는 지역 단체를 통해 신청 가능합니다.</p>
            <p>• 프로그램 운영을 위한 최소 인원 및 시설 요구사항이 있습니다.</p>
            <p>• 자세한 신청 방법은 별도 공지를 통해 안내드립니다.</p>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="/#/application" 
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              신청 문의하기
            </a>
            <button className="border border-orange-600 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg font-medium transition-colors">
              자세한 정보 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 평창눈동이 OJT 워크숍 컴포넌트
const OJTWorkshopProgram = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'esamanru, sans-serif'}}>
        평창눈동이 OJT 워크숍
      </h2>
      
      <div className="space-y-8">
        {/* 프로그램 소개 */}
        <div>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🏔️</span>
              <div>
                <h3 className="text-xl font-semibold text-blue-900">2026년 운영</h3>
                <p className="text-blue-700">참가 경험자 대상 심화 프로그램</p>
              </div>
            </div>
            <p className="text-blue-800 leading-relaxed">
              평창눈동이패스포트사업 참가 경험자를 대상으로 하는 심화 프로그램으로 스키 기술 강화 및 지도자 양성을 목표로 합니다.
            </p>
          </div>
        </div>

        {/* 프로그램 정보 */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 프로그램 정보</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-medium">대상:</span>
                <span className="text-gray-700">눈동이 패스포트 사업 참가 경험자 (총 70명)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-medium">장소:</span>
                <span className="text-gray-700">용평리조트</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-medium">기간:</span>
                <span className="text-gray-700">2026년 1월 5일~7일 / 1월 12일~14일</span>
              </div>
              
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 프로그램 목표</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span className="text-gray-700">스키 기술의 체계적 향상</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span className="text-gray-700">동계스포츠 지도자 양성</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span className="text-gray-700">올림픽 정신 계승 및 전파</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span className="text-gray-700">지역 동계스포츠 활성화 기여</span>
              </div>
            </div>
          </div>
        </div>

        {/* 프로그램 구성 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 프로그램 구성</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">1차 (1월 5일~7일)</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 스키 기술 심화 교육</li>
                <li>• 안전 교육 및 응급처치</li>
                <li>• 지도법 기초 이론</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">2차 (1월 12일~14일)</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 실습 지도 경험</li>
                <li>• 프로그램 기획 및 운영</li>
                <li>• 수료 및 인증</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 신청 안내 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 신청 자격 및 안내</h3>
          <div className="space-y-3 text-gray-700 mb-6">
            <p>• <strong>필수 조건:</strong> 눈동이 패스포트 프로그램 참가 경험자</p>
            <p>• <strong>선발 방법:</strong> 서류 심사 및 면접 (필요시)</p>
            <p>• <strong>모집 인원:</strong> 회당 35명, 총 70명</p>
            <p>• <strong>포함 사항:</strong> 숙박, 식사, 리프트권, 장비 대여, 교육비</p>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="/#/application" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              지금 신청하기
            </a>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors">
              자세한 정보 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 스노우스포츠 체험캠프 컴포넌트
const SnowCampProgram = () => {
  const schedules = [
    { round: "1회차", date: "1.20(화) ~ 22(목)" },
    { round: "2회차", date: "1.26(월) ~ 28(수)" },
    { round: "3회차", date: "1.28(수) ~ 30(금)" },
    { round: "4회차", date: "2.2(월) ~ 4(수)" },
    { round: "5회차", date: "2.4(수) ~ 6(금)" },
    { round: "6회차", date: "2.9(월) ~ 11(수)" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'esamanru, sans-serif'}}>
        스노우스포츠 체험캠프
      </h2>
      
      <div className="space-y-8">
        {/* 프로그램 소개 */}
        <div>
          <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">⛷️</span>
              <div>
                <h3 className="text-xl font-semibold text-green-900">2026년 운영</h3>
                <p className="text-green-700">전국 초등 고학년 대상 종합 체험</p>
              </div>
            </div>
            <p className="text-green-800 leading-relaxed">
              알파인스키 기술습득, 올림픽레거시투어, 올림픽가치교육을 통한 종합 체험 프로그램으로 
              평창 동계올림픽의 유산을 직접 체험할 수 있는 특별한 기회를 제공합니다.
            </p>
          </div>
        </div>

        {/* 프로그램 정보 */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 프로그램 정보</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-medium">대상:</span>
                <span className="text-gray-700">전국 초등학생 고학년 (4~6학년) 240명</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-medium">장소:</span>
                <span className="text-gray-700">평창군 (용평리조트 및 동계올림픽경기장 일원)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-medium">기간:</span>
                <span className="text-gray-700">2026년 1월 20일 ~ 2월 11일 (2박 3일 / 주 2회)</span>
              </div>
              
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 프로그램 하이라이트</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span className="text-gray-700">알파인스키 전문 기술 교육</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span className="text-gray-700">올림픽 경기장 투어 및 체험</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span className="text-gray-700">올림픽 가치 교육 프로그램</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span className="text-gray-700">전문 강사진의 체계적 지도</span>
              </div>
            </div>
          </div>
        </div>

        {/* 운영 일정 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 운영 일정</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {schedules.map((schedule, index) => (
              <div key={index} className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
                <div className="font-semibold text-green-900 mb-1">{schedule.round}</div>
                <div className="text-sm text-green-700">{schedule.date}</div>
              </div>
            ))}
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-center">
            <span className="font-medium">주 2회 (2박 3일) 총 6차수 운영</span>
          </div>
        </div>

        {/* 포함 사항 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💼 포함 사항</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-green-900">✅ 포함</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 숙박 (2박)</li>
                <li>• 식사 (조식 2회, 중식 3회, 석식 2회)</li>
                <li>• 리프트권 (3일)</li>
                <li>• 스키 장비 대여 (스키, 부츠, 폴)</li>
                <li>• 전문 강사 지도</li>
                <li>• 올림픽 투어 프로그램</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-red-900">❌ 불포함</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 개인 스키복 및 장갑</li>
                <li>• 개인 용품 (세면도구 등)</li>
                <li>• 개인 간식 및 음료</li>
                <li>• 여행자 보험 (별도 가입 권장)</li>
                <li>• 교통비 (집결지까지)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 신청 안내 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 신청 안내</h3>
          <div className="space-y-3 text-gray-700 mb-6">
            <p>• <strong>모집 기간:</strong> 2025년 12월 중 (별도 공지)</p>
            <p>• <strong>선발 방법:</strong> 선착순 접수 (회차별 40명)</p>
            <p>• <strong>참가 조건:</strong> 초등학교 4~6학년 재학생</p>
            <p>• <strong>준비물:</strong> 스키복, 장갑, 고글, 개인 세면용품</p>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="/#/application" 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              지금 신청하기
            </a>
            <button className="border border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-medium transition-colors">
              자세한 정보 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;