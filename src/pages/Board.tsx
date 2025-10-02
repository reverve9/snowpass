import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BoardPost {
  id: number;
  category: string;
  title: string;
  content: string;
  author: string;
  author_email?: string;
  program_type?: string;
  rating?: number;
  important?: boolean;
  views: number;
  created_at: string;
  updated_at: string;
  images?: BoardImage[];
}

interface BoardImage {
  id: number;
  post_id: number;
  image_url: string;
  image_name?: string;
  upload_order: number;
}

const Board = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('notice');
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BoardPost | null>(null);
  const [editingPost, setEditingPost] = useState<BoardPost | null>(null);
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(false);

  // 날짜 형식 통일 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  // 게시물 목록 조회
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
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // 조회수 증가 함수 (강화된 중복 방지)
  // const [viewingPosts, setViewingPosts] = useState(new Set());
  
  const incrementViews = async (postId: number) => {
  try {
    console.log('조회수 증가 시도:', postId);
    
    // 현재 조회수 가져오기
    const { data: currentPost } = await supabase
      .from('board_posts_2025_09_29_20_00')
      .select('views')
      .eq('id', postId)
      .single();
    
    if (currentPost) {
      // 조회수 +1 업데이트
      const { error } = await supabase
        .from('board_posts_2025_09_29_20_00')
        .update({ views: currentPost.views + 1 })
        .eq('id', postId);
        
      if (error) {
        console.error('조회수 증가 에러:', error);
        return;
      }
      
      console.log('조회수 증가 성공!');
      
      // 로컬 상태 업데이트
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, views: currentPost.views + 1 }
            : post
        )
      );
    }
    
  } catch (error) {
    console.error('조회수 증가 catch 에러:', error);
  }
};

  // 게시물 삭제
  const deletePost = async (postId: number) => {
    alert('삭제 함수 호출됨! ID: ' + postId);
    
    try {
      console.log('삭제 시도:', postId);
      
      const { error } = await supabase
        .from('board_posts_2025_09_29_20_00')
        .delete()
        .eq('id', postId);

      if (error) {
        alert('삭제 에러: ' + error.message);
        console.error('Delete error:', error);
        return;
      }
      
      alert('데이터베이스 삭제 성공!');
      
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      setSelectedPost(null);
      alert('로컬 상태 업데이트 완료!');
      
    } catch (error) {
      alert('catch 에러: ' + error);
      console.error('Error deleting post:', error);
    }
  };

  // 게시물 수정 모달 열기
  const editPost = (post: BoardPost) => {
    alert('수정 함수 호출됨! 제목: ' + post.title);
    setEditingPost(post);
    setShowEditForm(true);
    setSelectedPost(null);
  };

  useEffect(() => {
    fetchPosts(activeMenu);
  }, [activeMenu]);

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
                  <div className="text-[16px] font-[700]">눈동이 패스포트 2.0 <span className="text-[13px] font-[300] text-gray-400 ml-2">HOME</span></div>
                </a>
                <a href="/#/programs" className="text-gray-500 hover:text-blue-600 font-medium text-left py-2">
                  <div className="text-[16px] font-[700]">프로그램 <span className="text-[13px] font-[300] text-gray-400 ml-2">PROGRAM</span></div>
                </a>
                <a href="/#/application" className="text-gray-500 hover:text-blue-600 font-medium text-left py-2">
                  <div className="text-[16px] font-[700]">참가 신청 <span className="text-[13px] font-[300] text-gray-400 ml-2">APPLICATION</span></div>
                </a>
                <a href="/#/board" className="text-blue-600 font-medium text-left py-2">
                  <div className="text-[16px] font-[700]">게시판 <span className="text-[13px] font-[300] text-blue-400 ml-2">BOARD</span></div>
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        {/* 게시물 상세 보기 모달 */}
        {selectedPost && (
          <PostDetailModal 
            post={selectedPost} 
            onClose={() => setSelectedPost(null)}
            onOpen={() => incrementViews(selectedPost.id)}
            onEdit={editPost}
            onDelete={deletePost}
            formatDate={formatDate}
          />
        )}

        {/* 글쓰기 폼 모달 (참가후기만) */}
        {showWriteForm && activeMenu === 'review' && (
          <WritePostModal 
            category={activeMenu}
            onClose={() => setShowWriteForm(false)}
            onSuccess={() => {
              setShowWriteForm(false);
              fetchPosts(activeMenu);
            }}
          />
        )}

        {/* 수정 폼 모달 */}
        {showEditForm && editingPost && (
          <EditPostModal 
            post={editingPost}
            onClose={() => {
              setShowEditForm(false);
              setEditingPost(null);
            }}
            onSuccess={() => {
              setShowEditForm(false);
              setEditingPost(null);
              fetchPosts(activeMenu);
            }}
          />
        )}

        {/* 데스크톱: 사이드바 + 콘텐츠 (3:7) */}
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
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  공지사항
                </button>
                <button
                  onClick={() => setActiveMenu('faq')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'faq' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  자주묻는질문
                </button>
                <button
                  onClick={() => setActiveMenu('gallery')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'gallery' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  활동갤러리
                </button>
                <button
                  onClick={() => setActiveMenu('review')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === 'review' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  참가후기
                </button>
              </nav>
            </div>
          </div>

          {/* 우측 콘텐츠 (70%) */}
          <div className="w-[70%]">
            {activeMenu === 'notice' && <NoticeBoard posts={posts} loading={loading} onPostClick={(post) => setSelectedPost(post)} formatDate={formatDate} />}
            {activeMenu === 'faq' && <FAQBoard posts={posts} loading={loading} />}
            {activeMenu === 'gallery' && <GalleryBoard posts={posts} loading={loading} formatDate={formatDate} />}
            {activeMenu === 'review' && (
              <ReviewBoard 
                posts={posts} 
                loading={loading} 
                onPostClick={(post) => setSelectedPost(post)}
                onWriteClick={() => setShowWriteForm(true)}
                formatDate={formatDate}
              />
            )}
          </div>
        </div>

        {/* 모바일: 탭 방식 */}
        <div className="md:hidden">
          {/* 모바일 탭 메뉴 */}
          <div className="bg-gray-50 rounded-lg p-2 mb-6">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveMenu('notice')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors text-sm ${
                  activeMenu === 'notice' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                공지사항
              </button>
              <button
                onClick={() => setActiveMenu('faq')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors text-sm ${
                  activeMenu === 'faq' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => setActiveMenu('gallery')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors text-sm ${
                  activeMenu === 'gallery' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                갤러리
              </button>
              <button
                onClick={() => setActiveMenu('review')}
                className={`py-3 px-4 rounded-lg text-center font-medium transition-colors text-sm ${
                  activeMenu === 'review' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                후기
              </button>
            </div>
          </div>

          {/* 모바일 콘텐츠 (전체 너비) */}
          <div className="w-full">
            {activeMenu === 'notice' && <NoticeBoard posts={posts} loading={loading} onPostClick={(post) => setSelectedPost(post)} formatDate={formatDate} />}
            {activeMenu === 'faq' && <FAQBoard posts={posts} loading={loading} />}
            {activeMenu === 'gallery' && <GalleryBoard posts={posts} loading={loading} formatDate={formatDate} />}
            {activeMenu === 'review' && (
              <ReviewBoard 
                posts={posts} 
                loading={loading} 
                onPostClick={(post) => setSelectedPost(post)}
                onWriteClick={() => setShowWriteForm(true)}
                formatDate={formatDate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 공지사항 컴포넌트
const NoticeBoard = ({ posts, loading, onPostClick, formatDate }: { posts: BoardPost[]; loading: boolean; onPostClick: (post: BoardPost) => void; formatDate: (date: string) => string }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'esamanru, sans-serif'}}>
          공지사항
        </h2>
        <div className="text-sm text-gray-500">
          총 {posts.length}개의 공지사항
        </div>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            등록된 공지사항이 없습니다.
          </div>
        ) : (
          posts.map((post) => (
            <div 
              key={post.id} 
              className="border-b border-gray-200 pb-4 hover:bg-gray-50 p-4 rounded-lg transition-colors cursor-pointer"
              onClick={() => onPostClick(post)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {post.important && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                        중요
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>📅 {formatDate(post.created_at)}</span>
                    <span>👁️ {post.views.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 자주묻는질문 컴포넌트
const FAQBoard = ({ posts, loading }: { posts: BoardPost[]; loading: boolean }) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const getCategoryFromTitle = (title: string) => {
    if (title.includes('참가비') || title.includes('비용')) return '참가비';
    if (title.includes('준비') || title.includes('준비물')) return '준비물';
    if (title.includes('안전')) return '안전';
    if (title.includes('취소') || title.includes('환불')) return '취소/환불';
    return '신청';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'esamanru, sans-serif'}}>
        자주묻는질문
      </h2>
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            등록된 FAQ가 없습니다.
          </div>
        ) : (
          posts.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {getCategoryFromTitle(faq.title)}
                  </span>
                  <span className="font-semibold text-gray-900">Q. {faq.title}</span>
                </div>
                <div className={`transform transition-transform ${openFAQ === faq.id ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openFAQ === faq.id && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <div className="pt-4 text-gray-700 leading-relaxed">
                    <span className="font-semibold text-blue-600">A. </span>
                    {faq.content}
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

// 활동갤러리 컴포넌트
const GalleryBoard = ({ posts, loading, formatDate }: { posts: BoardPost[]; loading: boolean; formatDate: (date: string) => string }) => {
  const [selectedGallery, setSelectedGallery] = useState<BoardPost | null>(null);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {selectedGallery && (
        <GalleryImageModal 
          gallery={selectedGallery} 
          onClose={() => setSelectedGallery(null)} 
        />
      )}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'esamanru, sans-serif'}}>
            활동갤러리
          </h2>
          <div className="text-sm text-gray-500">
            관리자만 업로드 가능
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            등록된 갤러리가 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {posts.map((item) => (
              <div 
                key={item.id} 
                className="cursor-pointer group"
                onClick={() => setSelectedGallery(item)}
              >
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-3 group-hover:shadow-lg transition-shadow">
                  <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:text-gray-600 transition-colors">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-xs">📷</span>
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center justify-between">
                    <span>📅 {formatDate(item.created_at)}</span>
                    <span>👁️ {item.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

// 참가후기 컴포넌트
const ReviewBoard = ({ 
  posts, 
  loading, 
  onPostClick, 
  onWriteClick,
  formatDate
}: { 
  posts: BoardPost[]; 
  loading: boolean; 
  onPostClick: (post: BoardPost) => void;
  onWriteClick: () => void;
  formatDate: (date: string) => string;
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ⭐
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'esamanru, sans-serif'}}>
          참가후기
        </h2>
        <button
          onClick={onWriteClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
        >
          후기 작성하기
        </button>
      </div>
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            등록된 후기가 없습니다.
          </div>
        ) : (
          posts.map((review) => (
            <div 
              key={review.id} 
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onPostClick(review)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{review.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span>👤 {review.author}</span>
                    <span>📅 {formatDate(review.created_at)}</span>
                    {review.program_type && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {review.program_type}
                      </span>
                    )}
                  </div>
                  {review.rating && (
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(review.rating)}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed line-clamp-3">{review.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 게시물 상세 보기 모달 (수정/삭제 버튼 포함)
const PostDetailModal = ({ 
  post, 
  onClose, 
  onOpen, 
  onEdit, 
  onDelete, 
  formatDate 
}: { 
  post: BoardPost; 
  onClose: () => void; 
  onOpen?: () => void; 
  onEdit?: (post: BoardPost) => void;
  onDelete?: (postId: number) => void;
  formatDate: (date: string) => string;
}) => {
  const [hasIncremented, setHasIncremented] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ⭐
      </span>
    ));
  };

  useEffect(() => {
    if (onOpen && !hasIncremented) {
      onOpen();
      setHasIncremented(true);
    }
  }, []); // 빈 의존성 배열로 한 번만 실행

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
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
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>👤 {post.author}</span>
                <span>📅 {formatDate(post.created_at)}</span>
                <span>👁️ {post.views.toLocaleString()}</span>
                {post.rating && (
                  <div className="flex items-center gap-1">
                    {renderStars(post.rating)}
                  </div>
                )}
              </div>
            </div>
            
            {/* 수정/삭제 버튼 - 테스트용 */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  alert('수정 함수 확인: ' + (onEdit ? '있음' : '없음'));
                  if (onEdit) onEdit(post);
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >
                수정
              </button>
              <button
                onClick={() => {
                  alert('삭제 함수 확인: ' + (onDelete ? '있음' : '없음'));
                  if (confirm('정말 삭제하시겠습니까?') && onDelete) {
                    onDelete(post.id);
                  }
                }}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                삭제
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
              >
                닫기
              </button>
            </div>
          </div>

          <div className="prose max-w-none mb-6">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {post.content}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 글쓰기 폼 모달
const WritePostModal = ({ 
  category, 
  onClose, 
  onSuccess 
}: { 
  category: string; 
  onClose: () => void; 
  onSuccess: () => void; 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    program_type: '',
    rating: 5,
    auth_code: ''
  });
  const [loading, setLoading] = useState(false);
  const [authVerified, setAuthVerified] = useState(false);

  const verifyAuthCode = async () => {
    if (!formData.auth_code.trim()) {
      alert('인증코드를 입력해주세요.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('applications_2025_09_29_16_15')
        .select('*')
        .eq('auth_code', formData.auth_code.trim())
        .eq('status', '승인완료')
        .single();

      if (error || !data) {
        alert('유효하지 않은 인증코드입니다.\n승인완료된 참가자만 후기를 작성할 수 있습니다.');
        return;
      }

      setAuthVerified(true);
      setFormData({ 
        ...formData, 
        author: data.participant_name,
        program_type: data.program_type === 'ski-camp' ? '찾아가는 스키캠프' :
                     data.program_type === 'ojt-workshop' ? '평창눈동이 OJT 워크숍' :
                     data.program_type === 'snow-camp' ? '스노우스포츠 체험캠프' : ''
      });

      alert('인증이 완료되었습니다! 후기를 작성해주세요.');
    } catch (error) {
      console.error('Error verifying auth code:', error);
      alert('인증코드 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authVerified) {
      alert('먼저 인증코드를 확인해주세요.');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('board_management_2025_09_29_20_00', {
        body: {
          category,
          title: formData.title,
          content: formData.content,
          author: formData.author,
          program_type: formData.program_type,
          rating: formData.rating,
          author_email: 'user@example.com'
        }
      });

      if (error) throw error;

      if (data.success) {
        alert('후기가 성공적으로 작성되었습니다.');
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('후기 작성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">참가후기 작성</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!authVerified && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">🔐 참가자 인증</h3>
                <p className="text-sm text-blue-700 mb-4">
                  실제 참가자만 후기를 작성할 수 있습니다.<br />
                  신청확인 페이지에서 확인한 인증코드를 입력해주세요.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.auth_code}
                    onChange={(e) => setFormData({ ...formData, auth_code: e.target.value.toUpperCase() })}
                    placeholder="인증코드 입력 (예: ABC123XY)"
                    className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                    maxLength={8}
                  />
                  <button
                    type="button"
                    onClick={verifyAuthCode}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    확인
                  </button>
                </div>
              </div>
            )}

            {authVerified && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">작성자</label>
                  <input
                    type="text"
                    value={formData.author}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">참가 프로그램</label>
                  <input
                    type="text"
                    value={formData.program_type}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">만족도 *</label>
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
                    <span className="ml-2 text-sm text-gray-600">{formData.rating}점</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">제목 *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">내용 *</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="참가하신 프로그램에 대한 솔직한 후기를 작성해주세요."
                    required
                  />
                </div>
              </>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                취소
              </button>
              {authVerified && (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? '작성 중...' : '작성하기'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// 수정 폼 모달
const EditPostModal = ({ 
  post, 
  onClose, 
  onSuccess 
}: { 
  post: BoardPost; 
  onClose: () => void; 
  onSuccess: () => void; 
}) => {
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    rating: post.rating || 5
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('board_posts_2025_09_29_20_00')
        .update({
          title: formData.title,
          content: formData.content,
          rating: formData.rating,
          updated_at: new Date().toISOString()
        })
        .eq('id', post.id);

      if (error) throw error;

      alert('게시물이 수정되었습니다.');
      onSuccess();
    } catch (error) {
      console.error('Error updating post:', error);
      alert('수정 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">게시물 수정</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">제목 *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {post.category === 'review' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">만족도</label>
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
                  <span className="ml-2 text-sm text-gray-600">{formData.rating}점</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">내용 *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

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
                {loading ? '수정 중...' : '수정하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// 갤러리 이미지 슬라이드 모달
const GalleryImageModal = ({ onClose }: { gallery: BoardPost; onClose: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    { id: 1, url: '/images/gallery-1.jpg', name: '활동사진 1' },
    { id: 2, url: '/images/gallery-2.jpg', name: '활동사진 2' },
    { id: 3, url: '/images/gallery-3.jpg', name: '활동사진 3' },
    { id: 4, url: '/images/gallery-4.jpg', name: '활동사진 4' },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="relative w-[800px] max-w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative">
          <div className="w-full h-[600px] bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
            <div className="text-white text-center">
              <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg opacity-75">{images[currentImageIndex].name}</p>
            </div>
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? 'bg-white' 
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-4 text-white text-sm opacity-75">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default Board;