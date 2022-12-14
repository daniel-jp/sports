
interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner(props: GameBannerProps) {

  return (

    <a href='' className="relative rounded-lg overflow-hidden">
      <img src={props.bannerUrl} alt="image" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-disc absolute bottom-0 left-0 right-0">
        <strong className="font-bord text-white block">
          {props.title}
        </strong>
        <span className="text-zinc-300 text-sm block">
          {props.adsCount} advent(s)
        </span>
      </div>
    </a>
  )
}