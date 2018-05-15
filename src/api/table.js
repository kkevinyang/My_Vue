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

export function getResultById(job_key_id) {
  return request({
    url: '/api/job/key/',
    method: 'post',
    data: {
      job_key_id
    }
  })
}

export function saveConf(job_id, key, config) {
  return request({
    url: '/api/chart/config/',
    method: 'post',
    data: {
      key,
      job_id,
      config
    }
  })
}

export function getConf() {
  return request({
    url: '/api/chart/config/',
    method: 'get'
  })
}
