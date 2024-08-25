import App from './App'
import { createRoot } from 'react-dom/client'

// describe はテストスイートの定義。要はグループ化
describe('TestSuite01', () => {
  // テスト前処理（一度で良い場合はbeforeAll）
  beforeEach(() => {})

  // 作成したDOMコンポーネントが正常に動作するか
  // 最低限これは追加した方がよさそう。
  it('renders without crashing', () => {
    const div = document.createElement('div')
    const root = createRoot(div)
    root.render(<App />)
  })
})
