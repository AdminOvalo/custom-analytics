import './App.css'
import { generateUserData, getCurrentUserData, initAll, populateUsers, getChatInteractions, abandonedCalls, getNumberofAnsweredCall, getNumberofVoiceOutbound, getNumberofVoiceInbound, getNumberofCalls, getDate } from "../src/utils/genesysCloudUtils"
import { useEffect, useState } from 'react'
import { Models } from 'purecloud-platform-client-v2'
import { formatedDate } from './utils/utils'

interface userData {
  chatNumber?: number,
  callAbondonedNumber?: number,
  callAnswerNumber?: number,
  callOutofBound?: number,
  callInBound?: number
  callNumber?:number
}

function App() {
  const [userAuth, setUserAuth] = useState<Models.UserMe| undefined>(undefined)
  const [userAuthData, setUserAuthData] = useState< userData|undefined>()
  const [users, setUsers] = useState<Models.UsersSearchResponse|undefined>(undefined)
  const [selectedUserId, setSelectedUserId] = useState<string|undefined>(undefined)
  const [usersDatas, setUsersDatas] = useState<Models.AnalyticsUserPresenceRecord[]|undefined>(undefined)

  async function init() {
    await initAll()
      .then(() =>{
        return getCurrentUserData()
      })
      .then((data:any) => { setUserAuth(data)})
      .catch((error: any) => console.log(error))
  }
  async function populateAuthUsers () {
    await populateUsers()
    .then((data:Models.UsersSearchResponse) => data)
    .then((usersdatas: Models.UsersSearchResponse) => {
      setUsers(usersdatas)
      if (usersdatas) {
        setSelectedUserId(usersdatas.results[0].id)
        if (usersdatas.results[0].id) generateUsersDatas(usersdatas.results[0].id)
      }
    })
    .catch((error: any) => console.log(error))
  }
  async function generateUsersDatas(id: string) {
    await generateUserData(id)
    .then((data: Models.AnalyticsUserPresenceRecord[] | undefined) => data ?? [])
    .then((usersdatas:  Models.AnalyticsUserPresenceRecord[]) => {
      setUsersDatas(usersdatas)
    })
    .catch((error: any) => console.log(error))
  }
  async function getUserData() {
    await getChatInteractions()
    .then((data:number| undefined) => data ?? 0)
    .then(async (data: number) => {
      setUserAuthData((prev:userData | undefined) => {
        return {...prev, chatNumber: data}
      })
      return await abandonedCalls()
    }).then((data:number| undefined) => data ?? 0)
    .then(async (data: number) => {
      setUserAuthData((prev:userData | undefined) => {
        return {...prev, callAbondonedNumber: data}
      })
      return await getNumberofAnsweredCall();
    }).then((data:number| undefined) => data ?? 0)
    .then(async (data: number) => {
      setUserAuthData((prev:userData | undefined) => {
        return {...prev, callAnswerNumber: data}
      })
      return await getNumberofVoiceOutbound()
    }).then((data:number| undefined) => data ?? 0)
    .then(async (data: number) => {
      setUserAuthData((prev:userData | undefined) => {
        return {...prev, callOutofBound: data}
      })
      return await getNumberofVoiceInbound()
    }).then((data:number| undefined) => data ?? 0)
    .then(async (data: number) => {
      setUserAuthData((prev:userData | undefined) => {
        return {...prev, callInBound: data}
      })
      return await getNumberofCalls()
    }).then((data:number| undefined) => data ?? 0)
    .then((data: number) => {
      setUserAuthData((prev:userData | undefined) => {
        return {...prev, callNumber: data}
      })
    })
    .catch((error: any) => console.log("getUserData => "+ error))
  }
  
  useEffect(() => {
    init()
    getUserData()
    populateAuthUsers()
  }, [])

  return (
    <>
      {/* Top container */}
      <div className="w3-bar w3-top w3-large">
        <span className="w3-bar-item w3-right w3-text-white" id="date">Data from {formatedDate(getDate().split("/")[0]) +" to "+ formatedDate(getDate().split("/")[1])} </span>
      </div>

      <div>
        {/* Sidebar/menu */}
        <nav className="w3-sidebar w3-collapse">
          <div className="w3-container w3-row">
            <div className="w3-col s8 w3-bar">
              <span>Welcome, {userAuth ? userAuth.name : ""}</span><br/>
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
            <h5><b><i className="fa fa-dashboard"></i>Agents Dashboard</b></h5>
          </header>

          <div className="w3-row-padding w3-margin-bottom w3-margin-top">
            <div className="w3-quarter">
                <div className="w3-container w3-orange w3-padding-16">
                  <div className="w3-left"><i className="fa fa-comment w3-xxxlarge"></i></div>
                  <div className="w3-right">
                    <h3 id="chatInteractionsNumber">{userAuthData?.chatNumber}</h3>
                  </div>
                  <div className="w3-clear"></div>
                  <h4>Chat Interactions</h4>
                </div>
            </div>
            <div className="w3-quarter">
              <div className="w3-container w3-navy w3-padding-16">
                <div className="w3-left"><i className="fa fa-phone-square w3-xxxlarge"></i></div>
                <div className="w3-right">
                  <h3 id="numberofCalls">{userAuthData?.callNumber}</h3>
                </div>
                <div className="w3-clear"></div>
                <h4>Number of Calls</h4>
              </div>
            </div>
            <div className="w3-quarter">
              <div className="w3-container w3-teal w3-padding-16">
                <div className="w3-left"><i className="fa fa-users w3-xxxlarge"></i></div>
                <div className="w3-right">
                  <h3 id="numberofAbandonedCalls">{userAuthData?.callAbondonedNumber}</h3>
                </div>
                <div className="w3-clear"></div>
                <h4>Abandoned Calls</h4>
              </div>
            </div>
            <div className="w3-quarter">
              <div className="w3-container w3-light-blue w3-text-white w3-padding-16">
                <div className="w3-left"><i className="fa fa-phone w3-xxxlarge"></i></div>
                <div className="w3-right">
                  <h3 id="numberofAnsweredCalls">{userAuthData?.callAnswerNumber}</h3>
                </div>
                <div className="w3-clear"></div>
                <h4>Answered Calls</h4>
              </div>
            </div>
            <div className="w3-panel">
              <div className="w3-row-padding">
                <div className="w3-twothird">
                  <h5>Activities</h5>
                  <table className="w3-table w3-striped w3-white">
                    <thead>
                      <tr>
                        <th><i className="fa fa-user-circle w3-large fa-accent-charcoal"></i></th>
                        <th>Voice Inbound</th>
                        <th><i id="numberofInbound">{userAuthData?.callInBound}</i></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><i className="fa fa-volume-control-phone w3-large fa-accent-yellow"></i></td>
                        <td>Voice Outbound</td>
                        <td><i id="numberofOutbound">{userAuthData?.callOutofBound}</i></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <hr/>
            <div className="w3-container">
              <h6>Select Agent</h6>
              <select id="agentsList" defaultValue={selectedUserId} onChange={(e:any) => generateUsersDatas(e.target.value)}>
                {users && users.results.map((user:Models.User, index:number) => {
                  return <option key={"user_"+index} value={user.id}>{user.name}</option>
                })}
              </select>
              <h5>Agent Details</h5>

              <table className="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white" id="userTable">
                <thead>
                  <tr>
                    <th><b>Start Date and Time</b></th>
                    <th><b>End Date and Time</b></th>
                    <th><b>System Presence</b></th>
                  </tr>
                </thead>
                <tbody>
                  {usersDatas && usersDatas.length > 0 ? 
                    usersDatas.map((data: Models.AnalyticsUserPresenceRecord, index: number) => {
                      return <tr key={"tr_"+index}>
                          <td key={"td_start_"+index}>{formatedDate(data.startTime)}</td>
                          <td key={"td_end_"+index}>{formatedDate(data.endTime)}</td>
                          <td key={"td_presence_"+index}>{data.systemPresence}</td>
                        </tr>
                    })
                    : <tr><td colSpan={3} style={{"textAlign":"center"}}>No data found</td></tr>
                  }
                </tbody>
              </table><br/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
