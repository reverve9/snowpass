import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Application = () => {
  const [activeMenu, setActiveMenu] = useState('apply');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // URL 파라미터 처리 (Hash 라우팅용)
  useEffect(() => {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1] || '');
    const tab = urlParams.get('tab');
    if (tab && ['apply', 'check', 'rules'].includes(tab)) {
      setActiveMenu(tab);
    }
  }, []);

  // 탭 변경 시 URL 업데이트
  const handleTabChange = (tab: string) => {
    setActiveMenu(tab);
    const newUrl = `/#/application?tab=${tab}`;
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
        {/* 데스크톱: 사이드바 + 콘텐츠 */}
        <div className="hidden md:flex gap-8">
          {/* 좌측 사이드바 (30%) */}
          <div className="w-[30%]">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">참가신청</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => handleTabChange('apply')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'apply' 
                      ? 'bg-[#223466] text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  신청서 작성
                </button>
                <button
                  onClick={() => handleTabChange('check')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'check' 
                      ? 'bg-[#223466] text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  신청확인
                </button>
                <button
                  onClick={() => handleTabChange('rules')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'rules' 
                      ? 'bg-[#223466] text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  프로그램 참가 규정
                </button>
              </nav>
              
              {/* 관리자 페이지 링크 */}
              <div className="border-t pt-4 mt-4">
                <a
                  href="/#/admin"
                  className="w-full block text-left px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-red-100"
                >
                  🔒 관리자 페이지
                </a>
              </div>
            </div>
          </div>

          {/* 우측 콘텐츠 (70%) */}
          <div className="w-[70%]">
            {activeMenu === 'apply' && <ApplicationForm />}
            {activeMenu === 'check' && <ApplicationCheck />}
            {activeMenu === 'rules' && <ProgramRules />}
          </div>
        </div>

        {/* 모바일: 탭 방식 */}
        <div className="md:hidden">
          {/* 모바일 탭 메뉴 */}
          <div className="bg-gray-50 rounded-lg p-2 mb-6">
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => handleTabChange('apply')}
                className={`py-3 px-2 rounded-lg text-center font-medium transition-colors text-sm ${
                  activeMenu === 'apply' 
                    ? 'bg-[#223466] text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                신청서 작성
              </button>
              <button
                onClick={() => handleTabChange('check')}
                className={`py-3 px-2 rounded-lg text-center font-medium transition-colors text-sm ${
                  activeMenu === 'check' 
                    ? 'bg-[#223466] text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                신청확인
              </button>
              <button
                onClick={() => handleTabChange('rules')}
                className={`py-3 px-2 rounded-lg text-center font-medium transition-colors text-sm ${
                  activeMenu === 'rules' 
                    ? 'bg-[#223466] text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                참가 규정
              </button>
            </div>
          </div>

          {/* 모바일 콘텐츠 (전체 너비) */}
          <div className="w-full">
            {activeMenu === 'apply' && <ApplicationForm />}
            {activeMenu === 'check' && <ApplicationCheck />}
            {activeMenu === 'rules' && <ProgramRules />}
          </div>
        </div>
      </div>
    </div>
  );
};

// 프로그램 참가 규정 컴포넌트
const ProgramRules = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'esamanru, sans-serif'}}>
        프로그램 참가 규정
      </h2>
      
      <div className="space-y-8">
        {/* 안내 메시지 */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 text-xl">📋</div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">프로그램 참가 규정 안내</h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                눈동이 패스포트 2.0 프로그램 참가를 위한 세부 규정 및 안내사항입니다.<br />
                참가 신청 전 반드시 숙지해 주시기 바랍니다.
              </p>
            </div>
          </div>
        </div>

        {/* 일반 참가 규정 */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-blue-600">📌</span>
            일반 참가 규정
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-medium">•</span>
              <span>참가 신청은 학부모님께서 직접 해주셔야 하며, 신청 시 모든 규정에 동의한 것으로 간주됩니다.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-medium">•</span>
              <span>참가자는 초등학교 1학년부터 6학년까지의 학생으로 제한됩니다.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-medium">•</span>
              <span>신청서 작성 시 정확한 정보를 입력해주시기 바라며, 허위 정보 기재 시 참가가 제한될 수 있습니다.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-medium">•</span>
              <span>프로그램 참가 승인 후 무단 불참 시 향후 프로그램 참가에 제한이 있을 수 있습니다.</span>
            </div>
          </div>
        </div>

        {/* 프로그램별 세부 규정 */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-green-600">🎿</span>
            프로그램별 세부 규정
          </h3>
          
          <div className="space-y-6">
            {/* 스키학교 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">찾아가는 평창 올림픽 스키학교</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-medium">•</span>
                  <span>단체 신청으로 진행되며, 학교 또는 기관 단위로 신청 가능합니다.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-medium">•</span>
                  <span>최소 20명 이상의 참가자가 확보되어야 프로그램이 진행됩니다.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-medium">•</span>
                  <span>프로그램 일정은 신청 기관과 협의하여 결정됩니다.</span>
                </div>
              </div>
            </div>

            {/* OJT 워크숍 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">평창 눈동이 OJT 워크숍</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-medium">•</span>
                  <span>1차(2026/01/05-07), 2차(2026/01/12-14) 중 선택하여 신청 가능합니다.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-medium">•</span>
                  <span>각 차수별 정원이 있으며, 선착순으로 마감됩니다.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-medium">•</span>
                  <span>2박 3일 프로그램으로 진행됩니다.</span>
                </div>
              </div>
            </div>

            {/* 스노우 스포츠 캠프 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">스노우 스포츠 캠프</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-medium">•</span>
                  <span>1차부터 6차까지 총 6개 차수로 운영됩니다.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-medium">•</span>
                  <span>각 차수는 2박 3일로 진행되며, 차수별로 정원이 제한됩니다.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-medium">•</span>
                  <span>프로그램 기간: 2026년 1월 20일 ~ 2월 11일</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 안전 및 건강 관련 규정 */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-red-600">🏥</span>
            안전 및 건강 관련 규정
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <span className="text-red-500 font-medium">•</span>
              <span>참가자는 프로그램 참가에 지장이 없는 건강 상태여야 합니다.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500 font-medium">•</span>
              <span>알레르기, 복용 중인 약물, 기타 의료 상태는 반드시 신청서에 기재해주세요.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500 font-medium">•</span>
              <span>프로그램 중 발생하는 안전사고에 대해서는 주최 측에서 보험 처리를 도와드립니다.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500 font-medium">•</span>
              <span>참가자는 프로그램 진행 중 안전 수칙을 준수해야 합니다.</span>
            </div>
          </div>
        </div>

        {/* 개인정보 처리 방침 */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-purple-600">🔒</span>
            개인정보 처리 방침
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <span className="text-purple-500 font-medium">•</span>
              <span>수집된 개인정보는 프로그램 운영 목적으로만 사용됩니다.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-500 font-medium">•</span>
              <span>개인정보는 프로그램 종료 후 1년간 보관 후 파기됩니다.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-500 font-medium">•</span>
              <span>프로그램 활동 사진은 홍보 목적으로 사용될 수 있습니다.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-500 font-medium">•</span>
              <span>개인정보 처리에 대한 문의는 관리자에게 연락해주세요.</span>
            </div>
          </div>
        </div>

        {/* 문의처 */}
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-blue-600">📞</span>
            문의처
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div><span className="font-medium">주관:</span> 평창유산재단</div>
            <div><span className="font-medium">전화:</span> 010-4818-2024 (운영사무국)</div>
            <div><span className="font-medium">이메일:</span> info@snowpassport.kr</div>
            <div><span className="font-medium">운영시간:</span> 평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00 제외)</div>
          </div>
        </div>

        {/* 하단 안내 */}
        <div className="text-center py-6 border-t border-gray-200">
          <p className="text-base text-gray-600 mb-4">
            위 규정은 프로그램 운영 상황에 따라 변경될 수 있으며, 변경 시에는 사전에 공지해드립니다.
          </p>
        </div>
      </div>
    </div>
  );
};

// 참가신청서 작성 컴포넌트
const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    program_type: '',
    session_number: '',
    participant_name: '',
    birth_date: '',
    gender: '',
    grade: '',
    guardian_name: '',
    phone: '',
    address: '',
    region: '',
    school_name: '',
    special_notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const { data: _, error } = await supabase
        .from('applications_2025_09_29_16_15')
        .insert([formData])
        .select();

      if (error) throw error;

      setSubmitMessage('신청서가 성공적으로 제출되었습니다!');
      setFormData({
        program_type: '',
        session_number: '',
        participant_name: '',
        birth_date: '',
        gender: '',
        grade: '',
        guardian_name: '',
        phone: '',
        address: '',
        region: '',
        school_name: '',
        special_notes: ''
      });
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('신청서 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'esamanru, sans-serif'}}>
        참가신청서 작성
      </h2>
      
      {submitMessage && (
        <div className={`mb-6 p-4 rounded-lg ${
          submitMessage.includes('성공') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {submitMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* 프로그램 선택 */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">프로그램 선택</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              formData.program_type === 'ski-camp' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`}>
              <input 
                type="radio" 
                name="program_type" 
                value="ski-camp" 
                checked={formData.program_type === 'ski-camp'}
                onChange={handleInputChange}
                className="mb-2" 
              />
              <div className="font-medium">찾아가는 평창 올림픽 스키학교</div>
              <div className="text-sm text-gray-600">2025년 9월 - 12월</div>
            </label>

            <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              formData.program_type === 'ojt-workshop' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`}>
              <input 
                type="radio" 
                name="program_type" 
                value="ojt-workshop" 
                checked={formData.program_type === 'ojt-workshop'}
                onChange={handleInputChange}
                className="mb-2" 
              />
              <div className="font-medium">평창 눈동이 OJT 워크숍</div>
              <div className="text-sm text-gray-600">2026/01/05-07 / 01/12-14</div>
            </label>

            <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              formData.program_type === 'snow-camp' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`}>
              <input 
                type="radio" 
                name="program_type" 
                value="snow-camp" 
                checked={formData.program_type === 'snow-camp'}
                onChange={handleInputChange}
                className="mb-2" 
              />
              <div className="font-medium">스노우 스포츠 캠프</div>
              <div className="text-sm text-gray-600">2026/01/20 - 02/11 (2박3일)</div>
            </label>
          </div>
        </div>

        {/* 프로그램별 폼 표시 */}
        {formData.program_type === 'ski-camp' && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
    <div className="text-red-600 text-2xl mb-3">🚫</div>
    <h3 className="text-lg font-bold text-red-900 mb-3">[찾아가는 평창 올림픽 스키학교 신청 마감]</h3>
    <div className="text-red-800 space-y-2">
      <p>찾아가는 평창 올림픽 스키학교는 모집 정원이 모두 충족되어</p>
      <p>접수를 마감합니다.</p>
      <p className="mt-4">많은 관심과 참여에 감사드리며,</p>
      <p>다음 기회에 다시 찾아뵙겠습니다.</p>
      <p className="mt-4 text-sm">문의사항이 있으시면 운영사무국(010-4818-2024)으로</p>
      <p className="text-sm">연락해주시기 바랍니다.</p>
    </div>
  </div>
)}

        {/* OJT 워크숍 마감 안내 */}
        {formData.program_type === 'ojt-workshop' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-2xl mb-3">🚫</div>
            <h3 className="text-lg font-bold text-red-900 mb-3">평창 눈동이 OJT 워크숍 신청 마감</h3>
            <div className="text-red-800 space-y-2">
              <p>평창 눈동이 OJT 워크숍은 정원이 모두 마감되어</p>
              <p>더 이상 신청을 받지 않습니다.</p>
              <p className="mt-4">많은 관심과 참여 감사드리며,</p>
              <p>다음 기회에 다시 만나뵙겠습니다.</p>
              <p className="mt-4 text-sm">문의사항이 있으시면 운영사무국(010-4818-2024)으로</p>
              <p className="text-sm">연락해주시기 바랍니다.</p>
            </div>
          </div>
        )}

        {/* 스노우 캠프 차수 선택 및 폼 */}
        {formData.program_type === 'snow-camp' && (
          <>
            {/* 신청 차수 섹션 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">신청 차수</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  캠프 차수 *
                </label>
                <select
                  name="session_number"
                  value={formData.session_number}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">차수를 선택하세요</option>
                  <option value="1차">1차 (2026/01/20-22)</option>
                  <option value="2차">2차 (2026/01/26-28)</option>
                  <option value="3차">3차 (2026/01/28-30)</option>
                  <option value="4차">4차 (2026/02/02-04)</option>
                  <option value="5차">5차 (2026/02/04-06)</option>
                  <option value="6차">6차 (2026/02/09-11)</option>
                </select>
                <p className="text-sm text-gray-600 mt-2">
                  원하시는 캠프 차수를 선택해주세요. (각 차수별 2박3일 진행)
                </p>
              </div>
            </div>

            {/* 안내 메시지 */}
            <div className="mb-8 p-6 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                참가신청은 학부모님께서 해 주셔야 하며, 신청시 프로그램 참가에 관한 모든 사항에 동의한 것으로 간주됩니다.
              </p>
              <p className="text-red-800 text-lg font-semibold">
                중복신청은 불가하며, 1인당 1회만 신청가능 합니다
              </p>
            </div>


            {/* 참가자 정보 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">참가자 정보</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">성명 *</label>
                  <input 
                    type="text" 
                    placeholder="참가자 성명을 입력하세요"
                    name="participant_name"
                    value={formData.participant_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">생년월일 *</label>
                  <input 
                    type="date" 
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">성별 *</label>
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">성별을 선택하세요</option>
                    <option value="남성">남</option>
                    <option value="여성">여</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">학년 *</label>
                  <select 
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">학년을 선택하세요</option>
                    <option value="초등 1학년">초등 1학년</option>
                    <option value="초등 2학년">초등 2학년</option>
                    <option value="초등 3학년">초등 3학년</option>
                    <option value="초등 4학년">초등 4학년</option>
                    <option value="초등 5학년">초등 5학년</option>
                    <option value="초등 6학년">초등 6학년</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 보호자 정보 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">보호자 정보</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">성명 *</label>
                  <input 
                    type="text" 
                    placeholder="보호자 성명을 입력하세요"
                    name="guardian_name"
                    value={formData.guardian_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">연락처 *</label>
                  <input 
                    type="tel" 
                    placeholder="연락처를 입력하세요 (예: 01012345678)"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">주소 *</label>
                  <input 
                    type="text" 
                    placeholder="주소를 입력하세요"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
            </div>

            {/* 학교 정보 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">학교 정보</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">지역(시/도) *</label>
                  <select 
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">지역을 선택하세요</option>
                    <option value="서울특별시">서울특별시</option>
                    <option value="부산광역시">부산광역시</option>
                    <option value="대구광역시">대구광역시</option>
                    <option value="인천광역시">인천광역시</option>
                    <option value="광주광역시">광주광역시</option>
                    <option value="대전광역시">대전광역시</option>
                    <option value="울산광역시">울산광역시</option>
                    <option value="세종특별자치시">세종특별자치시</option>
                    <option value="경기도">경기도</option>
                    <option value="강원도">강원특별자치도</option>
                    <option value="충청북도">충청북도</option>
                    <option value="충청남도">충청남도</option>
                    <option value="전라북도">전라북도</option>
                    <option value="전라남도">전라남도</option>
                    <option value="경상북도">경상북도</option>
                    <option value="경상남도">경상남도</option>
                    <option value="제주특별자치도">제주특별자치도</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">학교명 *</label>
                  <input 
                    type="text" 
                    placeholder="학교명을 입력하세요 (예: 평창초등학교)"
                    name="school_name"
                    value={formData.school_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
            </div>

            {/* 특이사항 */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">특이사항 (알레르기, 질병 등)</label>
              <textarea 
                name="special_notes"
                value={formData.special_notes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="알레르기, 복용 중인 약물, 기타 의료 상태나 특별히 주의해야 할 사항이 있으시면 작성해주세요 (선택사항)"
              />
            </div>

            {/* 제출 버튼 */}
            <div className="text-center">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-[#223466] hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                {isSubmitting ? '제출 중...' : '신청서 제출'}
              </button>
            </div>
          </>
        )}

        {/* 프로그램 미선택시 안내 */}
        {!formData.program_type && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">프로그램을 선택해주세요.</p>
            <p className="mt-2">선택하신 프로그램에 따라 신청 폼이 표시됩니다.</p>
          </div>
        )}
      </form>
    </div>
  );
};

// 신청확인 컴포넌트
const ApplicationCheck = () => {
  const [searchData, setSearchData] = useState({
    participant_name: '',
    phone: '',
    birth_date: ''
  });
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');

  // 날짜 형식 통일 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  // 전화번호 정규화 함수 (하이픈 제거)
  const normalizePhoneNumber = (phone: string) => {
    return phone.replace(/[-\s]/g, '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchMessage('');
    setSearchResult(null);

    try {
      // 입력된 전화번호 정규화
      const normalizedInputPhone = normalizePhoneNumber(searchData.phone);
      
      const { data: searchResults, error } = await supabase
        .from('applications_2025_09_29_16_15')
        .select('*')
        .eq('participant_name', searchData.participant_name)
        .eq('birth_date', searchData.birth_date);

      if (error) throw error;

      if (searchResults && searchResults.length > 0) {
        // 전화번호 매칭 확인 (하이픈 있는 형태와 없는 형태 모두 지원)
        const matchedApplication = searchResults.find((app: any) => {
          const dbPhone = app.phone || '';
          const normalizedDbPhone = normalizePhoneNumber(dbPhone);
          
          return dbPhone === searchData.phone || // 기존 방식 (하이픈 포함)
                 normalizedDbPhone === normalizedInputPhone; // 새로운 방식 (하이픈 없이)
        });

        if (matchedApplication) {
          setSearchResult(matchedApplication);
          setSearchMessage('');
        } else {
          setSearchMessage('일치하는 신청서를 찾을 수 없습니다. 입력 정보를 다시 확인해주세요.');
        }
      } else {
        setSearchMessage('일치하는 신청서를 찾을 수 없습니다. 입력 정보를 다시 확인해주세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSearchMessage('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSearching(false);
    }
  };

  const getProgramName = (type: string) => {
    switch (type) {
      case 'ski-camp': return '찾아가는 평창 올림픽 스키학교';
      case 'ojt-workshop': return '평창 눈동이 OJT 워크숍';
      case 'snow-camp': return '스노우 스포츠 캠프';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '승인완료': return 'text-green-600 bg-green-100';
      case '심사중': return 'text-yellow-600 bg-yellow-100';
      case '접수완료': return 'text-blue-600 bg-blue-100';
      case '거절': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'esamanru, sans-serif'}}>
        신청확인
      </h2>
      
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800 text-sm">
          신청서 조회를 위해 참가자의 정보를 정확히 입력해주세요.
        </p>
      </div>

      {/* 검색 폼 */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">참가자 성명 *</label>
            <input 
              type="text" 
              name="participant_name"
              value={searchData.participant_name}
              onChange={handleInputChange}
              required
              placeholder="참가자 성명을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">보호자 연락처 *</label>
            <input 
              type="tel" 
              name="phone"
              value={searchData.phone}
              onChange={handleInputChange}
              required
              placeholder="연락처를 입력하세요 (하이픈 없이도 가능)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">참가자 생년월일 *</label>
            <input 
              type="date" 
              name="birth_date"
              value={searchData.birth_date}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>

        <div className="mb-8 p-5 bg-white rounded-lg">
          <p className="font-bold text-[#223466] text-lg">
            최종 프로그램 참가자는 12월 24일 홈페이지를 통해 발표됩니다.
          </p>
          <p className="font-bold text-[#223466] text-xl">
            최종 프로그램 참가 확정 여부는 별도의 개별 연락없이 홈페이지 신청 확인 메뉴를 통해서 확인 부탁드립니다
          </p>
        </div>

        <div className="text-center">
          <button 
            type="submit"
            disabled={isSearching}
            className="bg-[#223466] hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            {isSearching ? '검색 중...' : '신청서 조회'}
          </button>
        </div>
      </form>

      {/* 검색 메시지 */}
      {searchMessage && (
        <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-800">
          {searchMessage}
        </div>
      )}

      {/* 검색 결과 */}
      {searchResult && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">신청서 정보</h3>
          
          {/* 상태 표시 */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">신청 상태:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(searchResult.status)}`}>
                {searchResult.status}
              </span>
            </div>
          </div>

          {/* 신청 정보 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">참가자 정보</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">성명:</span> {searchResult.participant_name}</div>
                <div><span className="font-medium">생년월일:</span> {searchResult.birth_date}</div>
                <div><span className="font-medium">성별:</span> {searchResult.gender}</div>
                <div><span className="font-medium">학년:</span> {searchResult.grade}</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">프로그램 정보</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">프로그램:</span> {getProgramName(searchResult.program_type)}</div>
                {searchResult.session_number && (
                  <div><span className="font-medium">차수:</span> {searchResult.session_number}</div>
                )}
                <div><span className="font-medium">신청일:</span> {formatDate(searchResult.created_at)}</div>
                <div><span className="font-medium">지역:</span> {searchResult.region}</div>
                <div><span className="font-medium">학교:</span> {searchResult.school_name}</div>
              </div>
            </div>
          </div>

          {/* 보호자 정보 */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">보호자 정보</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium">성명:</span> {searchResult.guardian_name}</div>
              <div><span className="font-medium">연락처:</span> {searchResult.phone}</div>
              <div className="md:col-span-2"><span className="font-medium">주소:</span> {searchResult.address}</div>
            </div>
          </div>

          {/* 특이사항 */}
          {searchResult.special_notes && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">특이사항</h4>
              <p className="text-sm text-gray-700 bg-white p-3 rounded border">
                {searchResult.special_notes}
              </p>
            </div>
          )}

          {/* 인증코드 표시 (승인완료인 경우만) */}
          {searchResult.status === '승인완료' && searchResult.auth_code && (
            <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">🔐 후기작성 인증코드</h4>
              <div className="bg-white border-2 border-blue-300 rounded-lg p-3 text-center">
                <div className="text-xl font-mono font-bold text-blue-600 mb-1">
                  {searchResult.auth_code}
                </div>
                <p className="text-xs text-blue-600">
                  💡 게시판 → 참가후기에서 사용하세요
                </p>
              </div>
            </div>
          )}

          {/* 상태별 안내 메시지 */}
          <div className="mt-6 p-4 rounded-lg bg-white border">
            {searchResult.status === '승인완료' && (
              <div className="text-green-700">
                <p className="font-medium">🎉 참가 승인이 완료되었습니다!</p>
                <p className="text-sm mt-1">프로그램 관련 세부 안내는 별도로 연락드릴 예정입니다.</p>
              </div>
            )}
            {searchResult.status === '심사중' && (
              <div className="text-yellow-700">
                <p className="font-medium">⏳ 신청서를 검토 중입니다.</p>
                <p className="text-sm mt-1">심사 결과는 빠른 시일 내에 안내드리겠습니다.</p>
              </div>
            )}
            {searchResult.status === '접수완료' && (
              <div className="text-blue-700">
                <p className="font-medium">📝 신청서가 정상적으로 접수되었습니다.</p>
                <p className="text-sm mt-1">심사 후 결과를 안내드리겠습니다.</p>
              </div>
            )}
            {searchResult.status === '거절' && (
              <div className="text-red-700">
                <p className="font-medium">❌ 참가 신청이 거절되었습니다.</p>
                <p className="text-sm mt-1">자세한 사항은 연락처로 문의해주세요.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


export default Application;