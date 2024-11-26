import { BottomNavigationLayout, PrimaryLayout } from 'layouts'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  scales
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useQuery } from '@tanstack/react-query'
import { fetchPricingHistoric } from 'config'
import { DatePicker, TimePicker } from 'antd'
import moment from 'moment'
import { title } from 'process'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';



const getQueryParams = (at: any) => {
  return `?at=${at}`
}

const PriceHistory = () => {
  dayjs.extend(customParseFormat);

  const [isOpen,setOpen] = useState(false)

const dateFormat = 'YYYY-MM-DD';
  const [param, setParam] = useState('')
  const { data, refetch, isLoading } = useQuery(
    fetchPricingHistoric(param ? {queryParams : getQueryParams(param)}: {})
  )
  
  const price: any = data?.prices?.map((item) => item?.sell_price)
  const createdDate = data?.prices?.map((item) =>
    new Date(item.created_at).getFullYear()
  )
  const defaultDate:any = moment().subtract(6, 'months')
  const [date, setDate] = React.useState(dayjs(moment(defaultDate).format('YYYY-MM-DD'), dateFormat))
  const [time, setTime] = React.useState(dayjs(moment(defaultDate).format('YYYY-MM-DD'), dateFormat))
  const [value, setValue] = useState('')

  useEffect(() => {
    if (price?.length && date && time) {
      setValue(price[0]);   
    }
    
  }, [price])
  

  const t = useTranslations('PriceHistoryPage')

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
    scales: {
      y: { title: { text: 'NZD', display: true } },
      x: { title: { text: 'YEAR', display: true } }
    },
    plugins: {
      legend: {
        // position: 'bottom',
        display: false
      },
      title: {
        display: false,
        text: 'Monthly Sales Data'
      }
    }
  }

  const chartData = {
    labels: createdDate,
    datasets: [
      {
        label: '',
        data: price,
        borderColor: '#FD889A',
        backgroundColor: '#FD889A',
        color: '#000',
        pointRadius: 0
      }
    ]
  }

  const convertToDate = (d: any, t: any) => {
    
    const result = new Date(
      moment(d?.$d).format('MM-DD-YYYY') +
        ' ' +
        moment(t?.$d).format('HH:mm:ss')
    )
    
    setParam(result.toISOString())
  }
  
  useEffect(() => {
    if (param !== null) {
      refetch()
    }
  }, [param])

  return (
    <BottomNavigationLayout>
      <PrimaryLayout title={'Gold Price History'}>
        <div className="flex-col w-full items-center pb-20">
          <span className="text-xl font-medium text-center">
            {t('goldValue')}
          </span>
          <span className="text-sm font-normal text-center">
            {t('perGram')}
          </span>
          <div className="flex-col mt-4 w-[95%] py-6">
            <Line
              style={{ width: '100%', height: 'auto' }}
              options={options}
              data={chartData}
            />
          </div>
          <div
            className="flex-col mt-4 w-[90%] py-6 px-4 rounded-lg gap-4"
            style={{ backgroundColor: 'var(--black)' }}
          >
            <span className="text-xl font-medium text-center text-white">
              {t('checkGold')}{' '}
              <span style={{ color: 'var(--pink)' }}>{t('price')}</span>
            </span>
            <div className="flex-col w-full gap-1 items-center">
              <span className="text-sm font-normal text-center text-white">
                {t('date')}
              </span>
              <div className="date-picker-wrapper relative py-2 px-4 rounded-full w-[55%] bg-white">
               
                <div className="z-10 w-full relative">
                  <DatePicker
                    open={isOpen}
                    className=" w-full border-0 text-center"
                    format={'DD/MM/YYYY'}
                    suffixIcon={null}
                    onOpenChange={(isVisible) =>setOpen(isVisible)}
                    value={date}
                    inputReadOnly={true}
                    onChange={(date: any, dateString) => {
                      setDate(date)
                      convertToDate(date, time)
                      setOpen(false)
                    }}
                    allowClear={false}
                  />
                </div>
              </div>
            </div>
            <div className="flex-col w-full gap-1 items-center">
              <span className="text-sm font-normal text-center text-white">
                {t('time')}
              </span>
              <div className="relative py-2 px-4 rounded-full w-[55%] bg-white">
                
                <div className="time-picker-wrapper z-10 w-full">
                  
                  <TimePicker
                    suffixIcon={null}
                    value={time}
                    className="w-full border-0 text-center z-10"
                    inputReadOnly={true}
                    onChange={(e: any) => {
                      setTime(e)
                      convertToDate(date, e)
                    }}
                    format="h:mm a"
                    allowClear={false}
                  />
                </div>
              </div>
            </div>
            <div className="flex-col w-full gap-1 items-center">
              <span className="text-sm font-normal text-center text-white">
                {t('valuePerGram')}
              </span>
              <div className="py-2 px-4 rounded-full w-[55%] bg-white">
                <input
                  disabled={true}
                  // defaultValue={param && !isLoading ? price[0] : ''}
                  value={value}
                  type="text"
                  className="border-0	outline-0	w-full text-center"
                />
              </div>
            </div>
          </div>
        </div>
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default PriceHistory
