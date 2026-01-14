import { useState, useEffect } from "react";

const Programs2026 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'program'>('overview');

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

  // 자동 슬라이드 (10초마다)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // 텍스트 순차 애니메이션
  useEffect(() => {
    setShowTitle(false);
    setShowDescription(false);
    
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 800);
    
    const descTimer = setTimeout(() => {
      setShowDescription(true);
    }, 1800);
    
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(descTimer);
    };
  }, [currentSlide]);

  // 이전/다음 슬라이드
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // 눈송이 컴포넌트
  const Snowflakes = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-70 animate-snowfall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              fontSize: `${Math.random() * 10 + 8}px`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            ❄
          </div>
        ))}
        <style>{`
          @keyframes snowfall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0.7;
            }
            100% {
              transform: translateY(570px) rotate(360deg);
              opacity: 0.3;
            }
          }
          .animate-snowfall {
            animation: snowfall linear infinite;
          }
        `}</style>
      </div>
    );
  };

  // 슬라이드 위치 계산 (원형 캐러셀)
  const getSlideStyle = (index: number) => {
    const diff = index - currentSlide;
    const normalizedDiff = ((diff % slides.length) + slides.length) % slides.length;
    
    // 0: 현재(가운데), 1: 오른쪽, 2: 왼쪽
    if (normalizedDiff === 0) {
      // 현재 슬라이드 - 앞으로 더 크게 확대
      return {
        transform: 'translateX(0) scale(1.15)',
        zIndex: 30,
        opacity: 1,
      };
    } else if (normalizedDiff === 1) {
      // 다음 슬라이드 - 오른쪽 뒤
      return {
        transform: 'translateX(70%) scale(0.65)',
        zIndex: 20,
        opacity: 0.5,
      };
    } else {
      // 이전 슬라이드 - 왼쪽 뒤
      return {
        transform: 'translateX(-70%) scale(0.65)',
        zIndex: 20,
        opacity: 0.5,
      };
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-40" style={{ background: 'linear-gradient(to bottom right, #a5b4fc, #7c3aed)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/#/programs2026" className="flex items-center">
              <img src="/images/logo2026.png" alt="평창 눈동이 패스포트 2026" className="h-12 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </a>
            <nav className="hidden md:flex items-center space-x-12">
              <a href="/#/programs2026" className="group flex flex-col items-center">
                <span className="text-yellow-200 font-medium text-base">프로그램</span>
                <span className="text-yellow-200/70 text-xs mt-1">PROGRAM</span>
              </a>
              <a href="/#/application2026" className="group flex flex-col items-center">
                <span className="text-white font-medium text-base group-hover:text-yellow-200">참가신청</span>
                <span className="text-white/90 text-xs mt-1">APPLICATION</span>
              </a>
              <a href="/#/board2026" className="group flex flex-col items-center">
                <span className="text-white font-medium text-base group-hover:text-yellow-200">게시판</span>
                <span className="text-white/90 text-xs mt-1">BOARD</span>
              </a>
              <a href="https://www.instagram.com/reel/DS1bHrqAU3O/?igsh=MXB2Z2N6cGxtNTdqMA==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </nav>
            <div className="md:hidden flex items-center space-x-3">
              <a href="https://www.instagram.com/reel/DS1bHrqAU3O/?igsh=MXB2Z2N6cGxtNTdqMA==" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <button className="text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span className="text-2xl font-light">{isMenuOpen ? '×' : '+'}</span>
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden bg-white/10 backdrop-blur-sm rounded-lg mt-2 mb-4 px-4 py-6 space-y-4">
              <a href="/#/programs2026" className="block text-yellow-200">프로그램 <span className="text-yellow-200/70 text-sm">PROGRAM</span></a>
              <a href="/#/application2026" className="block text-white">참가신청 <span className="text-white/90 text-sm">APPLICATION</span></a>
              <a href="/#/board2026" className="block text-white">게시판 <span className="text-white/90 text-sm">BOARD</span></a>
            </div>
          )}
        </div>
      </header>

      {/* 히어로 섹션 - 헤더와 연결된 배경 + 눈송이 */}
      <section 
        className="relative h-[500px] overflow-hidden"
        style={{ background: 'linear-gradient(to bottom right, #a5b4fc, #7c3aed)' }}
      >
        {/* 눈송이 애니메이션 */}
        <Snowflakes />

        {/* 콘텐츠 */}
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center relative z-10 py-[50px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center w-full h-full">
            
            {/* 좌측 - 원형 이미지 캐러셀 */}
            <div className="relative h-full flex items-center justify-center">
              <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px]">
                {slides.map((slide, index) => {
                  const style = getSlideStyle(index);
                  return (
                    <div
                      key={index}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden shadow-2xl transition-all duration-1000 ease-out"
                      style={{
                        transform: `translate(-50%, -50%) ${style.transform}`,
                        zIndex: style.zIndex,
                        opacity: style.opacity,
                      }}
                    >
                      <img 
                        src={slide.image}
                        alt={slide.title}
                        className={`w-full h-full object-cover object-center transition-transform duration-[10000ms] ease-out ${
                          index === currentSlide ? 'scale-[1.3]' : 'scale-100'
                        }`}
                      />
                    </div>
                  );
                })}

                {/* 좌우 화살표 */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 rounded-full flex items-center justify-center transition-colors z-40"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 rounded-full flex items-center justify-center transition-colors z-40"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 우측 - 텍스트 */}
            <div className="text-white text-center md:text-left flex flex-col justify-between h-full pl-0 md:pl-8 py-4">
              <div className="flex-1 flex flex-col justify-center relative">
                {/* 각 슬라이드별 텍스트 */}
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-[1500ms] ease-out ${
                      index === currentSlide 
                        ? 'opacity-100' 
                        : 'opacity-0 absolute pointer-events-none'
                    }`}
                  >
                    {/* 타이틀 */}
                    <h2 
                      className={`text-3xl md:text-4xl lg:text-[45px] font-bold mb-6 leading-tight transition-all duration-[1500ms] ease-out ${
                        index === currentSlide && showTitle 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-8'
                      }`}
                      style={{ fontFamily: 'esamanru, sans-serif' }}
                    >
                      {slide.title}
                    </h2>
                    
                    {/* 설명 */}
                    <p 
                      className={`text-lg md:text-xl text-white/90 leading-relaxed transition-all duration-[1500ms] ease-out ${
                        index === currentSlide && showDescription 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-8'
                      }`}
                    >
                      {slide.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* 하단 고정 - 플레이 버튼 + 인디케이터 + 참가신청 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* 플레이 버튼 */}
                  <button
                    onClick={() => {
                      setCurrentSlide((prev) => (prev + 1) % slides.length);
                    }}
                    className="w-10 h-10 bg-white/30 hover:bg-white/40 rounded-full flex items-center justify-center border border-white/40 transition-colors"
                  >
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>

                  {/* 슬라이드 인디케이터 */}
                  <div className="flex items-center gap-1.5">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          index === currentSlide 
                            ? 'bg-white w-6' 
                            : 'bg-white/50 hover:bg-white/70 w-1.5'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* 참가 신청 버튼 - 우측 */}
                <a 
                  href="/#/application2026" 
                  className="px-5 py-2.5 bg-white/40 hover:bg-white/50 text-white text-sm font-medium rounded-full border border-white/50 transition-colors"
                >
                  참가 신청하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 콘텐츠 영역 - 탭 구조 */}
      <section className="py-16 bg-white">

{/* 배경 웨이브 */}
        <div className="absolute inset-0 pointer-events-none">
          <svg 
            className="absolute top-0 left-0 w-full h-full" 
            viewBox="0 0 1440 800" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,200 C200,100 400,300 600,200 C800,100 1000,300 1200,200 C1400,100 1440,150 1440,150 L1440,0 L0,0 Z" 
              fill="url(#wave-gradient-1)" 
              opacity="0.1"
            />
            <path 
              d="M0,400 C150,300 350,500 550,400 C750,300 950,500 1150,400 C1350,300 1440,350 1440,350 L1440,800 L0,800 Z" 
              fill="url(#wave-gradient-2)" 
              opacity="0.08"
            />
            <path 
              d="M0,600 C250,500 450,700 650,600 C850,500 1050,700 1250,600 C1350,550 1440,580 1440,580 L1440,800 L0,800 Z" 
              fill="url(#wave-gradient-3)" 
              opacity="0.05"
            />
            <defs>
              <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
              <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#a990c9" />
              </linearGradient>
              <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a990c9" />
                <stop offset="100%" stopColor="#c4b5d9" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto px-4">
          {/* 탭 선택 영역 - 모핑 도형 */}
          <div className="flex justify-start mb-12">
            <div className="relative flex py-4">
              {/* 모핑 블롭 배경 */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-16 bg-gradient-to-r from-[#6366f1] to-[#818cf8] rounded-[40%_60%_60%_40%/60%_40%_60%_40%] transition-all duration-700 ease-out shadow-lg"
                style={{
                  width: '130px',
                  left: activeTab === 'overview' ? '0px' : '145px',
                  borderRadius: activeTab === 'overview' 
                    ? '40% 60% 60% 40% / 60% 40% 60% 40%' 
                    : '60% 40% 40% 60% / 40% 60% 40% 60%',
                  transform: `translateY(-50%) scale(${activeTab === 'overview' ? '1' : '1.05'})`,
                }}
              />
              
              {/* 개요 버튼 */}
              <button
                onClick={() => setActiveTab('overview')}
                className={`relative z-10 w-[130px] flex flex-col items-center justify-center transition-all duration-500 ${
                  activeTab === 'overview' 
                    ? 'text-white scale-105' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className="text-xl font-bold leading-none">개요</span>
                <span className={`text-[13px] font-light tracking-wider leading-none mt-1.5 ${
                  activeTab === 'overview' ? 'text-white/90' : 'text-gray-300'
                }`}>Overview</span>
              </button>

              {/* 간격 */}
              <div className="w-[15px]" />

              {/* 프로그램 버튼 */}
              <button
                onClick={() => setActiveTab('program')}
                className={`relative z-10 w-[130px] flex flex-col items-center justify-center transition-all duration-500 ${
                  activeTab === 'program' 
                    ? 'text-white scale-105' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className="text-xl font-bold leading-none">프로그램</span>
                <span className={`text-[13px] font-light tracking-wider leading-none mt-1.5 ${
                  activeTab === 'program' ? 'text-white/90' : 'text-gray-300'
                }`}>Program</span>
              </button>
            </div>
          </div>

          {/* 탭 콘텐츠 */}
          <div className="min-h-[400px]">
          {activeTab === 'overview' && (
              <div className="animate-fadeIn">
                {/* 섹션 1 - 소개 텍스트 */}
<div className="w-full px-10 text-center">
  <p className="text-[26px] text-gray-500 font-light tracking-wider leading-relaxed" style={{ fontFamily: 'esamanru, sans-serif' }}>
    <span className="text-[#6366f1] text-[34px] font-bold">"평창 눈동이 패스포트"</span>
    <span>는 </span>
    <span className="font-bold">2023년</span>
    <span>부터 </span>
    <span className="font-bold">2026년</span>
    <span>까지 성황리에 지속되고 있는</span>
    <br />
    <span className="font-bold">평창유산재단 대표 사업</span>
    <span> 중 하나입니다.</span>
  </p>
  <p className="text-[26px] text-gray-500 font-light tracking-wider leading-relaxed mt-4" style={{ fontFamily: 'esamanru, sans-serif' }}>
    <span>관내 초등학교 저학년을 대상으로 </span>
    <span className="font-bold">2018 평창동계올림픽</span>
    <span>의 유산인 </span>
    <span className="font-bold">동계스포츠에 입문</span>
    <span>할 수</span>
    <br />
    <span>있는 기회를 제공하고, 프로그램의 연속성을 통해 지역 동계스포츠 및 </span>
    <span className="font-bold">지역경제 활성화</span>
    <span>에</span>
    <br />
    <span>기여하고자 합니다.</span>
  </p>
</div>

                {/* 섹션 2 - 카드 영역 */}
                <div className="mt-[130px] px-10 grid grid-cols-1 md:grid-cols-2 gap-16">
                  {/* 카드 1 - 모집 요강 */}
                  <div className="relative bg-white rounded-2xl shadow-lg overflow-visible hover:-translate-y-2 transition-transform duration-300">
                   {/* 상단 비정형 탭 - 모집 요강 */}
                    <div className="absolute -top-5 left-6 z-10">
                      <div 
                        className="bg-gradient-to-r from-[#6bc4db] to-[#88cfe3] text-white px-8 py-3 shadow-lg"
                        style={{ borderRadius: '40% 60% 60% 40% / 60% 40% 60% 40%' }}
                      >
                        <span className="text-base font-semibold whitespace-nowrap">모집 요강</span>
                      </div>
                    </div>
                    
                    {/* 콘텐츠 */}
                    <div className="p-8 pt-14">
                      {/* 모집 대상 */}
                      <div className="mb-8">
                        <h4 className="text-xl font-bold text-[#00afdc] mb-4">모집 대상</h4>
                        <div className="space-y-4 text-gray-600">
                          <div>
                            <p className="font-semibold text-gray-800 text-lg">• 신규 참가반</p>
                            <p className="mt-1">관내(평창군) 초등학교 입학 예정자(2019년생)</p>
                            
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-lg">• 기존 참가반</p>
                            <p className="mt-1">24~25년 눈동이 패스포트 기존 참가자(2017~2018년생)</p>
                            
                          </div>
                        </div>
                      </div>

                      {/* 신청 안내 */}
                      <div className="mb-8">
                        <h4 className="text-xl font-bold text-[#00afdc] mb-4">신청 안내</h4>
                        <ul className="space-y-3 text-gray-600">
                          <li className="flex gap-2">
                            <span className="text-[#6366f1]">•</span>
                            <span><strong>모집 기간:</strong> 2026. 01. 05(월) 10시 ~ 01. 16(금) 17시</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-[#6366f1]">•</span>
                            <span><strong>선발 방법:</strong> 차수별 선착순 마감 (회차별 신규 15명, 기존 25명)</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-[#6366f1]">•</span>
                            <span><strong>차수 선정:</strong> 신청서 등록 선착순 일자 마감</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-[#6366f1]">•</span>
                            <span><strong>참가 조건:</strong> 평창군 관내 초등학교 입학예정자, 2024년, 2025년 눈동이 패스포트 기존 참가자</span>
                          </li>
                        </ul>
                      </div>

                      {/* 참가비 */}
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="font-semibold text-gray-800 text-lg">참가비 <span className="text-[#811616] text-2xl ml-2">30,000원</span></p>
                        <p className="text-sm text-gray-500 mt-1">* 참가자 선정 완료 후 계좌번호 별도 안내예정</p>
                      </div>
                    </div>
                  </div>

                 {/* 카드 2 - 세부 내용 */}
                  <div className="relative bg-white rounded-2xl shadow-lg overflow-visible hover:-translate-y-2 transition-transform duration-300">
                    {/* 상단 비정형 탭 */}
                     <div className="absolute -top-5 left-6 z-10">
                      <div 
                        className="bg-gradient-to-r from-[#818cf8] to-[#a990c9] text-white px-8 py-3 shadow-lg"
                        style={{ borderRadius: '60% 40% 40% 60% / 40% 60% 40% 60%' }}
                      >
                        <span className="ttext-base font-semibold whitespace-nowrap">세부 내용</span>
                      </div>
                    </div>
                    
                    {/* 콘텐츠 */}
                    <div className="p-8 pt-14">
                      {/* 제공 내용 */}
                      <div className="mb-8">
                        <h4 className="text-xl font-bold text-[#818cf8] mb-4">프로그램 참가시 제공 내용</h4>
                        <ul className="space-y-3 text-gray-600">
                          <li className="flex gap-2">
                            <span className="text-[#818cf8]">•</span>
                            <span><strong>리프트권</strong> (오전 + 오후)</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-[#818cf8]">•</span>
                            <span><strong>스키 장비 대여</strong> (스키, 부츠, 폴, 헬멧)</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-[#818cf8]">•</span>
                            <span><strong>스키 의류 대여</strong> (상, 하의)</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-[#818cf8]">•</span>
                            <span><strong>스키 강습</strong> (1회당 3일 강습, 일자별 강습 2시간 × 2회)</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-[#818cf8]">•</span>
                            <span><strong>식사</strong> (일자별 중식 1회)</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-[#818cf8]">•</span>
                            <span><strong>간식</strong></span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-[#818cf8]">•</span>
                            <span><strong>기념품</strong> (스키장갑, 바라클라바, 뱃지, 교육이수증, 빕조끼)</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-[#818cf8]">•</span>
                            <span><strong>상해보험</strong> (스포츠안전재단 주최자배상책임보험)</span>
                          </li>
                        </ul>
                      </div>

                      {/* 미지급 안내 */}
                      <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 font-medium">⚠️ 개인 이동 수단과 방한 용품은 제공하지 않습니다</p>
                      </div>

                      {/* 장소 */}
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="text-xl font-bold text-[#818cf8] mb-4">장소</h4>
                        <p className="text-xl font-semibold text-gray-800">알펜시아 리조트</p>
                        <a 
                          href="http://www.alpensia.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-500 hover:underline"
                        >
                          www.alpensia.com
                        </a>
                        <p className="text-sm text-gray-500 mt-1">(강원 평창군 대관령면 솔봉로 325)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 섹션 3 - 추후 추가 */}
                {/* 섹션 3 - 신청 버튼 */}
                <div className="mt-16 flex justify-center">
                  <a 
                    href="/#/application2026"
                    className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#6366f1] to-[#818cf8] text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <span>신청하러 가기</span>
                    <svg 
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'program' && (
              <div className="animate-fadeIn">
                {/* 섹션 1 - 운영 일정 (달력) */}
                <div className="w-full px-10">
                  <h3 className="text-2xl font-bold text-[#6366f1] mb-6" style={{ fontFamily: 'esamanru, sans-serif' }}>운영 일정</h3>
                  
                  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    {/* 달력 헤더 */}
                    <div className="bg-[#6366f1] text-white text-center py-4">
                      <span className="text-xl font-bold">2026년 2월</span>
                    </div>
                    
                    {/* 요일 헤더 */}
                    <div className="grid grid-cols-7 border-b border-gray-200">
                      {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
                        <div 
                          key={day} 
                          className={`py-3 text-center font-semibold ${
                            i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-gray-600'
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    {/* 달력 그리드 */}
                    <div className="grid grid-cols-7">
                      {/* 1주차 - 날짜 */}
                      <div className="p-3 min-h-[60px] border-r border-gray-100 bg-red-50/30 text-center">
                        <span className="text-red-400 font-medium">1</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-gray-700">2</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-gray-700">3</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-gray-700">4</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-gray-700">5</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-blue-400">6</span>
                      </div>
                      <div className="p-3 min-h-[60px] bg-blue-50/30 text-center">
                        <span className="text-blue-400">7</span>
                      </div>

                      {/* 1주차 - 바 */}
                      <div className="col-span-3 px-6 py-4 -mt-4 border-b border-gray-200 bg-red-50/30">
                        <div className="h-3 bg-[#FF6B6B] rounded-full"></div>
                      </div>
                      <div className="col-span-3 px-6 py-4 -mt-4 border-b border-gray-200">
                        <div className="h-3 bg-[#4ECDC4] rounded-full"></div>
                      </div>
                      <div className="py-2 border-b border-gray-200 bg-blue-50/30"></div>

                      {/* 2주차 - 날짜 */}
                      <div className="p-3 min-h-[60px] border-r border-gray-100 bg-red-50/30 text-center">
                        <span className="text-red-400 font-medium">8</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-gray-700">9</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-gray-700">10</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-gray-700">11</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-gray-700">12</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-blue-400">13</span>
                      </div>
                      <div className="p-3 min-h-[60px] bg-blue-50/30 text-center">
                        <span className="text-blue-400">14</span>
                      </div>

                      {/* 2주차 - 바 */}
                      <div className="col-span-3 px-6 py-4 -mt-4 border-b border-gray-200 bg-red-50/30">
                        <div className="h-3 bg-[#FFE66D] rounded-full"></div>
                      </div>
                      <div className="col-span-3 px-6 py-4 -mt-4 border-b border-gray-200">
                        <div className="h-3 bg-[#95E1D3] rounded-full"></div>
                      </div>
                      <div className="py-2 border-b border-gray-200 bg-blue-50/30"></div>

                      {/* 3주차 - 날짜 */}
                      <div className="p-3 min-h-[60px] border-r border-gray-100 bg-red-50/30 text-center">
                        <span className="text-red-400 font-medium">15</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-gray-700">16</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-gray-700">17</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-gray-700">18</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-gray-700">19</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-blue-400">20</span>
                      </div>
                      <div className="p-3 min-h-[60px] bg-blue-50/30 text-center">
                        <span className="text-blue-400">21</span>
                      </div>

                      {/* 3주차 - 바 (빈 공간 유지) */}
                      <div className="col-span-7 pb-4 -mt-4 border-b border-gray-200">
                        <div className="h-7"></div>
                      </div>

                      {/* 4주차 - 날짜 */}
                      <div className="p-3 min-h-[60px] border-r border-gray-100 bg-red-50/30 text-center">
                        <span className="text-red-400 font-medium">22</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-gray-700">23</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-gray-700">24</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-gray-700">25</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-gray-700">26</span>
                      </div>
                      <div className="p-3 min-h-[60px] border-r border-gray-100 text-center">
                        <span className="text-blue-400">27</span>
                      </div>
                      <div className="p-3 min-h-[60px] bg-blue-50/30 text-center">
                        <span className="text-blue-400">28</span>
                      </div>

                      {/* 4주차 - 바 */}
                      <div className="col-span-3 px-6 py-4 -mt-4 border-b border-gray-200 bg-red-50/30">
                        <div className="h-3 bg-[#DDA0DD] rounded-full"></div>
                      </div>
                      <div className="col-span-3 px-6 py-4 -mt-4 border-b border-gray-200">
                        <div className="h-3 bg-[#87CEEB] rounded-full"></div>
                      </div>
                      <div className="py-2 border-b border-gray-200 bg-blue-50/30 flex justify-center items-center">
                        <div className="w-4 h-4 bg-[#1E3A8A] rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* 범례 */}
                    <div className="bg-gray-50 px-6 py-4 flex flex-wrap justify-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-[#FF6B6B]"></div>
                        <span className="text-sm text-gray-600">1회차 (2/1~3)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-[#4ECDC4]"></div>
                        <span className="text-sm text-gray-600">2회차 (2/4~6)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-[#FFE66D]"></div>
                        <span className="text-sm text-gray-600">3회차 (2/8~10)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-[#95E1D3]"></div>
                        <span className="text-sm text-gray-600">4회차 (2/11~13)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-[#DDA0DD]"></div>
                        <span className="text-sm text-gray-600">5회차 (2/22~24)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-[#87CEEB]"></div>
                        <span className="text-sm text-gray-600">6회차 (2/25~27)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#1E3A8A]"></div>
                        <span className="text-sm text-gray-600">이벤트 대회 (2/28)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 섹션 2 - 세부 프로그램 & 이벤트 */}
                <div className="mt-16 px-10">
                  <h3 className="text-2xl font-bold text-[#00afdc] mb-6" style={{ fontFamily: 'esamanru, sans-serif' }}>세부 프로그램</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* 왼쪽 - 일정표 (2/3) */}
                    <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                      {/* 테이블 헤더 */}
                      <div className="grid grid-cols-3 bg-[#63bbe0] text-white">
                        <div className="py-3 text-center font-semibold">시간</div>
                        <div className="py-3 text-center font-semibold">내용</div>
                        <div className="py-3 text-center font-semibold">비고</div>
                      </div>
                      
                      {/* 테이블 바디 */}
                      <div className="divide-y divide-gray-100">
                        <div className="grid grid-cols-3">
                          <div className="py-4 px-3 text-center text-gray-700 border-r border-gray-100">09:00~09:40</div>
                          <div className="py-4 px-3 text-center text-gray-700 border-r border-gray-100">도착 및 출석 확인</div>
                          <div className="py-4 px-3 text-center text-gray-500">참가자 개별 이동</div>
                        </div>
                        <div className="grid grid-cols-3">
                          <div className="py-4 px-3 text-center text-gray-700 border-r border-gray-100">09:00~09:40</div>
                          <div className="py-4 px-3 text-center text-gray-700 border-r border-gray-100">장비 및 의류 착용</div>
                          <div className="py-4 px-3 text-center text-gray-500">인솔 강사</div>
                        </div>
                        <div className="grid grid-cols-3">
                          <div className="py-4 px-3 text-center text-gray-700 border-r border-gray-100">09:40~10:00</div>
                          <div className="py-4 px-3 text-center text-gray-700 border-r border-gray-100">강습 준비</div>
                          <div className="py-4 px-3 text-center text-gray-500">인솔 강사</div>
                        </div>
                        <div className="grid grid-cols-3 bg-blue-50/50">
                          <div className="py-4 px-3 text-center text-gray-700 border-r border-gray-100 font-medium">10:00~12:00</div>
                          <div className="py-4 px-3 text-center text-[#00afdc] border-r border-gray-100 font-semibold">오전 스키 강습</div>
                          <div className="py-4 px-3 text-center text-gray-500">스키 강사</div>
                        </div>
                        <div className="grid grid-cols-3">
                          <div className="py-4 px-3 text-center text-gray-700 border-r border-gray-100">12:00~13:00</div>
                          <div className="py-4 px-3 text-center text-gray-700 border-r border-gray-100">점심 식사</div>
                          <div className="py-4 px-3 text-center text-gray-500 text-sm">카페테리아 (단체 식당)<br/>With 스키 강사</div>
                        </div>
                        <div className="grid grid-cols-3 bg-blue-50/50">
                          <div className="py-4 px-3 text-center text-gray-700 border-r border-gray-100 font-medium">13:00~15:00</div>
                          <div className="py-4 px-3 text-center text-[#00afdc] border-r border-gray-100 font-semibold">오후 스키 강습</div>
                          <div className="py-4 px-3 text-center text-gray-500">스키 강사</div>
                        </div>
                        <div className="grid grid-cols-3">
                          <div className="py-4 px-3 text-center text-gray-700 border-r border-gray-100">15:00~15:30</div>
                          <div className="py-4 px-3 text-center text-gray-700 border-r border-gray-100">귀가 준비</div>
                          <div className="py-4 px-3 text-center text-gray-500">장비/의류 반납</div>
                        </div>
                        <div className="grid grid-cols-3">
                          <div className="py-4 px-3 text-center text-gray-700 border-r border-gray-100">15:30</div>
                          <div className="py-4 px-3 text-center text-gray-700 border-r border-gray-100">귀가</div>
                          <div className="py-4 px-3 text-center text-gray-500">참가자 개별 이동</div>
                        </div>
                      </div>
                    </div>

                    {/* 오른쪽 - 이벤트 배너 (1/3) */}
                    <div className="lg:col-span-1">
                      <div className="h-full rounded-2xl border-2 border-[#6366f1] bg-white p-6 flex flex-col items-center text-center">
                        {/* 트로피 아이콘 */}
                        <div className="w-20 h-20 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center mb-4 shadow-lg">
                          <span className="text-4xl">🏆</span>
                        </div>
                        
                        {/* 타이틀 */}
                        <div className="text-sm font-medium text-[#6366f1] mb-2 tracking-wider">EVENT PROGRAM</div>
                        <h4 className="text-2xl font-bold text-gray-800 mb-1" style={{ fontFamily: 'esamanru, sans-serif' }}>평창유산재단</h4>
                        <h4 className="text-3xl font-bold text-[#6366f1] mb-4" style={{ fontFamily: 'esamanru, sans-serif' }}>이사장배 스키대회</h4>
                        
                        {/* 설명 */}
                        <div className="text-sm text-gray-600 leading-relaxed mb-6">
                          <p>강습회동안 배운 스키실력을 뽐내며,</p>
                          <p>간단한 장애물을 통과하는 방식으로 진행</p>
                        </div>
                        
                        {/* 구분선 */}
                        <div className="w-full border-t border-dashed border-gray-300 my-4"></div>
                        
                        {/* 일시 정보 */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 text-gray-700">
                            <span className="text-xl">📅</span>
                            <span className="text-lg font-semibold">2026. 02. 28(토)</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-[#6366f1]">
                            <span className="text-xl">⏰</span>
                            <span className="text-xl font-bold">10:00 ~ 14:00</span>
                          </div>
                        </div>
                        
                        {/* 하단 뱃지 */}
                        <div className="mt-6 px-4 py-2 bg-[#6366f1] text-white rounded-full text-sm font-medium">
                          3회 강습자도 완주 가능!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 섹션 3 - 신청 버튼 */}
                <div className="mt-16 flex justify-center">
                  <a 
                    href="/#/application2026"
                    className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#00aedc] to-[#63bbe0] text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <span>신청하러 가기</span>
                    <svg 
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* 좌측 - 재단 */}
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
            
            {/* 중앙 - 운영사무국 */}
<div className="space-y-6 md:mt-1">
  <div>
    <h4 className="text-[18px] font-bold text-white mb-6">운영사무국</h4>
    <div className="space-y-2">
      <p className="text-sm text-gray-300">주식회사 에이치포스 <span className="text-gray-400 text-xs">(TEL. 031-796-7945)</span></p>
      <p className="text-sm text-gray-300s">문의 시간 : 평일 10시 ~ 18시 <span className="text-gray-400 text-xs">(주말, 공휴일 제외) * 12~13시 점심시간</span></p>
    </div>
  </div>
</div>

            {/* 우측 - 후원 */}
            <div className="space-y-6 md:mt-1">
              <div>
                <h4 className="text-[18px] font-bold text-white mb-4">후원</h4>
                <div className="flex items-center gap-5">
                  <img 
                    src="/images/index2026_logo_w.png" 
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

export default Programs2026;
