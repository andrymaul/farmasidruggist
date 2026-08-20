import { PaymentMethodSettings } from '../types';

export const DEFAULT_PAYMENT_SETTINGS: PaymentMethodSettings = {
  qris: {
    merchantName: 'FARMASIDRUGGIST OFFICIAL',
    nmid: 'ID1024892019482',
    qrImageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020101021126580014COM.GO-PAY.WWW01189360091430000000000203000030300451115204581253033605802ID5923FARMASIDRUGGIST%20OFFICIAL6013JAKARTA%20SELATAN61051219062070703A016304620A',
    notes: 'Scan QRIS menggunakan aplikasi M-Banking (BCA, Mandiri, BRI, BNI) atau E-Wallet (GoPay, OVO, DANA, ShopeePay).'
  },
  bank: {
    bankName: 'Bank Mandiri',
    accountNumber: '137-00-8899-7711',
    accountName: 'PT FARMASI DRUGGIST INDONESIA',
    bankCode: '008',
    notes: 'Transfer tepat sesuai nominal hingga 3 digit terakhir. Verifikasi pembayaran otomatis dalam 1-3 menit.'
  },
  ewallet: {
    gopayNumber: '0812-8899-7711',
    gopayName: 'FarmasiDruggist Official',
    ovoNumber: '0812-8899-7711',
    ovoName: 'FarmasiDruggist Official',
    danaNumber: '0812-8899-7711',
    danaName: 'FarmasiDruggist Official',
    shopeepayNumber: '0812-8899-7711',
    shopeepayName: 'FarmasiDruggist Official',
    notes: 'Pastikan nama penerima sesuai dengan FarmasiDruggist Official sebelum menyelesaikan transaksi.'
  }
};
