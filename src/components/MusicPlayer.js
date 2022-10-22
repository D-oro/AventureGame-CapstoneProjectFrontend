import '../style/Room/Music.css'
import { Howl, Howler } from 'howler';

const MusicPlayer = () => {

    const sound = new Howl({
        src: ['boss1.wav'],
        html5: true,
        loop: true,
    });

    sessionStorage.setItem('isMusicOn', false);

    return (
        <>

            <button className='button-music'>
                < img className='music' src={require('../images/lute.png')} alt="nothing here" onClick={() => {
                    
                    if (sessionStorage.getItem('isMusicOn') === "false") {
                        sessionStorage.setItem('isMusicOn', true);
                        sound.play();
                    }
                    else {
                        sessionStorage.setItem('isMusicOn', false)
                        sound.pause();
                    }
                }
                }
                />
            </button>
        </>
    )
}

export default MusicPlayer;