import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Welcome from './pages/Welcome'
import ClassicalGame from './pages/ClassicalGame'
import ClosestWinsGame from './pages/ClosestWinsGame'
import ClassicalPregameScreen from './pages/ClassicalPregameScreen'
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Explanation from './pages/Explanation';

import './App.css'

function App() {

    return (
      <div>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/pregame_classic" element={<ClassicalPregameScreen />} />
        <Route path="/classic" element={<ClassicalGame />} />
        <Route path="/closestwins" element={<ClosestWinsGame />} />
        <Route path="/topplista" element={<Leaderboard />} />
        <Route path="/explanation" element={<Explanation />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </div>
  )
}

export default App
