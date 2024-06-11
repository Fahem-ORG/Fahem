import React from 'react'
import InstallClient from './install'

export const metadata = {
  title: 'Install FahemLms',
  description: 'Install Fahem on your server',
}

function InstallPage() {
  return (
    <div className="bg-white h-screen">
      <InstallClient />
    </div>
  )
}

export default InstallPage
