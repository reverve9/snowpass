import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Application2026 = () => {
  const [activeMenu, setActiveMenu] = useState('apply');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1] || '');
    const tab = urlParams.get('tab');
    if (tab && ['apply', 'check', 'rules'].includes(tab)) {
      setActiveMenu(tab);
    }
  }, []);

  useEffect(() => {
  const link = document.querySelector("link[rel='icon']") as HTMLLinkElement || document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = '/favicon.png';
  document.head.appendChild(link);
  
  return () => {
    link.href = '';
  };
}, []);

  const handleTabChange = (tab: string) => {
    setActiveMenu(tab);
    window.history.pushState({}, '', `/#/application2026?tab=${tab}`);
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
                <span className="text-white font-medium text-base group-hover:text-yellow-200">프로그램</span>
                <span className="text-white/90 text-xs mt-1">PROGRAM</span>
              </a>
              <a href="/#/application2026" className="group flex flex-col items-center">
                <span className="text-yellow-200 font-medium text-base">참가신청</span>
                <span className="text-yellow-200/70 text-xs mt-1">APPLICATION</span>
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
              <a href="/#/programs2026" className="block text-white">프로그램 <span className="text-white/90 text-sm">PROGRAM</span></a>
              <a href="/#/application2026" className="block text-yellow-200">참가신청 <span className="text-yellow-200/70 text-sm">APPLICATION</span></a>
              <a href="/#/board2026" className="block text-white">게시판 <span className="text-white/90 text-sm">BOARD</span></a>
            </div>
          )}
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="hidden md:flex gap-8">
          <div className="w-[30%]">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">참가신청</h2>
              <nav className="space-y-2">
                {['apply', 'check', 'rules'].map((tab) => (
                  <button key={tab} onClick={() => handleTabChange(tab)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeMenu === tab ? 'bg-[#6366f1] text-white' : 'text-gray-700 hover:bg-gray-200'}`}>
                    {tab === 'apply' ? '신청서 작성' : tab === 'check' ? '신청확인' : '프로그램 참가 규정'}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          <div className="w-[70%]">
            {activeMenu === 'apply' && <ApplicationForm2026 />}
            {activeMenu === 'check' && <ApplicationCheck2026 />}
            {activeMenu === 'rules' && <ProgramRules2026 />}
          </div>
        </div>
        <div className="md:hidden">
          <div className="bg-gray-50 rounded-lg p-2 mb-6 grid grid-cols-3 gap-1">
            {['apply', 'check', 'rules'].map((tab) => (
              <button key={tab} onClick={() => handleTabChange(tab)}
                className={`py-3 px-2 rounded-lg text-center font-medium text-sm ${activeMenu === tab ? 'bg-[#6366f1] text-white' : 'text-gray-700'}`}>
                {tab === 'apply' ? '신청서 작성' : tab === 'check' ? '신청확인' : '참가 규정'}
              </button>
            ))}
          </div>
          {activeMenu === 'apply' && <ApplicationForm2026 />}
          {activeMenu === 'check' && <ApplicationCheck2026 />}
          {activeMenu === 'rules' && <ProgramRules2026 />}
        </div>
      </div>

     
    </div>
  );
};


// 신청서 작성 폼
const ApplicationForm2026 = () => {
  const [formData, setFormData] = useState({
    first_choice: '', second_choice: '', third_choice: '',
    participant_name: '', birth_year: '', gender: '', school_name: '',
    ski_level: '', clothing_rental: '', height: '', weight: '', shoe_size: '',
    guardian_name: '', phone: '', emergency_phone: '', special_notes: '', motivation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState<{id: number; participant_name: string; first_choice: string} | null>(null);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [portraitAgreed, setPortraitAgreed] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [portraitOpen, setPortraitOpen] = useState(false);

  const scheduleOptions = [
    { value: '', label: '선택하세요' },
    { value: '1회차', label: '1회차 02.01(일)~02.03(화)' },
    { value: '2회차', label: '2회차 02.04(수)~02.06(금)' },
    { value: '3회차', label: '3회차 02.08(일)~02.10(화)' },
    { value: '4회차', label: '4회차 02.11(수)~02.13(금)' },
    { value: '5회차', label: '5회차 02.22(일)~02.24(화)' },
    { value: '6회차', label: '6회차 02.25(수)~02.27(금)' },
  ];

  const birthYearOptions = [
    { value: '', label: '선택하세요' },
    { value: '2019', label: '2019년생 (2026년 초등학교 1학년)' },
    { value: '2018', label: '2018년생 (2026년 초등학교 2학년)' },
    { value: '2017', label: '2017년생 (2026년 초등학교 3학년)' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 의류대여 '불필요' 선택 시 관련 필드 초기화
    if (name === 'clothing_rental' && value === '불필요') {
      setFormData(prev => ({ ...prev, [name]: value, height: '', weight: '', shoe_size: '' }));
    }
  };

  // 필수 항목 검증 함수
  const isFormValid = () => {
    const requiredFields = [
      formData.first_choice,
      formData.participant_name,
      formData.birth_year,
      formData.gender,
      formData.school_name,
      formData.ski_level,
      formData.clothing_rental,
      formData.guardian_name,
      formData.phone
    ];
    
    // 의류대여 '필요'인 경우 신체사이즈도 필수
    if (formData.clothing_rental === '필요') {
      requiredFields.push(formData.height, formData.weight, formData.shoe_size);
    }
    
    // 모든 필수 필드가 채워져 있고, 동의도 완료된 경우
    return requiredFields.every(field => field && field.trim() !== '') && privacyAgreed && portraitAgreed;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    if (!isFormValid()) {
      setSubmitMessage('필수 항목을 모두 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    try {
      // 중복 신청 체크
      const { data: existingData } = await supabase
        .from('applications_2026')
        .select('id')
        .eq('participant_name', formData.participant_name)
        .eq('phone', formData.phone.replace(/[-\s]/g, ''));
      
      if (existingData && existingData.length > 0) {
        setSubmitMessage('이미 동일한 참가자 이름과 연락처로 신청된 내역이 있습니다. 신청확인 메뉴에서 조회해주세요.');
        setIsSubmitting(false);
        return;
      }

      const { data: insertedData, error } = await supabase.from('applications_2026').insert([{
        ...formData,
        phone: formData.phone.replace(/[-\s]/g, ''),
        second_choice: formData.second_choice || null,
        third_choice: formData.third_choice || null,
        height: formData.height || null,
        weight: formData.weight || null,
        shoe_size: formData.shoe_size || null,
        emergency_phone: formData.emergency_phone || null,
        special_notes: formData.special_notes || null,
        motivation: formData.motivation || null,
        status: '접수완료'
      }]).select();
      if (error) throw error;
      
      // 신청 완료 상태로 전환
      setSubmitSuccess({
        id: insertedData?.[0]?.id,
        participant_name: formData.participant_name,
        first_choice: formData.first_choice
      });
      setFormData({ first_choice: '', second_choice: '', third_choice: '', participant_name: '', birth_year: '', gender: '', school_name: '', ski_level: '', clothing_rental: '', height: '', weight: '', shoe_size: '', guardian_name: '', phone: '', emergency_phone: '', special_notes: '', motivation: '' });
      setPrivacyAgreed(false);
      setPortraitAgreed(false);
    } catch (error) {
      console.error(error);
      setSubmitMessage('신청서 제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* 신청 완료 화면 */}
      {submitSuccess ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">신청이 완료되었습니다!</h2>
          <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto mb-6">
            <div className="text-left space-y-3">
              <p><span className="text-gray-500">신청번호:</span> <span className="font-bold text-[#6366f1]">PSP{String(submitSuccess.id).padStart(5, '0')}</span></p>
              <p><span className="text-gray-500">참가자:</span> <span className="font-medium">{submitSuccess.participant_name}</span></p>
              <p><span className="text-gray-500">신청 차수:</span> <span className="font-medium">{submitSuccess.first_choice}</span></p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto mb-4">
            <p className="text-sm text-blue-800">
              <strong>📢 발표 안내:</strong> 최종 프로그램 참가 확정자는 <strong>1월 20일</strong> 홈페이지 또는 보호자 연락처를 통해 발표됩니다.
            </p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto mb-6">
            <p className="text-sm text-yellow-800">
              <strong>📌 안내:</strong> 승인 완료 후 인증코드가 발급됩니다.<br/>
              신청 내역은 <strong>신청확인</strong> 탭에서 조회할 수 있습니다.
            </p>
          </div>
          <button 
            onClick={() => setSubmitSuccess(null)}
            className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-6 py-2 rounded-lg font-medium"
          >
            새로운 신청하기
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">2026 평창 눈동이 패스포트 참가 신청</h2>
          {submitMessage && <div className={`mb-6 p-4 rounded-lg ${submitMessage.includes('이미') ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{submitMessage}</div>}
          
          {/* 신청 안내 배너 */}
<div className="bg-purple-50 border border-purple-100 rounded-lg p-5 mb-8">
  <h3 className="font-bold text-[#6366f1] mb-3">📢 신청 안내</h3>
  <ul className="text-sm text-gray-700 space-y-1">
    <li><span className="font-medium">• 모집 기간 :</span> 2025. 01. 05(월) 10시 ~ 01. 16(금) 17시</li>
    <li><span className="font-medium">• 참가비 :</span> 30,000원 <span className="text-gray-500 text-xs">* 참가자 선정 완료 후 계좌번호 별도 안내예정</span></li>
    <li><span className="font-medium">• 선발 방법 :</span> 차수별 선착순 마감 <span className="text-gray-500 text-xs">(회차별 신규참가반 15명, 기존참가반 25명)</span></li>
    <li><span className="font-medium">• 차수 선정 :</span> 신청서 등록 선착순 일자 마감</li>
    <li><span className="font-medium">• 참가 조건 :</span> 평창군 관내 초등학교 입학예정자, 2024년, 2025년 눈동이 패스포트 기존 참가자 </li>
  </ul>
</div>

      <form onSubmit={handleSubmit}>
        {/* 섹션 1: 신청 차수 */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-[#6366f1] mb-4 pb-2 border-b-2 border-[#6366f1]">1. 신청 차수 선택</h3>
          
          {/* 일정표 - 2열 3행 */}
          <div className="bg-grey-60 rounded-lg p-4 mb-6">
            <h4 className="font-medium mb-3">📅 프로그램 일정</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              <div>1회차 02.01(일)~02.03(화)</div>
              <div>2회차 02.04(수)~02.06(금)</div>
              <div>3회차 02.08(일)~02.10(화)</div>
              <div>4회차 02.11(수)~02.13(금)</div>
              <div>5회차 02.22(일)~02.24(화)</div>
              <div>6회차 02.25(수)~02.27(금)</div>
            </div>
          </div>

          {/* 1지망, 2지망, 3지망 드롭다운 3열 */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">1지망 (필수) *</label>
              <select
                name="first_choice"
                value={formData.first_choice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
              >
                {scheduleOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">2지망 (선택)</label>
              <select
                name="second_choice"
                value={formData.second_choice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
              >
                {scheduleOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">3지망 (선택)</label>
              <select
                name="third_choice"
                value={formData.third_choice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
              >
                {scheduleOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 섹션 2: 참가자 정보 */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-[#6366f1] mb-4 pb-2 border-b-2 border-[#6366f1]">2. 참가자 정보</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* 성명 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">성명 *</label>
              <input 
                type="text" 
                name="participant_name"
                value={formData.participant_name}
                onChange={handleInputChange}
                placeholder="참가자 성명"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]" 
              />
            </div>

            {/* 출생연도 드롭다운 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">출생연도 *</label>
              <select
                name="birth_year"
                value={formData.birth_year}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
              >
                {birthYearOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* 학교명 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">학교명 *</label>
              <input 
                type="text" 
                name="school_name"
                value={formData.school_name}
                onChange={handleInputChange}
                placeholder="예: 평창초등학교"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]" 
              />
            </div>

            {/* 성별 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">성별 *</label>
              <div className="flex gap-4 h-[42px] items-center">
                {['남자', '여자'].map(g => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="gender" 
                      value={g} 
                      checked={formData.gender === g} 
                      onChange={handleInputChange} 
                      className="w-4 h-4" 
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 스키실력 - 라디오버튼 + 기준표 한 박스 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">스키 실력 *</label>
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col md:flex-row gap-4">
                {/* 좌측: 라디오버튼 3열 */}
                <div className="flex gap-6">
                  {['입문', '초급', '중상급'].map(lv => (
                    <label key={lv} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="ski_level" 
                        value={lv} 
                        checked={formData.ski_level === lv} 
                        onChange={handleInputChange} 
                        className="w-4 h-4" 
                      />
                      <span className="font-medium">{lv}</span>
                    </label>
                  ))}
                </div>
                {/* 우측: 기준표 */}
                <div className="text-sm text-gray-600 md:border-l md:pl-4 md:ml-4">
                  <span className="text-[#6366f1] font-medium">입문:</span> 스키 경험 없음 | 
                  <span className="text-[#6366f1] font-medium ml-2">초급:</span> 정지/방향전환 가능 | 
                  <span className="text-[#6366f1] font-medium ml-2">중상급:</span> 중급 슬로프 활주 가능
                </div>
              </div>
            </div>

            {/* 의류 대여 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">의류 대여 *</label>
              <div className="flex gap-4">
                {['필요', '불필요'].map(r => (
                  <label key={r} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="clothing_rental" 
                      value={r} 
                      checked={formData.clothing_rental === r} 
                      onChange={handleInputChange} 
                      className="w-4 h-4" 
                    />
                    <span>{r}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 신체 사이즈 - 항상 표시 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">신체 사이즈</label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <input 
                    type="number" 
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="신장 (cm)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]" 
                  />
                </div>
                <div>
                  <input 
                    type="number" 
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="몸무게 (kg)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]" 
                  />
                </div>
                <div>
                  <input 
                    type="number" 
                    name="shoe_size"
                    value={formData.shoe_size}
                    onChange={handleInputChange}
                    placeholder="신발 사이즈 (mm)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 섹션 3: 보호자 정보 */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-[#6366f1] mb-4 pb-2 border-b-2 border-[#6366f1]">3. 보호자 정보</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">성명 *</label>
              <input 
                type="text" 
                name="guardian_name"
                value={formData.guardian_name}
                onChange={handleInputChange}
                placeholder="보호자 성명"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">연락처 *</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="01012345678"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">비상연락처</label>
              <input 
                type="tel" 
                name="emergency_phone"
                value={formData.emergency_phone}
                onChange={handleInputChange}
                placeholder="01012345678"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]" 
              />
            </div>
          </div>
        </div>

        {/* 섹션 4: 특이사항 */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-[#6366f1] mb-4 pb-2 border-b-2 border-[#6366f1]">4. 특이사항</h3>
          <textarea 
            name="special_notes"
            value={formData.special_notes}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
            placeholder="알레르기, 복용약물, 기타 의료 상태 등 운영진이 알아야 할 내용을 기재해주세요."
          />
        </div>

        {/* 섹션 5: 각오 */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-[#6366f1] mb-4 pb-2 border-b-2 border-[#6366f1]">5. 2026 평창 눈동이 패스포트에 임하는 각오 또는 하고 싶은 말</h3>
          <textarea 
            name="motivation"
            value={formData.motivation}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
            placeholder="프로그램에 참여하는 각오나 하고 싶은 말을 자유롭게 작성해주세요."
          />
        </div>

        {/* 개인정보 및 초상권 동의 */}
        <div className="mb-8 bg-gray-50 rounded-lg p-5">
          <p className="text-sm text-gray-600 mb-4">※ 신청서 제출을 위해 아래 내용에 동의해주세요.</p>
          
          {/* 개인정보 사용 동의 아코디언 */}
          <div className="border border-gray-200 rounded-lg mb-3 bg-white">
            <button
              type="button"
              onClick={() => setPrivacyOpen(!privacyOpen)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-t-lg"
            >
              <span className="text-sm font-medium text-gray-800">개인정보 수집 및 이용 동의 (필수)</span>
              <svg className={`w-4 h-4 text-gray-500 transition-transform ${privacyOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {privacyOpen && (
              <div className="px-3 pb-3 text-xs text-gray-600 border-t border-gray-100">
                <table className="w-full border-collapse border border-gray-200 mt-3">
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 p-2 bg-gray-50 font-medium w-1/4 text-center">수집하는<br/>개인정보항목</td>
                      <td className="border border-gray-200 p-2">개인식별정보: 성명, 출생연도, 학교명, 성별, 보호자정보(성명, 전화번호) 등</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 p-2 bg-gray-50 font-medium text-center">개인정보의<br/>수집 및<br/>이용목적</td>
                      <td className="border border-gray-200 p-2">
                        제공하신정보는 2026 평창 눈동이 패스포트 행사 운영에 사용됩니다.<br/>
                        ①참가자와의 의사소통 및 정보전달등에 이용<br/>
                        ②알펜시아 스키 리조트 시설 및 강습 예약<br/>
                        ③행사 운영진 참가자 리스트 운영
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 p-2 bg-gray-50 font-medium text-center">개인정보의<br/>보유및이용기간</td>
                      <td className="border border-gray-200 p-2">수집 된 개인정보는 참가신청제출 후 행사 운영 및 사후관리 만료시까지 위 이용목적을 위하여 보유·이용됩니다. 또한 삭제요청 시 개인정보를 재생이 불가능 한 방법으로 즉시파기합니다.</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-gray-500">※ 귀하는 이에 대한 동의를 거부할 수 있으며, 다만 동의가 없을 경우 참가신청이 불가함을 알려드립니다.</p>
              </div>
            )}
            <div className="px-3 pb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                  className="w-4 h-4 text-[#6366f1] rounded focus:ring-[#6366f1]"
                />
                <span className="text-sm text-gray-700">개인정보 수집 및 이용에 동의합니다.</span>
              </label>
            </div>
          </div>

          {/* 초상권 활용 동의 아코디언 */}
          <div className="border border-gray-200 rounded-lg bg-white">
            <button
              type="button"
              onClick={() => setPortraitOpen(!portraitOpen)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-t-lg"
            >
              <span className="text-sm font-medium text-gray-800">초상권 활용 동의 (필수)</span>
              <svg className={`w-4 h-4 text-gray-500 transition-transform ${portraitOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {portraitOpen && (
              <div className="px-3 pb-3 text-xs text-gray-600 border-t border-gray-100">
                <table className="w-full border-collapse border border-gray-200 mt-3 mb-3">
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 p-2 bg-gray-50 font-medium w-1/4 text-center">초상권<br/>수집·이용 안내</td>
                      <td className="border border-gray-200 p-2">
                        * 수집 목적 : 평창유산재단에서 제작하고 배포하는 콘텐츠의 일부로 (비)영리와 홍보 목적으로 이용<br/>
                        * 수집 항목 : 성명, 성별, 나이, 학교, 사진 및 영상자료<br/>
                        * 보유 기간 : <strong>3년 (단, 사진 및 영상자료는 홍보 등의 목적으로 준영구 보관)</strong><br/>
                        * 정보주체는 개인정보, 초상권 수집·이용에 대한 <strong>동의를 거부할 권리</strong>가 있습니다.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 p-2 bg-gray-50 font-medium text-center">세부 안내</td>
                      <td className="border border-gray-200 p-2">
                        - 제공처에 의하여 촬영된 저작물(사진 또는 동영상)에 대하여 제공처가 영리 및 비영리 목적으로 사용됩니다.<br/>
                        - 본인은 사진(들)의 판권(저작권) 및 소유권을 주장하지 않는다는 점에 대해 동의하며 상기 조항에 의거, 모든 판권(저작권) 및 소유권이 제공처에 있습니다.<br/>
                        - 위의 내용에 따라 본인의 초상권을 제공처에서 사용하는 것에 대해 동의하며, 촬영자 또는 제공처 측을 상대로 일체의 소송을 제기하지 않을 것을 동의합니다.<br/>
                        - 인화된 상태의 사진 또는 저장매체 등에 대해서도 촬영자 또는 제공처 등에 귀속될 수 있다는 점에 대해서도 동의하며, 인격을 침해하지 않는 범위 내에서 저작물에 대한 편집 및 후보정을 할 수 있습니다.<br/>
                        - 촬영한 저작물에 대한 개인의 정보(이름, 학교, 학년, 촬영장소)가 노출 될 수 있습니다.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 p-2 bg-gray-50 font-medium text-center">개인정보<br/>수집·이용 안내</td>
                      <td className="border border-gray-200 p-2">
                        * 제공받는 자 : <strong>평창유산재단 온라인 홍보처, 홍보용 기사, 제작물 촬영자</strong><br/>
                        * 수집 목적 : <strong>(비)영리 목적의 온라인 및 오프라인 콘텐츠 제작</strong><br/>
                        * 수집 항목 : 초상권이 인정되는 사진 또는 영상물<br/>
                        * 보유 기간 : <strong>반영구</strong><br/>
                        * 참가신청자는 개인정보, 초상권 제공에 대한 <strong>동의를 거부할 권리</strong>가 있으며, 동의 거부 시 콘텐츠 제작에서 제외됩니다.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            <div className="px-3 pb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={portraitAgreed}
                  onChange={(e) => setPortraitAgreed(e.target.checked)}
                  className="w-4 h-4 text-[#6366f1] rounded focus:ring-[#6366f1]"
                />
                <span className="text-sm text-gray-700">초상권 활용에 동의합니다.</span>
              </label>
            </div>
          </div>

          {/* 동의 안내 메시지 */}
          {(!privacyAgreed || !portraitAgreed) && (
            <p className="mt-3 text-xs text-red-500">
              ※ 개인정보 수집 및 초상권 활용에 모두 동의해야 신청서를 제출할 수 있습니다.
            </p>
          )}
        </div>

        <div className="text-center">
          <button 
            type="submit" 
            disabled={isSubmitting || !isFormValid()} 
            className="bg-[#6366f1] hover:bg-[#4f46e5] disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-10 py-3 rounded-lg font-medium text-lg"
          >
            {isSubmitting ? '제출 중...' : '신청서 제출'}
          </button>
          {!isFormValid() && !isSubmitting && (
            <p className="mt-2 text-sm text-gray-500">모든 필수 항목을 입력하고 동의해주세요.</p>
          )}
        </div>
      </form>
        </>
      )}
    </div>
  );
};

// 신청확인
const ApplicationCheck2026 = () => {
  const [searchData, setSearchData] = useState({ participant_name: '', phone: '' });
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchMessage('');
    setSearchResult(null);
    setIsEditing(false);
    try {
      const { data, error } = await supabase.from('applications_2026').select('*').eq('participant_name', searchData.participant_name);
      if (error) throw error;
      const matched = data?.find((app: any) => app.phone?.replace(/[-\s]/g, '') === searchData.phone.replace(/[-\s]/g, ''));
      if (matched) setSearchResult(matched);
      else setSearchMessage('일치하는 신청서를 찾을 수 없습니다.');
    } catch { setSearchMessage('검색 중 오류가 발생했습니다.'); }
    finally { setIsSearching(false); }
  };

  const handleEdit = () => {
    setEditData({ ...searchResult });
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase.from('applications_2026').update({
        first_choice: editData.first_choice,
        second_choice: editData.second_choice || null,
        third_choice: editData.third_choice || null,
        school_name: editData.school_name,
        ski_level: editData.ski_level,
        clothing_rental: editData.clothing_rental,
        height: editData.height || null,
        weight: editData.weight || null,
        shoe_size: editData.shoe_size || null,
        guardian_name: editData.guardian_name,
        emergency_phone: editData.emergency_phone || null,
        special_notes: editData.special_notes || null,
      }).eq('id', searchResult.id);
      
      if (error) throw error;
      setSearchResult({ ...searchResult, ...editData });
      setIsEditing(false);
      alert('수정이 완료되었습니다.');
    } catch (error) {
      console.error(error);
      alert('수정 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusColor = (s: string) => s === '승인완료' ? 'bg-green-100 text-green-800' : s === '접수완료' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">신청확인</h2>
      <div className="mb-8 p-4 bg-purple-50 rounded-lg"><p className="text-[#6366f1] text-sm">신청서 조회를 위해 참가자의 정보를 입력해주세요.</p></div>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="참가자 이름" value={searchData.participant_name} onChange={e => setSearchData(p => ({ ...p, participant_name: e.target.value }))} className="px-3 py-2 border rounded-lg" required />
          <input type="tel" placeholder="보호자 연락처" value={searchData.phone} onChange={e => setSearchData(p => ({ ...p, phone: e.target.value }))} className="px-3 py-2 border rounded-lg" required />
        </div>
        <div className="text-center"><button type="submit" disabled={isSearching} className="bg-[#6366f1] text-white px-8 py-3 rounded-lg">{isSearching ? '검색 중...' : '신청서 조회'}</button></div>
      </form>
      {searchMessage && <div className="p-4 bg-red-100 text-red-800 rounded-lg">{searchMessage}</div>}
      {searchResult && !isEditing && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <p>신청 상태: <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(searchResult.status)}`}>{searchResult.status}</span></p>
            {searchResult.status === '접수완료' && (
              <button onClick={handleEdit} className="text-[#6366f1] hover:underline text-sm">✏️ 수정하기</button>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div><strong>신청번호:</strong> PSP{String(searchResult.id).padStart(5, '0')}</div>
            <div><strong>성명:</strong> {searchResult.participant_name}</div>
            <div><strong>1지망:</strong> {searchResult.first_choice}</div>
            <div><strong>2지망:</strong> {searchResult.second_choice || '-'}</div>
            <div><strong>3지망:</strong> {searchResult.third_choice || '-'}</div>
            <div><strong>출생연도:</strong> {searchResult.birth_year}년생</div>
            <div><strong>학교:</strong> {searchResult.school_name}</div>
            <div><strong>스키실력:</strong> {searchResult.ski_level}</div>
            <div><strong>의류대여:</strong> {searchResult.clothing_rental}</div>
            <div><strong>신장/몸무게:</strong> {searchResult.height ? `${searchResult.height}cm / ${searchResult.weight}kg` : '-'}</div>
            <div><strong>신발사이즈:</strong> {searchResult.shoe_size ? `${searchResult.shoe_size}mm` : '-'}</div>
            <div><strong>보호자:</strong> {searchResult.guardian_name}</div>
          </div>
          {searchResult.status === '승인완료' && searchResult.auth_code && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 mb-2"><strong>배정 회차:</strong> {searchResult.assigned_session || searchResult.first_choice}</p>
              <p className="text-green-800"><strong>인증코드:</strong> {searchResult.auth_code}</p>
              <p className="text-xs text-green-600 mt-1">* 참가 후기 작성 시 필요한 코드입니다.</p>
            </div>
          )}
        </div>
      )}
      {isEditing && editData && (
  <div className="bg-gray-50 rounded-lg p-6">
    <h3 className="font-semibold mb-4">신청 정보 수정</h3>
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">학교명</label>
          <input type="text" value={editData.school_name} onChange={e => setEditData({...editData, school_name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">스키실력</label>
          <select value={editData.ski_level} onChange={e => setEditData({...editData, ski_level: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
            <option value="입문">입문 (경험 없음)</option>
            <option value="초급">초급 (정지/방향전환 가능)</option>
            <option value="중상급">중상급 (중급 슬로프 활주 가능)</option>
          </select>
        </div>
      </div>
      {/* 신체 사이즈 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">신체 사이즈</label>
        <div className="grid grid-cols-3 gap-4">
          <input type="number" value={editData.height || ''} onChange={e => setEditData({...editData, height: e.target.value})} placeholder="신장 (cm)" className="w-full px-3 py-2 border rounded-lg" />
          <input type="number" value={editData.weight || ''} onChange={e => setEditData({...editData, weight: e.target.value})} placeholder="몸무게 (kg)" className="w-full px-3 py-2 border rounded-lg" />
          <input type="number" value={editData.shoe_size || ''} onChange={e => setEditData({...editData, shoe_size: e.target.value})} placeholder="신발 (mm)" className="w-full px-3 py-2 border rounded-lg" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">특이사항</label>
        <textarea value={editData.special_notes || ''} onChange={e => setEditData({...editData, special_notes: e.target.value})} rows={3} className="w-full px-3 py-2 border rounded-lg" />
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={() => setIsEditing(false)} className="flex-1 py-2 border rounded-lg">취소</button>
        <button onClick={handleSave} disabled={isSaving} className="flex-1 py-2 bg-[#6366f1] text-white rounded-lg disabled:bg-gray-400">{isSaving ? '저장 중...' : '저장하기'}</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

// 참가 규정
const ProgramRules2026 = () => (
  <div className="bg-white rounded-lg shadow-md p-8">
    <h2 className="text-2xl font-bold mb-6">프로그램 참가 규정</h2>
    <div className="space-y-6">
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <h3 className="font-semibold text-[#6366f1] mb-2">📋 참가 규정 안내</h3>
        <p className="text-sm text-gray-700">2026 눈동이 패스포트 프로그램 참가를 위한 세부 규정 및 안내사항입니다.<br/>참가 신청 전 반드시 숙지해 주시기 바랍니다.</p>
      </div>

      <div className="border rounded-lg p-6">
        <h3 className="font-semibold mb-4">📌 참가 자격 및 참가 규정</h3>
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">(참가 자격)</h4>
            <ul className="space-y-1 ml-4">
              <li>• 평창군 관내에 거주하는 초등학생</li>
              <li>• 2026년 기준 초등학교 1~3학년 (2017~2019년생)</li>
              <li>• 프로그램(스키)활동에 지장이 없는 건강 상태인 학생</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">(참가 규정)</h4>
            <ul className="space-y-1 ml-4">
              <li>• 참가 신청은 학부모님께서 직접 해주셔야 하며, 신청 시 모든 규정에 동의한 것으로 간주됩니다.</li>
              <li>• 참가자는 2026년 기준 초등학교 1학년부터 3학년까지의 학생으로 제한됩니다.</li>
              <li>• 신청서 작성 시 정확한 정보를 입력해주시기 바라며, 허위 정보 기재 시 참가가 제한될 수 있습니다.</li>
              <li>• 프로그램 참가 승인 후 무단 불참 시 향후 프로그램 참가에 제한이 있을 수 있습니다.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <h3 className="font-semibold mb-4">📞 문의처</h3>
        <div className="text-sm text-gray-700 space-y-1">
          <p>주관: 평창유산재단</p>
          <p>전화: 031-796-7945 (운영사무국 : 주식회사 에이치포스)</p>
          <p>이메일: <a href="mailto:kimhs@hforce.co.kr" className="text-[#6366f1] underline">kimhs@hforce.co.kr</a></p>
          <p>운영시간: 평일 10:00 ~ 18:00 (점심시간 12:00 ~ 13:00 제외)</p>
        </div>
      </div>
    </div>
  </div>
);

export default Application2026;
