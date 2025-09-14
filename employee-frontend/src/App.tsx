import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Frame } from './pages/Frame'
import { HomePage } from './pages/HomePage'
import { Timesheet } from './pages/TimesheetPage'
import { TimeOffPage_E } from './pages/TimeOffPage_E'
import { PayStubPage_E } from './pages/PayStubPage_E'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Frame />}>
          <Route index element={<HomePage />} />
          <Route path="timesheet" element={<Timesheet />} />
          <Route path="time-off-e" element={<TimeOffPage_E />} />
          <Route path="pay-stub-e" element={<PayStubPage_E />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
