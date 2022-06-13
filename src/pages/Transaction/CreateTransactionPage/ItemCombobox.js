import PropTypes from 'prop-types';
import { useState, useMemo, useCallback } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { debounce } from 'helpers/debounce';

function ItemCombobox({ name, error, register, searchCallback }) {
  const [itemsData, setItemsData] = useState({
    isLoading: false,
    items: []
  });
  const [selectedItem, setSelectedItem] = useState(null);

  const debounceSearch = useMemo(
    () =>
      debounce((e) => {
        const { value } = e.target;
        if (value !== '') {
          searchCallback(value).then((data) => setItemsData({ isLoading: false, items: data }));
        }
      }, 500),
    []
  );

  const inputOnChangeCallback = useCallback(
    (e) => {
      debounceSearch(e);
    },
    [debounceSearch]
  );

  const valueOnChangeCallback = useCallback((item) => {
    setSelectedItem(item);
    register(name, item);
  });

  const displayValue = useCallback((item) => {
    if (!item) return '';
    return `${item?.code} - ${item?.name} - Stok:${item?.quantity}`;
  });

  return (
    <div className="relative flex-grow">
      <div className="font-medium mb-2">Pilih Produk</div>

      <Combobox onChange={valueOnChangeCallback} value={selectedItem}>
        <Combobox.Input
          autoComplete="off"
          className={`w-full py-2 pl-3 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          ${error && 'border-rose-500 text-rose-500 focus:border-rose-500 focus:ring-rose-500'}`}
          displayValue={displayValue}
          onChange={inputOnChangeCallback}
          placeholder="Ketikkan kode atau nama barang..."
        />
        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {itemsData.items?.map((item, index) => (
            <Combobox.Option key={index} value={item}>
              <div
                className={`hover:bg-sky-500 hover:text-white bg-white text-black px-4 py-2 border-b border-gray-100 rounded-md flex flex-row space-x-1 items-center`}
              >
                {item?.id === selectedItem?.id && <CheckIcon className="w-4 h-4" />}
                <div>{displayValue(item)}</div>
              </div>
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
  searchCallback: PropTypes.func
};

export default ItemCombobox;
