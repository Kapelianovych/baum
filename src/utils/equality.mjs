// @flow

type ObjectType = {
  [string]: mixed,
}

function objectsEqual(o1: ObjectType, o2: ObjectType): boolean {
  let isObjectsEqual = false

  for (const key in o1) {
    if (key in o2) {
      const element1 = o1[key]
      const element2 = o2[key]

      isObjectsEqual = equal(element1, element2)
    } else {
      return false
    }
    if (!isObjectsEqual) {
      return false
    } else {
      continue
    }
  }

  return isObjectsEqual
}

function arrayEqual(a1: Array<mixed>, a2: Array<mixed>): boolean {
  if (a1.length === a2.length) {
    return a1.every(i1 => {
      return a2.includes(i1)
    })
  } else {
    return false
  }
}

function setEqual(a1: Set<mixed>, a2: Set<mixed>): boolean {
  for (const key of a1) {
    if (!a2.has(key)) {
      return false
    }
  }
  return true
}

function mapEqual(a1: Map<mixed, mixed>, a2: Map<mixed, mixed>): boolean {
  for (const [key, value] of a1.entries()) {
    if (!a2.get(key) && equal(a2.get(key), value)) {
      return false
    }
  }
  return true
}

export function equal(v1: mixed, v2: mixed): boolean {
  if (typeof v1 === typeof v2) {
    switch (typeof v1) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'undefined':
        return Object.is(v1, v2)
      case 'object':
        if (Array.isArray(v1) && Array.isArray(v2)) {
          // $FlowFixMe
          return arrayEqual(v1, v2)
        } else if (v1 instanceof Set && v2 instanceof Set) {
          return setEqual(v1, v2)
        } else if (v1 instanceof Map && v2 instanceof Map) {
          return mapEqual(v1, v2)
        } else {
          // $FlowFixMe
          return (v1 === null && v2 === null) || objectsEqual(v1, v2)
        }
      default:
        return Object.is(v1, v2)
    }
  } else {
    return false
  }
}
