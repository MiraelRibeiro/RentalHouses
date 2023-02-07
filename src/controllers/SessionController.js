// metodos de uma sessão: index, show, update, store, destroy
/*
index: listagem de sessoes
store: criar uma sessao
show: listagem de sessao unica
update: alterar sessao
destroy: deletar uma sessao
*/

import * as Yup from 'yup';
import User from '../models/User';

class SessionControler {
  async store(req, res) {
    const { email } = req.body;

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campo de e-mail está inválido!' });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
      return res.json(user);
    }

    return res.json(
      {
        user,
        message: 'Usuário já cadastrado!',
      },
    );
  }
}

export default new SessionControler();
