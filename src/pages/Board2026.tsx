import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BoardPost {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  views: number;
  category: string;
  important?: boolean;
  program_type?: string;
  rating?: number;
  source_url?: string;
  image_url?: string;
  images?: string;
  file_url?: string;
  file_name?: string;
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

const Board2026 = () => {
  const [activeMenu, setActiveMenu] = useState('notice');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 파비콘 설정
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
                <span className="text-white font-medium text-base group-hover:text-yellow-200">참가신청</span>
                <span className="text-white/90 text-xs mt-1">APPLICATION</span>
              </a>
              <a href="/#/board2026" className="group flex flex-col items-center">
                <span className="text-yellow-200 font-medium text-base">게시판</span>
                <span className="text-yellow-200/70 text-xs mt-1">BOARD</span>
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
              <a href="/#/application2026" className="block text-white">참가신청 <span className="text-white/90 text-sm">APPLICATION</span></a>
              <a href="/#/board2026" className="block text-yellow-200">게시판 <span className="text-yellow-200/70 text-sm">BOARD</span></a>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="hidden md:flex gap-8">
          <div className="w-[30%]">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">게시판</h2>
              <nav className="space-y-2">
                {[{k:'notice',v:'공지사항'},{k:'press',v:'보도자료'},{k:'faq',v:'자주 묻는 질문'}].map(m => (
                  <button key={m.k} onClick={() => setActiveMenu(m.k)} className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeMenu === m.k ? 'bg-[#6366f1] text-white' : 'text-gray-700 hover:bg-gray-200'}`}>{m.v}</button>
                ))}
                {/* 문의사항 하위메뉴 */}
                <div className="pt-2">
                  <div className="px-4 py-2 text-sm font-semibold text-gray-500">문의사항</div>
                  <button onClick={() => setActiveMenu('inquiry')} className={`w-full text-left px-6 py-2 rounded-lg transition-colors text-sm ${activeMenu === 'inquiry' ? 'bg-[#6366f1] text-white' : 'text-gray-600 hover:bg-gray-200'}`}>일반 문의</button>
                  <button onClick={() => setActiveMenu('modify')} className={`w-full text-left px-6 py-2 rounded-lg transition-colors text-sm ${activeMenu === 'modify' || activeMenu === 'modify-write' ? 'bg-[#6366f1] text-white' : 'text-gray-600 hover:bg-gray-200'}`}>신청서 수정요청</button>
                </div>
                {[{k:'gallery',v:'활동 갤러리'},{k:'review',v:'참가 후기'}].map(m => (
                  <button key={m.k} onClick={() => setActiveMenu(m.k)} className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeMenu === m.k ? 'bg-[#6366f1] text-white' : 'text-gray-700 hover:bg-gray-200'}`}>{m.v}</button>
                ))}
              </nav>
              <div className="border-t pt-4 mt-4"><a href="/#/admin2026" className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-red-100">🔒 관리자 페이지</a></div>
            </div>
          </div>
          <div className="w-[70%]">
            {activeMenu === 'notice' && <NoticeBoard2026 />}
            {activeMenu === 'press' && <PressBoard2026 />}
            {activeMenu === 'faq' && <FAQBoard2026 />}
            {activeMenu === 'inquiry' && <InquiryBoard2026 />}
            {activeMenu === 'modify' && <ModificationRequestBoard2026 onWrite={() => setActiveMenu('modify-write')} />}
            {activeMenu === 'modify-write' && <ModificationWritePage onBack={() => setActiveMenu('modify')} />}
            {activeMenu === 'gallery' && <GalleryBoard2026 />}
            {activeMenu === 'review' && <ReviewBoard2026 />}
          </div>
        </div>
        <div className="md:hidden">
          <div className="bg-gray-50 rounded-lg p-2 mb-6">
            <div className="grid grid-cols-3 gap-2 mb-2">
              {[{k:'notice',v:'공지'},{k:'press',v:'보도'},{k:'faq',v:'FAQ'}].map(m => (
                <button key={m.k} onClick={() => setActiveMenu(m.k)} className={`py-3 px-2 rounded-lg text-center text-sm font-medium ${activeMenu === m.k ? 'bg-[#6366f1] text-white' : 'text-gray-700'}`}>{m.v}</button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button onClick={() => setActiveMenu('inquiry')} className={`py-3 px-2 rounded-lg text-center text-sm font-medium ${activeMenu === 'inquiry' ? 'bg-[#6366f1] text-white' : 'text-gray-700'}`}>일반문의</button>
              <button onClick={() => setActiveMenu('modify')} className={`py-3 px-2 rounded-lg text-center text-sm font-medium ${activeMenu === 'modify' || activeMenu === 'modify-write' ? 'bg-[#6366f1] text-white' : 'text-gray-700'}`}>수정요청</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[{k:'gallery',v:'갤러리'},{k:'review',v:'후기'}].map(m => (
                <button key={m.k} onClick={() => setActiveMenu(m.k)} className={`py-3 px-2 rounded-lg text-center text-sm font-medium ${activeMenu === m.k ? 'bg-[#6366f1] text-white' : 'text-gray-700'}`}>{m.v}</button>
              ))}
            </div>
          </div>
          {activeMenu === 'notice' && <NoticeBoard2026 />}
          {activeMenu === 'press' && <PressBoard2026 />}
          {activeMenu === 'faq' && <FAQBoard2026 />}
          {activeMenu === 'inquiry' && <InquiryBoard2026 />}
          {activeMenu === 'modify' && <ModificationRequestBoard2026 onWrite={() => setActiveMenu('modify-write')} />}
          {activeMenu === 'modify-write' && <ModificationWritePage onBack={() => setActiveMenu('modify')} />}
          {activeMenu === 'gallery' && <GalleryBoard2026 />}
          {activeMenu === 'review' && <ReviewBoard2026 />}
        </div>
      </div>
      
    </div>
  );
};

const formatDate = (d: string) => { const date = new Date(d); return `${date.getFullYear()}/${String(date.getMonth()+1).padStart(2,'0')}/${String(date.getDate()).padStart(2,'0')}`; };
const incrementViews = async (id: number) => { const { data } = await supabase.from('board_posts_2026').select('views').eq('id', id).single(); await supabase.from('board_posts_2026').update({ views: (data?.views||0)+1 }).eq('id', id); };

// 영상 URL 파싱 헬퍼 함수
const getVideoEmbed = (url: string) => {
  if (!url) return null;
  
  // YouTube (si 파라미터 등 추가 쿼리 지원)
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return { type: 'youtube', id: ytMatch[1] };
  }
  
  // Instagram Reel/Post
  const igMatch = url.match(/instagram\.com\/(?:reel|p)\/([a-zA-Z0-9_-]+)/);
  if (igMatch) {
    return { type: 'instagram', id: igMatch[1], url };
  }
  
  return null;
};

