import { styler } from "./styler"
import { NotImplementedError } from "./notImplementedError"
import { fetch } from "./fetch"
import idGenerator from "./idGenerator"

const dflt = {
  fetch: fetch,
  idGenerator: idGenerator,
  styler: styler,
  NotImplementedError: NotImplementedError,
}

export default dflt
export { fetch, idGenerator, styler, NotImplementedError }
