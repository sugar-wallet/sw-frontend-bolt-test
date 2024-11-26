import { ArgorLogo, MarshLogo, BureauLogo } from 'assets/images'
import { ImageComponent } from 'components'

const GoldInfoLogos = () => {
  const data = [
    {
      image: ArgorLogo,
      title: 'Argor-Heraeus'
    },
    {
      image: MarshLogo,
      title: 'Marsh'
    },
    {
      image: BureauLogo,
      title: 'Bureau Veritas'
    }
  ]
  return (
    <div className="w-full mt-4 justify-around">
      {data.map((item) => (
        <div
          key={item.title}
          className="flex-col h-14 items-center justify-between"
        >
          <ImageComponent
            alt="gold logos"
            style={{ width: '30px', height: '30px', objectFit: 'cover' }}
            src={item.image}
          />
          <div className="text-light text-xs">{item.title}</div>
        </div>
      ))}
    </div>
  )
}

export { GoldInfoLogos }
