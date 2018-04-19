import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getKey(job_id) {
  return request({
    url: '/api/job/',
    method: 'post',
    data: {
      job_id
    }
  })
}

export function getJob() {
  return request({
    url: '/api/job/list',
    method: 'get'
  })
}

export function getResult(job_id, key) {
  return request({
    url: '/api/job/key/',
    method: 'post',
    data: {
      key,
      job_id
    }
  })
}
