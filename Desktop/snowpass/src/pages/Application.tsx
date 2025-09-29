tsx 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Application = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    parentName: '',
    phone: '',
    email: '',
    address: '',
    program: '',
    experience: '',
    specialNeeds: '',
    agreement: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreement) {
      toast.error("개인정보 처리방침에 동의해주세요.");
      return;
    }

    if (!formData.childName || !formData.parentName || !formData.phone || !formData.email || !formData.program) {
      toast.error("필수 항목을 모두 입력해주세요.");
      return;
    }

    toast.success("참가 신청이 완료되었습니다! 곧 연락드리겠습니다.");
    
    // 폼 초기화
    setFormData({
      childName: '',
      childAge: '',
      parentName: '',
      phone: '',
      email: '',
      address: '',
      program: '',
      experience: '',
      specialNeeds: '',
      agreement: false
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/main')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            돌아가기
          </Button>
          <h1 className="text-2xl font-bold text-gray-800 title-font">
            캠프 참가 신청
          </h1>
          <div></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800 title-font">
              눈동이 패스포트 ver. 2.0
            </CardTitle>
            <p className="text-gray-600 mt-2">
              아래 정보를 입력하여 참가 신청을 완료해주세요.
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 어린이 정보 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 title-font border-b pb-2">
                  어린이 정보
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="childName">어린이 이름 *</Label>
                    <Input
                      id="childName"
                      value={formData.childName}
                      onChange={(e) => handleInputChange('childName', e.target.value)}
                      placeholder="어린이 이름을 입력해주세요"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="childAge">나이</Label>
                    <Select value={formData.childAge} onValueChange={(value) => handleInputChange('childAge', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="나이를 선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => i + 6).map(age => (
                          <SelectItem key={age} value={age.toString()}>
                            {age}세
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* 보호자 정보 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 title-font border-b pb-2">
                  보호자 정보
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="parentName">보호자 이름 *</Label>
                    <Input
                      id="parentName"
                      value={formData.parentName}
                      onChange={(e) => handleInputChange('parentName', e.target.value)}
                      placeholder="보호자 이름을 입력해주세요"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">연락처 *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="010-0000-0000"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">이메일 *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="example@email.com"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">주소</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="거주지 주소를 입력해주세요"
                  />
                </div>
              </div>

              {/* 프로그램 선택 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 title-font border-b pb-2">
                  프로그램 선택
                </h3>
                
                <div>
                  <Label htmlFor="program">참가 희망 프로그램 *</Label>
                  <Select value={formData.program} onValueChange={(value) => handleInputChange('program', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="프로그램을 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pyeongchang-experience">평창 겨울 체험 캠프</SelectItem>
                      <SelectItem value="national-tour">전국 순회 프로그램</SelectItem>
                      <SelectItem value="winter-sports">겨울 스포츠 체험</SelectItem>
                      <SelectItem value="cultural-program">문화 체험 프로그램</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 추가 정보 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 title-font border-b pb-2">
                  추가 정보
                </h3>
                
                <div>
                  <Label htmlFor="experience">겨울 스포츠 경험</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="스키, 스케이팅 등 겨울 스포츠 경험이 있다면 알려주세요"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="specialNeeds">특별한 요청사항</Label>
                  <Textarea
                    id="specialNeeds"
                    value={formData.specialNeeds}
                    onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                    placeholder="알레르기, 건강상 주의사항 등이 있다면 알려주세요"
                    rows={3}
                  />
                </div>
              </div>

              {/* 동의 체크박스 */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreement"
                  checked={formData.agreement}
                  onCheckedChange={(checked) => handleInputChange('agreement', checked as boolean)}
                />
                <Label htmlFor="agreement" className="text-sm">
                  개인정보 수집 및 이용에 동의합니다. *
                </Label>
              </div>

              {/* 제출 버튼 */}
              <div className="text-center pt-6">
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
                >
                  <Send className="w-5 h-5 mr-2" />
                  참가 신청하기
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Application;