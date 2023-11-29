import * as Yup from 'yup';

const carrosValidator = Yup.object().shape({
    nome: Yup.string()
      .required('Campo obrigatório'),
      fabricante: Yup.string(),
      ano: Yup.number(),
      acessorios_id: Yup.string()
    .required('Campo obrigatório'),
      concessionaria_id: Yup.string()
    .required('Campo obrigatório'),
      clientes_id: Yup.string()
    .required('Campo obrigatório'),
  })

export default carrosValidator