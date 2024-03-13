import apiRequest from './api'
import {ApiPath} from './api/definitions'

class WorkOrderService {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getAllClientsByOrg(siteId: number | string) {
    return apiRequest.get(
      `${ApiPath.fetchAssetsBySiteId}?siteId=${siteId}`,
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
