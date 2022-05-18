import PropTypes from 'prop-types';
import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import itemsAPI from 'api/itemsAPI';

function ItemCombobox({ name, error, register, selectedItem, setSelectedItem }) {
  const [query, setQuery] = useState('');
  const [timer, setTimer] = useState(null);
  const [itemsData, setItemsData] = useState({
    isLoading: false,
    items: []
  });

  const fetchData = async () => {
    try {
      setItemsData({ isLoading: true, items: [] });
      const res = await itemsAPI.getItems({ limit: 10, page: 1, search: query });
      setItemsData({ isLoading: false, items: res.data.data.edge });
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      fetchData();
    }, 500);

    setTimer(newTimer);
  };

  return (
    <div className="relative flex-grow">
      <div className="font-medium mb-2">Pilih Produk</div>

      <Combobox
        as="div"
        onChange={(item) => {
          setSelectedItem(item);
          register(name, item);
        }}
        value={selectedItem}
      >
        <Combobox.Input
          className="w-full py-2 pl-3 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          displayValue={(item) => item?.name}
          onChange={handleInputChange}
        />
        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {itemsData.items?.map((item, index) => (
            <Combobox.Option key={index} value={item}>
              {({ active, selected }) => (
                <div
                  className={`${
                    active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                  } px-4 py-2 border-b border-gray-100 rounded-md flex flex-row space-x-1 items-center`}
                >
                  {selected && <CheckIcon className="w-4 h-4" />}
                  <div>{item?.name}</div>
                </div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
      <p className={`text-sm text-rose-500 text-right ${error && '-mb-4'}`}>{error || ''}</p>
    </div>
  );
}

ItemCombobox.propTypes = {
  name: PropTypes.string,
  error: PropTypes.any,
  register: PropTypes.func,
  setSelectedItem: PropTypes.func,
  selectedItem: PropTypes.any
};

export default ItemCombobox;
