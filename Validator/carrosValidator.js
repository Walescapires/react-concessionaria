import * as Yup from 'yup';

const carrosValidator = Yup.object().shape({
    modelo: Yup.string()
      .required('Campo obrigatório'),
      ano: Yup.number()
      .required('Campo obrigatório'),
      fabricante: Yup.string()
      .required('Campo obrigatório'),
      cliente_id: Yup.string()
    .required(),
    concessionaria_id: Yup.string()
    .required(),
    acessorio_id: Yup.string()
    .required()
  })

export default carrosValidator