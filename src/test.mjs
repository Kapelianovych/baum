// @flow

export type TestObject = {|
  title: string,
  fn: () => Promise<void> | void
|}

export function test(
  title: string,
  fn: () => Promise<void> | void
): TestObject {
  return {
    title,
    fn
  }
}
