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
    if (tab && ['apply', 'check'].includes(tab)) {
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
                <a href="/#/main" className="text-gray-500 hover:text-blue-600 font-medium text-left py-2">
                  <div className="text-[16px] font-[700]">눈동이 패스포트 2.0 <span className="text-[13px] font-thin text-gray-400 ml-2">HOME</span></div>
                </a>
                <a href="/#/programs" className="text-gray-500 hover:text-blue-600 font-medium text-left py-2">
                  <div className="text-[16px] font-[700]">프로그램 <span className="text-[13px] font-thin text-gray-400 ml-2">PROGRAM</span></div>
                </a>
                <a href="/#/application" className="text-blue-600 font-medium text-left py-2">
                  <div className="text-[16px] font-[700]">참가신청 <span className="text-[13px] font-thin text-blue-400 ml-2">APPLICATION</span></div>
                </a>
                <a href="/#/board" className="text-gray-500 hover:text-blue-600 font-medium text-left py-2">
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
            {activeMenu === 'apply' ? <ApplicationForm /> : <ApplicationCheck />}
          </div>
        </div>

        {/* 모바일: 탭 방식 */}
        <div className="md:hidden">
          {/* 모바일 탭 메뉴 */}
          <div className="bg-gray-50 rounded-lg p-2 mb-6">
            <div className="flex">
              <button
                onClick={() => handleTabChange('apply')}
                className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                  activeMenu === 'apply' 
                    ? 'bg-[#223466] text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                신청서 작성
              </button>
              <button
                onClick={() => handleTabChange('check')}
                className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                  activeMenu === 'check' 
                    ? 'bg-[#223466]bg-[#223466] text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                신청확인
              </button>
            </div>
          </div>

          {/* 모바일 콘텐츠 (전체 너비) */}
          <div className="w-full">
            {activeMenu === 'apply' ? <ApplicationForm /> : <ApplicationCheck />}
          </div>
        </div>
      </div>
    </div>
  );
};

// 참가신청서 작성 컴포넌트
const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    program_type: '',
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
              <div className="font-medium">찾아가는 스키캠프</div>
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
              <div className="font-medium">평창눈동이 OJT 워크숍</div>
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
              <div className="font-medium">스노우스포츠 체험캠프</div>
              <div className="text-sm text-gray-600">2026/01/20 - 02/11 (2박3일)</div>
            </label>
          </div>
        </div>

        {/* 프로그램별 폼 표시 */}
        {formData.program_type === 'ski-camp' && (
          <div className="mb-8 p-6 bg-yellow-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">단체 신청</h3>
            <p className="text-gray-600">찾아가는 스키캠프는 단체 신청입니다. 단체 신청 폼은 준비 중입니다.</p>
          </div>
        )}

        {(formData.program_type === 'ojt-workshop' || formData.program_type === 'snow-camp') && (
          <>
            {/* 안내 메시지 */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                참가신청은 학부모님께서 해 주셔야 하며, 신청시 프로그램 참가에 관한 모든 사항에 동의한 것으로 간주됩니다.
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
                    <option value="">선택하세요</option>
                    <option value="남성">남성</option>
                    <option value="여성">여성</option>
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
                    <option value="">선택하세요</option>
                    <option value="초등 4학년">초등 4학년</option>
                    <option value="초등 5학년">초등 5학년</option>
                    <option value="초등 6학년">초등 6학년</option>
                    <option value="중등 1학년">중등 1학년</option>
                    <option value="중등 2학년">중등 2학년</option>
                    <option value="중등 3학년">중등 3학년</option>
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
                    <option value="">선택하세요</option>
                    <option value="서울특별시">서울특별시</option>
                    <option value="부산광역시">부산광역시</option>
                    <option value="대구광역시">대구광역시</option>
                    <option value="인천광역시">인천광역시</option>
                    <option value="광주광역시">광주광역시</option>
                    <option value="대전광역시">대전광역시</option>
                    <option value="울산광역시">울산광역시</option>
                    <option value="세종특별자치시">세종특별자치시</option>
                    <option value="경기도">경기도</option>
                    <option value="강원도">강원도</option>
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
                placeholder="특별히 알려드릴 사항이 있으시면 작성해주세요."
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
      const { data, error } = await supabase
        .from('applications_2025_09_29_16_15')
        .select('*')
        .eq('participant_name', searchData.participant_name)
        .eq('phone', searchData.phone)
        .eq('birth_date', searchData.birth_date)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setSearchMessage('일치하는 신청서를 찾을 수 없습니다. 입력 정보를 다시 확인해주세요.');
        } else {
          throw error;
        }
      } else {
        setSearchResult(data);
        setSearchMessage('');
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
      case 'ski-camp': return '찾아가는 스키캠프';
      case 'ojt-workshop': return '평창눈동이 OJT 워크숍';
      case 'snow-camp': return '스노우스포츠 체험캠프';
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
              placeholder="참가자 이름을 입력하세요"
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
              placeholder="010-1234-5678"
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