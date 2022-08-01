import { useContext, useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import itemsAPI from 'api/itemsAPI';
import transactionsAPI from 'api/transactionsAPI';
import { NumberInput, SelectInput, SubmitButton } from 'components/Forms';
import Loader from 'components/Loader/Loader';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import { Heading, SubHeading } from 'components/Text';
import { SnackbarContext } from 'context/SnackbarContext';
import { createBuyerSchema, addItemToCartSchema } from 'validations/transactionSchema';
import ItemCombobox from './ItemCombobox';
import CartTable from './CartTable';
import NewBuyerForms from './NewBuyerForms';
import BuyerCombobox from './BuyerCombobox';

function CreateTransactionPage() {
  const {
    register: registerBuyer,
    handleSubmit,
    formState: { errors: buyerErrors },
    reset: resetBuyer
  } = useForm({
    resolver: yupResolver(createBuyerSchema),
    mode: 'onSubmit'
  });

  const {
    register: registerItem,
    handleSubmit: handleItemSubmit,
    setValue: setItemValue,
    reset: resetItem,
    formState: { errors: itemErrors }
  } = useForm({
    resolver: yupResolver(addItemToCartSchema),
    mode: 'onSubmit'
  });

  const navigate = useNavigate();
  const itemComboboxRef = useRef()
  const snackbarRef = useContext(SnackbarContext);
  const [isLoading, setIsLoading] = useState(false);

  const [cartData, setCartData] = useState([]);
  

  const cartAddItem = (item) => {
    console.log(item)
    resetItem();
    const findIndex = cartData.findIndex((cartItem) => cartItem.item.id === item.item.id);
    itemComboboxRef.current.deselect()
    if (item.quantity > item.item.quantity) {
      return snackbarRef.current.error('Mohon tidak melebihi stok barang');
    }
    if (findIndex < 0) {
      setCartData((prev) => [...prev, item]);
    } else {
      let cartDataCopy = [...cartData];
      let itemToUpdate = cartDataCopy[findIndex];
      if (itemToUpdate.quantity + item.quantity > item.item.quantity) {
        return snackbarRef.current.error('Mohon tidak melebihi stok barang');
      }
      itemToUpdate.quantity += item.quantity;
      cartDataCopy[findIndex] = itemToUpdate;
      setCartData(cartDataCopy);
    }
  };

  const cartDeleteItem = (index) => {
    let cartDataCopy = [...cartData];
    cartDataCopy.splice(index, 1);
    setCartData(cartDataCopy);
  };

  const createTransaction = async (data) => {
    try {
      console.log(data);
      if (cartData.length < 1)
        return snackbarRef.current.error('Mohon input barang terlebih dahulu');
      const buyer = data;
      const reqData = {
        buyer,
        items: cartData.map((row) => ({ id: row.item.id, quantity: row.quantity }))
      };

      console.log(reqData);

      setIsLoading(true);
      const res = await transactionsAPI.createTransaction(reqData);
      setIsLoading(false);

      if (res.status === 201) {
        const filename = res.data.data.invoice;
        navigate(`/invoices/${filename}`, { replace: true });
        setTimeout(() => {
          snackbarRef.current.success('Transaksi berhasil dilakukan!');
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error?.response);
    }
  };

  const searchItems = async (searchValue) => {
    const res = await itemsAPI.getItems({ limit: 10, page: 1, search: searchValue });
    if (res.status === 200) return res.data.data.edge;
    return [];
  };

  const searchBuyers = async (searchValue) => {
    const res = await transactionsAPI.getBuyers({ limit: 10, page: 1, search: searchValue });
    if (res.status === 200) return res.data.data.edge;
    return [];
  };

  const [isNewBuyer, setIsNewBuyer] = useState(true);

  useEffect(() => {
    resetBuyer({})
    console.log('test')
    
  }, [isNewBuyer])
  

  return (
    <div className="flex flex-col space-y-8">
      <Heading>Panel Transaksi</Heading>
      <SubHeading>Buat Transaksi</SubHeading>

      {isLoading && <Loader />}

      {/* Buyer Form */}
      <form onSubmit={handleSubmit(createTransaction)} className="max-w-xl space-y-4">
        <h3 className="text-xl font-medium text-sky-500">Data Pembeli</h3>
        <PrimaryButton
          text={isNewBuyer ? 'Cari Pembeli Lama' : 'Buat Pembeli Baru'}
          onClick={() => {
            setIsNewBuyer(!isNewBuyer);
          }}
        />
        {isNewBuyer ? (
          <NewBuyerForms errors={buyerErrors} register={registerBuyer} />
        ) : (
          <BuyerCombobox
            name="buyer"
            error={buyerErrors.name?.message}
            register={resetBuyer}
            searchCallback={searchBuyers}
          />
        )}
        <SelectInput
          label="Tipe Customer"
          name="customerType"
          error={buyerErrors.customerType?.message}
          register={registerBuyer}
          placeholder="Tentukan Tipe Harga..."
          defaultValue={'customer'}
          options={[
            { option: 'Customer', value: 'customer' },
            { option: 'Dealer', value: 'dealer' }
          ]}
        />
        <SubmitButton id="submit_transaction" hidden={true} />
      </form>

      {/* Item Form */}
      <form onSubmit={handleItemSubmit(cartAddItem)} className="max-w-xl space-y-4">
        <h3 className="text-xl font-medium text-sky-500 mb-4">Tambahkan Produk</h3>
        <ItemCombobox
          ref={itemComboboxRef}
          name="item"
          error={itemErrors.item?.message}
          register={setItemValue}
          searchCallback={searchItems}
        />
        <div className="flex flex-row w-full items-end space-x-2">
          <NumberInput
            error={itemErrors.quantity?.message}
            label="Jumlah"
            min={0}
            name="quantity"
            placeholder="Masukkan jumlah..."
            register={registerItem}
            type="number"
          />
          <SubmitButton text="Tambahkan Barang" />
        </div>
      </form>

      <PrimaryButton
        text="Selesaikan Transaksi"
        onClick={() => {
          document.getElementById('submit_transaction').click();
        }}
      />
      <h3 className="text-xl font-medium text-sky-500 mb-4">Daftar Pembelian</h3>
      <CartTable data={cartData} deleteFunction={cartDeleteItem} />
    </div>
  );
}

export default CreateTransactionPage;
