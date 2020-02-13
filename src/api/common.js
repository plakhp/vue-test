'use strict'

/**
 * @Author: charles.yu
 * @Date: 2020/2/13 11:07 PM
 * @Last Modified by: charles.yu
 * @Last Modified time: 2020/2/13 11:07 PM
 * @Desc
 */
import request from '@/utils/request'

export function upload(data) {
  return request.postForm({
    url: '/storage/storage/upload',
    params: data
  })
}
