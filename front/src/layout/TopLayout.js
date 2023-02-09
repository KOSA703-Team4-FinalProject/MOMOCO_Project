import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import RegAndLoginHeader from 'src/components/RegAndLoginHeader'
import TopContent from 'src/components/TopContent';

const TopLayout = () => {

  const location = useLocation();
  
  useEffect(()=>{

    console.log(location.pathname);

  }, [location])

  return (
    <div>
      <RegAndLoginHeader />
      <TopContent />
    </div>
  )
}

export default TopLayout
