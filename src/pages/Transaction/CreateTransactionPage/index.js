import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import itemsAPI from 'api/itemsAPI';
import transactionsAPI from 'api/transactionsAPI';
import { NumberInput, SubmitButton } from 'components/Forms';
import Loader from 'components/Loader/Loader';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import { Heading, SubHeading } from 'components/Text';
import { SnackbarContext } from 'context/SnackbarContext';
import { createBuyerSchema, addItemToCartSchema } from 'validations/transactionSchema';
import ItemCombobox from './ItemCombobox';
import CartTable from './CartTable';
import NewBuyerForms from './NewBuyerForms';

function CreateTransactionPage() {
  const {
    register: registerBuyer,
    handleSubmit,
    formState: { errors: buyerErrors }
  } = useForm({
    resolver: yupResolver(createBuyerSchema),
    mode: 'onTouched'
  });

  const {
    register: registerItem,
    handleSubmit: handleItemSubmit,
    setValue,
    formState: { errors: itemErrors }
  } = useForm({
    resolver: yupResolver(addItemToCartSchema),
    mode: 'onSubmit'
  });

  const navigate = useNavigate();
  const snackbarRef = useContext(SnackbarContext);
  const [isLoading, setIsLoading] = useState(false);

  const [cartData, setCartData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const addItemToCart = () => {
    if (selectedItem) {
      setCartData((prev) => [...prev, selectedItem]);
    }
    setSelectedItem(null);
  };

  const deleteItemFromCart = () => {
    if (cartData.length === 1) setCartData([]);
    else {
      console.log('tes');
    }
  };

  // state: create or find buyer, create transaction loading
  // selected item, selected buyer, cart, foundBuyer, foundItem

  // function : select buyer, select item, drop item from cart
  // fetch buyer, fetch item

  const fetchBuyer = () => {};

  const fetchItem = () => {};

  const cartAddItem = (data) => {
    setCartData((prev) => [...prev, data]);
  };

  const cartDeleteItem = () => {};

  const createTransaction = async (data) => {
    try {
      // setIsLoading(true);
      const buyer = data;
      const reqData = {
        buyer,
        items: cartData.map((row) => ({id: row.item.id, quantity: row.quantity}))
      };

      console.log(reqData);

      // const res = await transactionsAPI.createTransaction(reqData);

      // if (res.status === 201) {
      //   navigate('/users', { replace: true });
      //   setTimeout(() => {
      //     snackbarRef.current.success('Berhasil membuat pengguna!');
      //   }, 1000);
      // }
    } catch (error) {
      console.log(error?.response);
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <Heading>Panel Transaksi</Heading>
      <SubHeading>Buat Transaksi</SubHeading>

      {isLoading && <Loader />}

      {/* Buyer Form */}
      <form onSubmit={handleSubmit(createTransaction)} className="max-w-xl space-y-4">
        <h3 className="text-xl font-medium text-sky-500 mb-4">Data Pembeli</h3>
        <NewBuyerForms errors={buyerErrors} register={registerBuyer} />
      </form>

      {/* Item Form */}
      <form onSubmit={handleItemSubmit(cartAddItem)} className="max-w-xl space-y-4">
        <h3 className="text-xl font-medium text-sky-500 mb-4">Tambahkan Produk</h3>
        <ItemCombobox
          name="item"
          errors={itemErrors}
          register={setValue}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
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
      <CartTable data={cartData} deleteFunction={deleteItemFromCart} />
    </div>
  );
}

export default CreateTransactionPage;
