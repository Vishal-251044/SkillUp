import mongoose from 'mongoose';

const buyPDFSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  instructorName: { type: String, required: true },
  courseName: { type: String, required: true },
  expectedPrice: { type: Number, required: true },
  pdfName: { type: String, required: true },
});

const BuyPDF = mongoose.model('BuyPDF', buyPDFSchema);

export default BuyPDF;
