import "./App.css"
import { Header } from "./components/header/Header";
import { Main } from "./pages/main/Main";
import { Footer } from "./components/footer/Footer";
import { Home } from "./pages/home/Home";
import { Account } from "./pages/account/Account"
import { Public } from "./pages/public/Public";
import { PastePage } from "./pages/pastePage/PastePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from 'react';


export const ThemeContext = createContext(null)

const App = () => {
  const [token, setToken] = useState('')
  const [theme, setTheme] = useState('light')

  const toggleTheme = (theme) => {
    setTheme((curr) => curr === "light" ? "dark" : "light")
  }

  if (token) {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="app" id={theme}>
          <Router>
            <Header setToken={setToken} />
            <Routes>
              <Route element={<Home />} path='/' />
              <Route element={<Account />} path='/acc' />
              <Route element={<Public />} path='/public' />
              <Route element={<PastePage />} path='/post' />
            </Routes>
            <Footer />
          </Router>
        </div>
      </ThemeContext.Provider>
    )
  } else {
    return (
      <div>
        <Main setToken={setToken} />
      </div>
    );
  }
}

export default App;
