tsx 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Users, Star } from "lucide-react";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            돌아가기
          </Button>
          <h1 className="text-2xl font-bold text-gray-800 title-font">
            눈동이 패스포트 ver. 2.0
          </h1>
          <div></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 메인 소개 섹션 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 title-font">
            전국 어린이와 함께하는 <br />
            <span className="text-blue-600">눈동이 패스포트</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            전국 방방곡곡으로 찾아가고, 평창에서 함께하는 눈동이 패스포트<br />
            올해 처음 시작하는 전국 어린이 대상 프로그램입니다.
          </p>
          <Badge className="mt-4 bg-blue-100 text-blue-800 px-4 py-2 text-sm">
            코리아 키즈 프로그램
          </Badge>
        </div>

        {/* 프로그램 특징 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="title-font">전국 순회</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                전국 방방곡곡을 찾아가는 특별한 프로그램으로 더 많은 어린이들과 만납니다.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="title-font">평창 체험</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                평창에서 직접 체험할 수 있는 다양한 겨울 스포츠와 문화 프로그램을 제공합니다.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <CardTitle className="title-font">어린이 중심</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                어린이들의 눈높이에 맞춘 특별한 프로그램으로 즐거운 경험을 선사합니다.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 프로그램 하이라이트 */}
        <Card className="mb-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <Star className="w-8 h-8 text-yellow-300" />
              <h3 className="text-2xl font-bold title-font">프로그램 하이라이트</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-semibold mb-3 title-font">🏔️ 평창 겨울 체험</h4>
                <p className="opacity-90">
                  2018 평창 동계올림픽의 감동을 다시 한번! 스키, 스케이팅, 봅슬레이 등 다양한 겨울 스포츠를 직접 체험해보세요.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3 title-font">🎯 전국 순회 프로그램</h4>
                <p className="opacity-90">
                  전국 각 지역을 직접 찾아가는 이동형 프로그램으로, 더 많은 어린이들이 참여할 수 있는 기회를 제공합니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 참가 신청 섹션 */}
        <div className="text-center bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-3xl font-bold mb-4 text-gray-800 title-font">
            지금 바로 참가하세요!
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            눈동이 패스포트 ver. 2.0과 함께 특별한 겨울 여행을 시작해보세요.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/application')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
          >
            참가 신청하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Main;