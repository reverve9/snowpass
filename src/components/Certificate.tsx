import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CertificateProps {
  name: string;
  certificateNumber: string;
  participationPeriod: string; // 예: "2026. 1. 5.~1. 7."
  issueDate: string; // 예: "2026년 1월 7일"
}

const Certificate: React.FC<CertificateProps> = ({
  name,
  certificateNumber,
  participationPeriod,
  issueDate
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    });

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;

    const pdf = new jsPDF({
      orientation: ratio > 1 ? 'landscape' : 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    let finalWidth, finalHeight, x, y;

    if (ratio > pdfWidth / pdfHeight) {
      finalWidth = pdfWidth - 20;
      finalHeight = finalWidth / ratio;
    } else {
      finalHeight = pdfHeight - 20;
      finalWidth = finalHeight * ratio;
    }

    x = (pdfWidth - finalWidth) / 2;
    y = (pdfHeight - finalHeight) / 2;

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
    pdf.save(`수료증_${name}_${certificateNumber}.pdf`);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 수료증 본문 */}
      <div
        ref={certificateRef}
        className="relative bg-white"
        style={{ width: '800px', height: '566px' }}
      >
        {/* 테두리 이미지 */}
        <img
          src="/images/certificate/border.png"
          alt="테두리"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />

        {/* 컨텐츠 영역 */}
        <div className="absolute inset-0 p-12 flex flex-col">
          {/* 인증번호 - 우측 상단 */}
          <div className="absolute top-8 right-12 text-gray-500 text-sm">
            No. {certificateNumber}
          </div>

          {/* 타이틀 로고 */}
          <div className="flex justify-center mt-4">
            <img
              src="/images/certificate/title.png"
              alt="평창 눈동이 패스포트"
              className="h-14 object-contain"
            />
          </div>

          {/* 수료증 텍스트 */}
          <h1 className="text-center text-4xl font-bold text-gray-800 mt-3 tracking-[0.3em]">
            수 료 증
          </h1>

          {/* 이름 */}
          <div className="text-right pr-16 mt-6">
            <span className="text-gray-600 text-lg">이　　름 : </span>
            <span className="text-xl font-semibold text-gray-800">{name}</span>
          </div>

          {/* 본문 */}
          <div className="text-center mt-6 leading-relaxed">
            <p className="text-gray-700 text-lg">
              위 학생은 평창 눈동이 OJT 워크숍에 참여하여
            </p>
            <p className="text-gray-700 text-lg">
              교육과정을 성실히 이수하였기에 본 수료증을 수여합니다.
            </p>
            <p className="text-gray-600 mt-3">
              · 참여기간 : {participationPeriod}
            </p>
          </div>

          {/* 발급일자 */}
          <div className="text-center mt-6">
            <p className="text-gray-800 text-xl font-medium">{issueDate}</p>
          </div>

          {/* 하단 영역 */}
          <div className="mt-auto flex items-end justify-between px-4 pb-2">
            {/* 좌측 - 주최/주관, 후원 */}
            <div className="flex flex-col gap-3">
              {/* 주최/주관 */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">· 주최/주관 :</span>
                <img
                  src="/images/certificate/foundation.png"
                  alt="평창유산재단"
                  className="h-8 object-contain"
                />
                <img
                  src="/images/certificate/stamp.png"
                  alt="직인"
                  className="h-12 object-contain ml-2"
                />
              </div>

              {/* 후원 */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">· 후원 :</span>
                <img
                  src="/images/certificate/ministry.png"
                  alt="문화체육관광부"
                  className="h-6 object-contain"
                />
                <img
                  src="/images/certificate/kspo.png"
                  alt="국민체육진흥공단"
                  className="h-6 object-contain"
                />
                <img
                  src="/images/certificate/pyeongchang.png"
                  alt="평창군"
                  className="h-6 object-contain"
                />
              </div>
            </div>

            {/* 우측 - 캐릭터 */}
            <img
              src="/images/certificate/character.png"
              alt="눈동이"
              className="h-28 object-contain"
            />
          </div>
        </div>
      </div>

      {/* 다운로드 버튼 */}
      <button
        onClick={downloadPDF}
        className="px-6 py-3 bg-[#5c4d8a] hover:bg-[#4a3d70] text-white rounded-lg font-medium transition-colors"
      >
        📥 수료증 다운로드 (PDF)
      </button>
    </div>
  );
};

export default Certificate;
