import {
    ResponseData,
    JSONPOption as Option,
    PublicFolderResponse,
    DashBoardUserInfoResponse,
} from '@/types'
import jsonp from 'jsonp'

export default function jsonpRequest(
    url: string,
    option?: Option
): Promise<ResponseData | PublicFolderResponse | DashBoardUserInfoResponse> {
    const targetUrl =
        url.indexOf('http') === 0 ? url : import.meta.env.VITE_API_BASEURL + url
    return new Promise<
        ResponseData | PublicFolderResponse | DashBoardUserInfoResponse
    >((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        jsonp(targetUrl, option, (err, data) => {
            if (!err) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

export function isResponseData(
    obj: ResponseData | PublicFolderResponse | DashBoardUserInfoResponse
): obj is ResponseData {
    if ('accessToken' in obj) return true
    if (obj.data) {
        return 'userInfo' in obj.data
    }
    return true
}
export function isPublicFolderData(
    obj: ResponseData | PublicFolderResponse | DashBoardUserInfoResponse
): obj is PublicFolderResponse {
    if (obj.data) {
        if ('folders' in obj.data) return true
    }
    return false
}
