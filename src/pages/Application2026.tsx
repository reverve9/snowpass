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
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'esamanru, sans-serif'}}>
        참가신청서 작성
      </h2>
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-2xl mb-3">🚫</div>
        <h3 className="text-lg font-bold text-red-900 mb-3">[2026 평창 눈동이 패스포트 신청 마감]</h3>
        <div className="text-red-800 space-y-2">
          <p>접수신청기간이 종료되어 접수를 마감합니다.</p>
          <p>많은 관심과 참여에 감사드립니다.</p>
          <p className="mt-4 text-sm">문의사항이 있으시면 운영사무국(031-796-7945)으로</p>
          <p className="text-sm">연락해주시기 바랍니다.</p>
          <p className="text-sm text-gray-600 mt-2">평일 10:00~17:00 / 점심시간 12:00~13:00</p>
        </div>
      </div>
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
