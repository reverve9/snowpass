import Popup from "../components/Popup";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// CircularProgress 컴포넌트 - 오프라인 + 온라인 통합 표시
const CircularProgress = ({ current, total, label, isUnlimited = false, customColor }: {
  current: number;
  total: number;
  label: string;
  isUnlimited?: boolean;
  customColor?: string;
}) => {
  const percentage = isUnlimited ? 100 : Math.min((current / total) * 100, 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 mb-4">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={customColor || '#3B82F6'}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">
              {current}
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-[20px] font-semibold text-gray-900 text-center">
        {label}
      </h3>
      {!isUnlimited && (
        <p className="text-sm text-gray-600 mt-1">
          모집정원 {total}{label.includes('스키') ? '개 단체' : '명'}
        </p>
      )}
      {isUnlimited && (
        <p className="text-sm text-gray-600 mt-1">
          단체 신청
        </p>
      )}
    </div>
  );
};

const Main = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [applicationCounts, setApplicationCounts] = useState({
    ski_camp: 26, // 기본값을 오프라인 26개로 설정
    ojt_workshop: 0,
    snow_camp: 0
  });
  
  // 슬라이드 관련 상태변수와 함수들 추가
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const slides = [
    {
      image: "/images/slide_01.jpg",
      title: "같이 느끼는 올림픽의 가치",
      description: "배움과 교류를 통해 올림픽의 가치를 경험합니다"
    },
    {
      image: "/images/slide_02.jpg", 
      title: "우리는 모두 눈동이 친구",
      description: "모든 아이들이 동계 스포츠의 기회를 함께 누립니다"
    },
    {
      image: "/images/slide_03.jpg",
      title: "새로운 꿈을 그리는 도전", 
      description: "도전과 성장을 통해 미래의 꿈을 준비합니다"
    }
  ];

  // 신청자 수 조회 - 스키학교는 오프라인 26개 + 온라인 단체 수
  const fetchApplicationCounts = async () => {
  try {
    // 스키학교 데이터 조회 (기존 유지)
    const { data: skiData, error: skiError } = await supabase
      .from('ski_school_applications_2025_10_16_03_38')
      .select('*')
      .eq('status', '승인완료');

    if (skiError) throw skiError;

    const onlineSkiCount = skiData?.length || 0;
    const offlineSkiCount = 26;
    const totalSkiCount = onlineSkiCount + offlineSkiCount;

    // 스포츠캠프 데이터 조회 (기존 유지)
    const { data: campData, error: campError } = await supabase
      .from('applications_2025_09_29_16_15')
      .select('*')
      .eq('program_type', 'snow-camp')
      .eq('status', '승인완료');

    if (campError) throw campError;

    const campCount = campData?.length || 0;

    // OJT 워크숍은 고정값 70으로 설정
    const ojtCount = 70;

    setApplicationCounts({
      ski_camp: totalSkiCount,
      ojt_workshop: ojtCount,  // 고정값 70
      snow_camp: campCount
    });

  } catch (error) {
    console.error('Error fetching application counts:', error);
    // 에러 시에도 OJT는 70으로 설정
    setApplicationCounts({
      ski_camp: 26,
      ojt_workshop: 70,  // 고정값 70
      snow_camp: 0
    });
  }
};

  // 컴포넌트 마운트 시 신청자 수 조회
  useEffect(() => {
    fetchApplicationCounts();
  }, []);

