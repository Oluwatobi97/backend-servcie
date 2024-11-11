import {describe, expect, it, test} from 'vitest'

describe('test funtion', () =>
{
    it('should be a type of string', () =>
    {
        const testValue = 'hello'

        expect(testValue).toBeTypeOf("string")
    })

})
