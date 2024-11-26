import ContentLoader from 'react-content-loader'
import { PulseLoader } from 'react-spinners'

interface ILoader {
  width?: string
  height?: string
  viewBox?: string
}

const RectangleLoader = ({
  width = '100',
  height = '15',
  viewBox = ''
}: ILoader) => (
  <ContentLoader viewBox={viewBox}>
    <rect x="80" y="17" rx="4" ry="4" width={width} height={height} />
  </ContentLoader>
)

const Loader = () => {
  return <PulseLoader color="var(--black)" size={16} />
}

const FullScreenLoader = () => {
  return (
    <div className="flex-1 justify-center items-center">
      <Loader />
    </div>
  )
}

export { RectangleLoader, Loader, FullScreenLoader }