// 팝업 표시 로직
useEffect(() => {
  const hiddenDate = localStorage.getItem('popup_hidden_date');
  const today = new Date().toDateString();
  
  if (hiddenDate !== today) {
    setShowPopup(true);
  }
}, []);

  // 자동 슬라이드 (7초마다)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // 이전/다음 슬라이드
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 팝업 */}
      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        imageUrl="/images/popup03.png"
        top={150}
        left={200}
        showOverlay={true}
        linkUrl="/#/application?tab=check"
      />

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

      {/* 슬라이드 섹션 - 완전한 기능 구현 */}
      <section className="w-full relative overflow-hidden">
        <div className="relative h-[400px] md:h-[600px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-out ${
                  index === currentSlide ? 'scale-110' : 'scale-100'
                }`}
              />
              {/* 오버레이 */}
              <div className="absolute inset-0 bg-black/30"></div>
              
              {/* 텍스트 오버레이 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-[1200px] mx-auto px-4 text-center">
                  <h2 className="text-[32px] md:text-[52px] font-[700] text-white mb-6 leading-[0.7]" 
                      style={{fontFamily: 'esamanru, sans-serif'}}>
                    {slide.title}
                  </h2>
                  <p className="text-[18px] md:text-[30px] font-[200] text-white/90 leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* 좌측 화살표 */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/85 rounded-full flex items-center justify-center hover:bg-white/95 transition-colors z-10"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* 우측 화살표 */}
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/85 rounded-full flex items-center justify-center hover:bg-white/95 transition-colors z-10"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 인디케이터 (01, 02, 03) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`text-white font-bold text-lg transition-opacity ${
                  index === currentSlide ? 'opacity-100' : 'opacity-50'
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 핵심가치 섹션 - 원형 박스 */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-10">
              <h2 className="text-[30px] md:text-[50px] font-bold text-gray-900" style={{fontFamily: 'Poppins, sans-serif'}}>
                VISION
              </h2>
              <p className="text-[16px] md:text-[20px] text-gray-500" style={{fontFamily: 'SF Pro KR, -apple-system, BlinkMacSystemFont, sans-serif'}}>
                눈동이 패스포트 2.0의 핵심가치
              </p>
            </div>
          </div>

          {/* 3개 핵심가치 카드 - 원형 박스 */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 w-80 h-80 mx-auto flex flex-col items-center justify-center text-center p-8">
              <div className="text-5xl mb-4">⛷️</div>
              <h3 className="text-[23px] font-bold text-gray-900 mb-4">동계스포츠 체험</h3>
              <p className="text-gray-600 text-base">
                설상 스포츠를 처음 접하는 아이들에게 배움과 즐거움을 선사합니다
              </p>
            </div>
            <div className="bg-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 w-80 h-80 mx-auto flex flex-col items-center justify-center text-center p-8">
              <div className="text-5xl mb-4">🏅</div>
              <h3 className="text-[23px] font-bold text-gray-900 mb-4">올림픽 가치 전파</h3>
              <p className="text-gray-600 text-base">
                평창 동계올림픽의 가치와 정신을 전국의 어린이들에게 전파합니다
              </p>
            </div>
            <div className="bg-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 w-80 h-80 mx-auto flex flex-col items-center justify-center text-center p-8">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-[23px] font-bold text-gray-900 mb-4">꿈나무 육성</h3>
              <p className="text-gray-600 text-base">
                동계올림픽의 메카 평창에서 시작된 설상스포츠 발전의 토대를 마련합니다
              </p>
            </div>
          </div>
        </div>
      </section>
     
      {/* 프로그램 섹션 - 새로운 카드 스타일 */}
      <section id="programs" className="py-20 bg-gray-100">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-10">
              <h2 className="text-[30px] md:text-[50px] font-bold text-gray-900" style={{fontFamily: 'Poppins, sans-serif'}}>
                PROGRAM
              </h2>
              <p className="text-[16px] md:text-[20px] text-gray-500"  style={{fontFamily: 'SF Pro KR, -apple-system, BlinkMacSystemFont, sans-serif'}}>
                눈동이 패스포트 2.0 만의 동계 스포츠 프로그램
              </p>
            </div>
          </div>
    
          <div className="grid lg:grid-cols-3 gap-12">
            {/* 찾아가는 스키캠프 카드 */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* 상단 이미지 - 4:3 비율 고정 */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img 
                  src="/images/program_01.jpg" 
                  alt="찾아가는 스키캠프"
                  className="w-full h-full object-cover"
                />
                {/* 기간 라벨 */}
                <div className="absolute top-4 right-4 bg-[#d96b2f]/70 text-white px-3 py-1 rounded-md text-base font-medium">
                  2025
                </div>
              </div>
        
              {/* 하단 정보 */}
              <div className="p-6">
                <h3 className="text-[23px] font-bold text-gray-900 mb-2">찾아가는 평창 올림픽 스키학교</h3>
                <div className="text-[15px] text-gray-600 mb-4">
                  <div className="text-[15px] text-gray-600 mb-2">전국 초등학생 (인구소멸 위기지역 중심)<br /></div>
                  <div className="text-[14px] text-gray-600 mb-2">📍 학교 운동장 / 지역체육관 / 공단 등 </div>
                  <div className="text-[14px] text-gray-600 mb-2">📅 2025년 9월 - 12월 (중간 및 기말고사 기간 제외)</div>
                </div>
                <p className="text-gray-700 text-[15px] leading-relaxed mb-4">
                  인구소멸지역 청소년에게 스노우 스포츠 관심 유도하고 스키장비에 익숙해질 기회를 제공
                </p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <a 
                    href="/#/programs?section=ski-camp" 
                    className="bg-[#2e75bb] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium text-center"
                  >
                    자세히보기
                  </a>
                  <a 
                    href="/#/application" 
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium text-center"
                  >
                    신청하기
                  </a>
                </div>
              </div>
            </div>

            {/* 평창눈동이 OJT 워크숍 카드 */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* 상단 이미지 - 4:3 비율 고정 */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img 
                  src="/images/program_02.jpg" 
                  alt="평창 눈동이 OJT 워크숍"
                  className="w-full h-full object-cover"
                />
                {/* 기간 라벨 */}
                <div className="absolute top-4 right-4 bg-[#0b39a2]/70 text-white px-3 py-1 rounded-md text-base font-medium">
                  2026
                </div>
              </div>
        
              {/* 하단 정보 */}
              <div className="p-6">
                <h3 className="text-[23px] font-bold text-gray-900 mb-2">평창 눈동이 OJT 워크숍</h3>
                <div className="text-[15px] text-gray-600 mb-4">
                  <div className="text-[15px] text-gray-600 mb-2">기존 평창 눈동이 OJT 워크숍 수료자<br/></div>
                  <div className="text-[14px] text-gray-600 mb-2">📍 용평리조트</div>
                  <div className="text-[14px] text-gray-600 mb-2">📅 2026년 1월 5일 - 1월 7일 / 1월 12일 - 1윌 14일</div>
                </div>
                <p className="text-gray-700 text-[15px] leading-relaxed mb-4">
                  평창 눈동이 OJT 워크숍 수료자 대상 심화 프로그램으로 스키 기술 강화 및 지도자 양성
                </p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <a 
                    href="/#/programs?section=ojt-workshop" 
                    className="bg-[#2b761c] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium text-center"
                  >
                    자세히보기
                  </a>
                  <a 
                    href="/#/application" 
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium text-center"
                  >
                    신청하기
                  </a>
                </div>
              </div>
            </div>

            {/* 스노우스포츠 체험캠프 카드 */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* 상단 이미지 - 4:3 비율 고정 */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img 
                  src="/images/program_03.jpg" 
                  alt="스노우스포츠 체험캠프"
                  className="w-full h-full object-cover"
                />
                {/* 기간 라벨 */}
                <div className="absolute top-4 right-4 bg-[#0b39a2]/70 text-white px-3 py-1 rounded-md text-base font-medium">
                  2026
                </div>
              </div>
        
              {/* 하단 정보 */}
              <div className="p-6">
                <h3 className="text-[23px] font-bold text-gray-900 mb-2">스노우 스포츠 캠프</h3>
                <div className="text-[15px] text-gray-600 mb-4">
                  <div className="text-[15px] text-gray-600 mb-2">찾아가는 평창 올림픽 스키학교, <br />또는 평창 눈동이 OJT 워크숍 수료자</div>
                  <div className="text-[14px] text-gray-600 mb-2">📍 평창군 (용평리조트 및 동계올림픽 경기장 일원)</div>
                  <div className="text-[14px] text-gray-600 mb-2">📅 2026년 1월 20일 - 2월 11일 (2박 3일 / 주 2회)</div>
                </div>
                <p className="text-gray-700 text-[16px] leading-relaxed mb-4">
                  알파인 스키 기술 습득, 올림픽 레거시 투어, 올림픽 가치교육을 통한 종합 체험 프로그램
                </p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <a 
                    href="/#/programs?section=snow-camp" 
                    className="bg-[#971b93] text-white px-4 py-2 rounded-lg hover:bg-[#223466] transition-colors text-sm font-medium text-center"
                  >
                    자세히보기
                  </a>
                  <a 
                    href="/#/application" 
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium text-center"
                  >
                    신청하기
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 온라인 신청 섹션 - 원형 프로그레스 */}
      <section className="py-20 bg-[#223466] text-white">
        <div className="container max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-center gap-10 mb-12">
            <h2 className="text-[30px] md:text-[50px] font-bold text-white" style={{fontFamily: 'Poppins, sans-serif'}}>
              APPLICATION
            </h2>
            <p className="text-[16px] md:text-[20px] text-gray-100" style={{fontFamily: 'SF Pro KR, -apple-system, BlinkMacSystemFont, sans-serif'}}>
              승인완료 현황을 확인하고 신청하세요
            </p>
          </div>

          {/* 프로그램별 승인 현황 - 원형 프로그레스 */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="bg-white rounded-xl p-6">
                <CircularProgress
                  current={applicationCounts.ski_camp}
                  total={50}
                  label="찾아가는 평창 올림픽 스키 학교"
                  isUnlimited={false}
                  customColor="#2e75bb"
                />
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="bg-white rounded-xl p-6">
                <CircularProgress
                  current={applicationCounts.ojt_workshop}
                  total={70}
                  label="평창 눈동이 OJT 워크숍"
                  customColor="#2b761c"
                />
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="bg-white rounded-xl p-6">
                <CircularProgress
                  current={applicationCounts.snow_camp}
                  total={240}
                  label="스노우 스포츠 캠프"
                  customColor="#971b93"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#/application?tab=apply" className="bg-white text-blue-800 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg transition-colors">
                참가신청
              </a>
              <a href="/#/application?tab=check" className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 text-lg font-semibold rounded-lg transition-colors">
                참가신청 확인
              </a>
            </div>
          </div>
        </div>
      </section>
     
      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* 좌측 - 로고와 텍스트 */}
            <div className="space-y-6">
              {/* 로고 */}
              <div className="flex items-center gap-3">
                <img 
                  src="/images/logo_p.png" 
                  alt="눈동이패스포트 로고" 
                  className="h-[50px] w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              
              {/* 설명 텍스트 */}
              <div className="space-y-3 text-gray-300">
                <p className="text-xl font-bold leading-relaxed">
                  재단법인 평창유산재단
                </p>
                <p className="text-sm leading-relaxed">
                  강원특별자치도 평창군 대관령면 축제길 33<br /> 
                  평창올림픽플라자
                </p>
              </div>
            </div>
            
            {/* 우측 - 후원 */}
            <div className="space-y-6 mt-4 md:mt-14">
              <div>
                <h4 className="text-[18px] font-bold text-white mb-4">후원</h4>
                <div className="flex items-center gap-5">
                  <img 
                    src="/images/index_logo_w.png" 
                    alt="후원사 로고" 
                    className="h-[36px] w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* 하단 카피라이트 */}
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-base text-gray-400">
              © 2025 평창유산재단. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Main;