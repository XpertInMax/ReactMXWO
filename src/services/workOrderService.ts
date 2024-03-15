import apiRequest from './api'
import {ApiPath} from './api/definitions'

class WorkOrderService {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getAssetsBySiteId(siteId: number | string) {
    const qs = `lean=1&ignorecollection=1&oslc.where=siteid%3D%22${siteId}%22%20and%20gafassetlevel3.siteid%3D%22${siteId}%22&oslc.select=assetnum%2Cdescription%2Cparent&collectioncount=1`
    return apiRequest.get(
      `${ApiPath.fetchAssetsBySiteId}?${qs}`,
    )
  }

  saveWorkOrder(data:any) {
    return apiRequest.post(
      ApiPath.saveWorkOrder,
      data
    )
  }

  getAllWorkOrders() {
    return apiRequest.get(
      `${ApiPath.fetchWorkOrders}`,
    )
  }
  
}

export default WorkOrderService
