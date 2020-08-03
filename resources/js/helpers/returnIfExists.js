export default function returnIfExists(request) {
  return request && request.data && request.data.length > 0 ? request.data : []
}
