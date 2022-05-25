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
    mode: 'onSubmit'
  });

  const {
    register: registerItem,
    handleSubmit: handleItemSubmit,
    setValue,
    reset: resetItem,
    formState: { errors: itemErrors }
  } = useForm({
    resolver: yupResolver(addItemToCartSchema),
    mode: 'onSubmit'
  });

  const navigate = useNavigate();
  const snackbarRef = useContext(SnackbarContext);
  const [isLoading, setIsLoading] = useState(false);

  const [cartData, setCartData] = useState([]);

  const cartAddItem = (item) => {
    resetItem();
    const findIndex = cartData.findIndex((cartItem) => cartItem.item.id === item.item.id);
    if (findIndex < 0) {
      setCartData((prev) => [...prev, item]);
    } else {
      let cartDataCopy = [...cartData];
      let itemToUpdate = cartDataCopy[findIndex];
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
      if (cartData.length < 1)
        return snackbarRef.current.error('Mohon input barang terlebih dahulu');
      setIsLoading(true);
      const buyer = data;
      const reqData = {
        buyer,
        items: cartData.map((row) => ({ id: row.item.id, quantity: row.quantity }))
      };

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
      console.log(error?.response);
    }
  };

  const searchItems = async (searchValue) => {
    const res = await itemsAPI.getItems({ limit: 10, page: 1, search: searchValue });
    if (res.status === 200) return res.data.data.edge;
    return [];
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
      <CartTable data={cartData} deleteFunction={cartDeleteItem} />
    </div>
  );
}

export default CreateTransactionPage;
