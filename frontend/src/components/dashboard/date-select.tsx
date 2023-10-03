import {
  Combobox,
  Button,
  useCombobox,
  ScrollAreaAutosize,
} from '@mantine/core';
import { useMemo } from 'react';
import 'dayjs/locale/ar';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type DateSelectProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedDate: AttendanceDate | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<AttendanceDate | null>>;
  // setIsErrorAlertVisible: React.Dispatch<React.SetStateAction<boolean>>;
  // setIsSuccessAlertVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const DateSelect = ({
  searchTerm,
  setSearchTerm,
  setSelectedDate,
}: // setIsErrorAlertVisible,
// setIsSuccessAlertVisible,
DateSelectProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.focusSearchInput();
      combobox.focusTarget();
      setSearchTerm('');
    },
    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const { data: oldDays } = useQuery({
    queryKey: ['old-days'],
    queryFn: () =>
      axios.get(import.meta.env.VITE_SERVER_URL + 'attendance/old-days'),
  });

  const dateOptions = useMemo(() => {
    return oldDays?.data.oldDays
      .filter((day: AttendanceDate) =>
        day.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((day: AttendanceDate) => {
        return (
          <Combobox.Option
            value={JSON.stringify(day)}
            key={day.value}
            c={day.missing ? 'red' : 'green'}
          >
            {day.title}
          </Combobox.Option>
        );
      });
  }, [oldDays, searchTerm]);

  return (
    <Combobox
      store={combobox}
      position='bottom-start'
      width={200}
      onOptionSubmit={(date) => {
        console.log('combbooooo', date);
        setSelectedDate(JSON.parse(date));
        combobox.closeDropdown();
        // setIsErrorAlertVisible(false);
        // setIsSuccessAlertVisible(false);
      }}
    >
      <Combobox.Target>
        <Button onClick={() => combobox.toggleDropdown()}>
          قم باختيار التاريخ
        </Button>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Search
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Combobox.Options>
          <ScrollAreaAutosize mah={200}>{dateOptions}</ScrollAreaAutosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default DateSelect;
