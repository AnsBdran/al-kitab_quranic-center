import {
  Combobox,
  Input,
  InputBase,
  ScrollArea,
  useCombobox,
} from '@mantine/core';
import { useState } from 'react';

type SurahSelectProps = {
  selectSurah: (value: string) => void;
  surah: string;
  surahs: Surah[];
};

const SurahSelect = ({
  selectSurah,
  surah: surahString,
  surahs,
  ...props
}: SurahSelectProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const surah = surahString && JSON.parse(surahString);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.focusSearchInput(),
  });

  const surahOptions = surahs
    .filter((surah) => surah.label.includes(searchTerm))
    .map((surah) => (
      <Combobox.Option value={JSON.stringify(surah)} key={surah.value}>
        {`سورة ${surah.label}`}
      </Combobox.Option>
    ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        selectSurah(val);
        combobox.closeDropdown();
      }}
      {...props}
    >
      <Combobox.Target>
        <InputBase
          onClick={() => combobox.toggleDropdown()}
          component='button'
          pointer
          rightSection={<Combobox.Chevron />}
          type='button'
          rightSectionPointerEvents='none'
        >
          <Input.Placeholder>
            {surah?.label || 'الرجاء تحديد السورة'}
          </Input.Placeholder>
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Search
          placeholder='البحث عن سورة'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type='scroll'>
            {surahOptions}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SurahSelect;
