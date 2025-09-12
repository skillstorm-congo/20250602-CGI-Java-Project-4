import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Frame } from './pages/Frame'
import { HomePage } from './pages/HomePage'
import { Timesheet } from './pages/TimesheetPage'

function App() {

  return (
    <>
    <Header/>  

    <main>
      <h1>Home Page</h1>
      <h2>Testing to make sure this pops up</h2>
    </main>

    <Footer/>

    <BrowserRouter>
      <Routes>
        <Route path ='/timesheet' element={<Frame />}/>
        <Route index element={<HomePage />}/>
        <Route path='timesheet' element={<Timesheet />}/>

      </Routes>
    
    </BrowserRouter>
      
    </>
  )
}

export default App
