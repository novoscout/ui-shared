// Lovingly stolen from https://github.com/Tomekmularczyk/react-id-generator/blob/master/src/nextId.ts

let globalPrefix = "id-";
let lastId = 0;

const nextId = (localPrefix) => {
  lastId++;
  return `${localPrefix || globalPrefix}${lastId}`;
}

const resetId = () => {
  lastId = 0;
};

const setPrefix = (newPrefix) => {
  globalPrefix = newPrefix;
};

const idGenerator = {
  nextId: nextId,
  resetId: resetId,
  setPrefix: setPrefix
}

export default idGenerator
export { nextId, resetId, setPrefix }
