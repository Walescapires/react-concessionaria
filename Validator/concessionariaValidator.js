import * as Yup from 'yup';

const concessionariaValidator = Yup.object().shape({
  nome: Yup.string()
    .required('Campo obrigatório'),
  cnpj: Yup.string(),
})

export default concessionariaValidator