// 영상 임베드 컴포넌트
const VideoEmbed = ({ url }: { url: string }) => {
  const video = getVideoEmbed(url);
  
  if (!video) return null;
  
  if (video.type === 'youtube') {
    return (
      <div className="aspect-video w-full rounded-lg overflow-hidden mb-4">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  
  if (video.type === 'instagram') {
    return (
      <div className="w-full rounded-lg overflow-hidden mb-4">
        <iframe
          src={`https://www.instagram.com/reel/${video.id}/embed`}
          className="w-full"
          style={{ minHeight: '500px' }}
          allowFullScreen
        />
      </div>
    );
  }
  
  return null;
};

// 1. 공지사항
const NoticeBoard2026 = () => {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [openItems, setOpenItems] = useState<number[]>([]);

  useEffect(() => { (async () => { const { data } = await supabase.from('board_posts_2026').select('*').eq('category','notice').order('important',{ascending:false}).order('created_at',{ascending:false}); setPosts(data||[]); setLoading(false); })(); }, []);

  const toggle = async (post: BoardPost) => {
    if (!openItems.includes(post.id)) { await incrementViews(post.id); setPosts(p => p.map(x => x.id===post.id ? {...x, views:x.views+1} : x)); }
    setOpenItems(p => p.includes(post.id) ? p.filter(i=>i!==post.id) : [...p, post.id]);
  };

  if (loading) return <div className="bg-white rounded-lg shadow-md p-8 text-center">로딩 중...</div>;
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">공지사항</h2>
      <div className="space-y-3">
        {posts.length === 0 ? <div className="text-center py-8 text-gray-500">등록된 공지사항이 없습니다.</div> : posts.map(post => (
          <div key={post.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => toggle(post)} className="w-full px-6 py-4 text-left hover:bg-gray-50 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {post.important && <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-medium">중요</span>}
                  <span className="font-semibold text-gray-900">{post.title}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500"><span>관리자</span><span>{formatDate(post.created_at)}</span><span>👁️ {post.views}</span></div>
              </div>
              <svg className={`w-5 h-5 text-gray-500 transition-transform ${openItems.includes(post.id)?'rotate-180':''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
            </button>
            {openItems.includes(post.id) && (
              <div className="px-6 py-4 bg-gray-50 border-t">
                <div className="text-gray-700 whitespace-pre-wrap mb-4">{post.content}</div>
                {post.file_url && <div className="p-3 bg-white rounded-lg border"><a href={post.file_url} target="_blank" rel="noopener noreferrer" className="text-[#6366f1] hover:underline">📎 {post.file_name||'첨부파일'} [다운로드]</a></div>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. 보도자료
const PressBoard2026 = () => {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BoardPost|null>(null);

  useEffect(() => { (async () => { const { data } = await supabase.from('board_posts_2026').select('*').eq('category','press').order('created_at',{ascending:false}); setPosts(data||[]); setLoading(false); })(); }, []);

  const handleClick = async (post: BoardPost) => { await incrementViews(post.id); setPosts(p => p.map(x => x.id===post.id ? {...x,views:x.views+1} : x)); setSelected(post); };

  if (loading) return <div className="bg-white rounded-lg shadow-md p-8 text-center">로딩 중...</div>;
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">보도자료</h2>
      {posts.length === 0 ? <div className="text-center py-8 text-gray-500">등록된 보도자료가 없습니다.</div> : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map(post => {
            const video = post.source_url ? getVideoEmbed(post.source_url) : null;
            const ytThumbnail = video?.type === 'youtube' ? `https://img.youtube.com/vi/${video.id}/hqdefault.jpg` : null;
            const thumbnail = post.image_url || ytThumbnail;
            
            return (
              <div key={post.id} onClick={() => handleClick(post)} className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg">
                <div className="aspect-video bg-gray-200 flex items-center justify-center relative">
                  {thumbnail ? <img src={thumbnail} alt={post.title} className="w-full h-full object-cover"/> : <span className="text-4xl text-gray-400">📰</span>}
                  {video && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <span className="text-2xl">▶️</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3"><h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">{post.title}</h3><div className="flex items-center gap-2 text-xs text-gray-500"><span>{formatDate(post.created_at)}</span><span>👁️ {post.views}</span>{video && <span className="text-red-500">🎬</span>}</div></div>
              </div>
            );
          })}
        </div>
      )}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div><h2 className="text-xl font-bold text-gray-900">{selected.title}</h2><div className="text-sm text-gray-500 mt-1">{formatDate(selected.created_at)} | 👁️ {selected.views}</div></div>
                <button onClick={() => setSelected(null)} className="text-gray-500 text-2xl">&times;</button>
              </div>
              {selected.source_url && getVideoEmbed(selected.source_url) && <VideoEmbed url={selected.source_url} />}
              {selected.image_url && !getVideoEmbed(selected.source_url || '') && <img src={selected.image_url} alt={selected.title} className="w-full rounded-lg mb-4"/>}
              <div className="text-gray-700 whitespace-pre-wrap mb-4">{selected.content}</div>
              {selected.source_url && !getVideoEmbed(selected.source_url) && <div className="pt-4 border-t"><a href={selected.source_url} target="_blank" rel="noopener noreferrer" className="text-[#6366f1] hover:underline">🔗 원문보기</a></div>}
              {selected.source_url && getVideoEmbed(selected.source_url) && <div className="pt-4 border-t"><a href={selected.source_url} target="_blank" rel="noopener noreferrer" className="text-[#6366f1] hover:underline">🔗 원본 링크로 보기</a></div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 3. FAQ
const FAQBoard2026 = () => {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [openItems, setOpenItems] = useState<number[]>([]);

  useEffect(() => { (async () => { const { data } = await supabase.from('board_posts_2026').select('*').eq('category','faq').order('created_at',{ascending:false}); setPosts(data||[]); setLoading(false); })(); }, []);

  if (loading) return <div className="bg-white rounded-lg shadow-md p-8 text-center">로딩 중...</div>;
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">자주 묻는 질문</h2>
      <div className="space-y-3">
        {posts.length === 0 ? <div className="text-center py-8 text-gray-500">등록된 FAQ가 없습니다.</div> : posts.map(post => (
          <div key={post.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => setOpenItems(p => p.includes(post.id) ? p.filter(i=>i!==post.id) : [...p,post.id])} className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 flex items-center justify-between">
              <span className="font-semibold text-gray-900">Q. {post.title}</span>
              <svg className={`w-5 h-5 text-gray-500 transition-transform ${openItems.includes(post.id)?'rotate-180':''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
            </button>
            {openItems.includes(post.id) && <div className="px-6 py-4 bg-white border-t"><div className="text-gray-700 whitespace-pre-wrap">A. {post.content}</div></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. 문의사항
const InquiryBoard2026 = () => {
  const [posts, setPosts] = useState<InquiryPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<InquiryPost|null>(null);
  const [showWrite, setShowWrite] = useState(false);
  const [replies, setReplies] = useState<InquiryReply[]>([]);
  const [showPw, setShowPw] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pending, setPending] = useState<InquiryPost|null>(null);

  useEffect(() => { fetchPosts(); }, []);
  const fetchPosts = async () => { const { data } = await supabase.from('inquiry_posts_2026').select('*').order('created_at',{ascending:false}); setPosts(data||[]); setLoading(false); };
  const fetchReplies = async (id: number) => { 
    const { data, error } = await supabase.from('inquiry_replies_2026').select('*').eq('inquiry_id',id).order('created_at',{ascending:true}); 
    console.log('fetchReplies - id:', id, 'data:', data, 'error:', error);
    setReplies(data||[]); 
  };

  const handleClick = (post: InquiryPost) => { setPending(post); setShowPw(true); setPwInput(''); };
  const handlePwSubmit = async () => {
    if (!pending) return;
    if (pwInput === pending.password) {
      await supabase.from('inquiry_posts_2026').update({views:pending.views+1}).eq('id',pending.id);
      setPosts(p => p.map(x => x.id===pending.id ? {...x,views:x.views+1} : x));
      setSelected(pending); await fetchReplies(pending.id); setShowPw(false); setPending(null);
    } else { alert('비밀번호가 일치하지 않습니다.'); }
  };

  if (loading) return <div className="bg-white rounded-lg shadow-md p-8 text-center">로딩 중...</div>;
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">문의사항</h2>
        <button onClick={() => setShowWrite(true)} className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded-lg font-medium">✏️ 문의하기</button>
      </div>
      <div className="space-y-3">
        {posts.length === 0 ? <div className="text-center py-8 text-gray-500">등록된 문의사항이 없습니다.</div> : posts.map(post => (
          <div key={post.id} onClick={() => handleClick(post)} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${post.status==='answered'?'bg-green-100 text-green-800':'bg-yellow-100 text-yellow-800'}`}>{post.status==='answered'?'답변완료':'답변대기'}</span>
              {post.is_private && <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">🔒 비공개</span>}
              <h3 className="font-semibold text-gray-900">{post.title}</h3>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500"><span>👤 {post.author}</span><span>📅 {formatDate(post.created_at)}</span><span>👁️ {post.views}</span></div>
          </div>
        ))}
      </div>
      {showWrite && <InquiryWriteModal onClose={() => setShowWrite(false)} onSuccess={() => { setShowWrite(false); fetchPosts(); }} />}
      {showPw && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowPw(false)}>
          <div className="bg-white rounded-lg max-w-sm w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">비밀번호 확인</h3>
            <input type="password" value={pwInput} onChange={e => setPwInput(e.target.value)} placeholder="비밀번호를 입력하세요" className="w-full px-3 py-2 border rounded-lg mb-4" onKeyPress={e => e.key==='Enter' && handlePwSubmit()} />
            <div className="flex gap-2"><button onClick={() => setShowPw(false)} className="flex-1 py-2 border rounded-lg">취소</button><button onClick={handlePwSubmit} className="flex-1 py-2 bg-[#6366f1] text-white rounded-lg">확인</button></div>
          </div>
        </div>
      )}
      {selected && <InquiryDetailModal post={selected} replies={replies} onClose={() => { setSelected(null); setReplies([]); }} />}
    </div>
  );
};

const InquiryWriteModal = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
  const [form, setForm] = useState({ title:'', content:'', author:'', password:'', email:'', phone:'', is_private:false });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length !== 5 || !/^\d+$/.test(form.password)) { alert('비밀번호는 5자리 숫자로 입력해주세요.'); return; }
    setLoading(true);
    const { error } = await supabase.from('inquiry_posts_2026').insert([{ ...form, views:0, status:'waiting' }]);
    if (!error) { alert('문의가 등록되었습니다.'); onSuccess(); } else { alert('등록 실패'); }
    setLoading(false);
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">문의사항 작성</h2><button onClick={onClose} className="text-gray-500 text-2xl">&times;</button></div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label><input type="text" value={form.title} onChange={e => setForm(p=>({...p,title:e.target.value}))} placeholder="문의 제목을 입력하세요" className="w-full px-3 py-2 border rounded-lg" required /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">작성자 *</label><input type="text" value={form.author} onChange={e => setForm(p=>({...p,author:e.target.value}))} placeholder="이름을 입력하세요" className="w-full px-3 py-2 border rounded-lg" required /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 *</label><input type="password" value={form.password} onChange={e => setForm(p=>({...p,password:e.target.value}))} placeholder="5자리 숫자를 입력하세요" maxLength={5} className="w-full px-3 py-2 border rounded-lg" required /><p className="text-xs text-gray-500 mt-1">문의사항 확인 시 필요한 5자리 숫자 비밀번호입니다.</p></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">이메일</label><input type="email" value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} placeholder="이메일 주소 (선택사항)" className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">연락처</label><input type="tel" value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} placeholder="연락처 (선택사항)" className="w-full px-3 py-2 border rounded-lg" /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">문의 내용 *</label><textarea value={form.content} onChange={e => setForm(p=>({...p,content:e.target.value}))} rows={5} placeholder="문의하실 내용을 자세히 작성해주세요..." className="w-full px-3 py-2 border rounded-lg" required /></div>
            <div className="flex items-center gap-2"><input type="checkbox" id="is_private" checked={form.is_private} onChange={e => setForm(p=>({...p,is_private:e.target.checked}))} /><label htmlFor="is_private" className="text-sm text-gray-700">비공개 문의 (다른 사용자에게 보이지 않습니다)</label></div>
            <div className="flex gap-3 pt-2"><button type="button" onClick={onClose} className="flex-1 py-3 border rounded-lg font-medium">취소</button><button type="submit" disabled={loading} className="flex-1 py-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg font-medium">{loading ? '등록 중...' : '문의하기'}</button></div>
          </form>
        </div>
      </div>
    </div>
  );
};

