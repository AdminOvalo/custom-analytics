import './App.css'

function App() {

  return (
    <>
      {/* Top container */}
      <div className="w3-bar w3-top w3-large">
        <span className="w3-bar-item w3-right w3-text-white" id="date">Data from  </span>
      </div>

      {/* Sidebar/menu */}
      <nav className="w3-sidebar w3-collapse ">
        <div className="w3-container w3-row">
          <div className="w3-col s8 w3-bar">
            <span>Welcome, <strong id="userName"></strong></span><br/>
          </div>
        </div>
        <hr/>
        <div className="w3-container">
          <h5>Dashboard</h5>
        </div>
        <div className="w3-bar-block">
          <a href="#" className="w3-bar-item w3-button w3-padding"><i className="fa fa-users fa-fw"></i>  Overview</a>
        </div>
      </nav>
      
      {/* Overlay effect when opening sidebar on small screens */}
      <div className="w3-overlay w3-hide-large w3-animate-opacity"></div>

      {/* !PAGE CONTENT! */}
      <div className="w3-main">

        {/* Header */}
        <header className="w3-container w3-padding-16">
          <h5><b><i className="fa fa-dashboard"></i> Agents Dashboard</b></h5>
        </header>

        <div className="w3-row-padding w3-margin-bottom w3-margin-top">
          <div className="w3-quarter">
          <div className="w3-container w3-orange w3-padding-16">
            <div className="w3-left"><i className="fa fa-comment w3-xxxlarge"></i></div>
            <div className="w3-right">
              <h3 id="chatInteractionsNumber"></h3>
            </div>
            <div className="w3-clear"></div>
            <h4>Chat Interactions</h4>
          </div>
        </div>
        <div className="w3-quarter">
          <div className="w3-container w3-navy w3-padding-16">
            <div className="w3-left"><i className="fa fa-phone-square w3-xxxlarge"></i></div>
            <div className="w3-right">
              <h3 id="numberofCalls"></h3>
            </div>
            <div className="w3-clear"></div>
            <h4>Number of Calls</h4>
          </div>
        </div>
        <div className="w3-quarter">
          <div className="w3-container w3-teal w3-padding-16">
            <div className="w3-left"><i className="fa fa-users w3-xxxlarge"></i></div>
            <div className="w3-right">
              <h3 id="numberofAbandonedCalls"></h3>
            </div>
            <div className="w3-clear"></div>
            <h4>Abandoned Calls</h4>
          </div>
        </div>
        <div className="w3-quarter">
          <div className="w3-container w3-light-blue w3-text-white w3-padding-16">
            <div className="w3-left"><i className="fa fa-phone w3-xxxlarge"></i></div>
            <div className="w3-right">
              <h3 id="numberofAnsweredCalls"></h3>
            </div>
            <div className="w3-clear"></div>
            <h4>Answered Calls</h4>
          </div>
          </div>
        </div>

        <div className="w3-panel">
        <div className="w3-row-padding">
          <div className="w3-twothird">
            <h5>Activities</h5>
            <table className="w3-table w3-striped w3-white">
              <tr>
                <td><i className="fa fa-user-circle w3-large fa-accent-charcoal"></i></td>
                <td>Voice Inbound</td>
                <td><i id="numberofInbound"></i></td>
              </tr>
              <tr>
                <td><i className="fa fa-volume-control-phone w3-large fa-accent-yellow"></i></td>
                <td>Voice Outbound</td>
                <td><i id="numberofOutbound"></i></td>
              </tr>
              <tr>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <hr/>

      <div className="w3-container">
        <h6>Select Agent</h6> <select id="agentsList"></select>
        <h5>Agent Details</h5>

        <table className="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white" id="userTable">
          <tr>
            <td> <b>Start Date and Time</b></td>
            <td><b>End Date and Time</b></td>
            <td><b>System Presence</b></td>
          </tr>
        </table><br/>
      </div>
      </div>

      
    </>
    
  )
}

export default App
