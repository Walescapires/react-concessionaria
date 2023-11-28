import * as Yup from 'yup';

const oficinaValidator = Yup.object().shape({
  nome: Yup.string(),
  valor: Yup.string(),
})

export default oficinaValidator