import fs from 'fs';

['index.html', 'app.html'].forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replaceAll(
    "const metodoActual = S.selectedPaymentMethod || 'Visa 4242';",
    "const metodoActual = S.selectedPaymentMethod || ((S.cards && S.cards.length && S.cards[0].brand) ? S.cards[0].brand + ' •••• ' + S.cards[0].last4 : 'Tarjeta Wompi');"
  );
  content = content.replace("last4 = '4242'", "last4 = '0000'");
  fs.writeFileSync(f, content, 'utf8');
});

console.log('Fixed 4242 successfully');