const InquiryDetailModal = ({ post, replies, onClose }: { post: InquiryPost; replies: InquiryReply[]; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2"><span className={`px-2 py-1 rounded text-xs font-medium ${post.status==='answered'?'bg-green-100 text-green-800':'bg-yellow-100 text-yellow-800'}`}>{post.status==='answered'?'답변완료':'답변대기'}</span><h2 className="text-xl font-bold text-gray-900">{post.title}</h2></div>
          <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4 pb-4 border-b"><span>👤 {post.author}</span><span>📅 {formatDate(post.created_at)}</span><span>👁️ {post.views}</span></div>
        <div className="text-gray-700 whitespace-pre-wrap mb-6">{post.content}</div>
        {replies.length > 0 && (
          <div className="border-t pt-6"><h3 className="font-semibold text-gray-900 mb-4">답변</h3>
            {replies.map(r => <div key={r.id} className="bg-purple-50 rounded-lg p-4 mb-3"><div className="flex items-center gap-2 mb-2"><span className="bg-[#6366f1] text-white px-2 py-1 rounded text-xs">관리자</span><span className="text-sm text-gray-500">{formatDate(r.created_at)}</span></div><div className="text-gray-700 whitespace-pre-wrap">{r.content}</div></div>)}
          </div>
        )}
      </div>
    </div>
  </div>
);

// 5. 활동 갤러리
const GalleryBoard2026 = () => {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BoardPost|null>(null);

  useEffect(() => { (async () => { const { data } = await supabase.from('board_posts_2026').select('*').eq('category','gallery').order('created_at',{ascending:false}); setPosts(data||[]); setLoading(false); })(); }, []);

  const handleClick = async (post: BoardPost) => { await incrementViews(post.id); setPosts(p => p.map(x => x.id===post.id ? {...x,views:x.views+1} : x)); setSelected(post); };
  const getFirstImg = (post: BoardPost) => { if (post.images) { try { const arr = JSON.parse(post.images); return arr[0]?.url||null; } catch { return null; } } return post.image_url||null; };

  if (loading) return <div className="bg-white rounded-lg shadow-md p-8 text-center">로딩 중...</div>;
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">활동 갤러리</h2>
      {posts.length === 0 ? <div className="text-center py-8 text-gray-500">등록된 갤러리가 없습니다.</div> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map(item => {
            const img = getFirstImg(item);
            return (
              <div key={item.id} onClick={() => handleClick(item)} className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg">
                <div className="aspect-square bg-gray-200 flex items-center justify-center">{img ? <img src={img} alt={item.title} className="w-full h-full object-cover"/> : <span className="text-4xl text-gray-400">📷</span>}</div>
                <div className="p-3"><h3 className="font-semibold text-gray-900 text-sm mb-1">📷 {item.title}</h3><div className="flex items-center justify-between text-xs text-gray-500"><span>{formatDate(item.created_at)}</span><span>👁️ {item.views}</span></div></div>
              </div>
            );
          })}
        </div>
      )}
      {selected && <GalleryModal gallery={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

const GalleryModal = ({ gallery, onClose }: { gallery: BoardPost; onClose: () => void }) => {
  const [idx, setIdx] = useState(0);
  const getImages = () => { if (gallery.images) { try { const arr = JSON.parse(gallery.images); return arr.length>0 ? arr : (gallery.image_url ? [{url:gallery.image_url}] : []); } catch { return gallery.image_url ? [{url:gallery.image_url}] : []; } } return gallery.image_url ? [{url:gallery.image_url}] : []; };
  const images = getImages();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key==='ArrowLeft') setIdx(p => p>0?p-1:images.length-1); else if (e.key==='ArrowRight') setIdx(p => p<images.length-1?p+1:0); else if (e.key==='Escape') onClose(); };
    window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey);
  }, [images.length, onClose]);

  if (images.length === 0) return <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={onClose}><div className="text-white text-center"><div className="text-6xl mb-4">📷</div><p>이미지가 없습니다</p></div></div>;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 z-10"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg></button>
        {images.length > 1 && (
          <>
            <div className="absolute top-4 left-4 text-white bg-black/50 rounded px-3 py-1 text-sm">{idx+1} / {images.length}</div>
            <button onClick={() => setIdx(p => p>0?p-1:images.length-1)} className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg></button>
            <button onClick={() => setIdx(p => p<images.length-1?p+1:0)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg></button>
          </>
        )}
        <div className="bg-white rounded-lg overflow-hidden">
          <img src={images[idx].url} alt={gallery.title} className="w-full h-auto object-contain max-h-[70vh]"/>
          <div className="p-6"><h3 className="text-xl font-bold text-gray-900 mb-2">{gallery.title}</h3><div className="flex items-center gap-4 text-sm text-gray-500"><span>📅 {formatDate(gallery.created_at)}</span><span>👁️ {gallery.views}</span></div>{gallery.content && <div className="mt-4 text-gray-700 whitespace-pre-wrap">{gallery.content}</div>}</div>
        </div>
        {images.length > 1 && <div className="flex justify-center mt-4 gap-2">{images.map((_:any, i:number) => <button key={i} onClick={() => setIdx(i)} className={`w-3 h-3 rounded-full ${i===idx?'bg-white':'bg-white/50'}`}/>)}</div>}
      </div>
    </div>
  );
};

