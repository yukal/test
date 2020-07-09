const crypto = require('crypto');

const date = new Date().toISOString().replace(/\D/g, '').substr(0, 14);

// Should be converted to cp1251
const xmlData = `
<?xml version="1.0" encoding="windows-1251"?>
<DAT FN="1234567890" TN="ПН 345612052809" ZN="АА57506761" DI="415" V="1">
    <Z NO="275">
        <TXS TX="0" SMI="25123" />
        <TXS TX="1" TS="20091201" TXPR="20.00" TXI="40854" TXO="1000" DTPR="0.00" DTI="0" DTO="0" TXTY="0" TXAL="0" SMI="245123" SMO="6000" />
        <M NM="ГОТІВКА" SMI="245123" SMO="6000" />
        <IO NM="ГОТІВКА" SMI="10000" SMO="249123" />
        <NC NI="18" NO="1" />
    </Z>
    <TS>${date}</TS>
</DAT>
`;

// Encode XML
const xmlCanonical = xmlData.trim().replace(/(<.*?>)\s+/g, '$1');
const xmlBase64 = Buffer.from(xmlCanonical).toString('base64');

// Create signature
const md5 = crypto.createHash('md5').update(xmlBase64).digest('hex');
const xmlSignature = crypto.createHash('sha1').update(md5).digest('hex');

console.log('XML-Canonical:\n%s\n', xmlCanonical);
console.log('XML-Base64:\n%s\n\nSignature:\n%s', xmlBase64, xmlSignature);
