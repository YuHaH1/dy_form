export const getTypes = (obj: any):Types => {
    return Object.prototype.toString.call(obj).slice(8,-1) as Types
}
type Types = 'Object' | 'Array' | 'Function' | 'Undefined' | 'Null' | 'Boolean' | 'String' | 'Number' | 'Symbol' | 'BigInt'