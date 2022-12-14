import './styles/main.css';

import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { useEffect, useState } from 'react';

import logo from './assets/Logo.svg';
import { CreateAdModal } from './Component/CreateAdModal';
import { CreatedBanner } from './Component/CreatedBanner';
import { GameBanner } from './Component/GameBanner';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number
  }

}
function App() {

  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })

  }, [])
  return (
    <div
      className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">Your
        <span className="text-transparent bg-duo bg-clip-text"> duo</span>{' '}
        is here.
      </h1>
      <div className="grid m-2 grid-cols-6 gap-6 mt-16">
        {
          games.map(game => {
            return (
              <GameBanner
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads} />
            )
          })
        }
      </div>
      <Dialog.Root>
        <CreatedBanner />
        <CreateAdModal />

      </Dialog.Root>
    </div>
  )
}

export default App
