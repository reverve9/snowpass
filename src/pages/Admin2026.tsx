import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Admin2026 = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const ADMIN_PASSWORD = 'snowpass2026!!';

  useEffect(() => {
    const isAuth = localStorage.getItem('snowpass2026_admin_authenticated');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
      setPasswordError('');
      localStorage.setItem('snowpass2026_admin_authenticated', 'true');
    } else {
      setPasswordError('패스워드가 올바르지 않습니다.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    localStorage.removeItem('snowpass2026_admin_authenticated');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">관리자 로그인</h1>
            <p className="text-gray-600">평창 눈동이 패스포트 2026 관리자</p>
          </div>
          
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">관리자 패스워드</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="패스워드를 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                required
              />
            </div>
            
            {passwordError && <p className="text-red-600 text-sm mb-4">{passwordError}</p>}
            
            <button type="submit" className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white py-2 px-4 rounded-lg font-medium transition-colors">
              로그인
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <a href="/#/application2026" className="text-[#6366f1] hover:underline text-sm">← 참가신청 페이지로 돌아가기</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#6366f1] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">🔧 관리자 대시보드</h1>
              <p className="text-white/70">평창 눈동이 패스포트 2026</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="/#/application2026" className="text-white hover:text-yellow-200 font-medium">참가신청 페이지</a>
              <a href="/#/board2026" className="text-white hover:text-yellow-200 font-medium">커뮤니티</a>
              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdminPanel2026 />
      </div>
    </div>
  );
};

const AdminPanel2026 = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState('applications');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    round1: 0, round2: 0, round3: 0, round4: 0, round5: 0, round6: 0
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  };

  const generateAuthCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('applications_2026')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
      
      // 통계 계산
      const total = data?.length || 0;
      const pending = data?.filter(app => app.status === '접수완료').length || 0;
      const approved = data?.filter(app => app.status === '승인완료').length || 0;
      const rejected = data?.filter(app => app.status === '승인거부').length || 0;
      
      // 회차별 (승인완료된 것만, assigned_round 기준)
      const round1 = data?.filter(app => app.assigned_round === '1회차').length || 0;
      const round2 = data?.filter(app => app.assigned_round === '2회차').length || 0;
      const round3 = data?.filter(app => app.assigned_round === '3회차').length || 0;
      const round4 = data?.filter(app => app.assigned_round === '4회차').length || 0;
      const round5 = data?.filter(app => app.assigned_round === '5회차').length || 0;
      const round6 = data?.filter(app => app.assigned_round === '6회차').length || 0;
      
      setStats({ total, pending, approved, rejected, round1, round2, round3, round4, round5, round6 });
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = async () => {
    setIsExporting(true);
    try {
      const { data, error } = await supabase
        .from('applications_2026')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const csvRows = [];
      csvRows.push(['ID', '참가자명', '출생연도', '성별', '학교명', '스키실력', '의류대여', '신장', '몸무게', '신발사이즈', '보호자명', '연락처', '비상연락처', '1지망', '2지망', '3지망', '배정회차', '특이사항', '신청일', '상태', '인증코드']);

      (data || []).forEach((app: any) => {
        csvRows.push([
          app.id, app.participant_name, app.birth_year, app.gender, app.school_name,
          app.ski_level, app.clothing_rental, app.height || '', app.weight || '', app.shoe_size || '',
          app.guardian_name, app.phone, app.emergency_phone || '',
          app.first_choice, app.second_choice || '', app.third_choice || '', app.assigned_round || '',
          app.special_notes || '', formatDate(app.created_at), app.status, app.auth_code || ''
        ]);
      });

      const csvContent = csvRows.map(row => row.map(field => {
        const str = String(field);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      }).join(',')).join('\n');

      const BOM = '\uFEFF';
      const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `눈동이패스포트2026_신청목록_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('CSV 파일이 다운로드되었습니다!');
    } catch (error) {
      console.error('Export error:', error);
      alert('다운로드 중 오류가 발생했습니다.');
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow-md p-8 text-center">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 대시보드 상단 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 rounded-lg p-4">
          <div className="text-3xl font-bold text-blue-800">{stats.total}</div>
          <div className="text-blue-600">총 신청자</div>
        </div>
        <div className="bg-yellow-100 rounded-lg p-4">
          <div className="text-3xl font-bold text-yellow-800">{stats.pending}</div>
          <div className="text-yellow-600">접수완료</div>
        </div>
        <div className="bg-green-100 rounded-lg p-4">
          <div className="text-3xl font-bold text-green-800">{stats.approved}</div>
          <div className="text-green-600">승인완료</div>
        </div>
        <div className="bg-red-100 rounded-lg p-4">
          <div className="text-3xl font-bold text-red-800">{stats.rejected}</div>
          <div className="text-red-600">승인거부</div>
        </div>
      </div>

      {/* 회차별 현황 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">📅 회차별 배정 현황</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { label: '1회차', count: stats.round1, date: '02.01~02.02' },
            { label: '2회차', count: stats.round2, date: '02.03~02.05' },
            { label: '3회차', count: stats.round3, date: '02.08~02.10' },
            { label: '4회차', count: stats.round4, date: '02.10~02.12' },
            { label: '5회차', count: stats.round5, date: '02.22~02.24' },
            { label: '6회차', count: stats.round6, date: '02.25~02.27' },
          ].map((round) => (
            <div key={round.label} className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#6366f1]">{round.count}명</div>
              <div className="text-sm font-medium text-gray-700">{round.label}</div>
              <div className="text-xs text-gray-500">{round.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'applications' ? 'border-[#6366f1] text-[#6366f1]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              참가신청 관리
            </button>
            <button
              onClick={() => setActiveTab('modification')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'modification' ? 'border-[#6366f1] text-[#6366f1]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              수정요청 관리
            </button>
            <button
              onClick={() => setActiveTab('inquiry')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'inquiry' ? 'border-[#6366f1] text-[#6366f1]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              문의사항 관리
            </button>
            <button
              onClick={() => setActiveTab('board')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'board' ? 'border-[#6366f1] text-[#6366f1]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              게시판 관리
            </button>
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'applications' && (
            <ApplicationsManagement2026
              applications={applications}
              fetchApplications={fetchApplications}
              handleExportExcel={handleExportExcel}
              isExporting={isExporting}
              formatDate={formatDate}
              generateAuthCode={generateAuthCode}
              stats={stats}
            />
          )}
          {activeTab === 'modification' && <ModificationManagement2026 formatDate={formatDate} />}
          {activeTab === 'inquiry' && <InquiryManagement2026 formatDate={formatDate} />}
          {activeTab === 'board' && <BoardManagement2026 formatDate={formatDate} />}
        </div>
      </div>
    </div>
  );
};

// 참가신청 관리
const ApplicationsManagement2026 = ({ applications, fetchApplications, handleExportExcel, isExporting, formatDate, generateAuthCode, stats }: any) => {
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roundFilter, setRoundFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const filteredApplications = applications.filter((app: any) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      app.participant_name?.toLowerCase().includes(searchLower) ||
      app.guardian_name?.toLowerCase().includes(searchLower) ||
      app.phone?.includes(searchTerm) ||
      app.school_name?.toLowerCase().includes(searchLower) ||
      app.auth_code?.toLowerCase().includes(searchLower);

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesRound = roundFilter === 'all' || app.first_choice === roundFilter || app.assigned_round === roundFilter;

    return matchesSearch && matchesStatus && matchesRound;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = filteredApplications.slice(startIndex, startIndex + itemsPerPage);

  // 필터 변경 시 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, roundFilter]);

  return (
    <>
      {selectedApplication && (
        <ApplicationDetailModal2026
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          fetchApplications={fetchApplications}
          formatDate={formatDate}
          generateAuthCode={generateAuthCode}
          stats={stats}
        />
      )}
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">참가신청 관리</h2>
          <div className="flex gap-4">
            <button onClick={fetchApplications} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">🔄 새로고침</button>
            <button onClick={handleExportExcel} disabled={isExporting} className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium">
              {isExporting ? '다운로드 중...' : '📊 엑셀 다운로드'}
            </button>
          </div>
        </div>

        {/* 필터 */}
        <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="이름, 연락처, 학교, 인증코드 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
            <option value="all">전체 상태</option>
            <option value="접수완료">접수완료</option>
            <option value="승인완료">승인완료</option>
            <option value="승인거부">승인거부</option>
          </select>
          <select value={roundFilter} onChange={(e) => setRoundFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
            <option value="all">전체 회차</option>
            <option value="1회차">1회차</option>
            <option value="2회차">2회차</option>
            <option value="3회차">3회차</option>
            <option value="4회차">4회차</option>
            <option value="5회차">5회차</option>
            <option value="6회차">6회차</option>
          </select>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          총 {applications.length}건 중 {filteredApplications.length}건 검색됨 
          {filteredApplications.length > 0 && ` (${startIndex + 1}-${Math.min(startIndex + itemsPerPage, filteredApplications.length)}건 표시)`}
        </div>

        {/* 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">No.</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">신청번호</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">참가자/보호자</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">성별</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">학교명</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">출생연도</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">연락처</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">신청일</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">상태</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">인증코드</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">관리</th>
              </tr>
            </thead>
            <tbody>
              {paginatedApplications.map((app: any, index: number) => (
                <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-500">{startIndex + index + 1}</td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-[#6366f1] font-medium">PSP{String(app.id).padStart(5, '0')}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{app.participant_name}</div>
                    <div className="text-sm text-gray-500">{app.guardian_name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      app.gender?.includes('남') ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                    }`}>
                      {app.gender}
                    </span>
                  </td>
                  <td className="py-3 px-4">{app.school_name}</td>
                  <td className="py-3 px-4">{app.birth_year}년</td>
                  <td className="py-3 px-4">{app.phone}</td>
                  <td className="py-3 px-4">{formatDate(app.created_at)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      app.status === '승인완료' ? 'bg-green-100 text-green-800' :
                      app.status === '승인거부' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status}
                      {app.assigned_round && ` (${app.assigned_round})`}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-mono ${app.auth_code ? 'bg-blue-100 text-blue-800' : 'text-gray-400'}`}>
                      {app.auth_code || '-'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => setSelectedApplication(app)} className="text-[#6366f1] hover:underline text-sm font-medium">
                      상세보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredApplications.length === 0 && (
            <div className="text-center py-8 text-gray-500">검색 결과가 없습니다.</div>
          )}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              이전
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                // 현재 페이지 주변 2페이지 + 처음/끝 페이지만 표시
                return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2;
              })
              .map((page, index, array) => (
                <span key={page}>
                  {index > 0 && array[index - 1] !== page - 1 && <span className="px-2">...</span>}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg ${
                      currentPage === page
                        ? 'bg-[#6366f1] text-white'
                        : 'border hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                </span>
              ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              다음
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// 신청 상세 모달 (승인 처리 포함)
const ApplicationDetailModal2026 = ({ application, onClose, fetchApplications, generateAuthCode, stats }: any) => {
  const [selectedRound, setSelectedRound] = useState(application.assigned_round || '');
  const [isUpdating, setIsUpdating] = useState(false);

  console.log('Application data:', application);
  console.log('Motivation:', application.motivation);
  console.log('Special notes:', application.special_notes);

  const roundOptions = [
    { value: '1회차', label: '1회차 (02.01~02.02)', count: stats.round1 },
    { value: '2회차', label: '2회차 (02.03~02.05)', count: stats.round2 },
    { value: '3회차', label: '3회차 (02.08~02.10)', count: stats.round3 },
    { value: '4회차', label: '4회차 (02.10~02.12)', count: stats.round4 },
    { value: '5회차', label: '5회차 (02.22~02.24)', count: stats.round5 },
    { value: '6회차', label: '6회차 (02.25~02.27)', count: stats.round6 },
  ];

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const updateData: any = { status: newStatus };
      
      if (newStatus === '승인완료') {
        if (!selectedRound) {
          alert('배정 회차를 선택해주세요.');
          setIsUpdating(false);
          return;
        }
        updateData.assigned_round = selectedRound;
        if (!application.auth_code) {
          updateData.auth_code = generateAuthCode();
        }
      } else if (newStatus === '접수완료') {
        updateData.assigned_round = null;
        updateData.auth_code = null; // 인증코드 초기화
      }

      const { error } = await supabase
        .from('applications_2026')
        .update(updateData)
        .eq('id', application.id);

      if (error) throw error;
      
      alert(`상태가 "${newStatus}"로 변경되었습니다.`);
      fetchApplications();
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('상태 변경 중 오류가 발생했습니다.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`정말 "${application.participant_name}" 님의 신청을 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`)) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('applications_2026')
        .delete()
        .eq('id', application.id);

      if (error) throw error;
      
      alert('신청이 삭제되었습니다.');
      fetchApplications();
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">📋 신청 상세 정보</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
          </div>

          {/* 기본 정보 */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">참가자 정보</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-500">신청번호:</span> <strong className="text-[#6366f1]">PSP{String(application.id).padStart(5, '0')}</strong></div>
              <div><span className="text-gray-500">신청일:</span> {new Date(application.created_at).toLocaleDateString()}</div>
              <div><span className="text-gray-500">신청자:</span> <strong>{application.participant_name}</strong> ({application.birth_year}년생, {application.gender})</div>
              <div><span className="text-gray-500">학교:</span> {application.school_name}</div>
              <div><span className="text-gray-500">스키실력:</span> {application.ski_level}</div>
              <div><span className="text-gray-500">의류대여:</span> {application.clothing_rental}</div>
              {application.clothing_rental === '필요' && (
                <>
                  <div><span className="text-gray-500">신장/몸무게:</span> {application.height}cm / {application.weight}kg</div>
                  <div><span className="text-gray-500">신발사이즈:</span> {application.shoe_size}mm</div>
                </>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">보호자 정보</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-500">보호자:</span> {application.guardian_name}</div>
              <div><span className="text-gray-500">연락처:</span> {application.phone}</div>
              {application.emergency_phone && <div><span className="text-gray-500">비상연락처:</span> {application.emergency_phone}</div>}
            </div>
          </div>

          {/* 지망 정보 - 1행 3열 */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-[#6366f1] mb-3">지망 순위</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="bg-[#6366f1] text-white px-2 py-1 rounded text-xs">1지망</span>
                <span>{application.first_choice}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-gray-400 text-white px-2 py-1 rounded text-xs">2지망</span>
                <span>{application.second_choice || '-'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs">3지망</span>
                <span>{application.third_choice || '-'}</span>
              </div>
            </div>
          </div>

          {application.special_notes && (
            <div className="bg-yellow-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">특이사항</h3>
              <p className="text-sm text-gray-700">{application.special_notes}</p>
            </div>
          )}

          {/* 각오 - 항상 표시 */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">각오 및 하고 싶은 말</h3>
            <p className="text-sm text-gray-700">{application.motivation || '-'}</p>
          </div>

          {/* 승인 처리 */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">승인 처리</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">배정 회차 선택</label>
              <select
                value={selectedRound}
                onChange={(e) => setSelectedRound(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                disabled={application.status === '승인완료'}
              >
                <option value="">선택하세요</option>
                {roundOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} - 현재 {opt.count}명 배정
                    {application.first_choice === opt.value && ' ✓ 1지망'}
                    {application.second_choice === opt.value && ' ✓ 2지망'}
                    {application.third_choice === opt.value && ' ✓ 3지망'}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              {application.status === '접수완료' && (
                <>
                  <button
                    onClick={() => handleStatusUpdate('승인거부')}
                    disabled={isUpdating}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-medium"
                  >
                    승인거부
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('승인완료')}
                    disabled={isUpdating || !selectedRound}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-medium"
                  >
                    ✓ 승인완료
                  </button>
                </>
              )}
              {application.status === '승인완료' && (
                <button
                  onClick={() => handleStatusUpdate('접수완료')}
                  disabled={isUpdating}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-medium"
                >
                  접수완료로 변경
                </button>
              )}
              {application.status === '승인거부' && (
                <button
                  onClick={() => handleStatusUpdate('접수완료')}
                  disabled={isUpdating}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-medium"
                >
                  접수완료로 변경
                </button>
              )}
            </div>

            {application.auth_code && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-blue-800">인증코드: <strong className="font-mono">{application.auth_code}</strong></span>
              </div>
            )}

            {/* 삭제 버튼 */}
            <div className="mt-6 pt-4 border-t">
              <button
                onClick={handleDelete}
                disabled={isUpdating}
                className="w-full bg-gray-200 hover:bg-red-100 hover:text-red-700 disabled:bg-gray-100 text-gray-600 py-2 rounded-lg font-medium text-sm"
              >
                🗑️ 신청 삭제 (테스트/오류 데이터)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 수정요청 관리
const ModificationManagement2026 = ({ formatDate }: any) => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('modification_requests_2026')
      .select('*')
      .order('created_at', { ascending: false });
    setRequests(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('이 수정요청을 삭제하시겠습니까?')) return;
    const { error } = await supabase.from('modification_requests_2026').delete().eq('id', id);
    if (!error) {
      fetchRequests();
      alert('삭제되었습니다.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'completed': return '처리완료';
      case 'rejected': return '반려';
      default: return '처리대기';
    }
  };

  const filteredRequests = statusFilter === 'all' 
    ? requests 
    : requests.filter(r => r.status === statusFilter);

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  if (loading) return <div className="text-center py-8">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900">수정요청 관리</h2>
          {pendingCount > 0 && (
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              미처리 {pendingCount}건
            </span>
          )}
        </div>
        <select 
          value={statusFilter} 
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="all">전체</option>
          <option value="pending">처리대기</option>
          <option value="completed">처리완료</option>
          <option value="rejected">반려</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">상태</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">신청자</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">연락처</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">변경 요청 항목</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">요청일</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">관리</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">수정요청이 없습니다.</td></tr>
            ) : filteredRequests.map(req => {
              const changes = [];
              if (req.requested_participant_name) changes.push('참가자명');
              if (req.requested_birth_year) changes.push('출생연도');
              if (req.requested_gender) changes.push('성별');
              if (req.requested_guardian_name) changes.push('보호자명');
              if (req.requested_guardian_phone) changes.push('보호자연락처');
              if (req.requested_first_choice || req.requested_second_choice || req.requested_third_choice) changes.push('회차변경');
              
              return (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(req.status)}`}>
                      {getStatusText(req.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{req.applicant_name}</td>
                  <td className="px-4 py-3 text-sm">{req.phone}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {changes.map(c => (
                        <span key={c} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(req.created_at)}</td>
                  <td className="px-4 py-3 text-sm">
                    <button onClick={() => setSelectedRequest(req)} className="text-[#6366f1] hover:underline mr-2">처리</button>
                    <button onClick={() => handleDelete(req.id)} className="text-red-600 hover:underline">삭제</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedRequest && (
        <ModificationProcessModal 
          request={selectedRequest} 
          onClose={() => setSelectedRequest(null)} 
          onSave={() => { setSelectedRequest(null); fetchRequests(); }}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

// 수정요청 처리 모달
const ModificationProcessModal = ({ request, onClose, onSave, formatDate }: any) => {
  const [status, setStatus] = useState(request.status);
  const [adminNote, setAdminNote] = useState(request.admin_note || '');
  const [saving, setSaving] = useState(false);
  const [applicant, setApplicant] = useState<any>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [internalNote, setInternalNote] = useState(request.internal_note || '');

  const scheduleOptions = [
    { value: '1회차', label: '1회차 02.01(일)~02.03(화)' },
    { value: '2회차', label: '2회차 02.04(수)~02.06(금)' },
    { value: '3회차', label: '3회차 02.08(일)~02.10(화)' },
    { value: '4회차', label: '4회차 02.11(수)~02.13(금)' },
    { value: '5회차', label: '5회차 02.22(일)~02.24(화)' },
    { value: '6회차', label: '6회차 02.25(수)~02.27(금)' },
  ];

  const birthYearOptions = ['2017', '2018', '2019'];
  const genderOptions = ['남', '여'];

  // 신청자 검색
  const searchApplicant = async () => {
    setSearchLoading(true);
    // current_ 필드 또는 applicant_ 필드로 검색
    const searchName = request.current_participant_name || request.applicant_name;
    const searchPhone = request.current_guardian_phone || request.phone;
    
    const { data } = await supabase
      .from('applications_2026')
      .select('*')
      .eq('participant_name', searchName)
      .eq('phone', searchPhone)
      .single();
    
    if (data) {
      setApplicant(data);
      setEditData({
        participant_name: data.participant_name || '',
        birth_year: data.birth_year || '',
        gender: data.gender || '',
        guardian_name: data.guardian_name || '',
        phone: data.phone || '',
        first_choice: data.first_choice || '',
        second_choice: data.second_choice || '',
        third_choice: data.third_choice || ''
      });
    } else {
      alert('해당 신청자를 찾을 수 없습니다.\n이름: ' + searchName + '\n연락처: ' + searchPhone);
    }
    setSearchLoading(false);
  };

  // 요청 내용 자동 반영
  const applyRequestedChanges = () => {
    if (!editData) return;
    setEditData({
      ...editData,
      participant_name: request.requested_participant_name || editData.participant_name,
      birth_year: request.requested_birth_year || editData.birth_year,
      gender: request.requested_gender || editData.gender,
      guardian_name: request.requested_guardian_name || editData.guardian_name,
      phone: request.requested_guardian_phone || editData.phone,
      first_choice: request.requested_first_choice || editData.first_choice,
      second_choice: request.requested_second_choice || editData.second_choice,
      third_choice: request.requested_third_choice || editData.third_choice
    });
  };

  // DB 수정 및 요청 상태 업데이트
  const handleSave = async () => {
    // 처리완료인데 신청자 검색 안 했으면 경고
    if (status === 'completed' && !applicant) {
      alert('처리완료 전에 신청자 검색을 먼저 해주세요.');
      return;
    }
    
    setSaving(true);
    try {
      let finalAdminNote = adminNote;
      
      // 신청서 DB 수정 (처리완료일 때만!)
      if (status === 'completed' && applicant && editData) {
        // 실제 변경 내용 계산 (editData vs applicant 원본)
        const changeInfo = [];
        if (editData.participant_name !== applicant.participant_name) changeInfo.push(`참가자: ${applicant.participant_name} → ${editData.participant_name}`);
        if (editData.birth_year !== applicant.birth_year) changeInfo.push(`출생연도: ${applicant.birth_year || '-'} → ${editData.birth_year}년생`);
        if (editData.gender !== applicant.gender) changeInfo.push(`성별: ${applicant.gender || '-'} → ${editData.gender}`);
        if (editData.guardian_name !== applicant.guardian_name) changeInfo.push(`보호자: ${applicant.guardian_name || '-'} → ${editData.guardian_name}`);
        if (editData.phone !== applicant.phone) changeInfo.push(`보호자 연락처: ${applicant.phone || '-'} → ${editData.phone}`);
        if (editData.first_choice !== applicant.first_choice) changeInfo.push(`1지망: ${applicant.first_choice || '-'} → ${editData.first_choice}`);
        if (editData.second_choice !== (applicant.second_choice || '')) changeInfo.push(`2지망: ${applicant.second_choice || '-'} → ${editData.second_choice || '-'}`);
        if (editData.third_choice !== (applicant.third_choice || '')) changeInfo.push(`3지망: ${applicant.third_choice || '-'} → ${editData.third_choice || '-'}`);
        
        // 자동응답 메시지 생성
        finalAdminNote = `요청하신 신청서 수정이 처리 완료 되었습니다.\n\n[변경 내용]\n${changeInfo.length > 0 ? changeInfo.join('\n') : '변경 사항 없음'}`;
        
        const { error: updateError } = await supabase
          .from('applications_2026')
          .update({
            participant_name: editData.participant_name,
            birth_year: editData.birth_year,
            gender: editData.gender,
            guardian_name: editData.guardian_name,
            phone: editData.phone,
            first_choice: editData.first_choice,
            second_choice: editData.second_choice || null,
            third_choice: editData.third_choice || null
          })
          .eq('id', applicant.id);
        
        if (updateError) throw updateError;
      }

      // 수정요청 상태 업데이트
      const { error } = await supabase
        .from('modification_requests_2026')
        .update({ status, admin_note: finalAdminNote, internal_note: internalNote })
        .eq('id', request.id);
      
      if (error) throw error;
      
      alert('처리되었습니다.');
      onSave();
    } catch (err: any) {
      alert('처리 중 오류: ' + err.message);
    }
    setSaving(false);
  };

  // 변경 요청 있는 필드 표시
  const hasChange = (field: string) => {
    const key = `requested_${field}` as keyof typeof request;
    return request[key] && request[key] !== '';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">수정요청 처리</h3>
            <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
          </div>

          {/* 요청 정보 */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm">
                <strong>신청자:</strong> {request.applicant_name} | <strong>연락처:</strong> {request.phone} | <strong>요청일:</strong> {formatDate(request.created_at)}
              </div>
            </div>
            
            {/* 현재 → 변경 요청 비교 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-2">📋 현재 정보</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between bg-white p-2 rounded"><span className="text-gray-500">참가자</span><span>{request.current_participant_name || '-'}</span></div>
                  <div className="flex justify-between bg-white p-2 rounded"><span className="text-gray-500">출생연도</span><span>{request.current_birth_year ? `${request.current_birth_year}년생` : '-'}</span></div>
                  <div className="flex justify-between bg-white p-2 rounded"><span className="text-gray-500">성별</span><span>{request.current_gender || '-'}</span></div>
                  <div className="flex justify-between bg-white p-2 rounded"><span className="text-gray-500">보호자</span><span>{request.current_guardian_name || '-'}</span></div>
                  <div className="flex justify-between bg-white p-2 rounded"><span className="text-gray-500">보호자 연락처</span><span>{request.current_guardian_phone || '-'}</span></div>
                  <div className="flex justify-between bg-white p-2 rounded"><span className="text-gray-500">1지망</span><span>{request.current_first_choice || '-'}</span></div>
                  <div className="flex justify-between bg-white p-2 rounded"><span className="text-gray-500">2지망</span><span>{request.current_second_choice || '-'}</span></div>
                  <div className="flex justify-between bg-white p-2 rounded"><span className="text-gray-500">3지망</span><span>{request.current_third_choice || '-'}</span></div>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-blue-500 mb-2">✏️ 변경 요청</div>
                <div className="space-y-1 text-sm">
                  <div className={`flex justify-between p-2 rounded ${hasChange('participant_name') ? 'bg-blue-50' : 'bg-white'}`}><span className="text-gray-500">참가자</span><span className={hasChange('participant_name') ? 'text-blue-700 font-medium' : ''}>{request.requested_participant_name || '유지'}</span></div>
                  <div className={`flex justify-between p-2 rounded ${hasChange('birth_year') ? 'bg-blue-50' : 'bg-white'}`}><span className="text-gray-500">출생연도</span><span className={hasChange('birth_year') ? 'text-blue-700 font-medium' : ''}>{request.requested_birth_year ? `${request.requested_birth_year}년생` : '유지'}</span></div>
                  <div className={`flex justify-between p-2 rounded ${hasChange('gender') ? 'bg-blue-50' : 'bg-white'}`}><span className="text-gray-500">성별</span><span className={hasChange('gender') ? 'text-blue-700 font-medium' : ''}>{request.requested_gender || '유지'}</span></div>
                  <div className={`flex justify-between p-2 rounded ${hasChange('guardian_name') ? 'bg-blue-50' : 'bg-white'}`}><span className="text-gray-500">보호자</span><span className={hasChange('guardian_name') ? 'text-blue-700 font-medium' : ''}>{request.requested_guardian_name || '유지'}</span></div>
                  <div className={`flex justify-between p-2 rounded ${hasChange('guardian_phone') ? 'bg-blue-50' : 'bg-white'}`}><span className="text-gray-500">보호자 연락처</span><span className={hasChange('guardian_phone') ? 'text-blue-700 font-medium' : ''}>{request.requested_guardian_phone || '유지'}</span></div>
                  <div className={`flex justify-between p-2 rounded ${hasChange('first_choice') ? 'bg-blue-50' : 'bg-white'}`}><span className="text-gray-500">1지망</span><span className={hasChange('first_choice') ? 'text-blue-700 font-medium' : ''}>{request.requested_first_choice || '유지'}</span></div>
                  <div className={`flex justify-between p-2 rounded ${hasChange('second_choice') ? 'bg-blue-50' : 'bg-white'}`}><span className="text-gray-500">2지망</span><span className={hasChange('second_choice') ? 'text-blue-700 font-medium' : ''}>{request.requested_second_choice || '유지'}</span></div>
                  <div className={`flex justify-between p-2 rounded ${hasChange('third_choice') ? 'bg-blue-50' : 'bg-white'}`}><span className="text-gray-500">3지망</span><span className={hasChange('third_choice') ? 'text-blue-700 font-medium' : ''}>{request.requested_third_choice || '유지'}</span></div>
                </div>
              </div>
            </div>
            
            {/* 신청자 특이사항 메모 */}
            {request.user_note && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-xs font-semibold text-yellow-700 mb-1">📝 신청자 특이사항</div>
                <p className="text-sm text-yellow-800 whitespace-pre-wrap">{request.user_note}</p>
              </div>
            )}
          </div>

          {/* 신청자 검색 및 DB 수정 */}
          <div className="border rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">신청서 DB 수정</h4>
              <div className="flex gap-2">
                {applicant && editData && (
                  <button 
                    onClick={applyRequestedChanges}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
                  >
                    요청 내용 자동 반영
                  </button>
                )}
                <button 
                  onClick={searchApplicant} 
                  disabled={searchLoading}
                  className="px-4 py-2 bg-[#6366f1] text-white rounded-lg text-sm"
                >
                  {searchLoading ? '검색 중...' : '신청자 검색'}
                </button>
              </div>
            </div>
            
            {applicant && editData && (
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-green-800 text-sm mb-3">✅ 신청자 찾음: {applicant.participant_name} (신청번호: PSP{String(applicant.id).padStart(5, '0')})</p>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">참가자 이름</label>
                    <input 
                      type="text"
                      value={editData.participant_name} 
                      onChange={e => setEditData({...editData, participant_name: e.target.value})}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">출생연도</label>
                    <select 
                      value={editData.birth_year} 
                      onChange={e => setEditData({...editData, birth_year: e.target.value})}
                      className="w-full px-2 py-1 border rounded text-sm"
                    >
                      <option value="">선택</option>
                      {birthYearOptions.map(y => <option key={y} value={y}>{y}년생</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">성별</label>
                    <select 
                      value={editData.gender} 
                      onChange={e => setEditData({...editData, gender: e.target.value})}
                      className="w-full px-2 py-1 border rounded text-sm"
                    >
                      <option value="">선택</option>
                      {genderOptions.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">보호자 이름</label>
                    <input 
                      type="text"
                      value={editData.guardian_name} 
                      onChange={e => setEditData({...editData, guardian_name: e.target.value})}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">보호자 연락처</label>
                    <input 
                      type="text"
                      value={editData.phone} 
                      onChange={e => setEditData({...editData, phone: e.target.value})}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">1지망</label>
                    <select 
                      value={editData.first_choice} 
                      onChange={e => setEditData({...editData, first_choice: e.target.value})}
                      className="w-full px-2 py-1 border rounded text-sm"
                    >
                      {scheduleOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.value}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">2지망</label>
                    <select 
                      value={editData.second_choice} 
                      onChange={e => setEditData({...editData, second_choice: e.target.value})}
                      className="w-full px-2 py-1 border rounded text-sm"
                    >
                      <option value="">선택안함</option>
                      {scheduleOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.value}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">3지망</label>
                    <select 
                      value={editData.third_choice} 
                      onChange={e => setEditData({...editData, third_choice: e.target.value})}
                      className="w-full px-2 py-1 border rounded text-sm"
                    >
                      <option value="">선택안함</option>
                      {scheduleOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.value}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 처리 상태 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">처리 상태</label>
              <select 
                value={status} 
                onChange={e => {
                  const newStatus = e.target.value;
                  setStatus(newStatus);
                  
                  // 자동 메시지 생성 (상태 변경할 때마다)
                  if (newStatus === 'completed') {
                    const changeInfo = [];
                    if (request.requested_participant_name) changeInfo.push(`참가자: ${request.current_participant_name || '-'} → ${request.requested_participant_name}`);
                    if (request.requested_birth_year) changeInfo.push(`출생연도: ${request.current_birth_year || '-'} → ${request.requested_birth_year}년생`);
                    if (request.requested_gender) changeInfo.push(`성별: ${request.current_gender || '-'} → ${request.requested_gender}`);
                    if (request.requested_guardian_name) changeInfo.push(`보호자: ${request.current_guardian_name || '-'} → ${request.requested_guardian_name}`);
                    if (request.requested_guardian_phone) changeInfo.push(`보호자 연락처: ${request.current_guardian_phone || '-'} → ${request.requested_guardian_phone}`);
                    if (request.requested_first_choice) changeInfo.push(`1지망: ${request.current_first_choice || '-'} → ${request.requested_first_choice}`);
                    if (request.requested_second_choice) changeInfo.push(`2지망: ${request.current_second_choice || '-'} → ${request.requested_second_choice}`);
                    if (request.requested_third_choice) changeInfo.push(`3지망: ${request.current_third_choice || '-'} → ${request.requested_third_choice}`);
                    
                    setAdminNote(`요청하신 신청서 수정이 처리 완료 되었습니다.\n\n[변경 내용]\n${changeInfo.length > 0 ? changeInfo.join('\n') : '요청하신 내용대로 처리되었습니다.'}`);
                  } else if (newStatus === 'rejected') {
                    setAdminNote(`요청하신 신청서 수정이 반려되었습니다.\n자세한 반려사유는 운영사무국으로 문의 바랍니다.\n\n운영사무국 주식회사 에이치포스 (TEL. 031-796-7945)\n문의 시간 : 평일 10시 ~ 18시 (주말, 공휴일 제외)\n* 12~13시 점심시간`);
                  } else if (newStatus === 'pending') {
                    setAdminNote('');
                  }
                }} 
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="pending">처리대기</option>
                <option value="completed">처리완료</option>
                <option value="rejected">반려</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">관리자 답변 (자동생성, 수정 가능) - 사용자에게 표시됨</label>
              <textarea 
                value={adminNote} 
                onChange={e => setAdminNote(e.target.value)} 
                rows={6} 
                placeholder="처리 상태를 선택하면 자동으로 메시지가 생성됩니다..."
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">🔒 관리자 내부 메모 (사용자에게 표시 안됨)</label>
              <textarea 
                value={internalNote} 
                onChange={e => setInternalNote(e.target.value)} 
                rows={3} 
                placeholder="클레임 내용, 민감 정보 등 내부 메모..."
                className="w-full px-3 py-2 border border-orange-300 rounded-lg bg-orange-50"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={onClose} className="flex-1 py-3 border rounded-lg font-medium">취소</button>
            <button onClick={handleSave} disabled={saving} className="flex-1 py-3 bg-[#6366f1] text-white rounded-lg font-medium">
              {saving ? '처리 중...' : '저장'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 문의사항 관리
const InquiryManagement2026 = ({ formatDate }: any) => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('inquiry_posts_2026')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const { error } = await supabase.from('inquiry_posts_2026').delete().eq('id', id);
      if (error) throw error;
      fetchInquiries();
    } catch (error) {
      console.error('Error:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <div className="text-center py-8">로딩 중...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">문의사항 관리</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4">ID</th>
              <th className="text-left py-3 px-4">제목</th>
              <th className="text-left py-3 px-4">작성자</th>
              <th className="text-left py-3 px-4">작성일</th>
              <th className="text-left py-3 px-4">상태</th>
              <th className="text-left py-3 px-4">관리</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq: any) => (
              <tr key={inq.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">{inq.id}</td>
                <td className="py-3 px-4">{inq.title}</td>
                <td className="py-3 px-4">{inq.author}</td>
                <td className="py-3 px-4">{formatDate(inq.created_at)}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs ${inq.status === 'answered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {inq.status === 'answered' ? '답변완료' : '답변대기'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button onClick={() => setSelectedInquiry(inq)} className="text-[#6366f1] hover:underline text-sm mr-3">답변</button>
                  <button onClick={() => handleDelete(inq.id)} className="text-red-600 hover:underline text-sm">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inquiries.length === 0 && <div className="text-center py-8 text-gray-500">문의사항이 없습니다.</div>}
      </div>

      {selectedInquiry && (
        <InquiryReplyModal2026 inquiry={selectedInquiry} onClose={() => setSelectedInquiry(null)} onSave={fetchInquiries} formatDate={formatDate} />
      )}
    </div>
  );
};

// 문의 답변 모달
const InquiryReplyModal2026 = ({ inquiry, onClose, onSave, formatDate }: any) => {
  const [replyContent, setReplyContent] = useState('');
  const [replies, setReplies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReplies();
  }, []);

  const fetchReplies = async () => {
    const { data } = await supabase.from('inquiry_replies_2026').select('*').eq('inquiry_id', inquiry.id).order('created_at', { ascending: true });
    setReplies(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error: insertError } = await supabase.from('inquiry_replies_2026').insert([{ inquiry_id: inquiry.id, content: replyContent, author: '관리자' }]);
      if (insertError) {
        console.error('Insert error:', insertError);
        throw insertError;
      }
      const { error: updateError } = await supabase.from('inquiry_posts_2026').update({ status: 'answered' }).eq('id', inquiry.id);
      if (updateError) {
        console.error('Update error:', updateError);
        throw updateError;
      }
      alert('답변이 등록되었습니다.');
      setReplyContent('');
      fetchReplies();
      onSave();
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">문의 상세 / 답변</h3>
            <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="text-sm text-gray-500 mb-2">{inquiry.author} | {formatDate(inquiry.created_at)}</div>
            <h4 className="font-semibold mb-2">{inquiry.title}</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{inquiry.content}</p>
          </div>

          {replies.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">답변 내역</h4>
              {replies.map((reply: any) => (
                <div key={reply.id} className="bg-purple-50 rounded-lg p-3 mb-2">
                  <div className="text-xs text-gray-500 mb-1">{reply.author} | {formatDate(reply.created_at)}</div>
                  <p className="text-sm">{reply.content}</p>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={4}
              placeholder="답변을 작성하세요..."
              className="w-full px-3 py-2 border rounded-lg mb-3"
              required
            />
            <button type="submit" disabled={loading} className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white py-2 rounded-lg">
              {loading ? '등록 중...' : '답변 등록'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// 게시판 관리
const BoardManagement2026 = ({ formatDate }: any) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase.from('board_posts_2026').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const { error } = await supabase.from('board_posts_2026').delete().eq('id', id);
      if (error) throw error;
      fetchPosts();
    } catch (error) {
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const filteredPosts = categoryFilter === 'all' ? posts : posts.filter(p => p.category === categoryFilter);

  const getCategoryName = (cat: string) => {
    const names: any = { notice: '공지사항', press: '보도자료', faq: 'FAQ', gallery: '갤러리', review: '후기' };
    return names[cat] || cat;
  };

  if (loading) return <div className="text-center py-8">로딩 중...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">게시판 관리</h2>
        <button onClick={() => { setEditingPost(null); setShowWriteModal(true); }} className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded-lg">
          ✏️ 새 글 작성
        </button>
      </div>

      <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-3 py-2 border rounded-lg">
        <option value="all">전체 카테고리</option>
        <option value="notice">공지사항</option>
        <option value="press">보도자료</option>
        <option value="faq">FAQ</option>
        <option value="gallery">갤러리</option>
        <option value="review">후기</option>
      </select>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4">ID</th>
              <th className="text-left py-3 px-4">카테고리</th>
              <th className="text-left py-3 px-4">제목</th>
              <th className="text-left py-3 px-4">작성자</th>
              <th className="text-left py-3 px-4">작성일</th>
              <th className="text-left py-3 px-4">조회</th>
              <th className="text-left py-3 px-4">관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post: any) => (
              <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">{post.id}</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-gray-100 rounded text-xs">{getCategoryName(post.category)}</span></td>
                <td className="py-3 px-4">{post.title}</td>
                <td className="py-3 px-4">{post.author}</td>
                <td className="py-3 px-4">{formatDate(post.created_at)}</td>
                <td className="py-3 px-4">{post.views}</td>
                <td className="py-3 px-4">
                  <button onClick={() => { setEditingPost(post); setShowWriteModal(true); }} className="text-[#6366f1] hover:underline text-sm mr-3">수정</button>
                  <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:underline text-sm">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPosts.length === 0 && <div className="text-center py-8 text-gray-500">게시글이 없습니다.</div>}
      </div>

      {showWriteModal && (
        <PostWriteModal2026 post={editingPost} onClose={() => setShowWriteModal(false)} onSave={fetchPosts} />
      )}
    </div>
  );
};

// 게시글 작성/수정 모달 - 카테고리별 다른 폼
const PostWriteModal2026 = ({ post, onClose, onSave }: any) => {
  const [category, setCategory] = useState(post?.category || 'notice');
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    author: post?.author || '관리자',
    important: post?.important || false,
    source_url: post?.source_url || '',
    image_url: post?.image_url || '',
    images: post?.images || '',
    file_url: post?.file_url || '',
    file_name: post?.file_name || '',
    rating: post?.rating || 5,
    program_type: post?.program_type || ''
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // 파일 input 리셋용

  const roundOptions = ['1회차 (02.01~02.02)','2회차 (02.03~02.05)','3회차 (02.08~02.10)','4회차 (02.10~02.12)','5회차 (02.22~02.24)','6회차 (02.25~02.27)'];

  // 파일 삭제
  const clearFile = () => {
    setFormData(p => ({ ...p, file_url: '', file_name: '' }));
    setFileInputKey(Date.now()); // input 리셋
  };

  // 이미지 삭제
  const clearImage = () => {
    setFormData(p => ({ ...p, image_url: '' }));
    setFileInputKey(Date.now());
  };

  // 갤러리 이미지 삭제
  const clearImages = () => {
    setFormData(p => ({ ...p, images: '' }));
    setFileInputKey(Date.now());
  };

  // 파일 업로드 (공지사항 첨부파일)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage.from('board-files-2026').upload(fileName, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from('board-files-2026').getPublicUrl(fileName);
      setFormData(p => ({ ...p, file_url: urlData.publicUrl, file_name: file.name }));
      alert('파일이 업로드되었습니다.');
    } catch (error) {
      console.error('Upload error:', error);
      alert('파일 업로드에 실패했습니다. Storage 버킷(board-files-2026)을 확인해주세요.');
    } finally {
      setUploading(false);
    }
  };

  // 이미지 업로드 (보도자료, 갤러리)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isMultiple = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      if (isMultiple) {
        // 갤러리 - 다중 이미지
        const uploadedImages: { url: string }[] = [];
        for (const file of Array.from(files)) {
          const fileExt = file.name.split('.').pop();
          const fileName = `gallery_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
          const { error } = await supabase.storage.from('board-files-2026').upload(fileName, file);
          if (error) throw error;
          const { data: urlData } = supabase.storage.from('board-files-2026').getPublicUrl(fileName);
          uploadedImages.push({ url: urlData.publicUrl });
        }
        setFormData(p => ({ ...p, images: JSON.stringify(uploadedImages) }));
        alert(`${uploadedImages.length}개 이미지가 업로드되었습니다.`);
      } else {
        // 보도자료 - 단일 이미지
        const file = files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `press_${Date.now()}.${fileExt}`;
        const { error } = await supabase.storage.from('board-files-2026').upload(fileName, file);
        if (error) throw error;
        const { data: urlData } = supabase.storage.from('board-files-2026').getPublicUrl(fileName);
        setFormData(p => ({ ...p, image_url: urlData.publicUrl }));
        alert('이미지가 업로드되었습니다.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('이미지 업로드에 실패했습니다. Storage 버킷(board-files-2026)을 확인해주세요.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 기본 필드만 사용 (DB에 확실히 있는 컬럼)
      const saveData: any = { 
        category, 
        title: formData.title,
        content: formData.content,
        author: category === 'review' ? formData.author : '관리자',
        views: post?.views || 0 
      };
      
      // 카테고리별 추가 데이터
      if (category === 'notice') {
        saveData.important = formData.important;
        // file_url, file_name 컬럼이 있을 때만 저장 (없으면 무시됨)
        if (formData.file_url) {
          saveData.file_url = formData.file_url;
          saveData.file_name = formData.file_name;
        }
      } else if (category === 'press') {
        saveData.image_url = formData.image_url || null;
        saveData.source_url = formData.source_url || null;
      } else if (category === 'gallery') {
        saveData.images = formData.images || null;
        // 첫번째 이미지를 썸네일로
        if (formData.images) {
          try {
            const imgs = JSON.parse(formData.images);
            if (imgs.length > 0) saveData.image_url = imgs[0].url;
          } catch {}
        }
      } else if (category === 'review') {
        saveData.rating = formData.rating;
        saveData.program_type = formData.program_type || null;
      }

      console.log('Saving data:', saveData); // 디버깅용

      if (post) {
        const { error } = await supabase.from('board_posts_2026').update(saveData).eq('id', post.id);
        if (error) {
          console.error('Update error:', error);
          throw error;
        }
      } else {
        const { error } = await supabase.from('board_posts_2026').insert([saveData]);
        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
      }
      alert(post ? '수정되었습니다.' : '작성되었습니다.');
      onSave();
      onClose();
    } catch (error: any) {
      console.error('Save error:', error);
      alert(`저장 중 오류가 발생했습니다.\n${error?.message || ''}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">{post ? '게시글 수정' : '새 글 작성'}</h3>
            <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 카테고리 선택 */}
            <div>
              <label className="block text-sm font-medium mb-1">카테고리 *</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="w-full px-3 py-2 border rounded-lg"
                disabled={!!post}
              >
                <option value="notice">공지사항</option>
                <option value="press">보도자료</option>
                <option value="faq">FAQ</option>
                <option value="gallery">갤러리</option>
                <option value="review">후기</option>
              </select>
            </div>

            {/* 공지사항 폼 */}
            {category === 'notice' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">제목 *</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">내용 *</label>
                  <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={6} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="important" checked={formData.important} onChange={(e) => setFormData({ ...formData, important: e.target.checked })} />
                  <label htmlFor="important" className="text-sm">🔴 중요 공지로 표시</label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">첨부파일</label>
                  <input key={fileInputKey} type="file" onChange={handleFileUpload} className="w-full px-3 py-2 border rounded-lg" disabled={uploading} />
                  {formData.file_url && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-sm flex items-center justify-between">
                      <span>📎 {formData.file_name}</span>
                      <button type="button" onClick={clearFile} className="text-red-600 hover:text-red-800">✕ 삭제</button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* 보도자료 폼 */}
            {category === 'press' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">이미지 첨부 *</label>
                  <input key={fileInputKey} type="file" accept="image/*" onChange={(e) => handleImageUpload(e, false)} className="w-full px-3 py-2 border rounded-lg" disabled={uploading} />
                  {formData.image_url && (
                    <div className="mt-2 flex items-center gap-2">
                      <img src={formData.image_url} alt="썸네일" className="w-32 h-20 object-cover rounded" />
                      <button type="button" onClick={clearImage} className="text-red-600 hover:text-red-800 text-sm">✕ 삭제</button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">제목 *</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">내용 *</label>
                  <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={6} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">원문 링크</label>
                  <input type="url" value={formData.source_url} onChange={(e) => setFormData({ ...formData, source_url: e.target.value })} placeholder="https://..." className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </>
            )}

            {/* FAQ 폼 */}
            {category === 'faq' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">질문 (Q) *</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="자주 묻는 질문을 입력하세요" className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">답변 (A) *</label>
                  <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={6} placeholder="답변을 입력하세요" className="w-full px-3 py-2 border rounded-lg" required />
                </div>
              </>
            )}

            {/* 갤러리 폼 */}
            {category === 'gallery' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">제목 *</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">설명</label>
                  <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">이미지 첨부 (다중 선택 가능) *</label>
                  <input key={fileInputKey} type="file" accept="image/*" multiple onChange={(e) => handleImageUpload(e, true)} className="w-full px-3 py-2 border rounded-lg" disabled={uploading} />
                  {formData.images && (
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {JSON.parse(formData.images).map((img: any, i: number) => (
                          <img key={i} src={img.url} alt={`이미지 ${i+1}`} className="w-16 h-16 object-cover rounded" />
                        ))}
                      </div>
                      <button type="button" onClick={clearImages} className="text-red-600 hover:text-red-800 text-sm">✕ 전체 삭제</button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* 후기 폼 (관리자 대리 작성) */}
            {category === 'review' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">작성자 *</label>
                  <input type="text" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">참여 차수 *</label>
                  <select value={formData.program_type} onChange={(e) => setFormData({ ...formData, program_type: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required>
                    <option value="">선택하세요</option>
                    {roundOptions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">제목 *</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">별점 *</label>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(s => (
                      <button key={s} type="button" onClick={() => setFormData({ ...formData, rating: s })} className="text-3xl">
                        {s <= formData.rating ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">내용 *</label>
                  <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={6} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
              </>
            )}

            {uploading && <div className="text-center text-[#6366f1]">⏳ 업로드 중...</div>}

            <div className="flex gap-2 pt-4">
              <button type="button" onClick={onClose} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg">취소</button>
              <button type="submit" disabled={loading || uploading} className="flex-1 bg-[#6366f1] hover:bg-[#4f46e5] disabled:bg-gray-400 text-white py-2 rounded-lg">
                {loading ? '저장 중...' : '저장'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin2026;
