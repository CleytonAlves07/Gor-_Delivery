import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api, { getAllSellers } from '../services/requests';
import ContextDelivery from '../context/Context';
import { getUserLogged } from '../services/localStorage';

function ClientDetails() {
  const { cart, setCart } = useContext(ContextDelivery);
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState(0);
  const { push } = useHistory();

  // Estado inicial dos vendedores
  const [sellersInfo, setSellersInfo] = useState({
    id: 1,
    seller: 'Fulana Pereira',
    address: '',
    addressNumber: '',
  });

  // Pega os vendedores do banco, insere um Id e salva a informação no estado
  const getRoleSellers = async (token) => {
    const data = await getAllSellers(token);
    setSellers(data);
    setSellerId(data[0].id);
  };

  // Pega o token do storage, passa para função autorizando e faz a requisição pegando os vendedores
  useEffect(() => {
    const { token } = getUserLogged();
    getRoleSellers(token);
  }, []);

  // Colhe dados para o estado e seta os iniciais
  const handleInfos = ({ target: { name, value } }) => {
    setSellersInfo({ ...sellersInfo, [name]: value });
  };

  // Finaliza o pedido e envia pro banco de dados
  const postOrder = async () => {
    // Pegando o id do usuário logado no storage
    const idUserLogged = JSON.parse(localStorage.getItem('user'));

    // Soma total dos itens do carrinho
    const totalOrder = cart
      .reduce((acc, curr) => acc + Number(curr.totalValues), 0)
      .toFixed(2);

    // Objeto contendo informações do pedido
    const newOrder = {
      userId: idUserLogged.id,
      sellerId: Number(sellerId),
      totalPrice: Number(totalOrder),
      deliveryAddress: sellersInfo.address,
      deliveryNumber: sellersInfo.addressNumber,
      saleDate: new Date(),
      status: 'Pendente',
    };

    // Pega o token do usuário logado
    const { token } = getUserLogged();

    // Faz o post na rota sale com as informações do pedido
    const sendSale = await api.post(
      '/sales',
      { ...newOrder },
      { headers: { Authorization: token } },
    );

    // Id do pedido
    const idSale = sendSale.data.id;
    // Array contendo objetos com id da venda, produtos e quantidade
    const arrProductsAndIdSale = cart.map((product) => (
      { saleId: idSale, productId: product.id, quantity: product.quantity }
    ));

    // Criação da sales product do banco de dados
    await api.post(
      '/sales_product',
      [...arrProductsAndIdSale],
      { headers: { Authorization: token } },
    );
    // Limpa o carrinho após finalizar a venda
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    push(`/customer/orders/${idSale}`);
  };

  return (
    <section>
      <form>
        <div>
          <select
            data-testid="customer_checkout__select-seller"
            style={ {
              width: '17rem',
              padding: '8px',
              marginTop: '10px',
              marginBottom: '10px' } }
            name="seller"
            value={ sellerId }
            onChange={ (event) => setSellerId(event.target.value) }
          >
            {sellers?.map((el, i) => (
              <option
                value={ el.id }
                key={ i }
              >
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="endereco">
            Endereço
            <input
              type="text"
              className="form-control"
              style={ { marginBottom: '10px' } }
              data-testid="customer_checkout__input-address"
              name="address"
              value={ sellersInfo.address }
              onChange={ handleInfos }
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="numero">
            Numero
            <input
              type="text"
              className="form-control"
              name="addressNumber"
              value={ sellersInfo.addressNumber }
              data-testid="customer_checkout__input-address-number"
              onChange={ handleInfos }
            />
          </label>
        </div>
      </form>
      <div>
        <button
          className="btn btn-outline-primary me-2"
          style={ { marginTop: '20px' } }
          type="submit"
          data-testid="customer_checkout__button-submit-order"
          onClick={ postOrder }
        >
          FINALIZAR PEDIDO
        </button>
      </div>
    </section>
  );
}

export default ClientDetails;
