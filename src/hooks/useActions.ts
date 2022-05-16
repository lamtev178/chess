import { useAppDispatch } from "./usedTypeSelector"
import { bindActionCreators } from "redux"
import ActionCreators from "../store/actionCreators/"

export const useActoins = () => {
  const dispatch = useAppDispatch()  
  return bindActionCreators(ActionCreators, dispatch)
}