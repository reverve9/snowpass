import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Application = () => {
  const [activeMenu, setActiveMenu] = useState('apply');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [initialProgram, setInitialProgram] = useState('');

  // URL 파라미터 처리 (Hash 라우팅용)
  useEffect(() => {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1] || '');
    const tab = urlParams.get('tab');
    const program = urlParams.get('program');
    
    if (tab && ['apply', 'check', 'rules', 'certificate'].includes(tab)) {
      setActiveMenu(tab);
    }
    
    // 프로그램 파라미터 처리
    if (program) {
      const programMap: { [key: string]: string } = {
        'skicamp': 'ski-camp',
        'ojt': 'ojt-workshop',
        'snowcamp': 'snow-camp'
      };
      if (programMap[program]) {
        setInitialProgram(programMap[program]);
      }
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
                <button
                  onClick={() => handleTabChange('certificate')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'certificate' 
                      ? 'bg-[#223466] text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🎓 수료증 다운로드
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
            {activeMenu === 'apply' && <ApplicationForm initialProgram={initialProgram} />}
            {activeMenu === 'check' && <ApplicationCheck />}
            {activeMenu === 'rules' && <ProgramRules />}
            {activeMenu === 'certificate' && <CertificateDownload />}
          </div>
        </div>

        {/* 모바일: 탭 방식 */}
        <div className="md:hidden">
          {/* 모바일 탭 메뉴 */}
          <div className="bg-gray-50 rounded-lg p-2 mb-6">
            <div className="grid grid-cols-4 gap-1">
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
              <button
                onClick={() => handleTabChange('certificate')}
                className={`py-3 px-2 rounded-lg text-center font-medium transition-colors text-sm ${
                  activeMenu === 'certificate' 
                    ? 'bg-[#223466] text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                수료증
              </button>
            </div>
          </div>

          {/* 모바일 콘텐츠 (전체 너비) */}
          <div className="w-full">
            {activeMenu === 'apply' && <ApplicationForm initialProgram={initialProgram} />}
            {activeMenu === 'check' && <ApplicationCheck />}
            {activeMenu === 'rules' && <ProgramRules />}
            {activeMenu === 'certificate' && <CertificateDownload />}
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
const ApplicationForm = ({ initialProgram = '' }: { initialProgram?: string }) => {
  const [formData, setFormData] = useState({
    program_type: initialProgram,
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

  // initialProgram이 변경되면 formData 업데이트
  useEffect(() => {
    if (initialProgram) {
      setFormData(prev => ({ ...prev, program_type: initialProgram }));
    }
  }, [initialProgram]);

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

        {/* 스노우 스포츠 캠프 마감 안내 */}
        {formData.program_type === 'snow-camp' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-2xl mb-3">🚫</div>
            <h3 className="text-lg font-bold text-red-900 mb-3">[청소년 동계스포츠 캠프 신청 마감]</h3>
            <div className="text-red-800 space-y-2">
              <p>청소년 동계스포츠 캠프는 모집 정원이 모두 충족되어</p>
              <p>접수를 마감합니다.</p>
              <p className="mt-4">많은 관심과 참여에 감사드리며,</p>
              <p>다음 기회에 다시 찾아뵙겠습니다.</p>
              <p className="mt-4 text-sm">문의사항이 있으시면 운영사무국(010-4818-2024)으로</p>
              <p className="text-sm">연락해주시기 바랍니다.</p>
            </div>
          </div>
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
    birth_year: '',
    birth_month: '',
    birth_day: ''
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

  // 생년월일 자동 탭 이동
  const handleBirthYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setSearchData(prev => ({ ...prev, birth_year: value }));
    if (value.length === 4) {
      document.getElementById('birth_month')?.focus();
    }
  };

  const handleBirthMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setSearchData(prev => ({ ...prev, birth_month: value }));
    if (value.length === 2) {
      document.getElementById('birth_day')?.focus();
    }
  };

  const handleBirthDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setSearchData(prev => ({ ...prev, birth_day: value }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchMessage('');
    setSearchResult(null);

    // 생년월일 조합
    const birth_date = `${searchData.birth_year}-${searchData.birth_month.padStart(2, '0')}-${searchData.birth_day.padStart(2, '0')}`;

    try {
      // 입력된 전화번호 정규화
      const normalizedInputPhone = normalizePhoneNumber(searchData.phone);
      
      const { data: searchResults, error } = await supabase
        .from('applications_2025_09_29_16_15')
        .select('*')
        .eq('participant_name', searchData.participant_name)
        .eq('birth_date', birth_date);

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
            <div className="flex gap-2 items-center">
              <input 
                type="text"
                id="birth_year"
                value={searchData.birth_year}
                onChange={handleBirthYearChange}
                placeholder="연도"
                maxLength={4}
                required
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center" 
              />
              <span className="text-gray-500">년</span>
              <input 
                type="text"
                id="birth_month"
                value={searchData.birth_month}
                onChange={handleBirthMonthChange}
                placeholder="월"
                maxLength={2}
                required
                className="w-16 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center" 
              />
              <span className="text-gray-500">월</span>
              <input 
                type="text"
                id="birth_day"
                value={searchData.birth_day}
                onChange={handleBirthDayChange}
                placeholder="일"
                maxLength={2}
                required
                className="w-16 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center" 
              />
              <span className="text-gray-500">일</span>
            </div>
          </div>
        </div>

        <div className="mb-8 p-5 bg-white rounded-lg">
          
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

// 수료증 다운로드 컴포넌트
const CertificateDownload = () => {
  const [formData, setFormData] = useState({
    name: '',
    school_name: '',
    birth_year: '',
    birth_month: '',
    birth_day: ''
  });
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');
  const [graduateData, setGraduateData] = useState<any>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  // 연도 입력 핸들러
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setFormData({ ...formData, birth_year: value });
    if (value.length === 4) {
      document.getElementById('birth-month')?.focus();
    }
  };

  // 월 입력 핸들러
  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setFormData({ ...formData, birth_month: value });
    if (value.length === 2) {
      document.getElementById('birth-day')?.focus();
    }
  };

  // 일 입력 핸들러
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setFormData({ ...formData, birth_day: value });
  };

  // PDF 다운로드 함수
  const handleDownloadPDF = async () => {
    const element = document.getElementById('certificate-content');
    if (!element) return;

    setDownloading(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // 원본 비율 계산
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      
      // A4 가로 기준으로 비율 맞추기
      const pdf = new jsPDF({
        orientation: ratio > 1 ? 'landscape' : 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // 비율 유지하면서 맞추기
      let finalWidth = pdfWidth;
      let finalHeight = pdfWidth / ratio;
      
      if (finalHeight > pdfHeight) {
        finalHeight = pdfHeight;
        finalWidth = pdfHeight * ratio;
      }
      
      const x = (pdfWidth - finalWidth) / 2;
      const y = (pdfHeight - finalHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
      pdf.save(`수료증_${graduateData.name}_${graduateData.certificate_number}.pdf`);
    } catch (err) {
      console.error('PDF 다운로드 오류:', err);
      alert('PDF 다운로드 중 오류가 발생했습니다.');
    } finally {
      setDownloading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setGraduateData(null);

    // 생년월일 조합
    const birthDate = `${formData.birth_year}-${formData.birth_month.padStart(2, '0')}-${formData.birth_day.padStart(2, '0')}`;

    try {
      // 수료자 DB에서 조회
      const { data, error: dbError } = await supabase
        .from('certificate_graduates_2025')
        .select('*')
        .eq('name', formData.name)
        .eq('school_name', formData.school_name)
        .eq('birth_date', birthDate)
        .single();

      if (dbError || !data) {
        throw new Error('수료자 정보를 찾을 수 없습니다. 이름, 학교명, 생년월일을 정확히 입력해주세요.');
      }

      setGraduateData(data);
      setShowCertificate(true);
    } catch (err: any) {
      setError(err.message || '수료증 조회 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 차수별 참여기간 정보
  const getSessionInfo = (sessionNumber: string) => {
    const session = sessionNumber?.toString().replace('차', '').trim();
    const sessions: { [key: string]: { period: string; issueDate: string } } = {
      '1': { period: '2026. 1. 5.~1. 7.', issueDate: '2026년 1월 7일' },
      '2': { period: '2026. 1. 12.~1. 14.', issueDate: '2026년 1월 14일' }
    };
    return sessions[session] || { period: '', issueDate: '' };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'esamanru, sans-serif'}}>
        🎓 수료증 다운로드
      </h2>

      {!showCertificate ? (
        <>
          {/* 안내 메시지 */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-8">
            <div className="flex items-start gap-3">
              <div className="text-blue-600 text-xl">📋</div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">수료증 발급 안내</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  평창 눈동이 OJT 워크숍 프로그램을 수료한 참가자에게 수료증을 발급해드립니다.<br />
                  등록된 정보를 정확히 입력해주세요.
                </p>
              </div>
            </div>
          </div>

          {/* 조회 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#223466] focus:border-[#223466]"
                placeholder="참가자 이름"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">학교명 *</label>
              <input
                type="text"
                value={formData.school_name}
                onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#223466] focus:border-[#223466]"
                placeholder="예: 평창초등학교"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">생년월일 *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="birth-year"
                  value={formData.birth_year}
                  onChange={handleYearChange}
                  className="w-24 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#223466] focus:border-[#223466] text-center"
                  placeholder="년(4자리)"
                  maxLength={4}
                  required
                />
                <input
                  type="text"
                  id="birth-month"
                  value={formData.birth_month}
                  onChange={handleMonthChange}
                  className="w-16 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#223466] focus:border-[#223466] text-center"
                  placeholder="월"
                  maxLength={2}
                  required
                />
                <input
                  type="text"
                  id="birth-day"
                  value={formData.birth_day}
                  onChange={handleDayChange}
                  className="w-16 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#223466] focus:border-[#223466] text-center"
                  placeholder="일"
                  maxLength={2}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#223466] hover:bg-[#1a2850] text-white rounded-lg font-medium text-lg transition-colors disabled:bg-gray-400"
            >
              {loading ? '조회 중...' : '수료증 조회'}
            </button>
          </form>

          {/* 안내사항 */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">📌 안내사항</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 수료증은 프로그램 수료 후 발급 가능합니다.</li>
              <li>• 등록된 수료자만 수료증을 다운로드할 수 있습니다.</li>
              <li>• 수료증은 PDF로 다운로드됩니다. (브라우저 인쇄 기능 사용)</li>
            </ul>
          </div>
        </>
      ) : (
        <>
          {/* 수료증 미리보기 */}
          <div className="mb-6 flex justify-between items-center">
            <button
              onClick={() => { setShowCertificate(false); setGraduateData(null); }}
              className="text-gray-600 hover:text-gray-800"
            >
              ← 다시 조회하기
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="px-6 py-2 bg-[#223466] hover:bg-[#1a2850] text-white rounded-lg font-medium disabled:bg-gray-400"
            >
              {downloading ? '다운로드 중...' : '📥 PDF 다운로드'}
            </button>
          </div>

          {/* 수료증 - 새 디자인 */}
          <div className="overflow-x-auto">
            <div 
              id="certificate-content"
              className="relative bg-white mx-auto"
              style={{ width: '800px', height: '566px', fontFamily: 'GmarketSans, sans-serif' }}
            >
              {/* 테두리 이미지 */}
              <img
                src="/images/certificate/border.png"
                alt="테두리"
                className="absolute inset-0 w-full h-full object-fill pointer-events-none"
              />

              {/* 인증번호 - 우측 상단 */}
              <div 
                className="absolute text-[#000000] text-sm font-light"
                style={{ top: '60px', right: '60px' }}
              >
                No. {graduateData.certificate_number}
              </div>

              {/* 타이틀 로고 이미지 */}
              <img
                src="/images/certificate/title.png"
                alt="평창 눈동이 패스포트"
                className="absolute h-12 object-contain"
                style={{ top: '65px', left: '50%', transform: 'translateX(-50%)' }}
              />

              {/* 수료증 제목 텍스트 */}
              <h1 
                className="absolute text-4xl text-gray-800 tracking-[0.3em]"
                style={{ top: '120px', left: '50%', transform: 'translateX(-50%)', fontWeight: 700 }}
              >
                수 료 증
              </h1>

              {/* 이름 */}
              <div 
                className="absolute"
                style={{ top: '175px', right: '95px' }}
              >
                <span className="text-gray-600 text-[20px] font-medium">이　름 : </span>
                <span className="text-[24px] font-bold text-gray-800">{graduateData.name}</span>
              </div>

              {/* 본문 */}
<div 
  className="absolute text-center"
  style={{ top: '230px', left: '50%', transform: 'translateX(-50%)' }}
>
  <p className="text-gray-700 text-[24px] font-medium" style={{ whiteSpace: 'nowrap' }}>
    위 학생은 평창 눈동이 OJT 워크숍에 참여하여
  </p>
  <p className="text-gray-700 text-[24px] font-medium" style={{ whiteSpace: 'nowrap' }}>
    교육과정을 성실히 이수하였기에 본 수료증을 수여합니다.
  </p>
  <p className="text-gray-600 mt-2 text-[17px]">
    · 참여기간 : {getSessionInfo(graduateData.session_number).period}
  </p>
</div>

              {/* 발급일자 */}
              <p 
                className="absolute text-gray-800 text-xl font-medium"
                style={{ top: '360px', left: '50%', transform: 'translateX(-50%)' }}
              >
                {getSessionInfo(graduateData.session_number).issueDate}
              </p>

             {/* 주최/주관 */}
<img
  src="/images/certificate/sponsor_host.png"
  alt="주최/주관"
  className="absolute object-contain"
  style={{ top: '410px', left: '50%', transform: 'translateX(-50%)', height: '66px' }}
/>

{/* 후원 */}
<img
  src="/images/certificate/sponsor_support.png"
  alt="후원"
  className="absolute object-contain"
  style={{ top: '480px', left: '258px', height: '30px' }}
/>

              {/* 캐릭터 */}
<img
  src="/images/certificate/character.png"
  alt="눈동이"
  className="absolute object-contain"
  style={{ bottom: '55px', right: '70px', height: '170px' }}
/>
              
            </div>
          </div>
        </>
      )}
    </div>
  );
};


export default Application;