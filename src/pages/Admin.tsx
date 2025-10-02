import { useState, useEffect } from "react";
import { supabase } from "../integrations/supabase/client";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const ADMIN_PASSWORD = 'snowpass2026';

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('패스워드가 올바르지 않습니다.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  // 인증되지 않은 경우 로그인 화면
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

  // 인증된 경우 관리자 대시보드
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
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

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdminPanel />
      </div>
    </div>
  );
};

// 관리자 패널 컴포넌트
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

  // 날짜 형식 통일 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  // 인증코드 생성 함수
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
      const { data, error } = await supabase
        .from('applications_2025_09_29_16_15')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setApplications(data || []);
      
      // 통계 계산
      const total = data?.length || 0;
      const skiCamp = data?.filter(app => app.program_type === 'ski-camp' && app.status === '승인완료').length || 0;
      const ojtWorkshop = data?.filter(app => app.program_type === 'ojt-workshop' && app.status === '승인완료').length || 0;
      const snowCamp = data?.filter(app => app.program_type === 'snow-camp' && app.status === '승인완료').length || 0;
      const pending = data?.filter(app => app.status === '접수완료' || app.status === '심사중').length || 0;
      const approved = data?.filter(app => app.status === '승인완료').length || 0;
      
      setStats({ total, skiCamp, ojtWorkshop, snowCamp, pending, approved });
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      const updateData: any = { status: newStatus };
      
      // 승인완료 시 인증코드 자동 생성 (기존에 없는 경우만)
      if (newStatus === '승인완료') {
        const currentApp = applications.find((app: any) => app.id === id);
        if (!currentApp?.auth_code) {
          updateData.auth_code = generateAuthCode();
        }
      }

      const { error } = await supabase
        .from('applications_2025_09_29_16_15')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      
      // 목록 새로고침
      fetchApplications();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('상태 업데이트 중 오류가 발생했습니다.');
    }
  };

  const handleExportExcel = async () => {
    setIsExporting(true);
    try {
      const response = await supabase.functions.invoke('export_applications_excel_2025_09_29_16_15');
      
      if (response.error) throw response.error;
      // Create blob and download
      const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `applications_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting:', error);
      alert('엑셀 다운로드 중 오류가 발생했습니다.');
    } finally {
      setIsExporting(false);
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

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
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
          <div className="text-purple-600">스키캠프</div>
        </div>
        <div className="bg-indigo-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-indigo-800">{stats.ojtWorkshop}</div>
          <div className="text-indigo-600">OJT 워크숍</div>
        </div>
        <div className="bg-pink-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-pink-800">{stats.snowCamp}</div>
          <div className="text-pink-600">체험캠프</div>
        </div>
      </div>

      {/* 탭 메뉴 */}
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
          {activeTab === 'board' && <BoardManagement formatDate={formatDate} />}
        </div>
      </div>
    </div>
  );
};

// 참가신청 관리 컴포넌트
const ApplicationsManagement = ({ 
  applications, 
  handleStatusUpdate, 
  handleExportExcel, 
  isExporting, 
  fetchApplications, 
  getProgramName,
  formatDate
}: any) => {
  // const [selectedApplication, setSelectedApplication] = useState<any>(null);

  return (
    <>
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
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">이름</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">프로그램</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">학년</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">연락처</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">신청일</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">상태</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">인증코드</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">관리</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app: any) => (
                <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{app.id}</td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{app.participant_name}</div>
                    <div className="text-sm text-gray-600">{app.guardian_name}</div>
                  </td>
                  <td className="py-3 px-4">{getProgramName(app.program_type)}</td>
                  <td className="py-3 px-4">{app.grade}</td>
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
                      onClick={() => {
                        // setSelectedApplication(app);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {applications.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              아직 신청서가 없습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// 게시판 관리 컴포넌트
const BoardManagement = ({ formatDate }: { formatDate: (date: string) => string }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('notice');
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);

  useEffect(() => {
    fetchPosts(activeCategory);
  }, [activeCategory]);

  const fetchPosts = async (category: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('board_posts_2025_09_29_20_00')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase
        .from('board_posts_2025_09_29_20_00')
        .delete()
        .eq('id', postId);

      if (error) throw error;
      
      alert('게시물이 삭제되었습니다.');
      fetchPosts(activeCategory);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'notice': return '공지사항';
      case 'faq': return '자주묻는질문';
      case 'gallery': return '활동갤러리';
      case 'review': return '참가후기';
      default: return category;
    }
  };

  return (
    <div className="space-y-6">
      {/* 글쓰기 폼 모달 */}
      {showWriteForm && (
        <AdminWritePostModal
          category={activeCategory}
          editingPost={editingPost}
          onClose={() => {
            setShowWriteForm(false);
            setEditingPost(null);
          }}
          onSuccess={() => {
            setShowWriteForm(false);
            setEditingPost(null);
            fetchPosts(activeCategory);
          }}
        />
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">게시판 관리</h2>
        <button
          onClick={() => setShowWriteForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          ✏️ 글쓰기
        </button>
      </div>

      {/* 카테고리 탭 */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['notice', 'faq', 'gallery', 'review'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeCategory === category
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {getCategoryName(category)}
            </button>
          ))}
        </nav>
      </div>

      {/* 게시물 목록 */}
      {loading ? (
        <div className="text-center py-8">로딩 중...</div>
      ) : (
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              등록된 게시물이 없습니다.
            </div>
          ) : (
            posts.map((post: any) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {post.important && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                          중요
                        </span>
                      )}
                      {post.program_type && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {post.program_type}
                        </span>
                      )}
                      <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <span>👤 {post.author}</span>
                      <span>📅 {formatDate(post.created_at)}</span>
                      <span>👁️ {post.views}</span>
                      {post.rating && (
                        <span>⭐ {post.rating}점</span>
                      )}
                    </div>
                    <p className="text-gray-700 line-clamp-2">{post.content}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setShowWriteForm(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// 관리자 글쓰기 모달
const AdminWritePostModal = ({ 
  category, 
  editingPost, 
  onClose, 
  onSuccess 
}: { 
  category: string; 
  editingPost: any; 
  onClose: () => void; 
  onSuccess: () => void; 
}) => {
  const [formData, setFormData] = useState({
    title: editingPost?.title || '',
    content: editingPost?.content || '',
    important: editingPost?.important || false,
    program_type: editingPost?.program_type || '',
    rating: editingPost?.rating || 5
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        category,
        ...formData,
        author: '관리자',
        author_email: 'admin@snowpass.kr'
      };

      let result;
      if (editingPost) {
        // 수정
        result = await supabase
          .from('board_posts_2025_09_29_20_00')
          .update(postData)
          .eq('id', editingPost.id);
      } else {
        // 새 글 작성
        result = await supabase
          .from('board_posts_2025_09_29_20_00')
          .insert([postData]);
      }

      if (result.error) throw result.error;

      alert(editingPost ? '게시물이 수정되었습니다.' : '게시물이 작성되었습니다.');
      onSuccess();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case 'notice': return '공지사항';
      case 'faq': return '자주묻는질문';
      case 'gallery': return '활동갤러리';
      case 'review': return '참가후기';
      default: return '게시물';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingPost ? '게시물 수정' : `${getCategoryTitle(category)} 작성`}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 중요 표시 (공지사항만) */}
            {category === 'notice' && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="important"
                  checked={formData.important}
                  onChange={(e) => setFormData({ ...formData, important: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="important" className="text-sm font-medium text-gray-700">
                  중요 공지사항
                </label>
              </div>
            )}

            {/* 프로그램 종류 (후기인 경우) */}
            {category === 'review' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  프로그램 종류
                </label>
                <select
                  value={formData.program_type}
                  onChange={(e) => setFormData({ ...formData, program_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">선택하세요</option>
                  <option value="찾아가는 스키캠프">찾아가는 스키캠프</option>
                  <option value="평창눈동이 OJT 워크숍">평창눈동이 OJT 워크숍</option>
                  <option value="스노우스포츠 체험캠프">스노우스포츠 체험캠프</option>
                </select>
              </div>
            )}

            {/* 별점 (후기인 경우) */}
            {category === 'review' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  별점
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={`text-2xl ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ⭐
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {formData.rating}점
                  </span>
                </div>
              </div>
            )}

            {/* 제목 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목 *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* 내용 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                내용 *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* 버튼 */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? '저장 중...' : (editingPost ? '수정하기' : '작성하기')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;