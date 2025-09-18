import { BrowserRouter, Route, Routes, } from 'react-router-dom'
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
import { PayStubViewPage } from './pages/PayStubViewPage'
import { TimeOffViewPage_M } from './pages/TimeOffViewPage_M'
import { TimeOffUpdatePage_M } from './pages/TimeOffUpdatePage_M'
import { PayStubViewPage_M } from './pages/PayStubViewPage_M'
import { PayStubCreatePage_M } from './pages/PayStubCreatePage_M'
import { PayStubUpdatePage } from './pages/PayStubUpdatePage'
import UpdateTimesheetPage from './pages/UpdateTimesheetPage'
import { TimesheetCreatePage } from './pages/TimesheetCreatePage'
import ManagerEmployeesPage from './pages/ManagerEmployeesPage'
import { UserScopeProvider } from './context/UserScope'

function App() {

  return (
    <BrowserRouter>
    <UserScopeProvider>
      <Routes>
        
        <Route element={<Frame />}>
          <Route index element={<HomePage />} />
          <Route path="time-off-e" element={<TimeOffPage_E />} />
          <Route path="pay-stub-e" element={<PayStubPage_E />} />
          <Route path="time-off-m" element={<TimeOffPage_M />} />
          <Route path="pay-stub-m" element={<PayStubPage_M />} />

        
          {/* Employee Pages */}
          {/* Time Off View Page takes in a url paramater (id) to generate content on page*/}
          <Route path='time-off/:id' element={<TimeOffViewPage />} />

          {/* Time Off Update Page takes in an updateTimeOffContext to generate content on page from TimeOffViewPage*/}
          <Route path='time-off/:id/update' element={<TimeOffUpdatePage />} />

          {/* Time Off Create Page*/}
          <Route path='time-off/create' element={<TimeOffCreatePage />} />

          {/* Pay Stub View Page takes in a url paramater (id) to generate content on page*/}
          <Route path='pay-stub/:id' element={<PayStubViewPage />} />

          {/* Mangager Pages */}
          {/* Time Off View Page takes in a url paramater (id) to generate content on page*/}
          <Route path='time-off-m/:id' element={<TimeOffViewPage_M />} />

          {/* Time Off Update Page takes in an updateTimeOffContext to generate content on page from TimeOffViewPage*/}
          <Route path='time-off-m/:id/update' element={<TimeOffUpdatePage_M />} />

          {/* Pay Stub View Page takes in a url paramater (id) to generate content on page*/}
          <Route path='pay-stub-m/:id' element={<PayStubViewPage_M />} />

          {/* Pay Stub Create Page*/}
          <Route path='pay-stub-m/create' element={<PayStubCreatePage_M />} />

          {/* Pay Stub Update Page*/}
          <Route path='pay-stub-m/:id/update' element={<PayStubUpdatePage />} />


          {/* --------TIMESHEET Pages-------- */}
          {/* Timesheet ALL Page - Loads all of the viewable timesheets in company without employee names */}
          <Route path="timesheet" element={<Timesheet />} />

          {/* Timesheet UPDATE Page - A button from the viewable timesheet page will allow employee to update a timesheet that is NOT approved by a manager */}
          <Route path="timesheet/:id/update" element={<UpdateTimesheetPage />} />

          {/* Timesheet CREATE Page - A button from the viewable timesheet page will allow employee to create a new timesheet that will let them start logging hours*/}
          <Route path="timesheet/new" element={<TimesheetCreatePage />} />

          <Route path="employee/manager-id" element={<ManagerEmployeesPage />} />

        </Route>
        
      </Routes>
      </UserScopeProvider>
    </BrowserRouter>
  );
}

export default App