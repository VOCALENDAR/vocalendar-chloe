import { useState } from "react"
import { useDebounce } from "use-debounce"
import LayoutMain from "../../../components/layouts/main"



/**
 * VOCALENDAR Main Layoutコンテナ
 * @returns 
 */
 const LayoutMainConteiner: React.FC = () => {

  // 上部AppBarの検索Boxの動作設定。
  // TODO 現状Propsを引き回しているのを良しとするか
  const [searchText, setSearchText] = useState('')
  // イベントの遅延発火
  const [debounceedValue] = useDebounce(searchText, 1000)
  const searchTextOnChangeHanldler:React.ChangeEventHandler<HTMLInputElement> = (event) =>{
    setSearchText(event.currentTarget.value ?? '')
  } 

  return <LayoutMain
  searchText={debounceedValue}
  searchTextOnChangeHanldler={searchTextOnChangeHanldler}
  />
}

export default LayoutMainConteiner