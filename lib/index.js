import { fetch } from "./fetch"
import idGenerator from "./idGenerator"
import mergeDeep from "./mergeDeep"
import { NotImplementedError } from "./notImplementedError"
import { styler } from "./styler"

const exp = {
  fetch: fetch,
  idGenerator: idGenerator,
  mergeDeep: mergeDeep,
  NotImplementedError: NotImplementedError,
  styler: styler
}

export default exp
export {
  fetch,
  idGenerator,
  mergeDeep,
  NotImplementedError,
  styler
}
