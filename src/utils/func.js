
export function isNotEmpty(obj) {
  for (var name in obj) {
    return true
  }
  return false
}
