import { useEffect, useState } from 'react';

const useVerseSound = (data) => {
  const [audioList, setAudioList] = useState<
    { id: number; audio: HTMLAudioElement }[]
  >([]);
  const [playingAyahId, setPlayingAyahId] = useState<null | number>(null);

  useEffect(() => {
    const ayah_sounds = data?.data.verses.map((verse: Verse) => {
      const audio = new Audio(verse.audio);
      audio.addEventListener('ended', () => setPlayingAyahId(null));

      return {
        id: verse.id,
        audio,
      };
    });
    setAudioList(ayah_sounds);
    // return () => audio.removeEventListener()
  }, [data]);

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
  // const reset = () => setPlayingAyahId(null);

  return {
    playAudio,
    playingAyahId,
    // , reset
  };
};

export default useVerseSound;
