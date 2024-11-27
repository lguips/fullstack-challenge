import { BrowserRouter, Routes, Route } from "react-router-dom";
import Niveis from "@/modules/niveis/views/Niveis";
import Desenvolvedores from "@/modules/desenvolvedores/views/Desenvolvedores";
import Home from "@/modules/home/views/Home";
import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/niveis" element={<Niveis />} />
          <Route path="/desenvolvedores" element={<Desenvolvedores />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
