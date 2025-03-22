import React from 'react'
import AdminNavBar from '../AdminNavBar/AdminNavBar'
import Footer from '../../Footer/Footer'
import { CategoryProvider } from '../ContextApi/CategoryContext'

const Dashboard = () => {
  return (
    <div>
<CategoryProvider>
  <AdminNavBar/>
  </CategoryProvider>



      <Footer/>
    </div>
  )
}

export default Dashboard
