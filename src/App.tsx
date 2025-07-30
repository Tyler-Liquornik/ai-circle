import './App.css'
import Orb from '../components/Orb/Orb'
import GlassNavBar from '../components/GlassNavBar/GlassNavBar'

function App() {
    return (
    <>
      <div className="orb-background">
        <Orb />
      </div>
      <GlassNavBar />
      <div className="content">
        {/* Your app content goes here */}
      </div>
    </>
  )
}

export default App
