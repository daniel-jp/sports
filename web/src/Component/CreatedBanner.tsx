import * as Dialog from '@radix-ui/react-dialog';
import { MagnifyingGlassPlus } from 'phosphor-react';

export function CreatedBanner() {
  {/*Quando a cor vem do figgma usamos Exp: bg-[#0000]**/ }

  return (
    <div className="pt-1 m-2 bg-duo self-stretch rounded-lg mt-8  overflow-hidden">
      <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
        <div>
          <strong className="text-[24px] text-[#FFFFFF] block">
            Didn't find your duo?
          </strong>
          <span className="text-zinc-400 block">
            Post an ad to find new players!
          </span></div>
        <Dialog.Trigger className='py-3 px-4 bg-violet-500
         hover:bg-violet-700 flex items-center gap-3 text-white rounded'>
          <MagnifyingGlassPlus size={24} />
          Post ad
        </Dialog.Trigger>
      </div>
    </div>)
}