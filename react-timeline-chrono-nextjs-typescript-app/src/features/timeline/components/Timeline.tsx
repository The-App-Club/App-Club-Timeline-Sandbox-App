/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Avatar, Box, Divider, Typography } from '@mui/joy'
import { arrange, desc, tidy } from '@tidyjs/tidy'
import { Chrono } from 'react-chrono'

import Spacer from '@/components/ui/Spacer'
import useTimeline from '@/features/timeline/hooks/useTimeline'
import { formatRelativeTime, hhmm, ymdhyphen } from '@/utils/dateUtil'
import { dayjs } from '@/utils/dateUtil'

const Timeline = () => {
  const { data } = useTimeline(5)
  return (
    <Box component={'section'} className={'mx-auto mt-24 w-full max-w-lg'}>
      <Typography
        component={'h1'}
        level='h1'
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        Timeline
      </Typography>
      <Spacer />
      <Divider />
      <Spacer />
      <Box
        css={css`
          width: 100%;
          height: 80vh;
          & #timeline-main-wrapper {
            padding: 0;
            margin-left: 1rem;

            [data-testid='tree-main'] {
              padding: 0;
            }
          }
        `}
      >
        <Chrono
          onItemSelected={(d) => {
            console.log(d)
          }}
          mode='VERTICAL'
          scrollable={{ scrollbar: false }}
          flipLayout
          hideControls
        >
          {tidy(data, arrange([desc('start_at')])).map((item, index) => {
            return (
              <Box key={index}>
                <Typography component={'h1'} level={'h1'}>
                  {item.title}
                </Typography>
                <Spacer />
                <Divider />
                <Spacer />
                <Typography
                  component={'p'}
                  css={css`
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  `}
                >
                  {item.description}
                </Typography>
                <Spacer />
                <Avatar
                  alt={`${item.name}`}
                  src={`${item.avator}`}
                  size={`lg`}
                />
                <Box
                  css={css`
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                  `}
                >
                  <Typography component={'time'} color={'neutral'}>
                    {ymdhyphen(item.start_at)}
                  </Typography>
                  <Typography component={'time'} color={'neutral'}>
                    {dayjs(item.start_at).isToday()
                      ? `${hhmm(item.start_at)} ${formatRelativeTime(
                          item.start_at
                        )}`
                      : `1日前`}
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </Chrono>
      </Box>
    </Box>
  )
}

export default Timeline
