/**
 * 获取 URL 查询参数
 * @param url
 * @returns 查询参数对象
 */
export function getQuery(url: string) {
  const result: Record<string, string> = {}
  const params = new URL(url).searchParams
  for (const [key, value] of params) {
    result[key] = value
  }
  return result
}
