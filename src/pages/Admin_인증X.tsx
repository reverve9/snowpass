import { useState, useEffect } from "react";
import { supabase } from "../integrations/supabase/client";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const ADMIN_PASSWORD = 'snowpass2026';

  useEffect(() => {
    const isAuth = localStorage.getItem('snowpass_admin_authenticated');
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
      localStorage.setItem('snowpass_admin_authenticated', 'true');
    } else {
      setPasswordError('패스워드가 올바르지 않습니다.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    localStorage.removeItem('snowpass_admin_authenticated');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">관리자 로그인</h1>
            <p className="text-gray-600">눈동이 패스포트 관리자 페이지</p>
          </div>
          
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                관리자 패스워드
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="패스워드를 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {passwordError && (
              <p className="text-red-600 text-sm mb-4">{passwordError}</p>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              로그인
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <a 
              href="/#/application" 
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              ← 참가신청 페이지로 돌아가기
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🔧 관리자 대시보드</h1>
              <p className="text-gray-600">눈동이 패스포트 참가신청 관리</p>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="/#/application" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                참가신청 페이지
              </a>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdminPanel />
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState('applications');
  const [stats, setStats] = useState({
    total: 0,
    skiCamp: 0,
    ojtWorkshop: 0,
    snowCamp: 0,
    pending: 0,
    approved: 0
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
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
      
      // 기존 applications 테이블 조회
      const { data: regularApps, error: regularError } = await supabase
        .from('applications_2025_09_29_16_15')
        .select('*')
        .order('created_at', { ascending: false });

      if (regularError) {
        console.error('Regular apps error:', regularError);
        throw regularError;
      }

      // 스키학교 신청 테이블 조회
      const { data: skiApps, error: skiError } = await supabase
        .from('ski_school_applications_2025_10_16_03_38')
        .select('*')
        .order('created_at', { ascending: false });

      if (skiError) {
        console.error('Ski apps error:', skiError);
        // 스키학교 테이블이 없어도 계속 진행
      }

      console.log('Regular apps:', regularApps?.length || 0);
      console.log('Ski apps:', skiApps?.length || 0);

      // 스키학교 데이터에 program_type 추가하여 통합
      const skiAppsWithType = (skiApps || []).map((app, index) => ({
        ...app,
        program_type: 'ski-school',
        participant_name: app.group_name,
        guardian_name: app.guardian_name,
        phone: app.guardian_phone,
        address: app.guardian_address,
        region: app.region,
        school_name: app.group_name,
        // ID 충돌 방지를 위해 스키학교 ID에 고유 접두사 추가
        original_id: app.id,
        id: `ski_${app.id}_${Date.now()}_${index}`,
        display_id: `S${app.id}` // 화면 표시용 ID (S = 스키학교)
      }));

      // 두 데이터 합치기 후 최신순 정렬
      const allApplications = [...(regularApps || []), ...skiAppsWithType];
      
      // 전체 데이터를 created_at 기준으로 최신순 정렬
      allApplications.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      console.log('All applications:', allApplications.length);
      
      setApplications(allApplications);
      
      // 통계 계산
      const total = allApplications.length;
      const skiCamp = (skiApps || []).filter(app => app.status === '승인완료').length;
      const ojtWorkshop = (regularApps || []).filter(app => app.program_type === 'ojt-workshop' && app.status === '승인완료').length;
      const snowCamp = (regularApps || []).filter(app => app.program_type === 'snow-camp' && app.status === '승인완료').length;
      const pending = allApplications.filter(app => app.status === '접수완료' || app.status === '심사중').length;
      const approved = allApplications.filter(app => app.status === '승인완료').length;
      
      setStats({ total, skiCamp, ojtWorkshop, snowCamp, pending, approved });

    } catch (error) {
      console.error('Error fetching applications:', error);
      alert('데이터를 불러오는 중 오류가 발생했습니다: ' + (error as any)?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string | number, newStatus: string) => {
    try {
      const updateData: any = { status: newStatus };
      
      if (newStatus === '승인완료') {
        const currentApp = applications.find((app: any) => app.id === id);
        if (!currentApp?.auth_code) {
          updateData.auth_code = generateAuthCode();
        }
      }

      // 스키학교인지 일반 신청인지 확인
      const currentApp = applications.find((app: any) => app.id === id);
      
      if (currentApp?.program_type === 'ski-school') {
        // 스키학교 데이터 업데이트
        const originalId = currentApp.original_id || String(id).replace('ski_', '');
        const { error } = await supabase
          .from('ski_school_applications_2025_10_16_03_38')
          .update(updateData)
          .eq('id', originalId);
        
        if (error) throw error;
      } else {
        // 일반 신청 데이터 업데이트
        const { error } = await supabase
          .from('applications_2025_09_29_16_15')
          .update(updateData)
          .eq('id', id);
        
        if (error) throw error;
      }
      
      fetchApplications();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('상태 업데이트 중 오류가 발생했습니다: ' + (error as any)?.message);
    }
  };

  const handleExportExcel = async () => {
    setIsExporting(true);
    try {
      // 일반 신청서와 스키학교 신청서 모두 가져오기
      const { data: regularApps, error: regularError } = await supabase
        .from('applications_2025_09_29_16_15')
        .select('*')
        .order('created_at', { ascending: false });

      if (regularError) throw regularError;

      const { data: skiApps, error: skiError } = await supabase
        .from('ski_school_applications_2025_10_16_03_38')
        .select('*')
        .order('created_at', { ascending: false });

      if (skiError) console.error('Ski apps export error:', skiError);

      // 프로그램명 변환 함수
      const getProgramName = (type: string) => {
        switch (type) {
          case 'ski-camp': return '찾아가는 평창 올림픽 스키학교';
          case 'ski-school': return '찾아가는 스키학교 (단체)';
          case 'ojt-workshop': return '평창 눈동이 OJT 워크숍';
          case 'snow-camp': return '스노우 스포츠 캠프';
          default: return type || '';
        }
      };

      // CSV 데이터 생성
      const csvRows = [];
      
      // 헤더
      csvRows.push([
        'ID', '참가자성명', '생년월일', '성별', '학년', '프로그램', '차수',
        '보호자성명', '연락처', '이메일', '학교명', '지역', '주소', 
        '특이사항', '신청일', '상태', '인증코드'
      ]);

      // 일반 신청서 데이터 행
      (regularApps || []).forEach((app: any) => {
        csvRows.push([
          app.id || '',
          app.participant_name || '',
          app.birth_date || '',
          app.gender || '',
          app.grade || '',
          getProgramName(app.program_type),
          app.session_number || '',
          app.guardian_name || '',
          app.phone || '',
          app.email || '',
          app.school_name || '',
          app.region || '',
          app.address || '',
          app.special_notes || '',
          formatDate(app.created_at),
          app.status || '',
          app.auth_code || ''
        ]);
      });

      // 스키학교 데이터 행
      (skiApps || []).forEach((app: any) => {
        csvRows.push([
          app.id || '',
          app.group_name || '',
          formatDate(app.application_date) || '',
          `총 ${app.total_count}명`,
          `남:${app.male_count} 여:${app.female_count}`,
          getProgramName('ski-school'),
          '단체신청',
          app.guardian_name || '',
          app.guardian_phone || '',
          '',
          app.group_name || '',
          app.region || '',
          app.guardian_address || '',
          app.special_notes || '',
          formatDate(app.created_at),
          app.status || '',
          app.auth_code || ''
        ]);
      });

      // CSV 문자열 생성
      const csvContent = csvRows.map(row => 
        row.map(field => {
          const str = String(field);
          if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        }).join(',')
      ).join('\n');

      // UTF-8 BOM 추가
      const BOM = '\uFEFF';
      const finalContent = BOM + csvContent;

      // 다운로드
      const blob = new Blob([finalContent], { 
        type: 'text/csv;charset=utf-8' 
      });
      
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = `신청자목록_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert('CSV 파일이 다운로드되었습니다!');
    } catch (error) {
      console.error('Export error:', error);
      alert('다운로드 중 오류가 발생했습니다: ' + ((error as any)?.message || error));
    } finally {
      setIsExporting(false);
    }
  };

  const getProgramName = (type: string) => {
    switch (type) {
      case 'ski-camp': return '찾아가는 평창 올림픽 스키학교';
      case 'ski-school': return '찾아가는 스키학교 (단체)';
      case 'ojt-workshop': return '평창 눈동이 OJT 워크숍';
      case 'snow-camp': return '스노우 스포츠 캠프';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-blue-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-800">{stats.total}</div>
          <div className="text-blue-600">총 신청</div>
        </div>
        <div className="bg-green-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-800">{stats.approved}</div>
          <div className="text-green-600">승인완료</div>
        </div>
        <div className="bg-yellow-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-800">{stats.pending}</div>
          <div className="text-yellow-600">대기중</div>
        </div>
        <div className="bg-purple-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-800">{stats.skiCamp}</div>
          <div className="text-purple-600">스키학교 단체</div>
        </div>
        <div className="bg-indigo-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-indigo-800">{stats.ojtWorkshop}</div>
          <div className="text-indigo-600">OJT 워크숍</div>
        </div>
        <div className="bg-pink-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-pink-800">{stats.snowCamp}</div>
          <div className="text-pink-600">스포츠 캠프</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              참가신청 관리
            </button>
            <button
              onClick={() => setActiveTab('inquiry')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'inquiry'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              문의사항 관리
            </button>
            <button
              onClick={() => setActiveTab('board')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'board'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              게시판 관리
            </button>
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'applications' && <ApplicationsManagement 
            applications={applications}
            handleStatusUpdate={handleStatusUpdate}
            handleExportExcel={handleExportExcel}
            isExporting={isExporting}
            fetchApplications={fetchApplications}
            getProgramName={getProgramName}
            formatDate={formatDate}
          />}
          {activeTab === 'inquiry' && <InquiryManagement formatDate={formatDate} />}
          {activeTab === 'board' && <BoardManagement formatDate={formatDate} />}
        </div>
      </div>
    </div>
  );
};

const ApplicationsManagement = ({ 
  applications, 
  handleStatusUpdate, 
  handleExportExcel, 
  isExporting, 
  fetchApplications, 
  getProgramName,
  formatDate
}: any) => {
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');

  const normalizePhoneNumber = (phone: string) => {
    return phone.replace(/[-\s]/g, '');
  };

  // 거절된 중복 신청 삭제 함수
  const handleDeleteRejected = async (app: any) => {
    // 같은 이름+연락처로 유효한 신청이 있는지 확인
    const validApplication = applications.find((a: any) => 
      a.id !== app.id &&
      a.participant_name === app.participant_name &&
      normalizePhoneNumber(a.phone || '') === normalizePhoneNumber(app.phone || '') &&
      ['접수완료', '심사중', '승인완료'].includes(a.status)
    );

    if (!validApplication) {
      alert('삭제할 수 없습니다.\n\n같은 이름과 연락처로 유효한 신청(접수완료/심사중/승인완료)이 있는 경우에만 삭제할 수 있습니다.');
      return;
    }

    if (!confirm(`"${app.participant_name}" 님의 거절된 신청을 삭제하시겠습니까?\n\n(유효한 신청: ${validApplication.status})`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('applications_2025_09_29_16_15')
        .delete()
        .eq('id', app.id);

      if (error) throw error;
      
      alert('삭제되었습니다.');
      fetchApplications();
    } catch (error) {
      console.error('Error:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const filteredApplications = applications.filter((app: any) => {
    const searchTermLower = searchTerm.toLowerCase();
    const normalizedSearchTerm = normalizePhoneNumber(searchTerm);
    
    const matchesSearch = 
      app.participant_name?.toLowerCase().includes(searchTermLower) ||
      app.guardian_name?.toLowerCase().includes(searchTermLower) ||
      app.phone?.includes(searchTerm) ||
      normalizePhoneNumber(app.phone || '').includes(normalizedSearchTerm) ||
      app.email?.toLowerCase().includes(searchTermLower) ||
      app.school_name?.toLowerCase().includes(searchTermLower) ||
      app.auth_code?.toLowerCase().includes(searchTermLower);

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    // ✅ 필터 수정: 정확한 프로그램 타입 매칭
    const matchesProgram = programFilter === 'all' || app.program_type === programFilter;

    return matchesSearch && matchesStatus && matchesProgram;
  });

  const getSessionDisplay = (sessionNumber: string) => {
    if (!sessionNumber) {
      return <span className="text-gray-400">-</span>;
    }
    
    if (sessionNumber === '확인필요') {
      return (
        <span className="px-2 py-1 rounded text-xs bg-orange-100 text-orange-800 font-medium">
          📞 확인필요
        </span>
      );
    }
    
    return (
      <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800 font-medium">
        {sessionNumber}
      </span>
    );
  };

  return (
    <>
      {selectedApplication && (
        <ApplicationDetailModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          getProgramName={getProgramName}
          formatDate={formatDate}
          getSessionDisplay={getSessionDisplay}
        />
      )}
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">참가신청 관리</h2>
          <div className="flex gap-4">
            <button
              onClick={fetchApplications}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              🔄 새로고침
            </button>
            <button
              onClick={handleExportExcel}
              disabled={isExporting}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {isExporting ? '다운로드 중...' : '📊 엑셀 다운로드'}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                통합 검색
              </label>
              <input
                type="text"
                placeholder="이름, 연락처(하이픈 없이도 가능), 이메일, 학교, 인증코드 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                상태 필터
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">전체 상태</option>
                <option value="접수완료">접수완료</option>
                <option value="심사중">심사중</option>
                <option value="승인완료">승인완료</option>
                <option value="거절">거절</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                프로그램 필터
              </label>
              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">전체 프로그램</option>
                <option value="ski-camp">찾아가는 평창 올림픽 스키학교</option>
                <option value="ski-school">찾아가는 스키학교 (단체)</option>
                <option value="ojt-workshop">평창 눈동이 OJT 워크숍</option>
                <option value="snow-camp">스노우 스포츠 캠프</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              총 {applications.length}건 중 {filteredApplications.length}건 표시
            </span>
            {(searchTerm || statusFilter !== 'all' || programFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setProgramFilter('all');
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                필터 초기화
              </button>
            )}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">이름</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">프로그램</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">차수</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">학년</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">연락처</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">신청일</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">상태</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">인증코드</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app: any) => (
                <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{app.display_id || app.id}</td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{app.participant_name}</div>
                    <div className="text-sm text-gray-600">{app.guardian_name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium">
                      {getProgramName(app.program_type)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {app.program_type === 'ski-school' ? (
                      <span className="text-gray-400">-</span>
                    ) : (
                      getSessionDisplay(app.session_number)
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {app.program_type === 'ski-school' ? (
                      <span className="text-sm text-gray-600">
                        총 {app.total_count}명<br/>
                        (남:{app.male_count} 여:{app.female_count})
                      </span>
                    ) : (
                      app.grade
                    )}
                  </td>
                  <td className="py-3 px-4">{app.phone}</td>
                  <td className="py-3 px-4">{formatDate(app.created_at)}</td>
                  <td className="py-3 px-4">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusUpdate(app.id, e.target.value)}
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        app.status === '승인완료' ? 'bg-green-100 text-green-800' :
                        app.status === '심사중' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === '거절' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}
                    >
                      <option value="접수완료">접수완료</option>
                      <option value="심사중">심사중</option>
                      <option value="승인완료">승인완료</option>
                      <option value="거절">거절</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-mono ${
                      app.auth_code ? 'bg-blue-100 text-blue-800' : 'text-gray-400'
                    }`}>
                      {app.auth_code || '-'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedApplication(app)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      상세보기
                    </button>
                    {app.status === '거절' && (
                      <button
                        onClick={() => handleDeleteRejected(app)}
                        className="text-red-600 hover:text-red-800 text-sm ml-2"
                      >
                        삭제
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredApplications.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm || statusFilter !== 'all' || programFilter !== 'all' 
                ? '검색 조건에 맞는 신청서가 없습니다.' 
                : '아직 신청서가 없습니다.'
              }
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const ApplicationDetailModal = ({ 
  application, 
  onClose, 
  getProgramName, 
  formatDate,
  getSessionDisplay
}: { 
  application: any; 
  onClose: () => void; 
  getProgramName: (type: string) => string; 
  formatDate: (date: string) => string; 
  getSessionDisplay: (sessionNumber: string) => JSX.Element;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">참가신청 상세보기</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">신청 ID</label>
                  <p className="mt-1 text-sm text-gray-900">{application.display_id || application.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">신청일</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(application.created_at)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">프로그램</label>
                  <p className="mt-1 text-sm text-gray-900">{getProgramName(application.program_type)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">차수</label>
                  <div className="mt-1">
                    {application.program_type === 'ski-school' ? (
                      <span className="text-gray-400">단체 신청</span>
                    ) : (
                      getSessionDisplay(application.session_number)
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">상태</label>
                  <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                    application.status === '승인완료' ? 'bg-green-100 text-green-800' :
                    application.status === '심사중' ? 'bg-yellow-100 text-yellow-800' :
                    application.status === '거절' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {application.status}
                  </span>
                </div>
              </div>
            </div>

            {application.program_type === 'ski-school' ? (
              // 스키학교 단체 신청 정보
              <>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">단체 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">단체명</label>
                      <p className="mt-1 text-sm text-gray-900">{application.group_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">희망 신청일</label>
                      <p className="mt-1 text-sm text-gray-900">{formatDate(application.application_date)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">참가 인원</label>
                      <p className="mt-1 text-sm text-gray-900">
                        총 {application.total_count}명 (남:{application.male_count}명, 여:{application.female_count}명)
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">지역</label>
                      <p className="mt-1 text-sm text-gray-900">{application.region}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">담당자 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">담당자 성명</label>
                      <p className="mt-1 text-sm text-gray-900">{application.guardian_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">연락처</label>
                      <p className="mt-1 text-sm text-gray-900">{application.guardian_phone}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">주소</label>
                      <p className="mt-1 text-sm text-gray-900">{application.guardian_address}</p>
                    </div>
                  </div>
                </div>

                {application.special_notes && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">특이사항</h3>
                    <p className="mt-1 text-sm text-gray-900">{application.special_notes}</p>
                  </div>
                )}
              </>
            ) : (
              // 기존 개별 신청 정보
              <>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">참가자 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">참가자 성명</label>
                      <p className="mt-1 text-sm text-gray-900">{application.participant_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">생년월일</label>
                      <p className="mt-1 text-sm text-gray-900">{application.birth_date}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">성별</label>
                      <p className="mt-1 text-sm text-gray-900">{application.gender}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">학년</label>
                      <p className="mt-1 text-sm text-gray-900">{application.grade}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">학교명</label>
                      <p className="mt-1 text-sm text-gray-900">{application.school_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">지역</label>
                      <p className="mt-1 text-sm text-gray-900">{application.region}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">보호자 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">보호자 성명</label>
                      <p className="mt-1 text-sm text-gray-900">{application.guardian_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">연락처</label>
                      <p className="mt-1 text-sm text-gray-900">{application.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">주소 정보</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">주소</label>
                      <p className="mt-1 text-sm text-gray-900">{application.address}</p>
                    </div>
                  </div>
                </div>

                {(application.special_notes || application.auth_code) && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">추가 정보</h3>
                    <div className="space-y-4">
                      {application.special_notes && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">특이사항</label>
                          <p className="mt-1 text-sm text-gray-900">{application.special_notes}</p>
                        </div>
                      )}
                      {application.auth_code && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">인증코드</label>
                          <p className="mt-1 text-sm font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded inline-block">
                            {application.auth_code}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {application.session_number === '확인필요' && (
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h3 className="text-lg font-semibold text-orange-900 mb-2">📞 차수 확인 필요</h3>
                    <p className="text-sm text-orange-800">
                      이 신청자는 10/12일 이전 신청자로, 유선통화를 통해 원하는 차수를 확인해주세요.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InquiryManagement = ({ formatDate }: { formatDate: (date: string) => string }) => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [editingInquiry, setEditingInquiry] = useState<any>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('inquiry_posts_2025_10_13_01_30')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInquiry = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      const { error } = await supabase
        .from('inquiry_posts_2025_10_13_01_30')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      alert('삭제되었습니다.');
      fetchInquiries();
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const handleEditInquiry = (inquiry: any) => {
    setEditingInquiry(inquiry);
    setShowWriteModal(true);
  };

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">문의사항 관리</h2>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setEditingInquiry(null);
              setShowWriteModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            ✏️ 글쓰기
          </button>
          <div className="text-sm text-gray-600 flex items-center">
            총 {inquiries.length}건
          </div>
        </div>
      </div>
      
      {inquiries.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="text-gray-600">
            <p className="text-lg font-medium mb-2">문의사항 관리</p>
            <p className="text-sm">문의사항이 없습니다.</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">제목</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">작성자</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">작성일</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">상태</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">관리</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry: any) => (
                <tr key={inquiry.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{inquiry.id}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedInquiry(inquiry)}
                      className="text-blue-600 hover:text-blue-800 text-left"
                    >
                      {inquiry.title}
                    </button>
                  </td>
                  <td className="py-3 px-4">{inquiry.author}</td>
                  <td className="py-3 px-4">{formatDate(inquiry.created_at)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      inquiry.status === '답변완료' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditInquiry(inquiry)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteInquiry(inquiry.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedInquiry && (
        <InquiryDetailModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          formatDate={formatDate}
        />
      )}

      {showWriteModal && (
        <InquiryWriteModal
          inquiry={editingInquiry}
          onClose={() => {
            setShowWriteModal(false);
            setEditingInquiry(null);
          }}
          onSave={fetchInquiries}
        />
      )}
    </div>
  );
};

const BoardManagement = ({ formatDate }: { formatDate: (date: string) => string }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('board_posts_2025_09_29_20_00')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => 
    categoryFilter === 'all' || post.category === categoryFilter
  );

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      notice: '공지사항',
      press: '보도자료',
      gallery: '활동갤러리',
      faq: 'FAQ',
      review: '참가후기'
    };
    return labels[category] || category;
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      const { error } = await supabase
        .from('board_posts_2025_09_29_20_00')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      alert('삭제되었습니다.');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const handleEditPost = (post: any) => {
    setEditingPost(post);
    setShowWriteModal(true);
  };

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">게시판 관리</h2>
        <div className="flex gap-4 items-center">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">전체 카테고리</option>
            <option value="notice">공지사항</option>
            <option value="press">보도자료</option>
            <option value="gallery">활동갤러리</option>
            <option value="faq">FAQ</option>
            <option value="review">참가후기</option>
          </select>
          <button
            onClick={() => {
              setEditingPost(null);
              setShowWriteModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            ✏️ 글쓰기
          </button>
          <div className="text-sm text-gray-600">
            {categoryFilter === 'all' ? `총 ${posts.length}건` : `${filteredPosts.length}건 / 총 ${posts.length}건`}
          </div>
        </div>
      </div>
      
      {filteredPosts.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="text-gray-600">
            <p className="text-lg font-medium mb-2">게시판 관리</p>
            <p className="text-sm">게시물이 없습니다.</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">카테고리</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">제목</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">작성자</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">작성일</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">조회수</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post: any) => (
                <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{post.id}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      post.category === 'notice' ? 'bg-red-100 text-red-800' :
                      post.category === 'press' ? 'bg-blue-100 text-blue-800' :
                      post.category === 'gallery' ? 'bg-green-100 text-green-800' :
                      post.category === 'faq' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {getCategoryLabel(post.category)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="text-blue-600 hover:text-blue-800 text-left"
                    >
                      {post.title}
                    </button>
                  </td>
                  <td className="py-3 px-4">{post.author}</td>
                  <td className="py-3 px-4">{formatDate(post.created_at)}</td>
                  <td className="py-3 px-4">{post.views}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          formatDate={formatDate}
        />
      )}

      {showWriteModal && (
        <PostWriteModal
          post={editingPost}
          onClose={() => {
            setShowWriteModal(false);
            setEditingPost(null);
          }}
          onSave={fetchPosts}
        />
      )}
    </div>
  );
};

// 실제 수정 가능한 모달 컴포넌트들
const InquiryDetailModal = ({ inquiry, onClose, formatDate }: any) => {
  const [replies, setReplies] = useState<any[]>([]);
  const [newReply, setNewReply] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReplies();
  }, []);

  const fetchReplies = async () => {
    try {
      const { data, error } = await supabase
        .from('inquiry_replies_2025_10_13_01_30')
        .select('*')
        .eq('inquiry_id', inquiry.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setReplies(data || []);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const handleAddReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('inquiry_replies_2025_10_13_01_30')
        .insert([{
          inquiry_id: inquiry.id,
          content: newReply,
          author: '관리자'
        }]);

      if (error) throw error;

      // 문의사항 상태를 답변완료로 업데이트
      await supabase
        .from('inquiry_posts_2025_10_13_01_30')
        .update({ status: '답변완료' })
        .eq('id', inquiry.id);

      setNewReply('');
      fetchReplies();
      alert('답글이 등록되었습니다.');
    } catch (error) {
      console.error('Error adding reply:', error);
      alert('답글 등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReply = async (replyId: number) => {
    if (!confirm('답글을 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase
        .from('inquiry_replies_2025_10_13_01_30')
        .delete()
        .eq('id', replyId);

      if (error) throw error;
      
      fetchReplies();
      alert('답글이 삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting reply:', error);
      alert('답글 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">문의사항 상세 및 답글 관리</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        
        {/* 문의사항 내용 */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-3">
            <div><strong>제목:</strong> {inquiry.title}</div>
            <div><strong>작성자:</strong> {inquiry.author}</div>
            <div><strong>작성일:</strong> {formatDate(inquiry.created_at)}</div>
            <div><strong>상태:</strong> 
              <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                inquiry.status === '답변완료' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {inquiry.status}
              </span>
            </div>
            <div><strong>내용:</strong> 
              <div className="mt-2 p-3 bg-white rounded border">{inquiry.content}</div>
            </div>
          </div>
        </div>

        {/* 답글 목록 */}
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-3">답글 목록 ({replies.length}개)</h4>
          {replies.length === 0 ? (
            <div className="text-gray-500 text-center py-4">아직 답글이 없습니다.</div>
          ) : (
            <div className="space-y-3">
              {replies.map((reply: any) => (
                <div key={reply.id} className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-blue-800">{reply.author}</span>
                      <span className="text-sm text-gray-600">{formatDate(reply.created_at)}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteReply(reply.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      삭제
                    </button>
                  </div>
                  <div className="text-gray-800">{reply.content}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 새 답글 작성 */}
        <div className="border-t pt-4">
          <h4 className="text-md font-semibold mb-3">답글 작성</h4>
          <form onSubmit={handleAddReply}>
            <textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="답글을 입력하세요..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <div className="flex justify-between items-center mt-3">
              <div className="text-sm text-gray-600">
                답글 작성 시 문의사항 상태가 자동으로 '답변완료'로 변경됩니다.
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  닫기
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded"
                >
                  {loading ? '등록 중...' : '답글 등록'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const PostDetailModal = ({ post, onClose, formatDate }: any) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">게시글 상세</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
      </div>
      <div className="space-y-4">
        <div><strong>카테고리:</strong> {post.category}</div>
        <div><strong>제목:</strong> {post.title}</div>
        <div><strong>작성자:</strong> {post.author}</div>
        <div><strong>작성일:</strong> {formatDate(post.created_at)}</div>
        <div><strong>조회수:</strong> {post.views}</div>
        <div><strong>내용:</strong> <div className="mt-2 p-3 bg-gray-50 rounded">{post.content}</div></div>
      </div>
      <div className="mt-6 flex justify-end">
        <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">닫기</button>
      </div>
    </div>
  </div>
);

const InquiryWriteModal = ({ inquiry, onClose, onSave }: any) => {
  const [formData, setFormData] = useState({
    title: inquiry?.title || '',
    content: inquiry?.content || '',
    author: inquiry?.author || '관리자',
    status: inquiry?.status || '답변대기'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (inquiry) {
        // 수정
        const { error } = await supabase
          .from('inquiry_posts_2025_10_13_01_30')
          .update(formData)
          .eq('id', inquiry.id);
        
        if (error) throw error;
        alert('수정되었습니다.');
      } else {
        // 새 글 작성
        const { error } = await supabase
          .from('inquiry_posts_2025_10_13_01_30')
          .insert([formData]);
        
        if (error) throw error;
        alert('작성되었습니다.');
      }
      
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving inquiry:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">{inquiry ? '문의사항 수정' : '문의사항 작성'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">작성자</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="답변대기">답변대기</option>
              <option value="답변완료">답변완료</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded"
            >
              {loading ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PostWriteModal = ({ post, onClose, onSave }: any) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    author: post?.author || '관리자',
    category: post?.category || 'notice',
    source_url: post?.source_url || ''
  });
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<{url: string; name: string}[]>([]);

  // 기존 이미지 로드
  useState(() => {
    if (post?.images) {
      try {
        const parsed = JSON.parse(post.images);
        setExistingImages(parsed);
      } catch (e) {
        if (post?.image_url) {
          setExistingImages([{ url: post.image_url, name: 'image' }]);
        }
      }
    } else if (post?.image_url) {
      setExistingImages([{ url: post.image_url, name: 'image' }]);
    }
  });

  // 이미지 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = images.length + existingImages.length + files.length;
    if (totalImages > 10) {
      alert('이미지는 최대 10장까지 업로드 가능합니다.');
      return;
    }
    
    setImages(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  // 새 이미지 삭제
  const removeNewImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // 기존 이미지 삭제
  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 새 이미지 업로드
      let uploadedImages: { url: string; name: string }[] = [...existingImages];
      
      if (images.length > 0) {
        for (const image of images) {
          const fileName = `${formData.category}_${Date.now()}_${Math.random().toString(36).substring(7)}_${image.name}`;
          const { error: uploadError } = await supabase.storage
            .from('press-images')
            .upload(fileName, image);

          if (uploadError) {
            console.error('Upload error:', uploadError);
            continue;
          }

          const { data: urlData } = supabase.storage
            .from('press-images')
            .getPublicUrl(fileName);

          uploadedImages.push({ url: urlData.publicUrl, name: image.name });
        }
      }

      const postData = {
        ...formData,
        images: uploadedImages.length > 0 ? JSON.stringify(uploadedImages) : null,
        image_url: uploadedImages.length > 0 ? uploadedImages[0].url : null
      };

      if (post) {
        // 수정
        const { error } = await supabase
          .from('board_posts_2025_09_29_20_00')
          .update(postData)
          .eq('id', post.id);
        
        if (error) throw error;
        alert('수정되었습니다.');
      } else {
        // 새 글 작성
        const { error } = await supabase
          .from('board_posts_2025_09_29_20_00')
          .insert([{...postData, views: 0}]);
        
        if (error) throw error;
        alert('작성되었습니다.');
      }
      
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">{post ? '게시글 수정' : '게시글 작성'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="notice">공지사항</option>
              <option value="press">보도자료</option>
              <option value="gallery">활동갤러리</option>
              <option value="faq">자주 묻는 질문</option>
              <option value="review">참가후기</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">작성자</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* 원본 링크 (보도자료용) */}
          {formData.category === 'press' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">원본 기사 링크 (선택)</label>
              <input
                type="url"
                value={formData.source_url}
                onChange={(e) => setFormData({...formData, source_url: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>
          )}

          {/* 이미지 업로드 (보도자료, 갤러리, 후기) */}
          {['press', 'gallery', 'review'].includes(formData.category) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이미지 첨부 (최대 10장)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              
              {/* 기존 이미지 */}
              {existingImages.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">기존 이미지:</p>
                  <div className="flex gap-2 flex-wrap">
                    {existingImages.map((img, index) => (
                      <div key={`existing-${index}`} className="relative">
                        <img src={img.url} alt={img.name} className="w-20 h-20 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 새 이미지 미리보기 */}
              {imagePreviews.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">새 이미지:</p>
                  <div className="flex gap-2 flex-wrap">
                    {imagePreviews.map((preview, index) => (
                      <div key={`new-${index}`} className="relative">
                        <img src={preview} alt={`미리보기 ${index + 1}`} className="w-20 h-20 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded"
            >
              {loading ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;