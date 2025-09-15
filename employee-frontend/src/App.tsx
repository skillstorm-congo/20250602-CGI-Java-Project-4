import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Frame } from './pages/Frame'
import { HomePage } from './pages/HomePage'
import { Timesheet } from './pages/TimesheetPage'
import { TimeOffPage_E } from './pages/TimeOffPage_E'
import { PayStubPage_E } from './pages/PayStubPage_E'
import { TimeOffPage_M } from './pages/TimeOffPage_M'
import { PayStubPage_M } from './pages/PayStubPage_M'
import { TimeOffViewPage} from './pages/TimeOffViewPage'
import { TimeOffUpdatePage} from './pages/TimeOffUpdatePage'
import { TimeOffCreatePage} from './pages/TimeOffCreatePage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Frame />}>
          <Route index element={<HomePage />} />
          <Route path="timesheet" element={<Timesheet />} />
          <Route path="time-off-e" element={<TimeOffPage_E />} />
          <Route path="pay-stub-e" element={<PayStubPage_E />} />
          <Route path="time-off-m" element={<TimeOffPage_M />} />
          <Route path="pay-stub-m" element={<PayStubPage_M />} />

           {/* Time Off View Page takes in a url paramater (id) to generate content on page*/}
           <Route path='time-off/:id' element={<TimeOffViewPage />} />

           {/* Time Off Update Page takes in an updateTimeOffContext to generate content on page from TimeOffViewPage*/}
           <Route path='time-off/:id/update' element={<TimeOffUpdatePage />} />

           {/* Time Off Create Page*/}
           <Route path='time-off/create' element={<TimeOffCreatePage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
