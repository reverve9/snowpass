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
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* 로고 */}
            <a href="/#/main" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
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
                <h1 className="text-[26px] font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent logo-font">SNOW PASSPORT ver. 2.0</h1>
                <p className="text-[16px] text-gray-500">평창 눈동이 패스포트 ver. 2.0</p>
              </div>
            </a>
           
            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:flex items-center space-x-10">
              <a href="/#/main" className="text-gray-600 hover:text-[#a7381a] font-medium text-center leading-[1.1]">
                <div className="text-[17px] font-[600]">평창 눈동이 패스포트 ver. 2.0</div>
                <div className="text-[14px] font-thin text-gray-500 mt-1">HOME</div>
              </a>
              <a href="/#/programs" className="text-gray-600 hover:text-[#a7381a] font-medium text-center leading-[1.1]">
                <div className="text-[17px] font-[600]">프로그램</div>
                <div className="text-[14px] font-thin text-gray-500 mt-1">PROGRAM</div>
              </a>
              <a href="/#/application" className="text-gray-600 hover:text-[#a7381a] font-medium text-center leading-[1.1]">
                <div className="text-[17px] font-[700]">참가 신청</div>
                <div className="text-[14px] font-thin text-gray-500 mt-1">APPLICATION</div>
              </a>
              <a href="/#/board" className="text-gray-600 hover:text-[#a7381a] font-medium text-center leading-[1.1]">
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
                  <div className="text-[16px] font-[700]">눈동이 패스포트 ver. 2.0 <span className="text-[13px] font-[300] text-gray-400 ml-2">HOME</span></div>
                </a>
                <a href="/#/programs" className="text-gray-500 hover:text-blue-600 font-medium text-left py-2">
                  <div className="text-[16px] font-[700]">프로그램 <span className="text-[13px] font-[300] text-gray-400 ml-2">PROGRAM</span></div>
                </a>
                <a href="/#/application" className="text-gray-500 hover:text-blue-600 font-medium text-left py-2">
                  <div className="text-[16px] font-[700]">참가신청 <span className="text-[13px] font-[300] text-gray-400 ml-2">APPLICATION</span></div>
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
                  찾아가는 평창 올림픽 스키학교
                </button>
                <button
                  onClick={() => handleMenuChange('ojt-workshop')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'ojt-workshop' 
                      ? 'bg-[#223466] text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  평창 눈동이 OJT 워크숍
                </button>
                <button
                  onClick={() => handleMenuChange('snow-camp')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'snow-camp' 
                      ? 'bg-[#223466] text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  스노우 스포츠 캠프
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
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => handleMenuChange('overview')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors text-sm ${
                  activeMenu === 'overview' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                프로그램 개요
              </button>
              <button
                onClick={() => handleMenuChange('ski-camp')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors text-sm ${
                  activeMenu === 'ski-camp' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                찾아가는 평창올림픽 스키학교
              </button>
              <button
                onClick={() => handleMenuChange('ojt-workshop')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors text-sm ${
                  activeMenu === 'ojt-workshop' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                평창 눈동이 OJT 워크숍
              </button>
              <button
                onClick={() => handleMenuChange('snow-camp')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors text-sm ${
                  activeMenu === 'snow-camp' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                스노우 스포츠 캠프
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

// 프로그램 개요 컴포넌트 - 깔끔한 버전
const ProgramOverview = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'esamanru, sans-serif'}}>
        프로그램 개요
      </h2>
      
      <div className="space-y-8">
        {/* 메인 설명 박스 */}
        <div className="bg-gray-50 p-6 rounded-xl border">
          <div className="space-y-4">
            <p className="text-basement text-gray-800 leading-relaxed">
              <span className="text-lg font-semibold" style={{color: '#223466'}}>눈동이 패스포트 ver2.0</span> 은 <br />기존 프로그램을 한 단계 발전시켜,
              평창군을 넘어 전국의 어린이들에게도 <br />동계 스포츠 체험의 기회를 제공하는
              <span className="text-lg font-semibold" style={{color: '#223466'}}> 올림픽 유산사업</span>입니다.
            </p>
            
            <p className="text-basement text-gray-800 leading-relaxed">
             설상 스포츠를 처음 접하는 아이들에게 <span className="text-lg font-semibold" style={{color: '#223466'}}>배움과 즐거움</span>을 선물하고,<br />
              나아가 <span className="text-lg font-semibold" style={{color: '#223466'}}>올림픽 가치를 전국적으로 확산</span>하는 것을 목표로 합니다.
            </p>
            
          </div>
        </div>

        {/* 프로그램 구성 */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">프로그램 구성</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <div className="text-2xl mb-3">🎿</div>
              <h4 className="font-semibold text-gray-900 mb-2">찾아가는 평창 올림픽 스키학교</h4>
              <p className="text-sm text-gray-600 mb-2">인구소멸 위기지역 중심</p>
              <p className="text-sm text-gray-700">스노우 스포츠 관심 유도 및 체험</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="text-2xl mb-3">🏔️</div>
              <h4 className="font-semibold text-gray-900 mb-2">평창 눈동이 OJT 워크숍</h4>
              <p className="text-sm text-gray-600 mb-2">참가 경험자 대상</p>
              <p className="text-sm text-gray-700">스키 기술 강화 및 지도자 양성</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="text-2xl mb-3">⛷️</div>
              <h4 className="font-semibold text-gray-900 mb-2">스노우 스포츠 캠프</h4>
              <p className="text-sm text-gray-600 mb-2">찾아가는 평창올림픽 스키학교,<br />평창 눈동이 OJT 워크숍 수료자 대상</p>
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
        찾아가는 평창 올림픽 스키학교
      </h2>
      
      <div className="space-y-8">
        {/* 메인 설명 박스 */}
        <div className="bg-gray-50 p-6 rounded-xl border">
          <div className="space-y-4">
            <p className="text-base text-gray-800 leading-8">
              <span className="text-xl font-semibold" style={{color: '#223466'}}>전국의 초등학생들을 직접 찾아가 동계 스포츠를 소개하고 체험 기회를 마련하여,<br />
                지역과 환경에 관계없이 스포츠 교육을 받을 수 있도록 합니다.</span>
            </p>
            
            
            
            <p className="text-base text-gray-800 leading-8">
              인구소멸지역 및 사회배려층을 대상으로 학교에 직접 찾아가
              스키의 기본기를 교육하는 프로그램으로,<br />
              기존 평창군 관내에서 전국으로 확대하여 스키장 인프라가 부족한 충청권, 경북권 등 전국 각지에서 운영되며,<br /> 약 2천여 명을 대상으로 스키를 배울 기회를 제공합니다
            </p>
          </div>
        </div>

        {/* 프로그램 정보 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 프로그램 정보</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-[#223466] font-bold">대상</span>
                <span className="text-gray-700">전국 초등학생 (인구소멸 위기지역 중심)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#223466] font-bold">장소</span>
                <span className="text-gray-700">학교 운동장 / 지역체육관 / 공단 등</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#223466] font-bold">기간</span>
                <span className="text-gray-700">2025년 9월 ~ 12월<br />(중간고사 및 기말고사 기간 제외)</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 프로그램 특징</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-[#223466] font-bold">•</span>
                <span className="text-gray-700">찾아가는 서비스로 접근성 향상</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#223466] font-bold">•</span>
                <span className="text-gray-700">스키 장비 체험 및 기초 기술 습득</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#223466] font-bold">•</span>
                <span className="text-gray-700">동계 스포츠에 대한 관심 유도</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#223466] font-bold">•</span>
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
              className="bg-[#223466] hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              참가 신청하기
            </a>
            
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
        평창 눈동이 OJT 워크숍
      </h2>
      
      <div className="space-y-8">
        {/* 메인 설명 박스 */}
        <div className="bg-gray-50 p-6 rounded-xl border">
          <div className="space-y-4">
            <p className="text-base text-gray-800 leading-8">
              <span className="text-xl font-semibold" style={{color: '#223466'}}>기존 평창 눈동이 패스포트 OJT 워크숍 참가 경헙자들을 대상으로 스키 실력을 높이고,<br />
                보조강사 체험을 통해 직업 세계를 경헙하는 과정입니다.<br />참가자들에게 성장과 도전의 기회를 제공합니다.</span>
            </p>
          </div>
        </div>

         {/* 프로그램 정보 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 프로그램 정보</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-[#223466] font-bold">대상</span>
                <span className="text-gray-700">기존 평창 눈동이 OJT 워크숍 수료자</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#223466] font-bold">장소</span>
                <span className="text-gray-700">용평리조트</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#223466] font-bold">기간</span>
                <span className="text-gray-700">2026년 1월 5일 - 7일 (1차)<br />2026년 1월 12일 - 14일 (2차)</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 프로그램 목표</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-[#223466] font-bold">•</span>
                <span className="text-gray-700">스키 기술의 체계적 향상</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#223466] font-bold">•</span>
                <span className="text-gray-700">동계 스포츠 지도자 양성</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#223466] font-bold">•</span>
                <span className="text-gray-700">올림픽 정신 계승 및 전파</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#223466] font-bold">•</span>
                <span className="text-gray-700">지역 동계 스포츠 활성화 기여</span>
              </div>
            </div>
          </div>
        </div>

        
      {/* 프로그램 일정 */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">프로그램 일정</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{borderSpacing: '4px', borderCollapse: 'separate'}}>
              <thead>
                <tr>
                  <th className="bg-[#223466] px-3 py-3 text-center font-semibold text-white w-30 rounded-lg shadow-sm">TIME</th>
                  <th className="bg-[#223466] px-4 py-3 text-center font-semibold text-white rounded-lg shadow-sm">Day 1</th>
                  <th className="bg-[#223466] px-4 py-3 text-center font-semibold text-white rounded-lg shadow-sm">Day 2</th>
                  <th className="bg-[#223466] px-4 py-3 text-center font-semibold text-white rounded-lg shadow-sm">Day 3</th>
                </tr>
              </thead>
              <tbody>
                {/* 행 1-3: Day1(공란), Day2(5시작), Day3(4시작) */}
                <tr>
                  <td className="bg-gray-100 px-3 py-3 font-medium text-[#223466] text-center rounded-lg shadow-sm border border-gray-200">09:00 - 09:30</td>
                  <td className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200" rowSpan={3}>
                  </td>
                  <td className="bg-blue-50 px-4 py-3 rounded-lg shadow-sm border border-gray-200" rowSpan={5}>
                    <div className="font-bold text-base text-gray-800 mb-1">스키 기술 강화</div>
                    <div className="text-sm text-gray-600">- 프로그보겐 / 프로그화렌 기술</div>
                  </td>
                  <td className="bg-orange-50 px-4 py-3 rounded-lg shadow-sm border border-gray-200" rowSpan={4}>
                    <div className="font-bold text-base text-gray-800 mb-1">참가자 기술평가</div>
                    <div className="text-sm text-gray-600">- 지정 슬로프 (레벨3 지도자 평가)</div>
                  </td>
                </tr>
                <tr>
                  <td className="bg-blue-100 px-3 py-3 font-medium text-[#223466] text-center rounded-lg shadow-sm border border-gray-200">09:30 - 10:00</td>
                </tr>
                <tr>
                  <td className="bg-gray-100 px-3 py-3 font-medium text-[#223466] text-center rounded-lg shadow-sm border border-gray-200">10:00 - 10:30</td>
                </tr>
                {/* 행 4-5: Day1(참가자 입소) */}
                <tr>
                  <td className="bg-blue-100 px-3 py-3 font-medium text-[#223466] text-center rounded-lg shadow-sm border border-gray-200">10:30 - 11:00</td>
                  <td className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200" rowSpan={2}>
                    <div className="font-bold text-base text-gray-800 mb-1">참가자 입소 및 안내</div>
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-100 px-3 py-3 font-medium text-[#223466] text-center rounded-lg shadow-sm border border-gray-200">11:00 - 11:30</td>
                  <td className="bg-green-50 px-4 py-3 rounded-lg shadow-sm border border-gray-200" rowSpan={2}>
                    <div className="font-bold text-base text-gray-800 mb-1">내가 눈동쌤이 된다면?</div>
                    <div className="text-sm text-gray-600">- 강습 운영 리허설(교육)<br />- 현장 동선 사전 점검 </div>
                  </td>
                </tr>

                {/* 행 6-8: Day1(3), Day2(3), Day3(2) */}
                <tr>
                  <td className="bg-blue-100 px-3 py-3 font-medium text-[#223466] text-center rounded-lg shadow-sm border border-gray-200">11:30 - 12:00</td>
                  <td className="bg-gray-200 px-4 py-3 rounded-lg shadow-sm border border-gray-200" rowSpan={3}>
                    <div className="font-bold text-base text-gray-800 mb-1">중식</div>
                    <div className="text-sm text-gray-600">- 휴식 및 정비</div>
                  </td>
                  <td className="bg-gray-200 px-4 py-3 rounded-lg shadow-sm border border-gray-200" rowSpan={3}>
                    <div className="font-bold text-base text-gray-800 mb-1">중식</div>
                    <div className="text-sm text-gray-600">- 휴식 및 정비</div>
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-100 px-3 py-3 font-medium text-[#223466] text-center rounded-lg shadow-sm border border-gray-200">12:00 - 12:30</td>
                  <td className="bg-gray-200 px-4 py-3 text-left rounded-lg shadow-sm border border-gray-300" rowSpan={2}>
                    <div className="font-bold text-base text-gray-600 mb-1">중식</div>
                    <div className="text-sm text-gray-500">- 휴식 및 정비</div>
                  </td>
                </tr>
                <tr>
                  <td className="bg-blue-100 px-3 py-3 font-medium text-[#223466] text-center rounded-lg shadow-sm border border-gray-200">12:30 - 13:00</td>
                </tr>

                {/* 행 9: Day1(1), Day2(4시작), Day3(3시작) */}
                <tr>
                  <td className="bg-gray-100 px-3 py-3 font-medium text-[#223466] text-center rounded-lg shadow-sm border border-gray-200">13:00 - 13:30</td>
                  <td className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
                    <div className="font-bold text-base text-gray-800 mb-1">장비대여 및 강습조 편성</div>
                    <div className="text-sm text-gray-600">- 장비 및 리프트권 일괄 지급</div>
                  </td>
                  <td className="bg-blue-50 px-4 py-3 rounded-lg shadow-sm border border-gray-200" rowSpan={4}>
                    <div className="font-bold text-base text-gray-800 mb-1">스키 중급 기술 강습</div>
                    <div className="text-sm text-gray-600">- 프로그보겐 / 슈템턴 기술</div>
                  </td>
                  <td className="bg-green-50 px-4 py-3 rounded-lg shadow-sm border border-gray-200" rowSpan={3}>
                    <div className="font-bold text-base text-gray-800 mb-1">소통 및 종합 발표 및 피드백</div>
                    <div className="text-sm text-gray-600">- 참가자 발표 및 강사 멘토링(토크쇼)<br />- 수료증 및 기념품 증정</div>
                  </td>
                </tr>

                {/* 행 10-12: Day1(4), Day2(4계속), Day3(3계속) */}
                <tr>
                  <td className="bg-blue-100 px-3 py-3 font-medium text-[#223466] text-center rounded-lg shadow-sm border border-gray-200">13:30 - 14:00</td>
                  <td className="bg-blue-50 px-4 py-3 rounded-lg shadow-sm border border-gray-200" rowSpan={4}>
                    <div className="font-bold text-base text-gray-800 mb-1">스키강습 (레벨테스트)</div>
                    <div className="text-sm text-gray-600">- 준비 운동 부터 장비 안전 교육<br />- 자연 지형 활동 <br />- 레벨별 분반 강습 진행</div>
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-100 px-3 py-3 font-medium text-[#223466] text-center rounded-lg shadow-sm border border-gray-200">14:00 - 14:30</td>
                </tr>
                {/* 14:30 귀가 */}
                <tr>
                  <td className="bg-blue-100 px-3 py-3 font-medium text-[#223466] text-center rounded-lg shadow-sm border border-gray-200">14:30 - 15:00</td>
                  <td className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
                    <div className="font-bold text-base text-gray-800 mb-1">귀가</div>
                  </td>
                </tr>
                {/* 15:00 이후 Day3 공란 */}
                <tr>
                  <td className="bg-gray-100 px-3 py-3 font-medium text-[#223466] text-center rounded-lg shadow-sm border border-gray-200">15:00 - 15:30</td>
                  <td className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200" rowSpan={2}>
                    <div className="font-bold text-base text-gray-800 mb-1">종합 활강 연습</div>
                    <div className="text-sm text-gray-600">- 기술 평가 연습 (프로그보겐)</div>
                  </td>
                  <td className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200" rowSpan={4}>
                  </td>
                </tr>

                {/* 행 14: Day1(1), Day2(2계속), Day3(공란계속) */}
                <tr>
                  <td className="bg-blue-100 px-3 py-3 font-medium text-[#223466] text-center rounded-lg shadow-sm border border-gray-200">15:30 - 16:00</td>
                  <td className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
                    <div className="font-bold text-base text-gray-800 mb-1">정비</div>
                    <div className="text-sm text-gray-600"></div>
                  </td>
                </tr>

                {/* 행 15-16: Day1(2), Day2(2), Day3(공란계속) */}
                <tr>
                  <td className="bg-gray-100 px-3 py-3 font-medium text-[#223466] text-center rounded-lg shadow-sm border border-gray-200">16:00 - 16:30</td>
                  <td className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200" rowSpan={2}>
                    <div className="font-bold text-base text-gray-800 mb-1"></div>
                    <div className="text-sm text-gray-600"></div>
                  </td>
                  <td className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200" rowSpan={2}>
                    <div className="font-bold text-base text-gray-800 mb-1">정비</div>
                    <div className="text-sm text-gray-600"></div>
                  </td>
                </tr>
                <tr>
                  <td className="bg-blue-100 px-3 py-3 font-medium text-[#223466] text-center rounded-lg shadow-sm border border-gray-200">16:30 - 17:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      
        {/* 신청 안내 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 신청 자격 및 안내</h3>
          <div className="space-y-3 text-gray-700 mb-6">
            <p>• <strong>필수 조건 :</strong> 기존 평창 눈동이 OJT 워크숍 수료자</p>
            <p>• <strong>선발 방법 :</strong> 홈페이지를 통한 선착순 접수 (마감 후, 결원 발생 시 홈페이지 내 팝업으로 공지)</p>
            <p>• <strong>모집 인원 :</strong> 회당 35명, 총 70명</p>
            <p>• <strong>포함 사항 :</strong> 식사, 리프트권, 장비 대여, 교육비</p>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="/#/application" 
              className="bg-[#223466] hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              참가 신청하기
            </a>
            
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
        스노우 스포츠 캠프
      </h2>
      
      <div className="space-y-8">
         {/* 메인 설명 박스 */}
        <div className="bg-gray-50 p-6 rounded-xl border">
          <div className="space-y-4">
            <p className="text-base text-gray-800 leading-8">
              <span className="text-xl font-semibold" style={{color: '#223466'}}>초등학교 고학년 대상의 종합 체험 프로그램으로,<br />
                알파인 스키 기술 습득, 올림픽 레거시 투어, 올림픽 가치 교육 프로그램 입니다.<br />평창동계올림픽의 유산을 직접 체험할 수 있는 특별한 기회를 제공합니다.</span>
            </p>
          </div>
        </div>

        {/* 프로그램 정보 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 프로그램 정보</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-[#223466] font-bold">대상</span>
                <span className="text-gray-700">'찾아가는 평창올림픽 스키학교' <br />또는 '평창 눈동이 OJT 워크숍' 수료자</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#223466] font-bold">장소</span>
                <span className="text-gray-700">평창군 (용평리조트 및 올림픽 경기장 일원)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#223466] font-bold">기간</span>
                <span className="text-gray-700">2026년 1월 20일 - 2월 11일 (총 6회차)</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
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
          <div className="bg-green-50 text-green-800 px-4 py-2 rounded-lg text-center">
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
                <li>• 장갑 및 개인 방한 용품</li>
                <li>• 개인 용품 (세면도구 등)</li>
                <li>• 개인 간식 및 음료</li>
                <li>• 여행자 보험 (별도 가입 권장)</li>
                <li>• 교통비</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 신청 안내 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 신청 안내</h3>
          <div className="space-y-3 text-gray-700 mb-6">
            <p>• <strong>모집 기간:</strong> 2025년 12월 20일까지 이며, 최종 참가자는 12월 24일 홈페이지를 통해 발표됩니다.</p>
            <p>• <strong>선발 방법:</strong> 참가 접수 후, 심사를 통해 확정 공지 (회차별 40명)</p>
            <p>• <strong>참가 조건:</strong> '찾아가는 평창올림픽 스키학교' 또는 '평창 눈동이 OJT 워크숍' 수료자</p>
            <p>• <strong>준비물:</strong> 스키복, 장갑, 고글, 개인 세면용품</p>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="/#/application" 
              className="bg-[#223466] hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              참가 신청하기
            </a>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;