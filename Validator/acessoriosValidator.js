import * as Yup from 'yup';

const acessoriosValidator = Yup.object().shape({
  nome: Yup.string()
    .required('Campo obrigatório'),
  valor: Yup.string()
})

export default acessoriosValidator