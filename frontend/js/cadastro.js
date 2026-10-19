
const API = 'http://127.0.0.1:8000'

const formCadastro = document.getElementById('form-cadastro')

formCadastro.addEventListener('submit', async (e) => {
  e.preventDefault()

  // Captura os dados preenchidos no formulário
  const usuario = {
    nome: document.getElementById('nome').value.trim(),
    email: document.getElementById('email').value.trim(),
    senha: document.getElementById('senha').value
  }

  try {
    // Envia o cadastro para a API sem token
    const resposta = await fetch(`${API}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    })

    // Lê a resposta da API
    const resultado = await resposta.json()

    if (resposta.ok && resultado.mensagem) {
      alert('Cadastro feito com sucesso!')
      formCadastro.reset()
      window.location.href = 'login.html'
    } else {
      const mensagem =
        resultado.detail ||
        resultado.erro ||
        'Não foi possível realizar o cadastro.'

      alert('Erro ao cadastrar: ' + mensagem)
      console.error('Resposta da API:', resultado)
    }
  } catch (erro) {
    console.error('Erro ao conectar com a API:', erro)

    alert(
      'Não foi possível conectar ao servidor. ' +
      'Verifique se a API FastAPI está em execução.'
    )
  }
})
