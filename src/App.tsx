import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Main from "./pages/Main";
import Application from "./pages/Application";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Board from "./pages/Board";
import NotFound from "./pages/NotFound";

// 2026용 새로운 페이지들 (나중에 생성할 예정)
import Setup2026 from "./pages/Setup2026";
import Programs2026 from "./pages/Programs2026";
import Application2026 from "./pages/Application2026";
//import About2026 from "./pages/About2026";
import Board2026 from "./pages/Board2026";
import Admin2026 from "./pages/Admin2026";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        
        {/* 기존 ver. 2.0 라우팅 - 유지 */}
        <Route path="/main" element={<Main />} />
        <Route path="/application" element={<Application />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/board" element={<Board />} />
        
        {/* 새로운 2026 라우팅 - 신규 */}
        <Route path="/setup2026" element={<Setup2026 />} /> 
        <Route path="/programs2026" element={<Programs2026 />} />
        <Route path="/application2026" element={<Application2026 />} />
        {/*Route path="/about2026" element={<About2026 />} /> */}
        <Route path="/board2026" element={<Board2026 />} />
        <Route path="/admin2026" element={<Admin2026 />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  </QueryClientProvider>
);

export default App;