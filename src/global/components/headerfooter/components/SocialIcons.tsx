import { SocialIcon } from 'react-social-icons'
import { twitterUrl, facebookUrl, instagramUrl, whatsAppUrl } from '@/global/config';

const SocialIcons = () => {
    return (
        <div className='h-20 mt-1 flex justify-around items-center gap-2'>
            <SocialIcon url={twitterUrl} />
            <SocialIcon url={facebookUrl} />
            <SocialIcon url={instagramUrl} />
            <SocialIcon url={whatsAppUrl} />
        </div>);
}

export default SocialIcons;