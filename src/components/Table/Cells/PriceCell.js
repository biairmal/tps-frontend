import PropTypes from 'prop-types';

function PriceCell({ row, columnName }) {
  const priceArr = row.original[columnName].toString();
  const split = priceArr.split(',');
  let sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return <div className="whitespace-nowrap">Rp. {rupiah},-</div>;
}

PriceCell.propTypes = {
  columnName: PropTypes.string,
  prefix: PropTypes.string,
  row: PropTypes.object
};

export default PriceCell;
