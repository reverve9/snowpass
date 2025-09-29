tsx 
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const Intro = () => {
  return (
    <>
      {/* CSS 애니메이션 정의 */}
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.6;
          }
          95% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(calc(100vh + 200px)) rotate(180deg);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-30px) translateX(15px) rotate(45deg);
          }
          50% {
            transform: translateY(-40px) translateX(-10px) rotate(90deg);
          }
          75% {
            transform: translateY(-20px) translateX(-25px) rotate(135deg);
          }
        }
        
        .snow-animation {
          animation: snowfall linear infinite;
        }
        
        .float-animation {
          animation: float ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* 떨어지는 눈 결정 */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-blue-300/60 select-none snow-animation"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${-100 - Math.random() * 100}px`,
                animationDuration: `${15 + Math.random() * 20}s`,
                animationDelay: `${Math.random() * 15}s`,
                fontSize: `${24 + Math.random() * 20}px`,
              }}
            >
              ❄
            </div>
          ))}
        </div>

        {/* 떠다니는 눈 결정 */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={`float-${i}`}
              className="absolute text-blue-200/50 select-none float-animation"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${4 + Math.random() * 6}s`,
                animationDelay: `${Math.random() * 4}s`,
                fontSize: `${20 + Math.random() * 16}px`,
              }}
            >
              ❅
            </div>
          ))}
        </div>

        {/* 메인 콘텐츠 */}
        <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full">
            
            {/* 눈동이 패스포트 2026 카드 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 overflow-hidden aspect-square">
              <div className="relative h-full">
                {/* 배경 이미지 */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('/images/winter_sports_camp_1_1.jpeg')` }}
                ></div>
                {/* 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-blue-600/75 to-blue-400/60"></div>
                
                {/* 콘텐츠 */}
                <CardContent className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white p-6">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 title-font">
                    눈동이 패스포트 <span className="text-blue-200 font-thin">2026</span>
                  </h2>
                  
                  <p className="text-lg md:text-xl mb-6 opacity-90 leading-loose font-medium">
                    평창군 어린이만 참여할 수 있는<br />
                    유일한 눈동이 패스포트
                  </p>
                  
                  <p className="text-base md:text-lg mb-8 opacity-80 leading-relaxed">
                    올해로 4번째 이어지는 우리동네 특별 프로그램
                  </p>
                  
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                    onClick={() => window.open('https://example.com/2026', '_blank')}
                  >
                    바로가기
                  </Button>
                </CardContent>
              </div>
            </Card>

            {/* 눈동이 패스포트 ver. 2.0 카드 - 수정된 버전 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:-rotate-1 overflow-hidden aspect-square">
              <div className="relative h-full">
                {/* 배경 이미지 */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('/images/winter_sports_camp_2_1.jpeg')` }}
                ></div>
                {/* 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/85 via-purple-600/75 to-purple-400/60"></div>
                
                {/* 콘텐츠 - 아이콘 삭제, 텍스트 변경, 타이틀 폰트 적용 */}
                <CardContent className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white p-6">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 title-font">
                    눈동이 패스포트 <span className="text-purple-200 font-thin">ver. 2.0</span>
                  </h2>
                  
                  <p className="text-lg md:text-xl mb-6 opacity-90 leading-loose font-medium">
                    전국 방방곡곡으로 찾아가고,<br />
                    평창에서 함께하는 눈동이 패스포트
                  </p>
                  
                  <p className="text-base md:text-lg mb-8 opacity-80 leading-relaxed">
                    올해 처음 시작하는 전국 어린이 대상 프로그램
                  </p>
                  
                  <Link to="/main">
                    <Button
                      size="lg"
                      className="bg-white text-purple-600 hover:bg-purple-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                    >
                      바로가기
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;