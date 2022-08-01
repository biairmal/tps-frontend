import PropTypes from 'prop-types';
import { TextInput } from 'components/Forms';

function NewBuyerForms({ errors, register }) {
  return (
    <>
      <TextInput
        label="Nama Pembeli*"
        name="name"
        error={errors.name?.message}
        register={register}
        placeholder="Masukkan nama pembeli..."
      />
      <div className="flex justify-between space-x-2">
        <TextInput
          label="Nomor Telepon*"
          name="phone"
          error={errors.phone?.message}
          register={register}
          placeholder="Masukkan nomor telepon..."
        />
        <TextInput
          label="E-mail"
          name="email"
          error={errors.email?.message}
          register={register}
          placeholder="Masukkan alamat e-mail..."
        />
      </div>
      <TextInput
        label="Alamat"
        name="address"
        error={errors.address?.message}
        register={register}
        placeholder="Masukkan alamat pembeli..."
      />
      <div className="flex justify-between space-x-2">
        <TextInput
          label="Kode Pos"
          name="zip"
          error={errors.zip?.message}
          register={register}
          placeholder="Masukkan kode pos..."
        />
        <TextInput
          label="Kota"
          name="city"
          error={errors.city?.message}
          register={register}
          placeholder="Masukkan kota asal..."
        />
        <TextInput
          label="Negara"
          name="country"
          error={errors.country?.message}
          register={register}
          placeholder="Masukkan negara asal..."
        />
      </div>

    </>
  );
}

NewBuyerForms.propTypes = {
  errors: PropTypes.any,
  register: PropTypes.func
};

export default NewBuyerForms;
