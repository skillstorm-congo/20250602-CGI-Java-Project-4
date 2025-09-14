import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Frame } from './pages/Frame'
import { HomePage } from './pages/HomePage'
import { Timesheet } from './pages/TimesheetPage'
import { TimeOffPage_E } from './pages/TimeOffPage_E'
import { PayStubPage_E } from './pages/PayStubPage_E'

function App() {

  return (
    <>
    <Header/>  

     {/* <main>
      <h1>Home Page</h1>
      <h2>Testing to make sure this pops up</h2>
    </main>  */}

    

    <BrowserRouter>
      <Routes>
        <Route path ='/timesheet' element={<Frame />}/>
        <Route index element={<HomePage />}/>
        <Route path='timesheet' element={<Timesheet />}/>
        <Route path='time-off-e' element={<TimeOffPage_E />}/>
        <Route path='pay-stub-e' element={<PayStubPage_E />}/>

      </Routes>
    
    </BrowserRouter>

    <Footer/> 
      
    </>
  )
}

export default App
