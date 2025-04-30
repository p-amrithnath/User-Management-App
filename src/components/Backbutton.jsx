import React from 'react'

function Backbutton() {
  return (
    <div>
        <button className="btn btn-outline-primary m-3" onClick={() => window.history.back()}> <i className="fas fa-arrow-left"></i> Back</button>
    </div>
  )
}

export default Backbutton