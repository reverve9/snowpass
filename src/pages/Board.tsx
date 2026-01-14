import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BoardPost {
  id: number;
  title: string;
  content: string;
  author: string;
  author_email: string;
  created_at: string;
  views: number;
  category: string;
  important?: boolean;
  program_type?: string;
  rating?: number;
  source_url?: string;
  image_url?: string;
  image_source?: string;
  images?: string; // JSON 배열 문자열
}

interface InquiryPost {
  id: number;
  title: string;
  content: string;
  author: string;
  password: string;
  email?: string;
  phone?: string;
  created_at: string;
  views: number;
  status: 'waiting' | 'answered';
  is_private: boolean;
}

interface InquiryReply {
  id: number;
  inquiry_id: number;
  content: string;
  author: string;
  created_at: string;
}

const Board = () => {
  const [activeMenu, setActiveMenu] = useState('notice');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <h2 className="text-xl font-bold text-gray-900 mb-6">게시판</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveMenu('notice')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'notice' 
                      ? 'bg-[#223466] text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  공지사항
                </button>
                <button
                  onClick={() => setActiveMenu('press')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'press' 
                      ? 'bg-[#223466] text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  보도자료
                </button>
                <button
                  onClick={() => setActiveMenu('faq')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'faq' 
                      ? 'bg-[#223466] text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  자주 묻는 질문
                </button>
                <button
                  onClick={() => setActiveMenu('inquiry')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'inquiry' 
                      ? 'bg-[#223466] text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  문의사항
                </button>
                <button
                  onClick={() => setActiveMenu('gallery')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'gallery' 
                      ? 'bg-[#223466] text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  활동 갤러리
                </button>
                <button
                  onClick={() => setActiveMenu('review')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'review' 
                      ? 'bg-[#223466] text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  참가 후기
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
            {activeMenu === 'notice' && <NoticeBoard />}
            {activeMenu === 'press' && <PressBoard />}
            {activeMenu === 'faq' && <FAQBoard />}
            {activeMenu === 'inquiry' && <InquiryBoard />}
            {activeMenu === 'gallery' && <GalleryBoard />}
            {activeMenu === 'review' && <ReviewBoard />}
          </div>
        </div>

        {/* 모바일: 탭 방식 */}
        <div className="md:hidden">
          {/* 모바일 탭 메뉴 */}
          <div className="bg-gray-50 rounded-lg p-2 mb-6">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setActiveMenu('notice')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                  activeMenu === 'notice' 
                    ? 'bg-[#223466] text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                공지사항
              </button>
              <button
                onClick={() => setActiveMenu('press')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                  activeMenu === 'press' 
                    ? 'bg-[#223466] text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                보도자료
              </button>
              <button
                onClick={() => setActiveMenu('faq')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                  activeMenu === 'faq' 
                    ? 'bg-[#223466] text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                자주 묻는 질문
              </button>
              <button
                onClick={() => setActiveMenu('inquiry')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                  activeMenu === 'inquiry' 
                    ? 'bg-[#223466] text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                문의사항
              </button>
              <button
                onClick={() => setActiveMenu('gallery')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                  activeMenu === 'gallery' 
                    ? 'bg-[#223466] text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                활동 갤러리
              </button>
              <button
                onClick={() => setActiveMenu('review')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                  activeMenu === 'review' 
                    ? 'bg-[#223466] text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                참가 후기
              </button>
            </div>
          </div>

          {/* 모바일 콘텐츠 (전체 너비) */}
          <div className="w-full">
            {activeMenu === 'notice' && <NoticeBoard />}
            {activeMenu === 'press' && <PressBoard />}
            {activeMenu === 'faq' && <FAQBoard />}
            {activeMenu === 'inquiry' && <InquiryBoard />}
            {activeMenu === 'gallery' && <GalleryBoard />}
            {activeMenu === 'review' && <ReviewBoard />}
          </div>
        </div>
      </div>
    </div>
  );
};

// 날짜 형식 통일 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

/// 조회수 증가 함수
const incrementViews = async (postId: number) => {
  try {
    // 현재 게시물의 조회수를 가져와서 +1 업데이트
    const { data: currentPost } = await supabase
      .from('board_posts_2025_09_29_20_00')
      .select('views')
      .eq('id', postId)
      .single();

    const newViews = (currentPost?.views || 0) + 1;

    const { error } = await supabase
      .from('board_posts_2025_09_29_20_00')
      .update({ views: newViews })
      .eq('id', postId);

    if (error) {
      console.error('조회수 업데이트 에러:', error);
      return;
    }

    // 조회수만 업데이트하고 페이지 새로고침은 하지 않음
console.log('조회수 업데이트 완료')
  } catch (error) {
    console.error('조회수 증가 실패:', error);
  }
};

// 공지사항 게시판
const NoticeBoard = () => {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BoardPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('board_posts_2025_09_29_20_00')
        .select('*')
        .eq('category', 'notice')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = async (post: BoardPost) => {
    await incrementViews(post.id);
    setSelectedPost(post);
    // 로컬 상태 업데이트
    setPosts(prev => prev.map(p => 
      p.id === post.id ? { ...p, views: p.views + 1 } : p
    ));
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow-md p-8 text-center">로딩 중...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'esamanru, sans-serif'}}>공지사항</h2>
      </div>
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            등록된 공지사항이 없습니다.
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {post.important && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                        중요
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>👤 {post.author}</span>
                    <span>📅 {formatDate(post.created_at)}</span>
                    <span>👁️ {post.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 게시물 상세 모달 */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

// 보도자료 게시판
const PressBoard = () => {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BoardPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('board_posts_2025_09_29_20_00')
        .select('*')
        .eq('category', 'press')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = async (post: BoardPost) => {
    await incrementViews(post.id);
    setSelectedPost(post);
    // 로컬 상태 업데이트
    setPosts(prev => prev.map(p => 
      p.id === post.id ? { ...p, views: p.views + 1 } : p
    ));
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow-md p-8 text-center">로딩 중...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'esamanru, sans-serif'}}>보도자료</h2>
        <div className="text-sm text-gray-500">
        
        </div>
      </div>
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            등록된 보도자료가 없습니다.
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {post.important && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                        중요
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>👤 {post.author}</span>
                    <span>📅 {formatDate(post.created_at)}</span>
                    <span>👁️ {post.views}</span>
                    {post.source_url && (
                      <span className="text-blue-600">🔗 원문링크</span>
                    )}
                    {post.image_url && (
                      <span className="text-green-600">🖼️ 이미지</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 게시물 상세 모달 */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

// FAQ 게시판 (아코디언 형식)
const FAQBoard = () => {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [openItems, setOpenItems] = useState<number[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('board_posts_2025_09_29_20_00')
        .select('*')
        .eq('category', 'faq')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow-md p-8 text-center">로딩 중...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'esamanru, sans-serif'}}>자주 묻는 질문</h2>
      </div>
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            등록된 FAQ가 없습니다.
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleItem(post.id)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <span className="font-semibold text-gray-900">Q. {post.title}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    openItems.includes(post.id) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openItems.includes(post.id) && (
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <div className="text-gray-700 whitespace-pre-wrap">
                    A. {post.content}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 문의사항 게시판
const InquiryBoard = () => {
  const [posts, setPosts] = useState<InquiryPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<InquiryPost | null>(null);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [replies, setReplies] = useState<InquiryReply[]>([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [pendingPost, setPendingPost] = useState<InquiryPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('inquiry_posts_2025_10_13_01_30')
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

  const fetchReplies = async (inquiryId: number) => {
    try {
      const { data, error } = await supabase
        .from('inquiry_replies_2025_10_13_01_30')
        .select('*')
        .eq('inquiry_id', inquiryId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setReplies(data || []);
    } catch (error) {
      console.error('Error fetching replies:', error);
      setReplies([]);
    }
  };

  const handlePostClick = (post: InquiryPost) => {
    setPendingPost(post);
    setShowPasswordModal(true);
    setPasswordInput('');
  };

  const handlePasswordSubmit = async () => {
    if (!pendingPost) return;

    if (passwordInput === pendingPost.password) {
      // 조회수 증가
      try {
        const { error } = await supabase
          .from('inquiry_posts_2025_10_13_01_30')
          .update({ views: pendingPost.views + 1 })
          .eq('id', pendingPost.id);

        if (!error) {
          setPosts(prev => prev.map(p => 
            p.id === pendingPost.id ? { ...p, views: p.views + 1 } : p
          ));
        }
      } catch (error) {
        console.error('Error incrementing views:', error);
      }

      setSelectedPost(pendingPost);
      await fetchReplies(pendingPost.id);
      setShowPasswordModal(false);
      setPendingPost(null);
      setPasswordInput('');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow-md p-8 text-center">로딩 중...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'esamanru, sans-serif'}}>문의사항</h2>
        <button
          onClick={() => setShowWriteForm(true)}
          className="bg-[#223466] hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          ✏️ 문의하기
        </button>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            등록된 문의사항이 없습니다.
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      post.status === 'answered' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status === 'answered' ? '답변완료' : '답변대기'}
                    </span>
                    {post.is_private && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                        🔒 비공개
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>👤 {post.author}</span>
                    <span>📅 {formatDate(post.created_at)}</span>
                    <span>👁️ {post.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 문의 작성 모달 */}
      {showWriteForm && (
        <InquiryWriteModal
          onClose={() => setShowWriteForm(false)}
          onSuccess={() => {
            setShowWriteForm(false);
            fetchPosts();
          }}
        />
      )}

      {/* 비밀번호 확인 모달 */}
      {showPasswordModal && (
        <PasswordModal
          onClose={() => {
            setShowPasswordModal(false);
            setPendingPost(null);
            setPasswordInput('');
          }}
          onSubmit={handlePasswordSubmit}
          password={passwordInput}
          setPassword={setPasswordInput}
        />
      )}

      {/* 문의사항 상세 모달 */}
      {selectedPost && (
        <InquiryDetailModal
          post={selectedPost}
          replies={replies}
          onClose={() => {
            setSelectedPost(null);
            setReplies([]);
          }}
          onReplyAdded={() => {
            if (selectedPost) {
              fetchReplies(selectedPost.id);
              fetchPosts(); // 상태 업데이트를 위해
            }
          }}
        />
      )}
    </div>
  );
};

// 활동갤러리 게시판 - 다중 이미지 지원
const GalleryBoard = () => {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGallery, setSelectedGallery] = useState<BoardPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('board_posts_2025_09_29_20_00')
        .select('*')
        .eq('category', 'gallery')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailClick = async (post: BoardPost) => {
    await incrementViews(post.id);
    setSelectedGallery(post);
    // 로컬 상태 업데이트
    setPosts(prev => prev.map(p => 
      p.id === post.id ? { ...p, views: p.views + 1 } : p
    ));
  };

  // 첫 번째 이미지 URL 가져오기
  const getFirstImageUrl = (post: BoardPost) => {
    if (post.images) {
      try {
        const imageArray = JSON.parse(post.images);
        return imageArray.length > 0 ? imageArray[0].url : null;
      } catch (error) {
        console.error('Error parsing images:', error);
        return null;
      }
    }
    return post.image_url || null;
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow-md p-8 text-center">로딩 중...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'esamanru, sans-serif'}}>활동 갤러리</h2>
        <div className="text-sm text-gray-500">
          
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          등록된 갤러리가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((item) => {
            const firstImageUrl = getFirstImageUrl(item);
            return (
              <div
                key={item.id}
                onClick={() => handleThumbnailClick(item)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  {firstImageUrl ? (
                    <img 
                      src={firstImageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-4xl">📷</div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    📷 {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>📅 {formatDate(item.created_at)}</span>
                    <span>👁️ {item.views}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 갤러리 이미지 모달 */}
      {selectedGallery && (
        <GalleryImageModal
          gallery={selectedGallery}
          onClose={() => setSelectedGallery(null)}
        />
      )}
    </div>
  );
};

// 참가후기 게시판
const ReviewBoard = () => {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BoardPost | null>(null);
  const [showWriteForm, setShowWriteForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('board_posts_2025_09_29_20_00')
        .select('*')
        .eq('category', 'review')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = async (post: BoardPost) => {
    await incrementViews(post.id);
    setSelectedPost(post);
    // 로컬 상태 업데이트
    setPosts(prev => prev.map(p => 
      p.id === post.id ? { ...p, views: p.views + 1 } : p
    ));
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow-md p-8 text-center">로딩 중...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'esamanru, sans-serif'}}>참가 후기</h2>
        <button
          onClick={() => setShowWriteForm(true)}
          className="bg-[#223466] hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          ✏️ 후기 작성
        </button>
      </div>
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            등록된 후기가 없습니다.
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {post.program_type && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {post.program_type}
                      </span>
                    )}
                    {post.rating && (
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < post.rating! ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>👤 {post.author}</span>
                    <span>📅 {formatDate(post.created_at)}</span>
                    <span>👁️ {post.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 글쓰기 모달 */}
      {showWriteForm && (
        <WritePostModal
          onClose={() => setShowWriteForm(false)}
          onSuccess={() => {
            setShowWriteForm(false);
            fetchPosts();
          }}
        />
      )}

      {/* 게시물 상세 모달 */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

// 게시물 상세 보기 모달 - 수정/삭제 버튼 제거, 외부 클릭으로 닫기
const PostDetailModal = ({ 
  post, 
  onClose 
}: { 
  post: BoardPost; 
  onClose: () => void; 
}) => {
  // 모달 외부 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
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
              {/* 별점은 참가후기(review)에만 표시 */}
              {post.rating && post.category === 'review' && (
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < post.rating! ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ⭐
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 제목 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h2>

          {/* 메타 정보 */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-4 border-b border-gray-200">
            <span>👤 {post.author}</span>
            <span>📅 {formatDate(post.created_at)}</span>
            <span>👁️ {post.views}</span>
          </div>

          {/* 보도자료 이미지 및 출처 - 원본 비율 유지 */}
          {post.image_url && (
            <div className="mb-6">
              <img 
                src={post.image_url}
                alt={post.title}
                className="w-full h-auto object-contain rounded-lg"
              />
              {/* 이미지 출처 표시 */}
              {post.image_source && (
                <p className="text-xs text-gray-500 mt-2 text-right">
                  출처: {post.image_source}
                </p>
              )}
            </div>
          )}

          {/* 내용 */}
          <div className="prose max-w-none mb-6">
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>
          </div>

          {/* 원문 링크 (보도자료인 경우) */}
          {post.source_url && post.category === 'press' && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600">🔗</span>
                <span className="font-medium text-blue-900">원문 링크</span>
              </div>
              <a 
                href={post.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline break-all"
              >
                {post.source_url}
              </a>
            </div>
          )}

          {/* 바로가기 링크 (공지사항인 경우) */}
          {post.source_url && post.category === 'notice' && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-600">🔗</span>
                <span className="font-medium text-green-900">바로가기</span>
              </div>
              <a 
                href={post.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 underline break-all"
              >
                {post.source_url}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 후기 작성 모달 - 외부 클릭으로 닫기
const WritePostModal = ({ 
  onClose, 
  onSuccess 
}: { 
  onClose: () => void; 
  onSuccess: () => void; 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    program_type: '',
    rating: 5,
    auth_code: ''
  });
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // 모달 외부 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 이미지 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      alert('이미지는 최대 5장까지 업로드 가능합니다.');
      return;
    }
    
    setImages(prev => [...prev, ...files]);
    
    // 미리보기 생성
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  // 이미지 삭제
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 인증코드 검증
      const { data: authData, error: authError } = await supabase
        .from('applications_2025_09_29_16_15')
        .select('*')
        .eq('auth_code', formData.auth_code)
        .eq('status', '승인완료')
        .single();

      if (authError || !authData) {
        alert('유효하지 않은 인증코드입니다. 승인완료된 참가자만 후기를 작성할 수 있습니다.');
        setLoading(false);
        return;
      }

      // 이미지 업로드
      let uploadedImages: { url: string; name: string }[] = [];
      if (images.length > 0) {
        for (const image of images) {
          const fileName = `review_${Date.now()}_${Math.random().toString(36).substring(7)}_${image.name}`;
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

      // 후기 작성
      const { error } = await supabase
        .from('board_posts_2025_09_29_20_00')
        .insert([{
          category: 'review',
          title: formData.title,
          content: formData.content,
          program_type: formData.program_type,
          rating: formData.rating,
          author: authData.participant_name,
          author_email: authData.email || 'participant@snowpass.kr',
          views: 0,
          images: uploadedImages.length > 0 ? JSON.stringify(uploadedImages) : null,
          image_url: uploadedImages.length > 0 ? uploadedImages[0].url : null
        }]);

      if (error) throw error;

      alert('후기가 성공적으로 작성되었습니다!');
      onSuccess();
    } catch (error) {
      console.error('Error creating post:', error);
      alert('후기 작성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">참가후기 작성</h2>
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
            {/* 인증코드 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                참가자 인증코드 *
              </label>
              <input
                type="text"
                value={formData.auth_code}
                onChange={(e) => setFormData({ ...formData, auth_code: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="8자리 인증코드를 입력하세요"
                maxLength={8}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                참가신청 승인 시 발급된 인증코드를 입력하세요
              </p>
            </div>

            {/* 프로그램 종류 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                참가한 프로그램 *
              </label>
              <select
                value={formData.program_type}
                onChange={(e) => setFormData({ ...formData, program_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">선택하세요</option>
                <option value="찾아가는 스키캠프">찾아가는 스키캠프</option>
                <option value="평창눈동이 OJT 워크숍">평창눈동이 OJT 워크숍</option>
                <option value="스노우스포츠 체험캠프">스노우스포츠 체험캠프</option>
              </select>
            </div>

            {/* 별점 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                만족도 *
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
                placeholder="후기 제목을 입력하세요"
                required
              />
            </div>

            {/* 내용 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                후기 내용 *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="프로그램에 참가한 소감을 자유롭게 작성해주세요..."
                required
              />
            </div>

            {/* 이미지 업로드 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사진 첨부 (선택, 최대 5장)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                disabled={images.length >= 5}
              />
              {imagePreviews.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img src={preview} alt={`미리보기 ${index + 1}`} className="w-20 h-20 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 버튼 */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors"
                disabled={loading}
              >
                취소
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#223466] hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? '작성 중...' : '작성하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// 문의사항 작성 모달
const InquiryWriteModal = ({ 
  onClose, 
  onSuccess 
}: { 
  onClose: () => void; 
  onSuccess: () => void; 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    password: '',
    email: '',
    phone: '',
    is_private: false
  });
  const [loading, setLoading] = useState(false);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 비밀번호 5자리 숫자 검증
    if (!/^\d{5}$/.test(formData.password)) {
      alert('비밀번호는 5자리 숫자로 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('inquiry_posts_2025_10_13_01_30')
        .insert([{
          title: formData.title,
          content: formData.content,
          author: formData.author,
          password: formData.password,
          email: formData.email || null,
          phone: formData.phone || null,
          is_private: formData.is_private,
          views: 0,
          status: 'waiting'
        }]);

      if (error) throw error;

      alert('문의사항이 성공적으로 등록되었습니다!');
      onSuccess();
    } catch (error) {
      console.error('Error creating inquiry:', error);
      alert('문의사항 등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">문의사항 작성</h2>
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
                placeholder="문의 제목을 입력하세요"
                required
              />
            </div>

            {/* 작성자 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                작성자 *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="이름을 입력하세요"
                required
              />
            </div>

            {/* 비밀번호 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호 *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="5자리 숫자를 입력하세요"
                maxLength={5}
                pattern="\d{5}"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                문의사항 확인 시 필요한 5자리 숫자 비밀번호입니다.
              </p>
            </div>

            {/* 연락처 */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="이메일 주소 (선택사항)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연락처
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="연락처 (선택사항)"
                />
              </div>
            </div>

            {/* 내용 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                문의 내용 *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="문의하실 내용을 자세히 작성해주세요..."
                required
              />
            </div>

            {/* 비공개 설정 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_private"
                checked={formData.is_private}
                onChange={(e) => setFormData({ ...formData, is_private: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="is_private" className="text-sm text-gray-700">
                비공개 문의 (다른 사용자에게 보이지 않습니다)
              </label>
            </div>

            {/* 버튼 */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors"
                disabled={loading}
              >
                취소
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#223466] hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? '등록 중...' : '문의하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// 비밀번호 확인 모달
const PasswordModal = ({ 
  onClose, 
  onSubmit, 
  password, 
  setPassword 
}: { 
  onClose: () => void; 
  onSubmit: () => void; 
  password: string; 
  setPassword: (password: string) => void; 
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">비밀번호 확인</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                문의사항 작성 시 입력한 비밀번호를 입력하세요
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="5자리 숫자"
                maxLength={5}
                pattern="\d{5}"
                required
                autoFocus
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-medium transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#223466] hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
              >
                확인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// 문의사항 상세 모달
const InquiryDetailModal = ({ 
  post, 
  replies, 
  onClose, 
  onReplyAdded 
}: { 
  post: InquiryPost; 
  replies: InquiryReply[]; 
  onClose: () => void; 
  onReplyAdded: () => void; 
}) => {
  const [replyContent, setReplyContent] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 관리자 권한 확인 (localStorage 기반 임시 구현)
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !isAdmin) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('inquiry_replies_2025_10_13_01_30')
        .insert([{
          inquiry_id: post.id,
          content: replyContent,
          author: '관리자'
        }]);

      if (error) throw error;

      // 문의사항 상태를 '답변완료'로 업데이트
      await supabase
        .from('inquiry_posts_2025_10_13_01_30')
        .update({ status: 'answered' })
        .eq('id', post.id);

      setReplyContent('');
      onReplyAdded();
      alert('답변이 등록되었습니다.');
    } catch (error) {
      console.error('Error adding reply:', error);
      alert('답변 등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                post.status === 'answered' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {post.status === 'answered' ? '답변완료' : '답변대기'}
              </span>
              {post.is_private && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                  🔒 비공개
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 문의사항 내용 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-4 border-b border-gray-200">
              <span>👤 {post.author}</span>
              <span>📅 {formatDate(post.created_at)}</span>
              <span>👁️ {post.views}</span>
              {post.email && <span>📧 {post.email}</span>}
              {post.phone && <span>📞 {post.phone}</span>}
            </div>
            <div className="prose max-w-none">
              <div className="text-gray-700 whitespace-pre-wrap leading-relaxed bg-gray-50 p-4 rounded-lg">
                {post.content}
              </div>
            </div>
          </div>

          {/* 답변 목록 */}
          {replies.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">답변</h3>
              <div className="space-y-4">
                {replies.map((reply) => (
                  <div key={reply.id} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-blue-900">👨‍💼 {reply.author}</span>
                      <span className="text-sm text-blue-600">{formatDate(reply.created_at)}</span>
                    </div>
                    <div className="text-gray-700 whitespace-pre-wrap">
                      {reply.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 관리자 답변 작성 */}
          {isAdmin && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">답변 작성</h3>
              <form onSubmit={handleReplySubmit}>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                  placeholder="답변을 작성해주세요..."
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading || !replyContent.trim()}
                    className="bg-[#223466] hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {loading ? '등록 중...' : '답변 등록'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 갤러리 이미지 모달 - 다중 이미지 슬라이드 지원
const GalleryImageModal = ({ 
  gallery, 
  onClose 
}: { 
  gallery: BoardPost; 
  onClose: () => void; 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // 이미지 배열 파싱
  const getImages = () => {
    if (gallery.images) {
      try {
        const imageArray = JSON.parse(gallery.images);
        return imageArray.length > 0 ? imageArray : (gallery.image_url ? [{ url: gallery.image_url, source: gallery.image_source }] : []);
      } catch (error) {
        console.error('Error parsing images:', error);
        return gallery.image_url ? [{ url: gallery.image_url, source: gallery.image_source }] : [];
      }
    }
    return gallery.image_url ? [{ url: gallery.image_url, source: gallery.image_source }] : [];
  };

  const images = getImages();

  // 모달 외부 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 키보드 조작
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [images.length, onClose]);

  const nextImage = () => {
    setCurrentImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
  };

  if (images.length === 0) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
      >
        <div className="text-white text-center">
          <div className="text-6xl mb-4">📷</div>
          <p>이미지가 없습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-4xl w-full">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 이전/다음 버튼 (이미지가 2개 이상일 때만) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* 이미지 카운터 (이미지가 2개 이상일 때만) */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 rounded px-3 py-1 text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}

        {/* 이미지 */}
        <div className="bg-white rounded-lg overflow-hidden">
          <img 
            src={images[currentImageIndex].url}
            alt={gallery.title}
            className="w-full h-auto object-contain max-h-[70vh]"
          />
          
          {/* 이미지 출처 표시 */}
          {images[currentImageIndex].source && (
            <div className="px-6 py-2 bg-gray-50 border-t">
              <p className="text-xs text-gray-500 text-right">
                출처: {images[currentImageIndex].source}
              </p>
            </div>
          )}
          
          {/* 정보 */}
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{gallery.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>📅 {formatDate(gallery.created_at)}</span>
                  <span>👁️ {gallery.views}</span>
                </div>
              </div>
            </div>
            {gallery.content && (
              <div className="mt-4 text-gray-700 whitespace-pre-wrap">
                {gallery.content}
              </div>
            )}
          </div>
        </div>

        {/* 썸네일 네비게이션 (이미지가 2개 이상일 때만) */}
        {images.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;