import configuration from './config'
import platformClient, { Models } from 'purecloud-platform-client-v2';


const client = platformClient.ApiClient.instance;
// Initial Setup
client.setEnvironment(configuration.genesysCloud.region);

// API Instances
let analyticsApi = new platformClient.AnalyticsApi();
let usersApi = new platformClient.UsersApi();
let interval : string;

// handle view error


export function getCurrentUserData() {
    let opts = {};
  
    usersApi.getUsersMe(opts)
      .then((data) => {
        let name = data.name;
        view.displayUserData(name)
      })
  }
  
export function formatDate() {
    let formattedDate = interval;
    formattedDate = formattedDate.replace("T", " ");
    formattedDate = formattedDate.replace("Z", "");
    formattedDate = formattedDate.replace("/", " to ");
    let formattedFrom = formattedDate.slice(0,10);
    let formattedTo = formattedDate.slice(26,37);
    view.viewDate(formattedFrom,formattedTo)
}
  
// Change the date to the user's desired date.
export function getDate() {
    // Ce interval de temps ne doit excédé 31 jours.
    interval = "2024-01-01T16:00:00.000Z/2024-01-31T10:00:00.000Z"

}
  
export function getNumberofCalls() {
    let body = {
      interval: interval,
      order: "asc",
      orderBy: "conversationStart",
      paging: {
        pageSize: 25,
        pageNumber: 1
      },
      segmentFilters: [{
        type: "and",
        predicates: [{
          type: "dimension",
          dimension: "mediaType",
          operator: "matches",
          value: "voice"
        }]
      }]
    }; // Object | query
  
    analyticsApi.postAnalyticsConversationsDetailsQuery(body)
      .then((data) => {
        view.displayNumberofCalls(data.totalHits)
      
    })
}
  
export  function getChatInteractions() {
    let body: any = {
      interval: interval,
      order: "asc",
      orderBy: "conversationStart",
      paging: {
        pageSize: "100",
        pageNumber: 1
      },
      segmentFilters: [{
        type: "and",
        predicates: [{
          type: "dimension",
          dimension: "mediaType",
          operator: "matches",
          value: "chat"
        }]
      }]
    }; // Object | query
  
    analyticsApi.postAnalyticsConversationsDetailsQuery(body)
      .then((data) => {
        view.displayNumberofChat(data.totalHits) 
  
    })
}
  
export function abandonedCalls() {
    let body = {
      interval: interval,
      order: "asc",
      orderBy: "conversationStart",
      paging: {
        pageSize: 25,
        pageNumber: 1
      },
      segmentFilters: [{
        type: "and",
        predicates: [{
          type: "dimension",
          dimension: "mediaType",
          operator: "matches",
          value: "voice"
        }]
      }],
      conversationFilters: [{
        type: "or",
        predicates: [{
          type: "metric",
          metric: "tAbandon",
          range: {
            gte: 1
          }
        }]
      }]
    }; // Object | query
  
    analyticsApi.postAnalyticsConversationsDetailsQuery(body)
      .then((data) => {
        view.displayNumberofAbandoned(data.totalHits) 
    })
}
  
export function getNumberofAnsweredCall() {
    let body = {
      interval: interval,
      order: "asc",
      orderBy: "conversationStart",
      paging: {
        pageSize: 25,
        pageNumber: 1
      },
      segmentFilters: [{
        type: "and",
        predicates: [{
          type: "dimension",
          dimension: "mediaType",
          operator: "matches",
          value: "voice"
        }]
      }],
      conversationFilters: [{
        type: "and",
        predicates: [{
          type: "metric",
          metric: "tAnswered",
          range: {
            gte: 1
          }
        }]
      }]
    }; // Object | query
  
    analyticsApi.postAnalyticsConversationsDetailsQuery(body)
      .then((data) => {
        view.displayNumberofAnswered(data.totalHits) 
    })
}
  
  
export function getNumberofVoiceOutbound() {
    let body: any= {
      interval: interval,
      order: "asc",
      orderBy: "conversationStart",
      paging: {
        pageSize: "100",
        pageNumber: 1
      },
      segmentFilters: [{
        type: "and",
        predicates: [{
          type: "dimension",
          dimension: "direction",
          operator: "matches",
          value: "outbound"
        }, {
          type: "dimension",
          dimension: "mediaType",
          operator: "matches",
          value: "voice"
        }]
      }]
    }; // Object | query
  
    analyticsApi.postAnalyticsConversationsDetailsQuery(body)
      .then((data) => {
        view.displayNumberofVoiceOutbound(data.totalHits);
    })
}
  
  
export function getNumberofVoiceInbound() {
    let body:any = {
      interval: interval,
      order: "asc",
      orderBy: "conversationStart",
      paging: {
        pageSize: "100",
        pageNumber: 1
      },
      segmentFilters: [{
        type: "and",
        predicates: [{
          type: "dimension",
          dimension: "direction",
          operator: "matches",
          value: "inbound"
        }, {
          type: "dimension",
          dimension: "mediaType",
          operator: "matches",
          value: "voice"
        }]
      }]
    }; // Object | query
  
    analyticsApi.postAnalyticsConversationsDetailsQuery(body)
      .then((data) => {
        view.displayNumberofVoiceInbound(data.totalHits);
    })
}
  
export function populateUsers() {
    let body = {
      "sortOrder": "ASC",
      "pageSize": 100
    }; // Object | Search request options
  
    usersApi.postUsersSearch(body)
      .then((data) => {
        view.displayNumberofUsers(data);
    })
}
  
export function generateUserData(selectedUserId:string) {
    let body = {
      interval: interval,
      order: "asc",
      paging: {
        pageSize: 25,
        pageNumber: 1
      },
      userFilters: [{
        type: "or",
        predicates: [{
          type: "dimension",
          dimension: "userId",
          operator: "matches",
          value: selectedUserId
        }]
      }]
    }; // Object | query
  
    /**
     * - // Query response : No result found
        "userDetails": [
          {
            "userId": "83c8a3a3-1287-4c45-a8fc-b347d52b7541",
            "primaryPresence": [
              {
                "startTime": "2024-03-07T18:10:03.128Z",
                "endTime": "2024-04-26T13:40:31.077Z",
                "systemPresence": "OFFLINE",
                "organizationPresenceId": "ccf3c10a-aa2c-4845-8e8d-f59fa48c58e5"
              }
            ]
          }
        ],
        "totalHits": 7
      }
      - // Query response : No result found
        { "totalHits": 0 }
     */
  
    analyticsApi.postAnalyticsUsersDetailsQuery(body)
      .then((data:any) => {
        if (data.hasOwnProperty('userDetails')) {
          for (const results of data.userDetails[0].primaryPresence) {
            view.populateUsertable(results)
          }
        } else {
          view.populateUsertable([])
        }
    })
}