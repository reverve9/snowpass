import { useState } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  top?: number;
  left?: number;
  showOverlay?: boolean;
  linkUrl?: string;
}

const Popup = ({ isOpen, onClose, imageUrl, top = 100, left = 100, showOverlay = false, linkUrl }: PopupProps) => {
  const [dontShowToday, setDontShowToday] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    if (dontShowToday) {
      const today = new Date().toDateString();
      localStorage.setItem('popup_hidden_date', today);
    }
    onClose();
  };

  const handleImageClick = () => {
    if (linkUrl) {
      window.location.href = linkUrl;
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* 배경 오버레이 - showOverlay가 true일 때만 표시 */}
      {showOverlay && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 pointer-events-auto"
          onClick={handleClose}
        />
      )}
      
      {/* 팝업 창 */}
      <div 
        className="absolute bg-white rounded-lg shadow-2xl pointer-events-auto"
        style={{ 
          top: `${top}px`, 
          left: `${left}px`,
          width: '400px'
        }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center text-lg font-bold z-10"
        >
          ×
        </button>

        {/* 이미지 */}
        <div className="p-4">
          <img 
            src={imageUrl}
            alt="팝업 이미지"
            className={`w-full h-auto rounded ${linkUrl ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
            onClick={handleImageClick}
          />
        </div>

        {/* 하단 체크박스 */}
        <div className="px-4 pb-4">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={dontShowToday}
              onChange={(e) => setDontShowToday(e.target.checked)}
              className="w-4 h-4"
            />
            오늘 하루 그만 보기
          </label>
        </div>
      </div>
    </div>
  );
};

export default Popup;
