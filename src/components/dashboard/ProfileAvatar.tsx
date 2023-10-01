import Image from 'next/image'

import avatarTeste from '../../assets/images/avatar_teste.png'

export function ProfileAvatar() {
  return (
    <div>
      <Image
        className="inline-block rounded-full ring-2 ring-white"
        src={avatarTeste}
        alt=""
        width={150}
        height={150}
      />
    </div>
  )
}
