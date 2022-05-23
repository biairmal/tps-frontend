import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import reportsAPI from 'api/reportsAPI';
import Loader from 'components/Loader/Loader';
import { Heading, SubHeading } from 'components/Text';
import InfoBox from './InfoBox';
import { months } from 'config/date';
import LinkButton from 'components/Navigation/LinkButton';

function InformasiPenjualan() {
  const defaultPageDataValue = {
    isLoading: false,
    data: {}
  };
  const [pageData, setPageData] = useState(defaultPageDataValue);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Jumlah Transaksi Bulanan',
        data: [],
        fill: false,
        borderColor: 'rgb(120,180,235)',
        tension: 0.1
      }
    ]
  });

  const fetchData = async () => {
    const res = await reportsAPI.getThisMonthSummary();
    setPageData({
      isLoading: false,
      data: res.data.data[0]
    });
    const res2 = await reportsAPI.getReports({ limit: 12, page: 1, groupBy: 'month' });
    const graphData = res2.data.data.edge;

    const labels = graphData.map((data) => {
      const date = new Date(data.date);
      return months[date.getMonth()];
    });
    const data = graphData.map((data) => data.transactions);

    setChartData({
      labels: labels.reverse(),
      datasets: [
        {
          label: 'Jumlah Transaksi Bulanan',
          data: data.reverse(),
          fill: false,
          borderColor: 'rgb(120,180,235)',
          tension: 0.1
        }
      ]
    });
  };

  useEffect(() => {
    setPageData({
      isLoading: true,
      rowData: {}
    });
    fetchData();
  }, []);

  const formatPrice = (price) => {
    if (price / 1000000000000 > 1) return `${price / 1000000000000} T`;
    else if (price / 1000000000 > 1) return `${price / 1000000000} M`;
    else if (price / 1000000 > 1) return `${price / 1000000} Jt`;
    else if (price / 1000 > 1) return `${price / 1000} Rb`;
    else return `${formatPrice}`;
  };

  return (
    <div className="flex flex-col space-y-8">
      <Heading>Dashboard</Heading>
      <SubHeading>Penjualan Bulan Ini</SubHeading>

      {pageData.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-4">
              <InfoBox title="Jumlah Transaksi" info={pageData.data.transactions} />
              <InfoBox title="Produk Terjual" info={pageData.data.soldItems} />
              <InfoBox title="Total Pendapatan" info={formatPrice(pageData.data.grossProfit)} />
              <InfoBox title="Total Pengeluaran" info={formatPrice(pageData.data.totalCogs)} />
            </div>
          </div>
          <SubHeading>Grafik Penjualan</SubHeading>
          <div className="flex flex-col space-y-4 max-w-2xl border px-12 py-8 rounded-md shadow-md">
            <Line height={10} width={20} data={chartData} />
            <div className="flex w-full justify-end">
              <LinkButton to="/report">Lihat Selengkapnya</LinkButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default InformasiPenjualan;