// 6. 참가 후기
const ReviewBoard2026 = () => {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BoardPost|null>(null);
  const [showWrite, setShowWrite] = useState(false);

  useEffect(() => { fetchPosts(); }, []);
  const fetchPosts = async () => { const { data } = await supabase.from('board_posts_2026').select('*').eq('category','review').order('created_at',{ascending:false}); setPosts(data||[]); setLoading(false); };

  const handleClick = async (post: BoardPost) => { await incrementViews(post.id); setPosts(p => p.map(x => x.id===post.id ? {...x,views:x.views+1} : x)); setSelected(post); };
  const stars = (r: number=0) => '⭐'.repeat(r) + '☆'.repeat(5-r);

  if (loading) return <div className="bg-white rounded-lg shadow-md p-8 text-center">로딩 중...</div>;
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">참가 후기</h2>
        <button onClick={() => setShowWrite(true)} className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded-lg font-medium">✏️ 후기 작성</button>
      </div>
      <div className="space-y-3">
        {posts.length === 0 ? <div className="text-center py-8 text-gray-500">등록된 후기가 없습니다.</div> : posts.map(post => (
          <div key={post.id} onClick={() => handleClick(post)} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
            <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-2"><span>👤 {post.author}</span><span>📅 {formatDate(post.created_at)}</span><span>👁️ {post.views}</span>{post.program_type && <span className="text-[#6366f1]">📋 {post.program_type}</span>}</div>
            {post.rating && <div className="text-yellow-500">{stars(post.rating)}</div>}
          </div>
        ))}
      </div>
      {showWrite && <ReviewWriteModal onClose={() => setShowWrite(false)} onSuccess={() => { setShowWrite(false); fetchPosts(); }} />}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4"><h2 className="text-xl font-bold text-gray-900">{selected.title}</h2><button onClick={() => setSelected(null)} className="text-gray-500 text-2xl">&times;</button></div>
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-2"><span>👤 {selected.author}</span><span>📅 {formatDate(selected.created_at)}</span><span>👁️ {selected.views}</span></div>
              {selected.program_type && <div className="text-sm text-[#6366f1] mb-2">📋 {selected.program_type}</div>}
              {selected.rating && <div className="text-yellow-500 mb-4">{stars(selected.rating)}</div>}
              <div className="text-gray-700 whitespace-pre-wrap border-t pt-4">{selected.content}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ReviewWriteModal = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
  const [form, setForm] = useState({ auth_code:'', program_type:'', title:'', content:'', rating:0, author:'' });
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const rounds = ['1회차 (02.01~02.02)','2회차 (02.03~02.05)','3회차 (02.08~02.10)','4회차 (02.10~02.12)','5회차 (02.22~02.24)','6회차 (02.25~02.27)'];

  const verify = async () => {
    if (!form.auth_code) { alert('인증코드를 입력해주세요.'); return; }
    const { data } = await supabase.from('applications_2026').select('participant_name, assigned_round').eq('auth_code', form.auth_code).eq('status','승인완료').single();
    if (!data) { alert('유효하지 않은 인증코드입니다.'); return; }
    setForm(p => ({ ...p, author: data.participant_name, program_type: data.assigned_round||'' }));
    setVerified(true); alert('인증되었습니다!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verified) { alert('인증코드 확인이 필요합니다.'); return; }
    if (form.rating === 0) { alert('별점을 선택해주세요.'); return; }
    setLoading(true);
    const { error } = await supabase.from('board_posts_2026').insert([{ title:form.title, content:form.content, author:form.author, program_type:form.program_type, rating:form.rating, category:'review', views:0 }]);
    if (!error) { alert('후기가 등록되었습니다.'); onSuccess(); } else { alert('등록 실패'); }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">참가 후기 작성</h2><button onClick={onClose} className="text-gray-500 text-2xl">&times;</button></div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">인증코드 *</label>
              <div className="flex gap-2"><input type="text" value={form.auth_code} onChange={e => setForm(p=>({...p,auth_code:e.target.value.toUpperCase()}))} placeholder="승인 시 발급받은 인증코드 입력" className="flex-1 px-3 py-2 border rounded-lg" disabled={verified} required /><button type="button" onClick={verify} disabled={verified} className={`px-4 py-2 rounded-lg font-medium ${verified?'bg-green-100 text-green-800':'bg-[#6366f1] text-white hover:bg-[#4f46e5]'}`}>{verified?'✓ 인증됨':'확인'}</button></div>
            </div>
            {verified && (
              <>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">참여 차수 *</label><select value={form.program_type} onChange={e => setForm(p=>({...p,program_type:e.target.value}))} className="w-full px-3 py-2 border rounded-lg" required><option value="">선택하세요</option>{rounds.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label><input type="text" value={form.title} onChange={e => setForm(p=>({...p,title:e.target.value}))} placeholder="후기 제목을 입력하세요" className="w-full px-3 py-2 border rounded-lg" required /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">별점 *</label><div className="flex gap-1">{[1,2,3,4,5].map(s => <button key={s} type="button" onClick={() => setForm(p=>({...p,rating:s}))} className="text-3xl">{s<=form.rating?'⭐':'☆'}</button>)}</div></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">내용 *</label><textarea value={form.content} onChange={e => setForm(p=>({...p,content:e.target.value}))} rows={5} placeholder="참가 후기를 작성해주세요..." className="w-full px-3 py-2 border rounded-lg" required /></div>
              </>
            )}
            <div className="flex gap-3 pt-2"><button type="button" onClick={onClose} className="flex-1 py-3 border rounded-lg font-medium">취소</button><button type="submit" disabled={loading||!verified} className="flex-1 py-3 bg-[#6366f1] hover:bg-[#4f46e5] disabled:bg-gray-300 text-white rounded-lg font-medium">{loading?'등록 중...':'등록하기'}</button></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Board2026;

// 신청서 수정요청 인터페이스
interface ModificationRequest {
  id: number;
  applicant_name: string;
  phone: string;
  password: string;
  current_participant_name?: string;
  current_birth_year?: string;
  current_gender?: string;
  current_guardian_name?: string;
  current_guardian_phone?: string;
  current_first_choice: string;
  current_second_choice?: string;
  current_third_choice?: string;
  requested_participant_name?: string;
  requested_birth_year?: string;
  requested_gender?: string;
  requested_guardian_name?: string;
  requested_guardian_phone?: string;
  requested_first_choice?: string;
  requested_second_choice?: string;
  requested_third_choice?: string;
  other_requests?: string;
  user_note?: string;
  status: 'pending' | 'completed' | 'rejected';
  admin_note?: string;
  created_at: string;
}

// 신청서 수정요청 게시판
const ModificationRequestBoard2026 = ({ onWrite }: { onWrite: () => void }) => {
  const [posts, setPosts] = useState<ModificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [pending, setPending] = useState<ModificationRequest | null>(null);
  const [pwInput, setPwInput] = useState('');
  const [selected, setSelected] = useState<ModificationRequest | null>(null);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase.from('modification_requests_2026').select('*').order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  const handleClick = (post: ModificationRequest) => { setPending(post); setShowPw(true); setPwInput(''); };
  
  const handlePwSubmit = async () => {
    if (!pending) return;
    if (pwInput === pending.password) {
      setSelected(pending); setShowPw(false); setPending(null);
    } else { alert('비밀번호가 일치하지 않습니다.'); }
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

  if (loading) return <div className="bg-white rounded-lg shadow-md p-8 text-center">로딩 중...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">신청서 수정요청</h2>
        <button onClick={onWrite} className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded-lg font-medium">✏️ 수정요청</button>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>📌 안내:</strong> 참가신청서의 희망 회차 변경 등 직접 수정이 불가능한 항목의 수정을 요청하는 게시판입니다.<br/>
          요청 확인 후 관리자가 처리해 드립니다. (처리 시간: 1~2일 소요)
        </p>
      </div>

      <div className="space-y-3">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">등록된 수정요청이 없습니다.</div>
        ) : posts.map(post => {
          const maskedName = post.applicant_name.length >= 2 
            ? post.applicant_name[0] + '*'.repeat(post.applicant_name.length - 2) + post.applicant_name.slice(-1)
            : post.applicant_name;
          const maskedPhone = post.phone.replace(/(\d{3})[-]?(\d{4})[-]?(\d{4})/, '$1-****-$3');
          
          return (
            <div key={post.id} onClick={() => handleClick(post)} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(post.status)}`}>{getStatusText(post.status)}</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">🔒 비공개</span>
                <h3 className="font-semibold text-gray-900">{maskedName}님의 수정요청</h3>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>📅 {formatDate(post.created_at)}</span>
                <span>📞 {maskedPhone}</span>
              </div>
            </div>
          );
        })}
      </div>

      {showPw && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowPw(false)}>
          <div className="bg-white rounded-lg max-w-sm w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">비밀번호 확인</h3>
            <input type="password" value={pwInput} onChange={e => setPwInput(e.target.value)} placeholder="5자리 비밀번호를 입력하세요" maxLength={5} className="w-full px-3 py-2 border rounded-lg mb-4" onKeyPress={e => e.key==='Enter' && handlePwSubmit()} />
            <div className="flex gap-2">
              <button onClick={() => setShowPw(false)} className="flex-1 py-2 border rounded-lg">취소</button>
              <button onClick={handlePwSubmit} className="flex-1 py-2 bg-[#6366f1] text-white rounded-lg">확인</button>
            </div>
          </div>
        </div>
      )}

      {selected && <ModificationDetailModal post={selected} onClose={() => setSelected(null)} onDelete={() => { setSelected(null); fetchPosts(); }} />}
    </div>
  );
};

// 수정요청 작성 페이지
const ModificationWritePage = ({ onBack }: { onBack: () => void }) => {
  const [form, setForm] = useState({
    applicant_name: '',
    phone: '',
    password: '',
    // 현재 정보 (자동 조회)
    current_participant_name: '',
    current_birth_year: '',
    current_gender: '',
    current_guardian_name: '',
    current_guardian_phone: '',
    current_first_choice: '',
    current_second_choice: '',
    current_third_choice: '',
    // 변경 희망 정보
    requested_participant_name: '',
    requested_birth_year: '',
    requested_gender: '',
    requested_guardian_name: '',
    requested_guardian_phone: '',
    requested_first_choice: '',
    requested_second_choice: '',
    requested_third_choice: '',
    // 특이사항
    user_note: ''
  });

  // 기존 정보 유지 체크 상태
  const [keepOriginal, setKeepOriginal] = useState({
    participant_name: true,
    birth_year: true,
    gender: true,
    guardian_name: true,
    guardian_phone: true,
    first_choice: true,
    second_choice: true,
    third_choice: true
  });

  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [found, setFound] = useState(false);

  const scheduleOptions = [
    { value: '1회차', label: '1회차 02.01(일)~02.03(화)' },
    { value: '2회차', label: '2회차 02.04(수)~02.06(금)' },
    { value: '3회차', label: '3회차 02.08(일)~02.10(화)' },
    { value: '4회차', label: '4회차 02.11(수)~02.13(금)' },
    { value: '5회차', label: '5회차 02.22(일)~02.24(화)' },
    { value: '6회차', label: '6회차 02.25(수)~02.27(금)' },
  ];

  const birthYearOptions = [
    { value: '2017', label: '2017년생' },
    { value: '2018', label: '2018년생' },
    { value: '2019', label: '2019년생' }
  ];

  const genderOptions = [
    { value: '남', label: '남' },
    { value: '여', label: '여' }
  ];

  // 신청 정보 자동 조회
  const handleSearch = async () => {
    if (!form.applicant_name || !form.phone) {
      alert('이름과 연락처를 입력해주세요.');
      return;
    }
    setSearching(true);
    const { data } = await supabase
      .from('applications_2026')
      .select('*')
      .eq('participant_name', form.applicant_name)
      .eq('phone', form.phone)
      .single();
    
    if (data) {
      setForm(p => ({
        ...p,
        current_participant_name: data.participant_name || '',
        current_birth_year: data.birth_year || '',
        current_gender: data.gender || '',
        current_guardian_name: data.guardian_name || '',
        current_guardian_phone: data.phone || '',
        current_first_choice: data.first_choice || '',
        current_second_choice: data.second_choice || '',
        current_third_choice: data.third_choice || ''
      }));
      setFound(true);
    } else {
      alert('해당 신청 정보를 찾을 수 없습니다.\n이름과 연락처를 다시 확인해주세요.');
      setFound(false);
    }
    setSearching(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!found) {
      alert('먼저 신청 정보를 조회해주세요.');
      return;
    }
    if (form.password.length !== 5 || !/^\d+$/.test(form.password)) {
      alert('비밀번호는 5자리 숫자로 입력해주세요.');
      return;
    }
    
    setLoading(true);
    const { error } = await supabase.from('modification_requests_2026').insert([{
      applicant_name: form.applicant_name,
      phone: form.phone,
      password: form.password,
      current_participant_name: form.current_participant_name,
      current_birth_year: form.current_birth_year,
      current_gender: form.current_gender,
      current_guardian_name: form.current_guardian_name,
      current_guardian_phone: form.current_guardian_phone,
      current_first_choice: form.current_first_choice,
      current_second_choice: form.current_second_choice,
      current_third_choice: form.current_third_choice,
      requested_participant_name: keepOriginal.participant_name ? '' : form.requested_participant_name,
      requested_birth_year: keepOriginal.birth_year ? '' : form.requested_birth_year,
      requested_gender: keepOriginal.gender ? '' : form.requested_gender,
      requested_guardian_name: keepOriginal.guardian_name ? '' : form.requested_guardian_name,
      requested_guardian_phone: keepOriginal.guardian_phone ? '' : form.requested_guardian_phone,
      requested_first_choice: keepOriginal.first_choice ? '' : form.requested_first_choice,
      requested_second_choice: keepOriginal.second_choice ? '' : form.requested_second_choice,
      requested_third_choice: keepOriginal.third_choice ? '' : form.requested_third_choice,
      user_note: form.user_note,
      status: 'pending'
    }]);
    
    if (!error) {
      alert('수정요청이 등록되었습니다. 처리까지 1~2일 소요됩니다.');
      onBack();
    } else {
      alert('등록 실패: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
          ← 목록으로
        </button>
        <h2 className="text-2xl font-bold text-gray-900">신청서 수정요청</h2>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800">
          ⚠️ 신청서 조회에서 직접 수정 가능한 항목(학교명, 스키실력, 신체사이즈, 특이사항)은 <a href="/#/application2026" className="text-blue-600 underline">참가신청 → 신청조회</a>에서 수정해 주세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 신청자 정보 + 조회 버튼 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">신청자 정보</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">참가자 이름 *</label>
              <input type="text" value={form.applicant_name} onChange={e => { setForm({...form, applicant_name: e.target.value}); setFound(false); }} placeholder="참가자 이름" className="w-full px-3 py-2 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">연락처 *</label>
              <input type="text" value={form.phone} onChange={e => { setForm({...form, phone: e.target.value}); setFound(false); }} placeholder="010-0000-0000" className="w-full px-3 py-2 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 (5자리) *</label>
              <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="5자리 숫자" maxLength={5} className="w-full px-3 py-2 border rounded-lg" required />
            </div>
            <div className="flex items-end">
              <button 
                type="button" 
                onClick={handleSearch} 
                disabled={searching}
                className="w-full py-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg font-medium disabled:bg-gray-400"
              >
                {searching ? '조회 중...' : '🔍 신청정보 조회'}
              </button>
            </div>
          </div>
          {found && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">✅ 신청 정보를 찾았습니다. 아래에서 변경할 항목을 수정해주세요.</p>
            </div>
          )}
        </div>

        {/* 현재 신청 정보 / 변경 희망 정보 - 좌우 나란히 */}
        {found && (
          <div className="bg-gray-50 rounded-lg p-6">
            {/* 필드 행들 */}
            <div className="bg-white rounded-lg border overflow-hidden">
              {/* 헤더 */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 border-b">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-800">📋 현재 신청 정보</h4>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-blue-800">✏️ 변경 희망 정보</h4>
                </div>
              </div>

              <div className="p-4">
              {/* 참가자 이름 */}
              <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100">
                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">참가자 이름</div>
                  <div className="font-medium text-gray-800">{form.current_participant_name || '-'}</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">참가자 이름</span>
                    <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${keepOriginal.participant_name ? 'border-[#6366f1] bg-[#6366f1]' : 'border-gray-300'}`}>
                        {keepOriginal.participant_name && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                      </span>
                      <input type="checkbox" checked={keepOriginal.participant_name} onChange={e => setKeepOriginal({...keepOriginal, participant_name: e.target.checked})} className="hidden" />
                      유지
                    </label>
                  </div>
                  {keepOriginal.participant_name ? (
                    <div className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-500">{form.current_participant_name || '-'}</div>
                  ) : (
                    <input type="text" value={form.requested_participant_name} onChange={e => setForm({...form, requested_participant_name: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  )}
                </div>
              </div>

              {/* 출생연도 */}
              <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100">
                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">출생연도</div>
                  <div className="font-medium text-gray-800">{form.current_birth_year ? `${form.current_birth_year}년생` : '-'}</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">출생연도</span>
                    <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${keepOriginal.birth_year ? 'border-[#6366f1] bg-[#6366f1]' : 'border-gray-300'}`}>
                        {keepOriginal.birth_year && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                      </span>
                      <input type="checkbox" checked={keepOriginal.birth_year} onChange={e => setKeepOriginal({...keepOriginal, birth_year: e.target.checked})} className="hidden" />
                      유지
                    </label>
                  </div>
                  {keepOriginal.birth_year ? (
                    <div className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-500">{form.current_birth_year ? `${form.current_birth_year}년생` : '-'}</div>
                  ) : (
                    <select value={form.requested_birth_year} onChange={e => setForm({...form, requested_birth_year: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                      <option value="">선택</option>
                      {birthYearOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  )}
                </div>
              </div>

              {/* 성별 */}
              <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100">
                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">성별</div>
                  <div className="font-medium text-gray-800">{form.current_gender || '-'}</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">성별</span>
                    <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${keepOriginal.gender ? 'border-[#6366f1] bg-[#6366f1]' : 'border-gray-300'}`}>
                        {keepOriginal.gender && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                      </span>
                      <input type="checkbox" checked={keepOriginal.gender} onChange={e => setKeepOriginal({...keepOriginal, gender: e.target.checked})} className="hidden" />
                      유지
                    </label>
                  </div>
                  {keepOriginal.gender ? (
                    <div className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-500">{form.current_gender || '-'}</div>
                  ) : (
                    <select value={form.requested_gender} onChange={e => setForm({...form, requested_gender: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                      <option value="">선택</option>
                      {genderOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  )}
                </div>
              </div>

              {/* 보호자 이름 */}
              <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100">
                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">보호자 이름</div>
                  <div className="font-medium text-gray-800">{form.current_guardian_name || '-'}</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">보호자 이름</span>
                    <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${keepOriginal.guardian_name ? 'border-[#6366f1] bg-[#6366f1]' : 'border-gray-300'}`}>
                        {keepOriginal.guardian_name && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                      </span>
                      <input type="checkbox" checked={keepOriginal.guardian_name} onChange={e => setKeepOriginal({...keepOriginal, guardian_name: e.target.checked})} className="hidden" />
                      유지
                    </label>
                  </div>
                  {keepOriginal.guardian_name ? (
                    <div className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-500">{form.current_guardian_name || '-'}</div>
                  ) : (
                    <input type="text" value={form.requested_guardian_name} onChange={e => setForm({...form, requested_guardian_name: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  )}
                </div>
              </div>

              {/* 보호자 연락처 */}
              <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100">
                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">보호자 연락처</div>
                  <div className="font-medium text-gray-800">{form.current_guardian_phone || '-'}</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">보호자 연락처</span>
                    <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${keepOriginal.guardian_phone ? 'border-[#6366f1] bg-[#6366f1]' : 'border-gray-300'}`}>
                        {keepOriginal.guardian_phone && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                      </span>
                      <input type="checkbox" checked={keepOriginal.guardian_phone} onChange={e => setKeepOriginal({...keepOriginal, guardian_phone: e.target.checked})} className="hidden" />
                      유지
                    </label>
                  </div>
                  {keepOriginal.guardian_phone ? (
                    <div className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-500">{form.current_guardian_phone || '-'}</div>
                  ) : (
                    <input type="text" value={form.requested_guardian_phone} onChange={e => setForm({...form, requested_guardian_phone: e.target.value})} placeholder="010-0000-0000" className="w-full px-3 py-2 border rounded-lg text-sm" />
                  )}
                </div>
              </div>

              {/* 1지망 */}
              <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100">
                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">1지망</div>
                  <div className="font-medium text-gray-800">{form.current_first_choice || '-'}</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">1지망</span>
                    <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${keepOriginal.first_choice ? 'border-[#6366f1] bg-[#6366f1]' : 'border-gray-300'}`}>
                        {keepOriginal.first_choice && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                      </span>
                      <input type="checkbox" checked={keepOriginal.first_choice} onChange={e => setKeepOriginal({...keepOriginal, first_choice: e.target.checked})} className="hidden" />
                      유지
                    </label>
                  </div>
                  {keepOriginal.first_choice ? (
                    <div className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-500">{form.current_first_choice || '-'}</div>
                  ) : (
                    <select value={form.requested_first_choice} onChange={e => setForm({...form, requested_first_choice: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                      <option value="">선택</option>
                      {scheduleOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  )}
                </div>
              </div>

              {/* 2지망 */}
              <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100">
                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">2지망</div>
                  <div className="font-medium text-gray-800">{form.current_second_choice || '-'}</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">2지망</span>
                    <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${keepOriginal.second_choice ? 'border-[#6366f1] bg-[#6366f1]' : 'border-gray-300'}`}>
                        {keepOriginal.second_choice && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                      </span>
                      <input type="checkbox" checked={keepOriginal.second_choice} onChange={e => setKeepOriginal({...keepOriginal, second_choice: e.target.checked})} className="hidden" />
                      유지
                    </label>
                  </div>
                  {keepOriginal.second_choice ? (
                    <div className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-500">{form.current_second_choice || '-'}</div>
                  ) : (
                    <select value={form.requested_second_choice} onChange={e => setForm({...form, requested_second_choice: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                      <option value="">선택</option>
                      {scheduleOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  )}
                </div>
              </div>

              {/* 3지망 */}
              <div className="grid grid-cols-2 gap-4 py-3">
                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">3지망</div>
                  <div className="font-medium text-gray-800">{form.current_third_choice || '-'}</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">3지망</span>
                    <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${keepOriginal.third_choice ? 'border-[#6366f1] bg-[#6366f1]' : 'border-gray-300'}`}>
                        {keepOriginal.third_choice && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                      </span>
                      <input type="checkbox" checked={keepOriginal.third_choice} onChange={e => setKeepOriginal({...keepOriginal, third_choice: e.target.checked})} className="hidden" />
                      유지
                    </label>
                  </div>
                  {keepOriginal.third_choice ? (
                    <div className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-500">{form.current_third_choice || '-'}</div>
                  ) : (
                    <select value={form.requested_third_choice} onChange={e => setForm({...form, requested_third_choice: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                      <option value="">선택</option>
                      {scheduleOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  )}
                </div>
              </div>
              </div>
            </div>
          </div>
        )}

        {/* 특이사항 메모 */}
        {found && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">특이사항 (선택)</label>
            <textarea 
              value={form.user_note} 
              onChange={e => setForm({...form, user_note: e.target.value})} 
              rows={3} 
              placeholder="수정 요청과 관련하여 추가로 전달할 내용이 있으면 작성해주세요..."
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        )}

        {/* 버튼 */}
        <div className="flex gap-3 pt-4">
          <button type="button" onClick={onBack} className="flex-1 py-3 border rounded-lg font-medium">취소</button>
          <button type="submit" disabled={loading || !found} className="flex-1 py-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg font-medium disabled:bg-gray-400">{loading ? '등록 중...' : '수정요청 등록'}</button>
        </div>
      </form>
    </div>
  );
};

// 수정요청 상세 모달
const ModificationDetailModal = ({ post, onClose, onDelete }: { post: ModificationRequest; onClose: () => void; onDelete: () => void }) => {
  const [deleting, setDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!confirm('이 수정요청을 삭제하시겠습니까?')) return;
    setDeleting(true);
    const { error } = await supabase.from('modification_requests_2026').delete().eq('id', post.id);
    if (!error) {
      alert('삭제되었습니다.');
      onDelete();
    } else {
      alert('삭제 실패');
    }
    setDeleting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(post.status)}`}>{getStatusText(post.status)}</span>
              <h2 className="text-xl font-bold text-gray-900">{post.applicant_name}님의 수정요청</h2>
            </div>
            <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
          </div>
          
          <div className="text-sm text-gray-500 mb-6">📅 {formatDate(post.created_at)}</div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">현재 신청 정보</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {post.current_participant_name && <div><span className="text-gray-500">참가자:</span> <span className="font-medium">{post.current_participant_name}</span></div>}
                {post.current_birth_year && <div><span className="text-gray-500">출생연도:</span> <span className="font-medium">{post.current_birth_year}년생</span></div>}
                {post.current_gender && <div><span className="text-gray-500">성별:</span> <span className="font-medium">{post.current_gender}</span></div>}
                {post.current_guardian_name && <div><span className="text-gray-500">보호자:</span> <span className="font-medium">{post.current_guardian_name}</span></div>}
                {post.current_guardian_phone && <div><span className="text-gray-500">보호자 연락처:</span> <span className="font-medium">{post.current_guardian_phone}</span></div>}
                {post.current_first_choice && <div><span className="text-gray-500">1지망:</span> <span className="font-medium">{post.current_first_choice}</span></div>}
                {post.current_second_choice && <div><span className="text-gray-500">2지망:</span> <span className="font-medium">{post.current_second_choice}</span></div>}
                {post.current_third_choice && <div><span className="text-gray-500">3지망:</span> <span className="font-medium">{post.current_third_choice}</span></div>}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">변경 요청 정보</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-500">참가자:</span> <span className="font-medium text-blue-700">{post.requested_participant_name || '변경 없음'}</span></div>
                <div><span className="text-gray-500">출생연도:</span> <span className="font-medium text-blue-700">{post.requested_birth_year ? `${post.requested_birth_year}년생` : '변경 없음'}</span></div>
                <div><span className="text-gray-500">성별:</span> <span className="font-medium text-blue-700">{post.requested_gender || '변경 없음'}</span></div>
                <div><span className="text-gray-500">보호자:</span> <span className="font-medium text-blue-700">{post.requested_guardian_name || '변경 없음'}</span></div>
                <div><span className="text-gray-500">보호자 연락처:</span> <span className="font-medium text-blue-700">{post.requested_guardian_phone || '변경 없음'}</span></div>
                <div><span className="text-gray-500">1지망:</span> <span className="font-medium text-blue-700">{post.requested_first_choice || '변경 없음'}</span></div>
                <div><span className="text-gray-500">2지망:</span> <span className="font-medium text-blue-700">{post.requested_second_choice || '변경 없음'}</span></div>
                <div><span className="text-gray-500">3지망:</span> <span className="font-medium text-blue-700">{post.requested_third_choice || '변경 없음'}</span></div>
              </div>
            </div>

            {post.other_requests && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">기타 요청사항</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{post.other_requests}</p>
              </div>
            )}

            {post.admin_note && (
              <div className="bg-[#6366f1]/5 rounded-lg p-4 border border-[#6366f1]/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#6366f1] text-white text-xs px-2 py-1 rounded">관리자</span>
                  <span className="font-semibold text-[#6366f1]">운영사무국 답변</span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{post.admin_note}</p>
              </div>
            )}
          </div>

          {/* 삭제 버튼 - 처리대기 상태일 때만 */}
          {post.status === 'pending' && (
            <div className="mt-6 pt-4 border-t">
              <button 
                onClick={handleDelete} 
                disabled={deleting}
                className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium disabled:bg-gray-400"
              >
                {deleting ? '삭제 중...' : '🗑️ 수정요청 삭제'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
