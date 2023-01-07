import { useMemo } from 'react'

import { Chance } from 'chance'

import { createAvator } from '@/libs/avator'
import { createId } from '@/utils/bebopUtil'
import { dayjs, yyyymmddhhmmss } from '@/utils/dateUtil'

const useTimeline = (n: number = 30) => {
  const data = useMemo(() => {
    return [...Array(n)].map((item, index) => {
      const stamp = yyyymmddhhmmss(
        dayjs().subtract(Chance(index + 1).hour({ twentyfour: true }), 'hours')
      )
      return {
        id: createId(),
        name: Chance().name(),
        email: Chance().email(),
        avator: createAvator(createId()),
        title: Chance().company(),
        description: Chance().sentence({ words: 30 }),
        start_at: yyyymmddhhmmss(stamp),
        end_at: yyyymmddhhmmss(
          dayjs(stamp).add(Chance(index + 1).d100(), 'hours')
        ),
        created_at: yyyymmddhhmmss(dayjs()),
        updated_at: yyyymmddhhmmss(dayjs()),
      }
    })
  }, [n])
  return useMemo(() => {
    return {
      data,
    }
  }, [data])
}

export default useTimeline
