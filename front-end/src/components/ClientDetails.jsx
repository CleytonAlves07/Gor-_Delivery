import React from 'react';

function ClientDetails() {
  return (
    <section>
      <form>
        <select name="vendedor" data-testid="customer_checkout__select-seller">
          <option value="disabled" disabled>Select</option>
          <option value="Fulana Pereira">Fulana Pereira</option>
          <option value="Ciclano Vendendo">Ciclano Vendendo</option>
          <option value="Beltrando Fofocando">Beltrando Fofocando</option>
        </select>
        <label htmlFor="endereco">
          Endereço
          <input
            type="text"
            name="endereco"
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label htmlFor="numero">
          Numero
          <input
            type="text"
            name="numero"
            data-testid="customer_checkout__input-address-number"
          />
        </label>
      </form>
    </section>
  );
}

export default ClientDetails;
