/**
 * 文字列から最初のURLを抽出するメソッド
 * @param text 文字列
 * @returns URLもしくはundefined
 */
const extractURL = (text: string): string | undefined => text.match(/https?:\/\/[^\s]+/)?.[0]

export default extractURL
