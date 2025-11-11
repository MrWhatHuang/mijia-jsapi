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

/**
 * JSON 解析
 * @param str JSON 字符串
 * @returns 解析后的对象，解析失败时返回 null
 */
export function jsonParse(str: string) {
  try {
    return JSON.parse(str)
  }
  catch (error) {
    console.error('JSON 解析失败:', error)
    return null
  }
}

/**
 * 解析 Cookie 字符串
 * @param str Cookie 字符串
 * @returns 解析后的 Cookie 对象数组
 */
export function parsedCookies(str: string): Record<string, { value: string, [key: string]: string | boolean }> {
  const cookies = str.split(/,(?=\s*\w+=)/)
  const result = {}
  cookies.forEach((c) => {
    const parts = c.split(';').map(p => p.trim())
    const [name, value] = parts[0].split('=')
    const attrs = Object.fromEntries(
      parts.slice(1).map((p) => {
        const [k, v] = p.split('=')
        return [k?.trim(), v?.trim() || true]
      }),
    )
    result[name] = { value, ...attrs }
  })
  return result
}
