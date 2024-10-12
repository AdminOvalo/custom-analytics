import configuration from './config'
import platformClient, { Models } from 'purecloud-platform-client-v2';


const client = platformClient.ApiClient.instance;
// Initial Setup
client.setEnvironment(configuration.genesysCloud.region);

// API Instances
let analyticsApi = new platformClient.AnalyticsApi();
let usersApi = new platformClient.UsersApi();

export function initAll() {
  return client.loginImplicitGrant(configuration.clientID, configuration.redirectUri)
    .then((data:any) => data)
}

export function getCurrentUserData() {
    let opts = {};
    return usersApi.getUsersMe(opts)
      .then((data: Models.UserMe) => data)
}
  
// Change the date to the user's desired date.
export function formatInterval(startDate: Date=new Date(), endDate: Date=new Date()) {
  return startDate.toISOString() + "/" + endDate.toISOString()
}

export function getNumberofCalls(interval: string) {
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
    };
  
    return analyticsApi.postAnalyticsConversationsDetailsQuery(body)
      .then((data: Models.AnalyticsConversationQueryResponse) => {
        return data.totalHits
    })
}
  
export function getChatInteractions(interval:string) {
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
    };
  
    return analyticsApi.postAnalyticsConversationsDetailsQuery(body)
      .then((data: Models.AnalyticsConversationQueryResponse) => {return data.totalHits ?? 0})
}
  
export function abandonedCalls(interval:string) {
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
    };
  
    return analyticsApi.postAnalyticsConversationsDetailsQuery(body)
      .then((data: Models.AnalyticsConversationQueryResponse) => data.totalHits)
}
  
export function getNumberofAnsweredCall(interval:string) {
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
    };
  
    return analyticsApi.postAnalyticsConversationsDetailsQuery(body)
      .then((data:Models.AnalyticsConversationQueryResponse) => data.totalHits)
}
  
export function getNumberofVoiceOutbound(interval:string) {
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
    };
  
    return analyticsApi.postAnalyticsConversationsDetailsQuery(body)
      .then((data:  Models.AnalyticsConversationQueryResponse) => data.totalHits)
}
    
export function getNumberofVoiceInbound(interval:string) {
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
  };
      
  return analyticsApi.postAnalyticsConversationsDetailsQuery(body)
    .then((data:  Models.AnalyticsConversationQueryResponse) => data.totalHits)
}
  
export function populateUsers() {
  let body = {
    "sortOrder": "ASC",
    "pageSize": 100
  }; 

  return usersApi.postUsersSearch(body)
    .then((data:  Models.UsersSearchResponse) => data)
}

export function generateUserData(selectedUserId:string, interval:string) {
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
    };
  
    return analyticsApi.postAnalyticsUsersDetailsQuery(body)
      .then((data:Models.AnalyticsUserDetailsQueryResponse) => {
        if (data.userDetails && data.userDetails.length >= 0) {
          let dataList: Models.AnalyticsUserPresenceRecord[] = []
          if (data.userDetails[0].primaryPresence) {
            for (const results of data.userDetails[0].primaryPresence) dataList.push(results)
            return dataList
          }
        } else {
          return []
        }
    })
}