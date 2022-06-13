import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon } from '@heroicons/react/outline';
import transactionsAPI from 'api/transactionsAPI';
import { Heading, SubHeading } from 'components/Text';
import LinkButton from 'components/Navigation/LinkButton';

function InvoicePage() {
  const [pdf, setPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const { filename } = useParams();

  useEffect(() => {
    transactionsAPI.downloadInvoice(filename).then((res) => {
      const blob = new Blob([res.data], { type: 'application/octetstream' });
      const url = URL.createObjectURL(blob);
      setPdf({ url, blob });
    });
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const savePDF = () => {
    if (pdf.blob) saveAs(pdf.blob, `${filename}`);
  };

  const nextPage = () => {
    if (pageNumber < numPages) setPageNumber((prev) => prev + 1);
  };

  const prevPage = () => {
    if (pageNumber > 1) setPageNumber((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col space-y-8">
      <Heading>Panel Transaksi</Heading>
      <SubHeading>Lihat Invoice</SubHeading>
      <div className="space-x-2 flex flex-row">
        <button
          className="bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded-md w-max space-x-1"
          onClick={savePDF}
        >
          <div className="flex flex-row space-x-1 text-sm">
            <DownloadIcon className="w-5 h-5 self-center" />
            <div className="h-min self-center">Download PDF</div>
          </div>
        </button>
        <LinkButton to="/dashboard">Kembali Ke Dashboard</LinkButton>
      </div>

      {pdf && (
        <>
          <Document
            className="border flex flex-col items-center w-max space-y-4 p-4"
            file={pdf.url}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />

            <div className="flex flex-row space-x-2">
              <button onClick={prevPage}>
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <p>
                Page {pageNumber} of {numPages}
              </p>
              <button onClick={nextPage}>
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </div>
          </Document>
        </>
      )}
    </div>
  );
}

export default InvoicePage;
