import { useEffect, useState } from 'react';

const useVerseSound = (verses: Verse[]) => {
  const [audioList, setAudioList] = useState<
    { id: number; audio: HTMLAudioElement }[]
  >([]);
  const [playingAyahId, setPlayingAyahId] = useState<null | number>(null);

  useEffect(() => {
    const versesSound = verses?.map((verse: Verse) => {
      const audio = new Audio(verse.audio);
      audio.addEventListener('ended', () => setPlayingAyahId(null));

      return {
        id: verse.id,
        audio,
      };
    });
    setAudioList(versesSound);
  }, [verses]);

  const stopSound = () => {
    audioList.forEach((audio) => {
      audio.audio.currentTime = 0;
      audio.audio.pause();
    });
  };
  const playAudio = (id: number) => {
    stopSound();
    setPlayingAyahId(id);
    audioList?.find((audio) => audio?.id === id)?.audio.play();
  };

  return {
    playAudio,
    playingAyahId,
  };
};

export default useVerseSound;
