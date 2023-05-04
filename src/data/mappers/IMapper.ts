export default interface IMapper<From, To> {
  map(source: From): To
  unmap(source: To): From
}
