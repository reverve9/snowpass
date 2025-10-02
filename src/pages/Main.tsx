import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Main = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [applicationCounts, setApplicationCounts] = useState({
    ski_camp: 0,
    ojt_workshop: 0,
    snow_camp: 0
  });
  
  // 슬라이드 관련 상태변수와 함수들 추가
  const [currentSlide, setCurrentSlide] = useState(0);
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

  // 신청자 수 조회
  const fetchApplicationCounts = async () => {
    try {
      const { data, error } = await supabase
        .from('applications_2025_09_29_16_15')
        .select('program_type');

      if (error) {
        console.error('Database error:', error);
        // 에러 시 더미 데이터 사용
        setApplicationCounts({
          ski_camp: 25,
          ojt_workshop: 12,
          snow_camp: 48
        });
        return;
      }

      const counts = {
        ski_camp: 0,
        ojt_workshop: 0,
        snow_camp: 0
      };

      data?.forEach((app: any) => {
        if (app.program_type === 'ski-camp') {
          counts.ski_camp++;
        } else if (app.program_type === 'ojt-workshop') {
          counts.ojt_workshop++;
        } else if (app.program_type === 'snow-camp') {
          counts.snow_camp++;
        }
      });

      setApplicationCounts(counts);
    } catch (error) {
      console.error('Error fetching application counts:', error);
      // 에러 시 더미 데이터 사용
      setApplicationCounts({
        ski_camp: 25,
        ojt_workshop: 12,
        snow_camp: 48
      });
    }
  };

  // 컴포넌트 마운트 시 신청자 수 조회
  useEffect(() => {
    fetchApplicationCounts();
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

  const schedules = [
    { round: "1회차", date: "1.20(화) ~ 22(목)" },
    { round: "2회차", date: "1.26(월) ~ 28(수)" },
    { round: "3회차", date: "1.28(수) ~ 30(금)" },
    { round: "4회차", date: "2.2(월) ~ 4(수)" },
    { round: "5회차", date: "2.4(수) ~ 6(금)" },
    { round: "6회차", date: "2.9(월) ~ 11(수)" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-50 py-[10px]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* 로고 */}
            <a href="/#/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
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
    <h1 className="text-[28px] font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent logo-font">SNOW PASSPORT 2.0</h1>
    <p className="text-[15px] text-gray-500">눈동이 패스포트 2.0</p>
  </div>
</a>
           

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:flex items-center space-x-10">
              <a href="/#/main" className="text-gray-600 hover:text-[#a7381a] font-medium text-center leading-[1.1]">
                <div className="text-[17px] font-[600]">눈동이 패스포트 ver. 2.0</div>
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
     
      {/* 프로그램 섹션 - 새로운 카드 스타일 */}
      <section id="programs" className="py-20 bg-gray-50">
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
    
          <div className="grid lg:grid-cols-3 gap-8">
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
                  <div className="text-[15px] text-gray-600 mb-2">전국 초등학생 (인구소멸 위기지역 중심)</div>
                  <div className="text-[14px] text-gray-600 mb-2">📍 학교 운동장 / 지역체육관 / 공단 등 </div>
                  <div className="text-[14px] text-gray-600 mb-2">📅 2025년 9월 - 12월 (중간고사 및 기말고사 기간 제외)</div>
                </div>
                <p className="text-gray-700 text-[15px] leading-relaxed mb-4">
                  인구소멸지역 청소년에게 스노우 스포츠 관심 유도하고 스키장비에 익숙해질 기회를 제공
                </p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <a 
                    href="/#/programs?section=ski-camp" 
                    className="bg-[#223466] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium text-center"
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
                  <div className="text-[15px] text-gray-600 mb-2">눈동이 패스포트 사업에 참가했던 관내 고학년 (70명)</div>
                  <div className="text-[14px] text-gray-600 mb-2">📍 용평리조트</div>
                  <div className="text-[14px] text-gray-600 mb-2">📅 2026년 1월 5일 - 1월 7일 / 1월 12일 - 1윌 14일</div>
                </div>
                <p className="text-gray-700 text-[15px] leading-relaxed mb-4">
                  평창 눈동이패스포트사업 참가 경험자 대상 심화 프로그램으로 스키 기술 강화 및 지도자 양성
                </p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <a 
                    href="/#/programs?section=ojt-workshop" 
                    className="bg-[#223466] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium text-center"
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
                  <div className="text-[15px] text-gray-600 mb-2">전국 초등학생 고학년(4~6학년) 240명</div>
                  <div className="text-[14px] text-gray-600 mb-2">📍 평창군 (용평리조트 및 동계올림픽 경기장 일원)</div>
                  <div className="text-[14px] text-gray-600 mb-2">📅 2026년 1월 20일 - 2월 11일 (2박 3일 / 주 2회)</div>
                </div>
                <p className="text-gray-700 text-[16px] leading-relaxed mb-4">
                  알파인 스키 기술 습득, 올림픽 레거시 투어, 올림픽 가치교육을 통한 종합 체험 프로그램
                </p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <a 
                    href="/#/programs?section=snow-camp" 
                    className="bg-[#223466] text-white px-4 py-2 rounded-lg hover:bg-[#223466] transition-colors text-sm font-medium text-center"
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

       {/* 온라인 신청 섹션 */}
      <section className="py-20 bg-[#223466] text-white">
        <div className="container max-w-[1280px] mx-auto px-4">
          <div className="flex items-center justify-center gap-10 mb-12">
            <h2 className="text-[30px] md:text-[50px] font-bold text-white" style={{fontFamily: 'Poppins, sans-serif'}}>
              APPLICATION
            </h2>
            <p className="text-[16px] md:text-[20px] text-gray-100" style={{fontFamily: 'SF Pro KR, -apple-system, BlinkMacSystemFont, sans-serif'}}>
              온라인에서 편하게 신청하세요
            </p>
          </div>

          {/* 프로그램별 신청자 수 */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🎿</div>
              <h3 className="text-xl font-bold mb-2">찾아가는 스키캠프</h3>
              <div className="text-3xl font-bold text-yellow-300 mb-2">{applicationCounts.ski_camp}명</div>
              <p className="text-blue-100 text-sm">신청 완료</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🏔️</div>
              <h3 className="text-xl font-bold mb-2">평창눈동이 OJT 워크숍</h3>
              <div className="text-3xl font-bold text-yellow-300 mb-2">{applicationCounts.ojt_workshop}명</div>
              <p className="text-blue-100 text-sm">신청 완료 / 70명 모집</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">⛷️</div>
              <h3 className="text-xl font-bold mb-2">스노우스포츠 체험캠프</h3>
              <div className="text-3xl font-bold text-yellow-300 mb-2">{applicationCounts.snow_camp}명</div>
              <p className="text-blue-100 text-sm">신청 완료 / 240명 모집</p>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#/application?tab=apply" className=" bg-white text-blue-800 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg transition-colors">
                참가신청
              </a>
              <a href="/#/application?tab=check" className=" border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 text-lg font-semibold rounded-lg transition-colors">
                참가신청 확인
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 일정 섹션 */}
      <section id="schedule" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">캠프 일정</h2>
            <p className="text-xl text-gray-600">스노우스포츠 체험캠프 운영 일정</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schedules.map((schedule, index) => (
                <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{schedule.round}</div>
                  <div className="text-gray-700 font-medium">{schedule.date}</div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <div className="bg-blue-100 text-blue-800 px-6 py-3 text-lg rounded-full inline-block">
                주 2회 (2박 3일) 총 6차수 운영
              </div>
            </div>
          </div>
        </div>
      </section>
     
      {/* 푸터 */}
      {/* 푸터 */}
<footer className="bg-gray-900 text-white py-12 mt-16">
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
            올림픽 프라자
          </p>
         
        </div>
        
        
      </div>
      
      {/* 우측 - 후원 */}
      <div className="space-y-6 mt-4 md:mt-8">
        <div>
          <h4 className="text-[18px] font-bold text-white mb-4">후원</h4>
          <div className="flex items-center gap-4">
            <img 
              src="/images/index_logo_w.png" 
              alt="후원사 로고" 
              className="h-[40px] w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* 추가 후원사 로고들 */}
            {/* 
            <img 
              src="/images/sponsor2.png" 
              alt="후원사 로고 2" 
              className="h-[40px] w-auto object-contain"
            />
            <img 
              src="/images/sponsor3.png" 
              alt="후원사 로고 3" 
              className="h-[40px] w-auto object-contain"
            />
            */}
          </div>
        </div>
      </div>
    </div>
    
    {/* 하단 카피라이트 */}
    <div className="border-t border-gray-700 mt-8 pt-6 text-center">
      <p className="text-base text-gray-400">
        © 2024 평창유산재단. All rights reserved.
      </p>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Main;