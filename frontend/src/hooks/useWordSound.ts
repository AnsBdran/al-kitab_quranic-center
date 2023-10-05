import { useEffect, useState } from 'react';

type WordAudio = { audio: HTMLAudioElement; id: number };

const useWordSound = (verses: VerseFull[] | undefined) => {
  const [audioList, setAudioList] = useState<null | WordAudio[]>(null);
  const [activeWord, setActiveWord] = useState<null | number>(null);

  useEffect(() => {
    const _audioList: WordAudio[] = [];
    verses?.forEach((verse) => {
      verse.words.forEach((word) => {
        _audioList.push({
          id: word.id,
          audio: new Audio('https://audio.qurancdn.com/' + word.audio_url),
        });
      });
    });
    setAudioList(_audioList);
  }, [verses]);

  const stopWord = () => {
    audioList?.forEach((audio) => {
      audio.audio.currentTime = 0;
      audio.audio.pause();
    });
  };

  const playWord = (id: number) => {
    setActiveWord(id);
    console.log('playing');
    stopWord();
    audioList?.find((audio) => audio.id === id)?.audio.play();
  };

  return { playWord, activeWord };
};

export default useWordSound;
