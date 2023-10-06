import { Request, Response } from 'express';
import { prisma } from '../lib';
import axios from 'axios';
import { Verse } from '../types';

export const dailyTask_index_post = async (req: Request, res: Response) => {
  try {
    const { surah_id, verses, range } = req.body;
    const data = await prisma.activeSurah.create({
      data: {
        surah_id,
        from: range[0],
        to: range[1],
        verses_count: verses,
      },
    });
    if (!data) throw new Error('لم يتم تحديث البيانات بنجاح');
    await prisma.activeSurah.updateMany({
      where: { surah_id: { not: surah_id } },
      data: {
        isActive: false,
      },
    });
    res.status(201).json({ data });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const dailyTask_index_get = async (req: Request, res: Response) => {
  try {
    const task = await prisma.activeSurah.findFirst({
      where: { isActive: true },
    });
    if (!task) throw new Error('لا يوجد أي مهام لهذا اليوم');

    const responses = await axios.all([
      axios.get(
        `https://api.quran.com/api/v4/quran/verses/code_v1?chapter_number=${task?.surah_id}`
      ),
      axios.get(
        `https://api.quran.com/api/v4/recitations/2/by_chapter/${task.surah_id}?per_page=${task.verses_count}`
      ),
    ]);
    const [text, audio] = responses;

    const _ = text.data.verses.map(
      (verse: {
        id: number;
        verse_key: string;
        code_v1: string;
        v1_page: string;
      }) => ({
        id: verse.id,
        text: verse.code_v1,
        key: verse.verse_key,
        number: verse.verse_key.split(':')[1],
        page_number: verse.v1_page,
        audio:
          'https://verses.quran.com/' +
          audio.data.audio_files.find(
            (v: { url: string; verse_key: string }) =>
              v.verse_key === verse.verse_key
          )?.url,
      })
    );

    const verses = _.filter((verse: Verse) => {
      return verse.number >= task.from && verse.number <= task.to;
    });

    res
      .status(200)
      .json({ verses, audio: audio.data.audio_files, text: text.data });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const dailyTask_wbw_get = async (req: Request, res: Response) => {
  try {
    const task = await prisma.activeSurah.findFirst({
      where: {
        isActive: true,
      },
    });
    if (!task) throw new Error('لا يوجد أي مهام لهذا اليوم');

    const _verses = await axios.get(
      `https://api.quran.com/api/v4/verses/by_chapter/${task?.surah_id}?words=1&audio=3&per_page=${task?.verses_count}`
    );
    const verses = _verses.data.verses.filter(
      (verse: any) =>
        verse.verse_number >= task?.from && verse.verse_number <= task?.to
    );
    res.status(200).json({ verses });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// export const dailyTask_index_get = async (req: Request, res: Response) => {
//   try {
//     const task = await prisma.activeSurah.findFirst({
//       where: { isActive: true },
//     });
//     if (!task) throw new Error('لا يوجد أي مهام لهذا اليوم');
//     const textData = await axios.get(
//       `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${task?.surah_id}`
//     );

//     const audioData = await axios.get(
//       `https://api.quran.com/api/v4/recitations/3/by_chapter/${task.surah_id}`
//       );
//       const verses: { id: number; verse_key: string; text_uthmani: string }[] =
//         textData.data.verses.filter(
//           (verse: { id: number; verse_key: string; text_uthmani: string }) => {
//             const verse_number = verse.verse_key.split(':')[1];
//             return (
//               Number(verse_number) >= task?.from &&
//               Number(verse_number) <= task?.to
//             );
//           }
//         );

//     res.status(200).json({ verses, audioData: audioData.data });
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// };
